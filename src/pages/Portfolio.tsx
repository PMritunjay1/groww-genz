import { PieChart as PieIcon, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Portfolio = () => {
  // This is entirely static mock data for educational purposes.
  const mockHoldings = [
    { name: 'Nifty 50 Index Fund', value: 5000, type: 'Equity', color: '#00d09c' },
    { name: 'Liquid Debt Fund', value: 3000, type: 'Debt', color: '#6366f1' },
    { name: 'Gold ETF', value: 2000, type: 'Commodity', color: '#f59e0b' },
  ];

  const total = mockHoldings.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Mock Portfolio</h2>
        <p className="text-slate-500 mt-1">Explore what a diversified portfolio might look like.</p>
      </div>

      <div className="bg-amber-50 p-4 rounded-xl text-sm text-amber-800 border border-amber-200 flex items-start gap-3 mb-8">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          <strong>Educational Demo:</strong> This page shows hypothetical investments to demonstrate portfolio diversification. You do not own these assets, and no real money is involved.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Overview */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-2">Total Mock Value</p>
          <h3 className="text-4xl font-extrabold text-slate-900 mb-2">₹{total.toLocaleString()}</h3>
          <p className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">+₹850 (8.5%)</p>
          
          <div className="h-64 w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockHoldings}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {mockHoldings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings List */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-lg flex items-center">
            <PieIcon className="w-5 h-5 mr-2 text-slate-400" />
            Sample Holdings
          </h3>
          
          {mockHoldings.map((holding, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: holding.color }}>
                  {holding.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{holding.name}</p>
                  <p className="text-xs text-slate-500">{holding.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">₹{holding.value.toLocaleString()}</p>
                <p className="text-xs text-slate-500">{Math.round((holding.value / total) * 100)}% of total</p>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-5 border border-dashed border-slate-300 rounded-2xl text-center">
            <p className="text-sm text-slate-600">
              In a real application, you would discover and buy actual mutual funds or stocks here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
