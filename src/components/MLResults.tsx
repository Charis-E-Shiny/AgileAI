import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MLResults: React.FC = () => {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    fetch('/api/results/ml')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, []);

  if (!results) return <div className="font-mono text-xs animate-pulse">LOADING ML DATA...</div>;

  const chartData = Object.entries(results).map(([name, metrics]: [string, any]) => ({
    name,
    ...metrics
  }));

  return (
    <div className="space-y-8">
      <header>
        <h2 className="font-serif italic text-4xl text-[#141414]">Machine Learning Results</h2>
        <p className="font-mono text-xs text-[#141414]/50 uppercase tracking-widest mt-2">Classical ensemble and linear models performance</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(results).map(([name, metrics]: [string, any]) => (
          <div key={name} className="bg-white border border-[#141414] p-6 space-y-4">
            <h3 className="font-serif italic text-xl border-b border-[#141414]/10 pb-2">{name}</h3>
            <div className="space-y-2">
              {Object.entries(metrics).map(([metric, val]: [string, any]) => (
                <div key={metric} className="flex justify-between font-mono text-xs">
                  <span className="uppercase opacity-50">{metric}</span>
                  <span className="font-bold">{(val as number).toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#141414] p-8">
        <h3 className="font-serif italic text-2xl mb-8">Metrics Visualization</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E3E0" />
              <XAxis dataKey="name" tick={{ fontStyle: 'italic', fontFamily: 'serif' }} />
              <YAxis domain={[0, 1]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#141414', color: '#E4E3E0', border: 'none', fontFamily: 'monospace' }}
                itemStyle={{ color: '#E4E3E0' }}
              />
              <Legend />
              <Bar dataKey="accuracy" fill="#141414" name="Accuracy" />
              <Bar dataKey="precision" fill="#E4E3E0" stroke="#141414" name="Precision" />
              <Bar dataKey="f1" fill="#8E9299" name="F1 Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141414] text-white p-6 space-y-2">
          <h4 className="font-serif italic text-lg">Accuracy</h4>
          <p className="font-mono text-[10px] opacity-60 leading-relaxed">
            The percentage of correct predictions. In volatile markets, accuracy above 55% is considered significant.
          </p>
        </div>
        <div className="bg-[#141414] text-white p-6 space-y-2">
          <h4 className="font-serif italic text-lg">Precision</h4>
          <p className="font-mono text-[10px] opacity-60 leading-relaxed">
            Measures the quality of "Buy" signals. High precision means fewer false positives (bad trades).
          </p>
        </div>
        <div className="bg-[#141414] text-white p-6 space-y-2">
          <h4 className="font-serif italic text-lg">F1 Score</h4>
          <p className="font-mono text-[10px] opacity-60 leading-relaxed">
            The harmonic mean of precision and recall. Best for evaluating overall model robustness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLResults;
