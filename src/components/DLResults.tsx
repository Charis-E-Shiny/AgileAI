import React, { useEffect, useState } from 'react';
import NeuralNetworkDiagram from './NeuralNetworkDiagram';

const DLResults: React.FC = () => {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    fetch('/api/results/dl')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, []);

  if (!results) return <div className="font-mono text-xs animate-pulse">LOADING DL DATA...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-serif italic text-4xl text-[#141414]">Deep Learning Analysis</h2>
        <p className="font-mono text-xs text-[#141414]/50 uppercase tracking-widest mt-2">Neural network architectures and temporal modeling</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(results).map(([name, metrics]: [string, any]) => (
          <div key={name} className="bg-white border border-[#141414] p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif italic text-3xl">{name}</h3>
              <div className="bg-[#141414] text-white px-3 py-1 font-mono text-[10px] uppercase tracking-widest">Active</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#141414]/10 p-4">
                <p className="font-mono text-[10px] uppercase opacity-50 mb-1">Accuracy</p>
                <p className="text-2xl font-bold">{(metrics.accuracy * 100).toFixed(1)}%</p>
              </div>
              <div className="border border-[#141414]/10 p-4">
                <p className="font-mono text-[10px] uppercase opacity-50 mb-1">Loss</p>
                <p className="text-2xl font-bold">{metrics.loss.toFixed(4)}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase opacity-50">Training Progress</p>
              <div className="h-2 bg-[#E4E3E0] w-full">
                <div className="h-full bg-[#141414]" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#141414] p-8">
        <h3 className="font-serif italic text-2xl mb-4">Architecture Details</h3>
        <p className="font-mono text-sm text-[#141414]/60 mb-6">
          The LSTM model utilizes 2 layers of 50 units each, with Dropout (0.2) for regularization. 
          Input features are normalized using StandardScaler and reshaped for temporal sequence processing.
        </p>
        <div className="aspect-video bg-[#E4E3E0]/30 flex items-center justify-center border border-dashed border-[#141414]/20">
          <img 
            src="/charts/training_history.png" 
            alt="Training History" 
            className="max-h-full"
            onError={(e) => (e.currentTarget.src = 'https://picsum.photos/seed/neural/800/450')}
          />
        </div>
      </div>

      <NeuralNetworkDiagram />
    </div>
  );
};

export default DLResults;
