
import React from 'react';
import { LayoutDashboard, MessageSquare, TrendingUp, ScanEye, Settings, Sword } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: View.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { id: View.CHATS, icon: MessageSquare, label: 'AI Assistant' },
    { id: View.STRATEGY, icon: TrendingUp, label: 'Meta Hub' },
    { id: View.VISION, icon: ScanEye, label: 'Vision Mode' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 gaming-gradient rounded-lg">
          <Sword className="text-white w-6 h-6" />
        </div>
        <span className="font-extrabold text-xl tracking-tight hidden md:block">LevelUp <span className="text-indigo-400">AI</span></span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentView === item.id ? 'text-indigo-400' : 'group-hover:text-white'}`} />
            <span className="font-medium hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <button className="w-full flex items-center gap-4 p-3 text-slate-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium hidden md:block">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
