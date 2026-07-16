import { Search } from 'lucide-react'

export default function ProviderFilters({ search, setSearch, serviceFilter, setServiceFilter, verificationFilter, setVerificationFilter }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text"
          placeholder="Search providers by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
        />
      </div>
      <div className="flex gap-4">
        <select 
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
        >
          <option value="all">All Services</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleaning">Cleaning</option>
          <option value="HVAC">HVAC</option>
        </select>
        <select 
          value={verificationFilter}
          onChange={(e) => setVerificationFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
        >
          <option value="all">All Verification</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  )
}
