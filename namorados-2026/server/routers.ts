import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createMessage, getApprovedMessages, getPendingMessages, approveMessage } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  messages: router({
    create: publicProcedure
      .input(z.object({
        senderName: z.string().min(1, "Nome eh obrigatorio").max(255),
        senderEmail: z.string().email("Email invalido").optional(),
        content: z.string().min(1, "Mensagem eh obrigatoria").max(1000),
      }))
      .mutation(async ({ input }) => {
        try {
          await createMessage({
            senderName: input.senderName,
            senderEmail: input.senderEmail || null,
            content: input.content,
            isApproved: 0,
          });
          return { success: true, message: "Mensagem enviada com sucesso!" };
        } catch (error) {
          console.error("Erro ao criar mensagem:", error);
          throw new Error("Falha ao enviar mensagem");
        }
      }),
    list: publicProcedure.query(async () => {
      return await getApprovedMessages();
    }),
    pending: publicProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Acesso negado");
      }
      return await getPendingMessages();
    }),
    approve: publicProcedure
      .input(z.object({
        messageId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Acesso negado");
        }
        try {
          await approveMessage(input.messageId);
          return { success: true };
        } catch (error) {
          console.error("Erro ao aprovar mensagem:", error);
          throw new Error("Falha ao aprovar mensagem");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
