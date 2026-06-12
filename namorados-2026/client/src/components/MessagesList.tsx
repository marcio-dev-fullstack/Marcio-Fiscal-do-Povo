import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/ui/skeleton';
import type { Message } from '@shared/types';

export function MessagesList() {
  const { data: messages, isLoading } = trpc.messages.list.useQuery();
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messages) {
      setDisplayedMessages(messages);
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!displayedMessages || displayedMessages.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center py-12">
        <MessageCircle className="w-16 h-16 mx-auto text-amber-300 mb-4 opacity-50" />
        <p className="text-gray-600 text-lg">
          Nenhuma mensagem ainda. Seja o primeiro a deixar um recado!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600 mb-2">
          Mensagens de Carinho
        </h2>
        <p className="text-gray-600">
          {displayedMessages.length} pessoa{displayedMessages.length !== 1 ? 's' : ''} ja deixou um recado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedMessages.map((message, index) => (
          <div
            key={message.id}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <Card className="h-full border-2 border-amber-100 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-lg transition-all duration-300 hover:border-amber-200">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">
                      {message.senderName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <Heart className="w-5 h-5 text-rose-400 flex-shrink-0 mt-1" />
                </div>

                <p className="text-gray-700 leading-relaxed italic">
                  "{message.content}"
                </p>

                <div className="pt-2 border-t border-amber-100">
                  <p className="text-xs text-amber-600 font-medium">
                    Com todo o carinho
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
