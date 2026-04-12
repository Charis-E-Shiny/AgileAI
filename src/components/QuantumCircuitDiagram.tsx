import React from 'react';

const QuantumCircuitDiagram: React.FC = () => {
  const qubits = ['q0', 'q1', 'q2', 'q3'];
  
  return (
    <div className="bg-white border border-[#141414] p-8 space-y-6">
      <h3 className="font-serif italic text-xl">VQC Circuit Diagram</h3>
      <div className="font-mono text-xs space-y-8 py-4">
        {qubits.map((q, i) => (
          <div key={i} className="flex items-center gap-4 relative">
            <span className="w-6">{q}</span>
            <div className="flex-1 h-px bg-[#141414] relative flex items-center">
              {/* Gates */}
              <div className="absolute left-10 w-8 h-8 bg-[#141414] text-white flex items-center justify-center text-[10px] border border-white">H</div>
              <div className="absolute left-24 w-12 h-8 bg-purple-500 text-white flex items-center justify-center text-[10px] border border-[#141414]">Ry(θ)</div>
              
              {/* CNOTs */}
              {i < qubits.length - 1 && (
                <div className="absolute left-44 w-px h-16 bg-[#141414] z-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#141414] rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 border border-[#141414] rounded-full flex items-center justify-center bg-white">
                    <div className="w-px h-full bg-[#141414]"></div>
                    <div className="h-px w-full bg-[#141414] absolute"></div>
                  </div>
                </div>
              )}

              <div className="absolute right-10 w-8 h-8 border-2 border-[#141414] flex items-center justify-center bg-[#E4E3E0]">
                <div className="w-4 h-px bg-[#141414] rotate-45"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#141414]"></div>
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Hadamard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500"></div>
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Rotation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-[#141414]"></div>
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Entanglement</span>
        </div>
      </div>
    </div>
  );
};

export default QuantumCircuitDiagram;
