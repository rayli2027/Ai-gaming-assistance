
import React, { useState } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import StrategyHub from './components/StrategyHub';
import VisionMode from './components/VisionMode';
import { Gamepad2, Zap, Trophy, Target } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (view) {
      case View.DASHBOARD:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-extrabold text-slate-50 tracking-tight">System <span className="text-indigo-400">Dashboard</span></h1>
                <p className="text-slate-400 mt-1">Operational status: All intelligence nodes active.</p>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-xl border border-slate-800">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i*10}/32/32`} className="w-8 h-8 rounded-full border-2 border-slate-900" alt="avatar" />
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-300 px-2">1.2k+ Experts Online</span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Problem Solving', val: '98.4%', icon: Zap, color: 'text-yellow-400' },
                { label: 'Strategy Precision', val: 'A+', icon: Target, color: 'text-indigo-400' },
                { label: 'Live Meta Nodes', val: '256', icon: Gamepad2, color: 'text-emerald-400' },
                { label: 'Tournament Wins', val: '12', icon: Trophy, color: 'text-rose-400' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <stat.icon className={`${stat.color} w-6 h-6`} />
                    <span className="text-xs text-slate-500 font-mono">00:0{idx+1}s</span>
                  </div>
                  <h3 className="text-2xl font-bold mt-4">{stat.val}</h3>
                  <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="relative group overflow-hidden rounded-3xl gaming-gradient p-1">
                  <div className="bg-slate-950 rounded-[22px] p-8 relative overflow-hidden">
                    <div className="relative z-10">
                      <h2 className="text-3xl font-black mb-4">Master Your <span className="text-indigo-400">Gameplay</span></h2>
                      <p className="text-slate-400 max-w-md mb-8">
                        Experience the next generation of gaming assistance. 
                        LevelUp AI utilizes the Gemini 3 Pro model to analyze complex game states 
                        and provide frame-perfect tactical advice.
                      </p>
                      <button 
                        onClick={() => setView(View.CHATS)}
                        className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-slate-200 transition-all flex items-center gap-2"
                      >
                        Start Session
                        <Zap className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    <Gamepad2 className="absolute -right-8 -bottom-8 w-64 h-64 text-slate-900/20 transform rotate-12" />
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4">Recommended Tactics</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Shadow of the Erdtree Boss Guides', tag: 'Action RPG' },
                      { title: 'Valorant 8.11 Duelist Meta', tag: 'Competitive' },
                      { title: 'Cyberpunk 2077 Best Netrunner Builds', tag: 'Open World' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-xl hover:bg-slate-900 transition-all cursor-pointer">
                        <span className="font-medium text-slate-200">{item.title}</span>
                        <span className="text-[10px] uppercase tracking-wider bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full font-bold">{item.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
                <h3 className="text-lg font-bold mb-6">Recent Meta Trends</h3>
                <div className="space-y-6 flex-1">
                  {[
                    { game: 'League of Legends', trend: '+12%', color: 'bg-emerald-500' },
                    { game: 'Chess.com Masters', trend: '+45%', color: 'bg-indigo-500' },
                    { game: 'Dota 2', trend: '-3%', color: 'bg-rose-500' },
                    { game: 'CS2 Premier', trend: '+22%', color: 'bg-amber-500' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">{item.game}</span>
                        <span className={item.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}>{item.trend}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setView(View.STRATEGY)}
                  className="mt-8 w-full py-3 text-sm font-bold text-slate-400 hover:text-white border border-slate-800 rounded-xl hover:bg-slate-800 transition-all"
                >
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        );
      case View.CHATS:
        return <ChatInterface />;
      case View.STRATEGY:
        return <StrategyHub />;
      case View.VISION:
        return <VisionMode />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0c] text-slate-50">
      <Sidebar currentView={view} setView={setView} />
      <main className="flex-1 overflow-hidden relative">
        <div className="h-full p-4 md:p-8 flex flex-col">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
