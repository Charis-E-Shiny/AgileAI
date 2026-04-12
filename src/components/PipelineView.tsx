import React from 'react';
import { Database, Settings, BarChart, CheckCircle2, ArrowRight } from 'lucide-react';

const PipelineView: React.FC = () => {
  const steps = [
    { title: 'Data Ingestion', desc: 'KaggleHub download & CSV parsing', icon: Database },
    { title: 'Feature Engineering', desc: 'Technical indicators (RSI, SMA, Volatility)', icon: Settings },
    { title: 'Model Training', desc: 'ML, DL, and QML parallel execution', icon: BarChart },
    { title: 'Evaluation', desc: 'Metrics calculation & Chart generation', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="font-serif italic text-4xl text-[#141414]">Pipeline Architecture</h2>
        <p className="font-mono text-xs text-[#141414]/50 uppercase tracking-widest mt-2">End-to-end automated machine learning workflow</p>
      </header>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-[#141414]/10 hidden md:block"></div>
        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 items-start relative">
              <div className="z-10 bg-[#141414] text-white p-4 rounded-full border-4 border-[#E4E3E0]">
                <step.icon size={24} />
              </div>
              <div className="flex-1 bg-white border border-[#141414] p-8 hover:translate-x-2 transition-transform cursor-default">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Step 0{i + 1}</span>
                  <span className="text-green-500 font-mono text-[10px] uppercase tracking-widest">Completed</span>
                </div>
                <h3 className="font-serif italic text-2xl mb-2">{step.title}</h3>
                <p className="font-mono text-sm text-[#141414]/60">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#141414] text-white p-12">
        <h3 className="font-serif italic text-2xl mb-6">Technical Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs uppercase tracking-widest opacity-70">
          <div className="space-y-2">
            <p className="text-white font-bold">Data</p>
            <p>Pandas</p>
            <p>Numpy</p>
            <p>KaggleHub</p>
          </div>
          <div className="space-y-2">
            <p className="text-white font-bold">ML/DL</p>
            <p>Scikit-Learn</p>
            <p>XGBoost</p>
            <p>Tensorflow</p>
          </div>
          <div className="space-y-2">
            <p className="text-white font-bold">Quantum</p>
            <p>PennyLane</p>
            <p>Qiskit</p>
          </div>
          <div className="space-y-2">
            <p className="text-white font-bold">Frontend</p>
            <p>React</p>
            <p>Tailwind</p>
            <p>D3/Recharts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineView;
