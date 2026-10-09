import { useState, useMemo } from 'react';
import { useUser } from '../store/UserContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

const Simulator = () => {
  const { calculateAvailableAmount } = useUser();
  const available = calculateAvailableAmount();
  const initialAmount = Math.max(500, Math.min(20000, available > 0 ? Math.floor(available / 500) * 500 : 1000));
  const [amount, setAmount] = useState(initialAmount);
  const [years, setYears] = useState(5);
  const [returnRate, setReturnRate] = useState(8); // Illustrative conservative return

  const data = useMemo(() => {
    const chartData = [];
    let currentInvested = 0;
    let currentValue = 0;
    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;

    for (let i = 1; i <= months; i++) {
      currentInvested += amount;
      currentValue = (currentValue + amount) * (1 + monthlyRate);
      
      if (i % 12 === 0) { // Add yearly data points
        chartData.push({
          year: `Year ${i / 12}`,
          invested: Math.round(currentInvested),
          value: Math.round(currentValue),
        });
      }
    }
    return chartData;
  }, [amount, years, returnRate]);

  const totalInvested = amount * years * 12;
  const estimatedValue = data.length > 0 ? data[data.length - 1].value : 0;
  const estGrowth = estimatedValue - totalInvested;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">SIP Learning Simulator</h2>
        <p className="text-slate-500 mt-1">See how small, regular investments can grow over time.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Monthly Investment</span>
              <span className="text-primary font-bold">₹{amount.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="500"
              max="20000"
              step="500"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>₹500</span>
              <span>₹20,000</span>
            </div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Time Period</span>
              <span className="text-primary font-bold">{years} Years</span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 Yr</span>
              <span>30 Yrs</span>
            </div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Illustrative Annual Return</span>
              <span className="text-primary font-bold">{returnRate}%</span>
            </label>
            <input
              type="range"
              min="4"
              max="15"
              step="1"
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>4% (Conservative)</span>
              <span>15% (Aggressive)</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 border border-slate-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              Returns are strictly hypothetical. Actual market returns fluctuate, and losses are possible. The calculation assumes monthly compounding.
            </p>
          </div>
        </div>

        {/* Chart & Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Total Invested</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹{totalInvested.toLocaleString()}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Est. Growth</p>
              <p className="text-2xl font-bold text-primary mt-1">+₹{estGrowth.toLocaleString()}</p>
            </div>
            <div className="bg-primary p-5 rounded-2xl shadow-sm text-white">
              <p className="text-xs text-primary-100 uppercase tracking-wider font-medium">Est. Total Value</p>
              <p className="text-2xl font-bold mt-1">₹{estimatedValue.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Growth Over Time</h3>
              <p className="text-xs text-slate-500 mt-1 sm:mt-0">
                Assuming <span className="font-semibold">{returnRate}%</span> annual return over <span className="font-semibold">{years} years</span>
              </p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d09c" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d09c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis 
                    tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorInvested)" />
                  <Area type="monotone" dataKey="value" name="Est. Value" stroke="#00d09c" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Simulator;
