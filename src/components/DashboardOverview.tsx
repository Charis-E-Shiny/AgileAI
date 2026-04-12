import React, { useEffect, useState } from 'react';
import { TrendingUp, Activity, BarChart3, Clock, BrainCircuit } from 'lucide-react';
import ResultsComparison from './ResultsComparison';
import DataInterpretation from './DataInterpretation';

const DashboardOverview: React.FC = () => {
  const [results, setResults] = useState<{ ml: any; dl: any; qml: any }>({ ml: null, dl: null, qml: null });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ml, dl, qml] = await Promise.all([
          fetch('/api/results/ml').then(res => res.json()),
          fetch('/api/results/dl').then(res => res.json()),
          fetch('/api/results/qml').then(res => res.json())
        ]);
        setResults({ ml, dl, qml });
      } catch (err) {
        console.error('Failed to fetch results for overview:', err);
      }
    };
    fetchAll();
  }, []);

  const stats = [
    { label: 'Market Status', value: 'OPEN', icon: Activity, color: 'text-green-500' },
    { label: 'Active Models', value: '8', icon: BrainCircuit, color: 'text-blue-500' },
    { label: 'Last Run', value: '2m ago', icon: Clock, color: 'text-orange-500' },
    { label: 'Avg Accuracy', value: '64.2%', icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-serif italic text-4xl text-[#141414]">Market Overview</h2>
        <p className="font-mono text-xs text-[#141414]/50 uppercase tracking-widest mt-2">Real-time predictive analytics for S&P 500</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-[#141414] p-6 flex flex-col gap-4 hover:bg-[#141414] hover:text-white transition-all group cursor-default">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100">{stat.label}</span>
              <stat.icon size={16} className={stat.color} />
            </div>
            <span className="font-mono text-2xl font-bold tracking-tighter">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-[#141414] p-8 space-y-4">
          <h3 className="font-serif italic text-xl">Model Comparison</h3>
          <div className="aspect-video bg-[#E4E3E0]/30 flex items-center justify-center border border-dashed border-[#141414]/20">
            <img 
              src="/charts/accuracy_comparison.png" 
              alt="Accuracy Comparison" 
              className="max-h-full"
              onError={(e) => (e.currentTarget.src = 'https://picsum.photos/seed/chart/800/450')}
            />
          </div>
        </div>
        <div className="bg-white border border-[#141414] p-8 space-y-4">
          <h3 className="font-serif italic text-xl">Top Features</h3>
          <div className="space-y-4">
            {['RSI', 'SMA_50', 'Volatility', 'Volume'].map((feature, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[#141414]/10 pb-2">
                <span className="font-mono text-sm uppercase">{feature}</span>
                <div className="flex-1 mx-4 h-1 bg-[#E4E3E0]">
                  <div className="h-full bg-[#141414]" style={{ width: `${90 - i * 15}%` }}></div>
                </div>
                <span className="font-mono text-xs">{(0.85 - i * 0.1).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ResultsComparison />
      
      {results.ml && results.dl && results.qml && (
        <DataInterpretation 
          mlResults={results.ml} 
          dlResults={results.dl} 
          qmlResults={results.qml} 
        />
      )}
    </div>
  );
};

export default DashboardOverview;
