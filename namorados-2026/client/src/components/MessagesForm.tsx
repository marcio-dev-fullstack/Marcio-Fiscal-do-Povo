import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Send } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export function MessagesForm() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMessage = trpc.messages.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!senderName.trim() || !content.trim()) {
      toast.error('Por favor, preencha o nome e a mensagem');
      return;
    }

    setIsSubmitting(true);
    try {
      await createMessage.mutateAsync({
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim() || undefined,
        content: content.trim(),
      });

      toast.success('Mensagem enviada com sucesso! Obrigado pelo carinho.');
      setSenderName('');
      setSenderEmail('');
      setContent('');
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-amber-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <CardTitle className="text-2xl">Deixe uma Mensagem</CardTitle>
          <Heart className="w-5 h-5 text-rose-500" />
        </div>
        <CardDescription>
          Compartilhe seu carinho e felicitacoes para o casal
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Seu Nome *
              </label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                disabled={isSubmitting}
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Seu Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                disabled={isSubmitting}
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-gray-700">
              Sua Mensagem *
            </label>
            <Textarea
              id="message"
              placeholder="Escreva sua mensagem de carinho e felicitacoes..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              rows={5}
              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 resize-none"
            />
            <p className="text-xs text-gray-500">
              {content.length}/1000 caracteres
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !senderName.trim() || !content.trim()}
            className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>

          <p className="text-xs text-gray-600 text-center">
            Sua mensagem sera revisada antes de ser publicada.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
