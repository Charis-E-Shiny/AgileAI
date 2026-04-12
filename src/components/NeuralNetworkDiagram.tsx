import React from 'react';

const NeuralNetworkDiagram: React.FC = () => {
  const layers = [
    { name: 'Input', nodes: 9, color: 'bg-blue-500' },
    { name: 'LSTM Layer 1', nodes: 6, color: 'bg-purple-500' },
    { name: 'LSTM Layer 2', nodes: 6, color: 'bg-purple-500' },
    { name: 'Dense (ReLU)', nodes: 4, color: 'bg-orange-500' },
    { name: 'Output (Sigmoid)', nodes: 1, color: 'bg-green-500' },
  ];

  return (
    <div className="bg-white border border-[#141414] p-8 space-y-6">
      <h3 className="font-serif italic text-xl">Architecture Visualization</h3>
      <div className="flex justify-between items-center py-10 overflow-x-auto min-w-[500px]">
        {layers.map((layer, lIdx) => (
          <div key={lIdx} className="flex flex-col items-center gap-4 relative">
            <div className="flex flex-col gap-2">
              {Array.from({ length: layer.nodes }).map((_, nIdx) => (
                <div 
                  key={nIdx} 
                  className={`w-3 h-3 rounded-full ${layer.color} border border-[#141414]/20`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest absolute -bottom-8 whitespace-nowrap opacity-60">
              {layer.name}
            </span>
            
            {/* Connection lines (simplified) */}
            {lIdx < layers.length - 1 && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 w-16 h-px bg-[#141414]/10 -z-10"></div>
            )}
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] uppercase opacity-50 text-center pt-4">
        Total Parameters: 24,531 | Trainable: 24,531
      </p>
    </div>
  );
};

export default NeuralNetworkDiagram;
