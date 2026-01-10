
import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Award, Zap, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { gemini } from '../services/geminiService';
import { MetaData } from '../types';

const StrategyHub: React.FC = () => {
  const [query, setQuery] = useState('Elden Ring');
  const [data, setData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMeta = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await gemini.getCompetitiveMeta(query);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeta();
  }, []);

  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchMeta()}
            placeholder="Search game meta (e.g. Valorant, LoL, Chess)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
        <button
          onClick={fetchMeta}
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
          Analyze Meta
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400 animate-pulse" />
          </div>
          <p className="text-slate-400 font-medium animate-pulse">Scanning competitive data nodes...</p>
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {/* Win Rate Chart */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-indigo-400 w-5 h-5" />
              Usage & Win Efficiency
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.winRates}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {data.winRates.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tier List */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Award className="text-yellow-400 w-5 h-5" />
              Pro Tier Analysis
            </h4>
            <div className="space-y-4">
              {data.tierList.map((tier, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800/50 hover:border-indigo-500/30 transition-all">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0 ${
                    tier.rank === 'S' ? 'bg-rose-500/20 text-rose-400' :
                    tier.rank === 'A' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-indigo-500/20 text-indigo-400'
                  }`}>
                    {tier.rank}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-100">{tier.character}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{tier.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-900/20 rounded-2xl border border-dashed border-slate-800">
          <TrendingUp className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-500 italic">Enter a game name to visualize competitive meta trends.</p>
        </div>
      )}
    </div>
  );
};

export default StrategyHub;
