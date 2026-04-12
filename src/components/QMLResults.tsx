import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import QuantumCircuitDiagram from './QuantumCircuitDiagram';

const QMLResults: React.FC = () => {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    fetch('/api/results/qml')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, []);

  if (!results) return <div className="font-mono text-xs animate-pulse">LOADING QML DATA...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-serif italic text-4xl text-[#141414]">Quantum Machine Learning</h2>
        <p className="font-mono text-xs text-[#141414]/50 uppercase tracking-widest mt-2">Experimental quantum-classical hybrid models</p>
      </header>

      <div className="bg-[#141414] text-[#E4E3E0] p-12 relative overflow-hidden">
        <Zap className="absolute -right-12 -top-12 opacity-10" size={300} />
        <div className="relative z-10 max-w-2xl">
          <h3 className="font-serif italic text-3xl mb-4">The Quantum Edge</h3>
          <p className="font-mono text-sm opacity-70 mb-8 leading-relaxed">
            Utilizing Variational Quantum Classifiers (VQC) and Quantum Support Vector Machines (QSVM) 
            to explore high-dimensional feature spaces that are classically intractable. 
            Current experiments focus on 4-qubit circuits with amplitude encoding.
          </p>
          <div className="grid grid-cols-2 gap-12">
            {Object.entries(results).map(([name, metrics]: [string, any]) => (
              <div key={name} className="space-y-2">
                <p className="font-mono text-[10px] uppercase opacity-50">{name}</p>
                <p className="text-4xl font-bold tracking-tighter">{(metrics.accuracy * 100).toFixed(1)}%</p>
                <p className="font-mono text-[10px] opacity-50 uppercase tracking-widest">Accuracy</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-[#141414] p-8">
          <h3 className="font-serif italic text-xl mb-4">Circuit Configuration</h3>
          <div className="font-mono text-xs space-y-3 opacity-70">
            <div className="flex justify-between border-b border-[#141414]/10 pb-2">
              <span>QUBITS</span>
              <span>4</span>
            </div>
            <div className="flex justify-between border-b border-[#141414]/10 pb-2">
              <span>LAYERS</span>
              <span>2</span>
            </div>
            <div className="flex justify-between border-b border-[#141414]/10 pb-2">
              <span>ENCODING</span>
              <span>AMPLITUDE</span>
            </div>
            <div className="flex justify-between border-b border-[#141414]/10 pb-2">
              <span>OPTIMIZER</span>
              <span>ADAM</span>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#141414] p-8 flex items-center justify-center">
           <div className="text-center space-y-4">
             <div className="w-16 h-16 border-2 border-[#141414] rounded-full flex items-center justify-center mx-auto animate-spin">
               <Zap size={24} />
             </div>
             <p className="font-mono text-[10px] uppercase tracking-widest">Quantum State Ready</p>
           </div>
        </div>
      </div>

      <QuantumCircuitDiagram />

      <div className="bg-white border border-[#141414] p-8 space-y-4">
        <h3 className="font-serif italic text-xl">Data Interpretation: Quantum Advantage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs leading-relaxed text-[#141414]/70">
          <div className="space-y-2">
            <p className="text-[#141414] font-bold uppercase">Feature Mapping</p>
            <p>
              Quantum kernels map classical data into a Hilbert space of exponentially large dimensions. 
              This allows the model to identify non-linear correlations that are invisible to classical SVMs.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-[#141414] font-bold uppercase">Superposition & Entanglement</p>
            <p>
              By processing multiple market states simultaneously (superposition) and modeling complex 
              inter-stock dependencies (entanglement), QML aims to capture the "hidden" structure of market volatility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QMLResults;
