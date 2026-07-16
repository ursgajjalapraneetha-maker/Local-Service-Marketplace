export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back to the admin control panel.</p>
      </div>
      
      {/* Placeholder content to show layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-16 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
      
      <div className="h-96 bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex items-center justify-center text-gray-400">
        Dashboard Content Area
      </div>
    </div>
  )
}
