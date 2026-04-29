/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Lock, 
  ShieldCheck, 
  Play, 
  Search, 
  X, 
  ChevronRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Cpu,
  Zap
} from 'lucide-react';

// --- CONFIG ---
const ACCESS_PASSWORD = "5800";

const GAMES = [
  {
    id: '2048',
    title: '2048 Classic',
    description: 'Merge the tiles and reach the 2048 tile!',
    category: 'Puzzle',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop&q=60&auto=format',
    embedUrl: 'https://play2048.co/',
    playTime: '5m',
    rating: 4.8
  },
  {
    id: 'snake',
    title: 'Cyber Snake',
    description: 'Classic arcade snake with a neon twist.',
    category: 'Retro',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop&q=60&auto=format',
    embedUrl: 'https://www.google.com/logos/2010/pacman10-i.html', 
    playTime: '3m',
    rating: 4.5
  },
  {
    id: 'hexgl',
    title: 'HexGL',
    description: 'Futuristic fast-paced racing game.',
    category: 'Arcade',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&q=60&auto=format',
    embedUrl: 'http://hexgl.bkcore.com/play/',
    playTime: '10m',
    rating: 4.9
  },
  {
    id: 'tetris',
    title: 'Tetris Pro',
    description: 'The ultimate puzzle game of all time.',
    category: 'Puzzle',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605398407797-1f22405786ed?w=400&h=300&fit=crop&q=60&auto=format',
    embedUrl: 'https://tetris.com/play-tetris',
    playTime: 'Unlimited',
    rating: 4.7
  }
];

// --- COMPONENTS ---

const PasswordGate = ({ onAuthorized }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      onAuthorized();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gaming-bg gaming-gradient overflow-hidden relative crt-effect">
      <div className="scanline" />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-10 gap-0 h-full w-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="border-[1px] border-gaming-neon/20 h-full w-full" />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gaming-card border-4 border-gaming-border p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gaming-pink/10 rounded-sm flex items-center justify-center mb-6 border-2 border-gaming-pink/30 relative">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-gaming-pink" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gaming-pink" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gaming-pink" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gaming-pink" />
              <Gamepad2 className="w-8 h-8 text-gaming-pink" />
            </div>
            <h1 className="text-2xl font-arcade tracking-tighter text-gaming-neon arcade-text-glow text-center leading-relaxed">ARCADE 6</h1>
            <div className="mt-4 animate-pulse">
              <span className="text-[10px] text-gaming-yellow font-arcade uppercase tracking-widest">Insert 1 Coin</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[8px] uppercase tracking-widest text-gray-500 font-arcade block text-center">System Access Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••"
                  className={`w-full bg-black border-2 ${error ? 'border-red-500' : 'border-gaming-border focus:border-gaming-neon'} py-3 px-10 text-white focus:outline-none transition-all font-arcade text-xs text-center tracking-[1em]`}
                />
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${error ? 'text-red-500' : 'text-gray-400'}`} />
              </div>
              {error && <p className="text-red-500 text-[8px] mt-2 font-arcade text-center animate-bounce">ERROR: WRONG KEY</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-gaming-neon text-black font-arcade text-[10px] py-4 hover:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none flex items-center justify-center gap-3 group"
            >
              START GAME
              <Play className="w-3 h-3 group-hover:scale-125 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-6 border-t-2 border-gaming-border/30 flex items-center justify-between text-[8px] text-gray-600 font-arcade">
            <span className="animate-pulse">ONLINE</span>
            <span>v6.0_ARCADE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ onSelectGame }) => {
  const [search, setSearch] = useState('');
  
  const filteredGames = GAMES.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase()) || 
    g.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 px-6 pb-20 max-w-7xl mx-auto crt-effect">
      <div className="scanline" />
      {/* Header Stat Bar - Retro Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { label: '1UP (Active)', val: '8,429', icon: Zap, color: 'text-gaming-neon', bg: 'bg-gaming-neon/5' },
          { label: 'HI-SCORE', val: '999,999', icon: Cpu, color: 'text-gaming-pink', bg: 'bg-gaming-pink/5' },
          { label: 'CREDITS', val: '∞', icon: ShieldCheck, color: 'text-gaming-yellow', bg: 'bg-gaming-yellow/5' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border-2 border-gaming-border p-4 flex items-center gap-4 bg-gaming-card/40 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
          >
            <div className={`p-3 border border-gaming-border ${stat.color} ${stat.bg}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-arcade text-gray-500">{stat.label}</p>
              <p className={`text-lg font-arcade ${stat.color} arcade-text-glow`}>{stat.val}</p>
            </div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-white opacity-20" />
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-white opacity-20" />
          </motion.div>
        ))}
      </div>

      {/* Main Section */}
      <div className="space-y-16">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-4 border-gaming-border pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-gaming-neon animate-ping" />
              <span className="text-gaming-neon text-[10px] font-arcade uppercase tracking-widest">Stage 1: Selection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-arcade text-white arcade-text-glow leading-tight">Featured Library</h2>
          </div>
          
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="SEARCH ARCHIVES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border-2 border-gaming-border py-4 px-12 text-xs font-arcade text-gaming-neon focus:outline-none focus:border-gaming-pink transition-all shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] placeholder:text-gray-700"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, i) => (
              <motion.div 
                layout
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-[#1a1a1e] border-2 border-gaming-border overflow-hidden hover:border-gaming-pink transition-all cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                onClick={() => onSelectGame(game)}
              >
                <div className="aspect-[4/3] overflow-hidden relative border-b-2 border-gaming-border">
                  <img src={game.thumbnailUrl} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-2 left-2 px-3 py-1 bg-gaming-pink text-black text-[8px] font-arcade border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {game.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-arcade text-white group-hover:text-gaming-neon transition-colors leading-relaxed">{game.title}</h3>
                    <div className="flex items-center gap-1 text-[8px] text-gaming-yellow font-arcade">
                      <span>★</span>
                      <span>{game.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-[10px] font-sans leading-relaxed line-clamp-2 mb-6 group-hover:text-gray-300 transition-colors uppercase font-medium">{game.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-gaming-border/50">
                    <div className="flex items-center gap-2 text-[8px] text-gray-600 font-arcade">
                      <Clock className="w-3 h-3" />
                      <span>{game.playTime}</span>
                    </div>
                    <div className="bg-gaming-neon/5 group-hover:bg-gaming-neon p-2 border border-gaming-neon/30 text-gaming-neon group-hover:text-black transition-all">
                      <Play className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
                
                {/* Vintage Detail */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 right-0 w-[40px] h-[20px] bg-gaming-border rotate-45 translate-x-[15px] -translate-y-[5px]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const GameView = ({ game, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gaming-bg flex flex-col"
    >
      <header className="px-6 py-4 border-b-4 border-gaming-border flex items-center justify-between bg-gaming-card/80 backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gaming-pink opacity-5 animate-pulse" />
        <div className="flex items-center gap-6 relative z-10">
          <button 
            onClick={onBack}
            className="p-3 bg-black hover:bg-gaming-pink hover:text-black border-2 border-gaming-border transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-arcade text-gaming-neon arcade-text-glow leading-none">{game.title}</h2>
            <p className="text-gaming-pink text-[8px] font-arcade mt-2 animate-pulse uppercase">LIVE SESSION :: {game.id}_CORE</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <a 
            href={game.embedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-black border-2 border-gaming-border font-arcade text-[8px] hover:border-gaming-pink transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
          >
            <ExternalLink className="w-3 h-3" />
            EXTRACT
          </a>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-gaming-neon text-black font-arcade text-[8px] border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
          >
            {isFullscreen ? 'EXIT CAB' : 'FULL CAB'}
          </button>
        </div>
      </header>

      <div className={`flex-1 bg-black relative ${isFullscreen ? 'p-0' : 'p-6'}`}>
        <div className={`w-full h-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-gaming-border shadow-2xl relative shadow-gaming-neon/5`}>
          <iframe 
            src={game.embedUrl}
            className="w-full h-full border-none"
            title={game.title}
            allowFullScreen
          />
        </div>
      </div>
      
      {!isFullscreen && (
        <footer className="p-4 border-t border-gaming-border bg-gaming-card/30 text-[10px] text-gray-500 font-mono text-center">
          SYSTEM_LATENCY: OPTIMAL | ENCRYPTION_LAYER: AES-256 | {new Date().toLocaleTimeString()}
        </footer>
      )}
    </motion.div>
  );
};

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen w-full relative">
      {/* Background decoration */}
      {!isAuthorized && <PasswordGate onAuthorized={() => setIsAuthorized(true)} />}

      {isAuthorized && (
        <div className="crt-effect min-h-screen">
          <div className="scanline" />
          <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 border-b-4 border-gaming-border bg-gaming-bg/90 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => {
                  setSelectedGame(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="w-12 h-12 bg-gaming-neon p-2 border-2 border-black flex items-center justify-center transition-all group-hover:bg-white shadow-[3px_3px_0px_0px_rgba(255,0,255,1)]">
                  <Gamepad2 className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-arcade text-white arcade-text-glow leading-none group-hover:text-gaming-pink transition-colors">ARCADE 6</h1>
                  <p className="text-[7px] text-gaming-neon font-arcade mt-2 animate-pulse">SYSTEM_ACTIVE v6.0</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="hidden md:flex flex-col items-end gap-1">
                  <span className="text-[7px] text-gaming-yellow font-arcade">PLAYER 1: ONLINE</span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-gaming-pink border border-black" />
                    ))}
                  </div>
                </div>
                <div className="h-10 w-1 bg-gaming-border hidden md:block" />
                <button 
                  onClick={() => setIsAuthorized(false)}
                  className="p-3 bg-black border-2 border-gaming-border hover:bg-red-500 group transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                >
                  <X className="w-5 h-5 text-gray-500 group-hover:text-black" />
                </button>
              </div>
            </div>
          </nav>

          <Dashboard onSelectGame={(g) => setSelectedGame(g)} />
        </div>
      )}

      <AnimatePresence>
        {selectedGame && (
          <GameView game={selectedGame} onBack={() => setSelectedGame(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
