import React from 'react';
import { LayoutDashboard, BrainCircuit, Cpu, Zap, GitBranch, Play } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
    { id: 'ml', label: 'ML Models', icon: BrainCircuit },
    { id: 'dl', label: 'DL Models', icon: Cpu },
    { id: 'qml', label: 'QML Models', icon: Zap },
  ];

  return (
    <div className="w-64 bg-[#141414] text-[#E4E3E0] h-screen border-r border-[#E4E3E0]/20 flex flex-col">
      <div className="p-6 border-bottom border-[#E4E3E0]/20">
        <h1 className="font-serif italic text-xl tracking-tight">S&P 500 ML</h1>
        <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest mt-1">Mission Control v1.0</p>
      </div>
      
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-6 py-3 text-sm font-mono transition-all duration-200",
              activeTab === item.id 
                ? "bg-[#E4E3E0] text-[#141414]" 
                : "hover:bg-[#E4E3E0]/10 text-[#E4E3E0]/70"
            )}
          >
            <item.icon size={18} />
            <span className="uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-[#E4E3E0]/20">
        <button 
          onClick={() => fetch('/api/run-pipeline', { method: 'POST' })}
          className="w-full flex items-center justify-center gap-2 bg-[#E4E3E0] text-[#141414] py-3 font-mono text-xs uppercase tracking-widest hover:bg-white transition-colors"
        >
          <Play size={14} fill="currentColor" />
          Run Pipeline
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
