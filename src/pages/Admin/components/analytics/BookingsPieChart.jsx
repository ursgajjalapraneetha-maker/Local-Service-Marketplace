import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Completed', value: 65 },
  { name: 'Pending', value: 20 },
  { name: 'Confirmed', value: 10 },
  { name: 'Cancelled', value: 5 },
]

const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444']

export default function BookingsPieChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-96 flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Booking Status Distribution</h3>
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value}%`, 'Share']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: '#6B7280' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
