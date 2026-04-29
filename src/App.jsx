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
    thumbnailUrl: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=300&fit=crop',
    embedUrl: 'https://play2048.co/',
    playTime: '5m',
    rating: 4.8
  },
  {
    id: 'snake',
    title: 'Cyber Snake',
    description: 'Classic arcade snake with a neon twist.',
    category: 'Retro',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    embedUrl: 'https://www.google.com/logos/2010/pacman10-i.html', 
    playTime: '3m',
    rating: 4.5
  },
  {
    id: 'hexgl',
    title: 'HexGL',
    description: 'Futuristic fast-paced racing game.',
    category: 'Arcade',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    embedUrl: 'http://hexgl.bkcore.com/play/',
    playTime: '10m',
    rating: 4.9
  },
  {
    id: 'tetris',
    title: 'Tetris Pro',
    description: 'The ultimate puzzle game of all time.',
    category: 'Puzzle',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605398407797-1f22405786ed?w=400&h=300&fit=crop',
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gaming-bg gaming-gradient overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="grid grid-cols-10 gap-0 h-full w-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-gaming-neon/20 h-full w-full" />
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gaming-card border border-gaming-border rounded-2xl p-8 neon-glow">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gaming-neon/10 rounded-2xl flex items-center justify-center mb-4 border border-gaming-neon/30">
              <Gamepad2 className="w-8 h-8 text-gaming-neon" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter neon-text uppercase">Portal X</h1>
            <p className="text-gray-400 text-sm mt-2 font-mono">ENCRYPTED ACCESS REQUIRED</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold ml-1">Access Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••"
                  className={`w-full bg-black/50 border ${error ? 'border-red-500 shadow-red-500/20' : 'border-gaming-border focus:border-gaming-neon'} rounded-xl py-3 px-10 text-white focus:outline-none transition-all font-mono`}
                />
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${error ? 'text-red-500' : 'text-gray-500'}`} />
              </div>
              {error && <p className="text-red-500 text-xs mt-1 animate-pulse ml-1">ACCESS DENIED: INVALID CREDENTIALS</p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-gaming-neon text-black font-bold py-3 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 group"
            >
              INITIALIZE SESSION
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gaming-border flex items-center justify-between text-[10px] text-gray-600 font-mono">
            <span>SECURE LINK ESTABLISHED</span>
            <span>v2.4.0_STABLE</span>
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
    <div className="min-h-screen pt-24 px-6 pb-20 max-w-7xl mx-auto">
      {/* Header Stat Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          { label: 'Active Sessions', val: '2,842', icon: Zap, color: 'text-gaming-neon' },
          { label: 'Network Latency', val: '12ms', icon: Cpu, color: 'text-blue-400' },
          { label: 'Server Status', val: 'Operational', icon: ShieldCheck, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gaming-card border border-gaming-border p-4 rounded-xl flex items-center gap-4"
          >
            <div className={`p-2 rounded-lg bg-black/40 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</p>
              <p className="text-lg font-bold">{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Section */}
      <div className="space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gaming-neon" />
              <span className="text-gaming-neon text-xs font-bold uppercase tracking-widest">Trending Now</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight uppercase">Featured Library</h2>
          </div>
          
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search Archives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gaming-card border border-gaming-border rounded-full py-2 px-10 text-sm focus:outline-none focus:border-gaming-neon transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game, i) => (
              <motion.div 
                layout
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-gaming-card border border-gaming-border rounded-2xl overflow-hidden hover:border-gaming-neon/50 transition-all cursor-pointer"
                onClick={() => onSelectGame(game)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={game.thumbnailUrl} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gaming-card via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 rounded-md border border-white/10 text-[10px] font-bold uppercase tracking-tighter">
                    {game.category}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-gaming-neon transition-colors">{game.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                      <span>★</span>
                      <span>{game.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">{game.description}</p>
                  
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono mt-auto pt-4 border-t border-gaming-border/50">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>AVG {game.playTime}</span>
                    </div>
                    <div className="group-hover:text-gaming-neon transition-colors flex items-center gap-1 uppercase font-bold">
                      Execute <Play className="w-3 h-3 fill-current" />
                    </div>
                  </div>
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
      <header className="px-6 py-4 border-b border-gaming-border flex items-center justify-between bg-gaming-card/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
          >
            <X className="w-6 h-6 text-gray-400 group-hover:text-white" />
          </button>
          <div>
            <h2 className="text-lg font-bold uppercase tracking-tight leading-none">{game.title}</h2>
            <p className="text-gaming-neon text-[10px] font-mono mt-1">SESSION_ACTIVE :: {game.id.toUpperCase()}_ENV</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <a 
            href={game.embedUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-gaming-border rounded-lg text-xs hover:border-gaming-neon/50 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Open Source
          </a>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gaming-neon shadow-gaming-neon/20 shadow-lg text-black font-bold rounded-lg text-xs hover:bg-white transition-all"
          >
            {isFullscreen ? 'Exit Stage' : 'Immersive Mode'}
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
        <>
          <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 border-b border-gaming-border bg-gaming-bg/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => {
                  setSelectedGame(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="w-10 h-10 bg-gaming-neon/10 rounded-xl flex items-center justify-center border border-gaming-neon/30 group-hover:bg-gaming-neon/20 transition-all">
                  <Gamepad2 className="w-5 h-5 text-gaming-neon" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tighter uppercase leading-none">Portal X</h1>
                  <p className="text-[10px] text-gray-500 font-mono font-bold mt-1">SECURE ARCHIVE</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] text-gaming-neon font-bold font-mono">CONNECTION STATUS</span>
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Authorized Member</span>
                </div>
                <div className="h-10 w-[1px] bg-gaming-border hidden md:block" />
                <button 
                  onClick={() => setIsAuthorized(false)}
                  className="p-2 hover:bg-red-500/10 rounded-lg group transition-all"
                >
                  <X className="w-6 h-6 text-gray-500 group-hover:text-red-500" />
                </button>
              </div>
            </div>
          </nav>

          <Dashboard onSelectGame={(g) => setSelectedGame(g)} />
        </>
      )}

      <AnimatePresence>
        {selectedGame && (
          <GameView game={selectedGame} onBack={() => setSelectedGame(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
