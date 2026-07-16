import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Star,
  Clock,
  MapPin,
  Users,
  IndianRupee,
  CalendarRange,
  BarChart3,
  Wrench,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { providerServices } from '../data/servicesData'
import ServiceStatusBadge from './components/ServiceStatusBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import { cn, formatCurrency, formatDate } from '../../../utils'

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-gray-500" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-secondary">{value}</p>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-50">
      <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', color)}>
        <Icon size={18} aria-hidden="true" />
      </div>
      <div>
        <p className="text-xl font-heading font-bold text-secondary">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  )
}

export default function ServiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = providerServices.find((s) => s.id === id)
      setService(found || null)
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [id])

  const handleDelete = useCallback(() => {
    toast.success(`"${service.name}" deleted successfully`)
    navigate('/provider-dashboard/services')
  }, [service, navigate])

  const handleToggleStatus = useCallback(() => {
    const newStatus = service.status === 'active' ? 'inactive' : 'active'
    setService((prev) => ({ ...prev, status: newStatus }))
    toast.success(`Service ${newStatus === 'active' ? 'activated' : 'deactivated'}`)
  }, [service])

  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner fullScreen={false} text="Loading service details..." />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
          <Wrench size={28} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-secondary mb-1">Service Not Found</h3>
        <p className="text-sm text-gray-500 mb-6">The service you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/provider-dashboard/services')}
          className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all"
        >
          Back to Services
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button
        onClick={() => navigate('/provider-dashboard/services')}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
      >
        <ArrowLeft size={16} />
        Back to Services
      </button>

      <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Wrench size={24} className="text-primary" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl lg:text-2xl font-heading font-bold text-secondary">{service.name}</h1>
                <ServiceStatusBadge status={service.status} />
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{service.category} &middot; Created {formatDate(service.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleStatus}
              className={cn(
                'px-4 py-2 text-sm font-semibold rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                service.status === 'active'
                  ? 'border-gray-200 text-gray-600 hover:border-gray-300'
                  : 'border-green-200 text-green-700 bg-green-50 hover:bg-green-100'
              )}
            >
              {service.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
            <button
              onClick={() => navigate(`/provider-dashboard/services/${service.id}/edit`)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <Pencil size={15} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-xl text-gray-400 hover:text-danger hover:bg-red-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
              aria-label="Delete service"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {service.images?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden bg-gray-50 mb-3">
                <img
                  src={service.images[activeImage]}
                  alt={`${service.name} - Image ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {service.images.length > 1 && (
                <div className="flex gap-2">
                  {service.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        'w-16 h-16 rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
                        activeImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      )}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-base font-heading font-semibold text-secondary mb-3">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              icon={BarChart3}
              label="Total Bookings"
              value={service.totalBookings}
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              icon={IndianRupee}
              label="Revenue Generated"
              value={formatCurrency(service.totalRevenue)}
              color="bg-green-50 text-green-600"
            />
            <StatCard
              icon={Star}
              label="Customer Rating"
              value={service.rating}
              color="bg-amber-50 text-amber-600"
            />
            <StatCard
              icon={Users}
              label="Total Reviews"
              value={service.reviews}
              color="bg-purple-50 text-purple-600"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-heading font-semibold text-secondary mb-1">Service Details</h2>
            <p className="text-xs text-gray-400 mb-3">Information about this service</p>
            <div className="divide-y divide-gray-50">
              <DetailRow icon={IndianRupee} label="Pricing" value={
                service.pricingType === 'custom'
                  ? 'Custom Quote'
                  : `${formatCurrency(service.discountPrice || service.price)}${service.pricingType === 'hourly' ? '/hr' : ''}${service.discountPrice ? ` (was ${formatCurrency(service.price)})` : ''}`
              } />
              <DetailRow icon={Clock} label="Duration" value={service.duration} />
              <DetailRow icon={MapPin} label="Service Area" value={service.serviceArea} />
              <DetailRow icon={CalendarRange} label="Experience" value={service.experience} />
              <DetailRow icon={Wrench} label="Category" value={service.category} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-heading font-semibold text-secondary mb-1">Availability</h2>
            <p className="text-xs text-gray-400 mb-3">Working days and hours</p>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                  const working = service.workingDays?.includes(day)
                  return (
                    <span
                      key={day}
                      className={cn(
                        'w-8 h-8 flex items-center justify-center text-xs font-semibold rounded-lg border transition-colors',
                        working
                          ? 'bg-primary text-white border-primary'
                          : 'bg-gray-50 text-gray-300 border-gray-100'
                      )}
                    >
                      {day.charAt(0)}
                    </span>
                  )
                })}
              </div>
              {service.workingHours && (
                <p className="text-sm text-secondary font-medium flex items-center gap-1.5 pt-2">
                  <Clock size={14} className="text-gray-400" aria-hidden="true" />
                  {service.workingHours.start} - {service.workingHours.end}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-sm font-heading font-semibold text-secondary mb-1">Quick Actions</h2>
            <p className="text-xs text-gray-400 mb-3">Manage this service</p>
            <div className="space-y-2">
              <button
                onClick={() => navigate(`/provider-dashboard/services/${service.id}/edit`)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <Pencil size={15} />
                Edit Service
              </button>
              <button
                onClick={handleToggleStatus}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {service.status === 'active' ? 'Deactivate Service' : 'Activate Service'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
