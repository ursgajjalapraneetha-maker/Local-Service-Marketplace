export default function StatCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trendUp ? '+' : '-'}{trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  )
}
