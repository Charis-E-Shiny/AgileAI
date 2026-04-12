import React, { useEffect, useState } from 'react';

const ResultsComparison: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ml, dl, qml] = await Promise.all([
          fetch('/api/results/ml').then(res => res.json()),
          fetch('/api/results/dl').then(res => res.json()),
          fetch('/api/results/qml').then(res => res.json())
        ]);

        const combined = [
          ...Object.entries(ml).map(([name, m]: [string, any]) => ({ name, type: 'ML', accuracy: m.accuracy, precision: m.precision || '-', f1: m.f1 || '-' })),
          ...Object.entries(dl).map(([name, m]: [string, any]) => ({ name, type: 'DL', accuracy: m.accuracy, precision: '-', f1: '-' })),
          ...Object.entries(qml).map(([name, m]: [string, any]) => ({ name, type: 'QML', accuracy: m.accuracy, precision: '-', f1: '-' }))
        ];
        
        setData(combined.sort((a, b) => b.accuracy - a.accuracy));
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="bg-white border border-[#141414] p-8 space-y-6">
      <h3 className="font-serif italic text-2xl">Global Performance Leaderboard</h3>
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-[#141414] uppercase opacity-50">
              <th className="py-4 px-2">Rank</th>
              <th className="py-4 px-2">Model Name</th>
              <th className="py-4 px-2">Type</th>
              <th className="py-4 px-2">Accuracy</th>
              <th className="py-4 px-2">Precision</th>
              <th className="py-4 px-2">F1 Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-[#141414]/10 hover:bg-[#141414] hover:text-white transition-colors group">
                <td className="py-4 px-2 opacity-50 group-hover:opacity-100">{i + 1}</td>
                <td className="py-4 px-2 font-bold">{row.name}</td>
                <td className="py-4 px-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] border ${
                    row.type === 'ML' ? 'border-blue-500 text-blue-500' : 
                    row.type === 'DL' ? 'border-purple-500 text-purple-500' : 
                    'border-orange-500 text-orange-500'
                  } group-hover:bg-white`}>
                    {row.type}
                  </span>
                </td>
                <td className="py-4 px-2">{(row.accuracy * 100).toFixed(2)}%</td>
                <td className="py-4 px-2">{typeof row.precision === 'number' ? row.precision.toFixed(4) : row.precision}</td>
                <td className="py-4 px-2">{typeof row.f1 === 'number' ? row.f1.toFixed(4) : row.f1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsComparison;
