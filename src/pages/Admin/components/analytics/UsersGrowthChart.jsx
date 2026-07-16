import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', users: 120, providers: 15 },
  { name: 'Tue', users: 150, providers: 20 },
  { name: 'Wed', users: 180, providers: 25 },
  { name: 'Thu', users: 130, providers: 10 },
  { name: 'Fri', users: 200, providers: 30 },
  { name: 'Sat', users: 250, providers: 40 },
  { name: 'Sun', users: 220, providers: 35 },
]

export default function UsersGrowthChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-96 flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-6">User vs Provider Growth (Weekly)</h3>
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
            <Tooltip 
              cursor={{fill: '#F9FAFB'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="users" name="New Users" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="providers" name="New Providers" fill="#F97316" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
