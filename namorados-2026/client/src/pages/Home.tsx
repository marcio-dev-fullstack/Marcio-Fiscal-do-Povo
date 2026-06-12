import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Music } from 'lucide-react';
import { MessagesForm } from '@/components/MessagesForm';
import { MessagesList } from '@/components/MessagesList';

const Home = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Auto-play music on component mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log('Autoplay blocked by browser');
      });
      setIsPlaying(true);
    }
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Homenagem de Amor',
        text: 'Um amor que merece ser celebrado!',
        url: window.location.href,
      });
    } else {
      alert('Compartilhe este link!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <audio
        ref={audioRef}
        src="/manus-storage/kesia_marcio_love_song_ec57409c.mp3"
        onEnded={() => setIsPlaying(false)}
      />

      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-rose-300 to-pink-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <img
              src="/manus-storage/kesia_marcio_dia_dos_namorados_f7dddbf5.png"
              alt="Couple"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-pink-600">
                Feliz Dia dos Namorados
              </h1>
              <p className="text-2xl font-semibold text-gray-800">
                Kesia e Marcio
              </p>
            </div>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Neste dia especial, celebramos um amor que transcende o tempo.
              </p>
              <p>
                Cada momento ao seu lado e uma bencao.
              </p>
              <p className="text-xl font-semibold text-rose-600">
                Um amor que merece ser celebrado
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-8">
              <Button
                onClick={toggleMusic}
                className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Music className="w-5 h-5" />
                {isPlaying ? 'Pausar' : 'Tocar Musica'}
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-6 text-lg rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
            Nossa Historia
          </h2>

          <div className="space-y-12">
            {[
              {
                year: '2020',
                title: 'O Encontro',
                description: 'Quando nossas vidas se cruzaram, soubemos que era especial.',
              },
              {
                year: '2024',
                title: 'Casamento no Civil',
                description: 'Diante da lei, unimos nossas vidas.',
              },
              {
                year: '2025',
                title: 'Casamento no Religioso',
                description: 'Diante de Deus e de todos, dissemos sim.',
              },
              {
                year: '2026',
                title: 'Para Sempre',
                description: 'Celebramos cada dia ao lado de quem amamos.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-8 items-start group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-8 h-8" />
                  </div>
                  {index < 3 && (
                    <div className="w-1 h-16 bg-gradient-to-b from-amber-400 to-rose-400 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-widest">
                    {item.year}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
            Uma Mensagem de Amor
          </h2>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border-2 border-amber-200">
            <p className="text-xl text-gray-700 leading-relaxed italic">
              Obrigado por cada dia ao meu lado. Voce e meu amor, minha forca, minha razao de sorrir.
            </p>
            <p className="text-lg font-semibold text-rose-600 mt-8">
              Com todo o meu amor, Sempre seu
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
              Deixe seu Recado
            </h2>
            <p className="text-gray-600 text-lg">
              Amigos e familiares, compartilhem seu carinho com o casal!
            </p>
          </div>

          <MessagesForm />
        </div>
      </section>

      <section className="relative py-20 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <MessagesList />
        </div>
      </section>

      <footer className="relative py-12 px-4 border-t-2 border-amber-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-gray-600 text-lg">
            12 de Junho de 2026 - Dia dos Namorados
          </p>
          <p className="text-amber-600 font-semibold text-xl">
            Kesia e Marcio
          </p>
          <p className="text-gray-500 text-sm">
            Uma celebracao digital do nosso amor eterno
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
