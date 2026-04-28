import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertOctagon, TrendingDown, Users, ShieldCheck } from 'lucide-react';

const mockTrendData = [
  { time: '18:00', incidents: 2, resolved: 2 },
  { time: '19:00', incidents: 4, resolved: 3 },
  { time: '20:00', incidents: 7, resolved: 5 },
  { time: '21:00', incidents: 12, resolved: 8 },
  { time: '22:00', incidents: 15, resolved: 10 },
  { time: '23:00', incidents: 8, resolved: 12 },
];

function StatCard({ title, value, icon: Icon, trend, positive }) {
  return (
    <div className="glass-panel p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon className="w-16 h-16" />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${positive ? 'bg-green-500/20 text-green-400' : 'bg-primary-500/20 text-primary-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-slate-400 font-medium">{title}</h3>
      </div>
      <div className="flex items-end gap-3">
        <h2 className="text-3xl font-bold text-white">{value}</h2>
        <span className={`text-sm font-medium mb-1 ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="h-full w-full bg-dark-900 overflow-y-auto p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8 pb-24">
        
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Authority Dashboard</h1>
          <p className="text-slate-400">City-wide safety analytics and predictive trends.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active SOS Alerts" value="3" icon={AlertOctagon} trend="+2 vs yesterday" positive={false} />
          <StatCard title="Safe Zones Added" value="24" icon={ShieldCheck} trend="+12% this week" positive={true} />
          <StatCard title="High Risk Areas" value="8" icon={TrendingDown} trend="-2 since last month" positive={true} />
          <StatCard title="Active Users" value="1.2k" icon={Users} trend="+5% this week" positive={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-white mb-6">Incident vs Resolution Timeline</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#f1f5f9' }}
                  />
                  <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-white mb-6">Reports by Category</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Poor Lighting', count: 45 },
                  { name: 'Harassment', count: 20 },
                  { name: 'Suspicious Activity', count: 35 },
                  { name: 'Unsafe Path', count: 15 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    cursor={{ fill: '#334155', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;
