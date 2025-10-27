import { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Erro ao buscar quote:', error);
      setQuote('Falha ao carregar quote. Tente novamente!');
      setAuthor('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const textToCopy = `"${quote}" - ${author}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-zinc-900">
      {/* Fundo Grafitti */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-700 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Textura Grafitti */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Card Principal */}
      <div className="relative max-w-2xl w-full">
        {/* Sombra Neon */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur-lg opacity-75"></div>
        
        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-red-600">
          {/* Header com Tags Grafitti */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded-full transform -rotate-2">Quote</span>
              <span className="px-3 py-1 bg-zinc-900 text-white text-xs font-bold uppercase rounded-full transform rotate-2">Generator</span>
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center transform rotate-12">
              <span className="text-white text-2xl font-bold">"</span>
            </div>
          </div>

          {/* Quote Content */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-red-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              <blockquote className="text-2xl md:text-3xl font-bold text-zinc-900 leading-relaxed relative">
                <span className="absolute -left-4 -top-2 text-6xl text-red-600 opacity-30">"</span>
                <p className="relative z-10">{quote}</p>
                <span className="absolute -right-4 -bottom-4 text-6xl text-red-600 opacity-30">"</span>
              </blockquote>
              
              {author && (
                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 bg-red-600"></div>
                  <p className="text-lg font-semibold text-zinc-700 uppercase tracking-wider">
                    {author}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 mt-8 pt-8 border-t-2 border-red-100">
            <button
              onClick={fetchQuote}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg uppercase tracking-wide"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Nova Quote
            </button>
            
            <button
              onClick={copyToClipboard}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span className="hidden md:inline">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span className="hidden md:inline">Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Decoração Grafitti */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-600 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-zinc-900 rounded-full opacity-20 blur-xl"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-white text-sm opacity-50">
        <p>Powered by quotable.io</p>
      </div>
    </div>
  );
}