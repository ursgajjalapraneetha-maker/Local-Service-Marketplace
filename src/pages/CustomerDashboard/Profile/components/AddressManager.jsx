import { memo, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import AddressCard from './AddressCard'
import RegisterInput from '../../../../components/auth/RegisterInput'

function AddressForm({ address, onSave, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: address || {
      label: '',
      street: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
    },
  })

  const onSubmit = useCallback(
    (data) => {
      onSave({ ...address, ...data })
      toast.success(address ? 'Address updated' : 'Address added')
    },
    [address, onSave],
  )

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RegisterInput
            label="Label"
            name="label"
            type="text"
            placeholder="e.g. Home, Work"
            register={register}
            error={errors.label?.message}
            validation={{ required: 'Label is required' }}
          />
          <RegisterInput
            label="Street Address"
            name="street"
            type="text"
            placeholder="123 Main St"
            register={register}
            error={errors.street?.message}
            validation={{ required: 'Street is required' }}
          />
          <RegisterInput
            label="Apt / Suite (optional)"
            name="apt"
            type="text"
            placeholder="Apt 4B"
            register={register}
            error={errors.apt?.message}
          />
          <RegisterInput
            label="City"
            name="city"
            type="text"
            placeholder="New York"
            register={register}
            error={errors.city?.message}
            validation={{ required: 'City is required' }}
          />
          <RegisterInput
            label="State"
            name="state"
            type="text"
            placeholder="NY"
            register={register}
            error={errors.state?.message}
            validation={{ required: 'State is required' }}
          />
          <RegisterInput
            label="ZIP Code"
            name="zip"
            type="text"
            placeholder="10001"
            register={register}
            error={errors.zip?.message}
            validation={{
              required: 'ZIP code is required',
              pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Invalid ZIP code' },
            }}
          />
        </div>
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 text-xs font-semibold text-secondary bg-white rounded-xl hover:bg-gray-100 transition-all border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-dark transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            {address ? 'Update' : 'Add'} Address
          </button>
        </div>
      </form>
    </motion.div>
  )
}

function AddressManager({ addresses, onAddressesChange }) {
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const handleSave = useCallback(
    (address) => {
      const updated = editingAddress
        ? addresses.map((a) => (a.id === editingAddress.id ? address : a))
        : [...addresses, { ...address, id: Date.now(), isDefault: addresses.length === 0 }]
      onAddressesChange(updated)
      setShowForm(false)
      setEditingAddress(null)
    },
    [addresses, editingAddress, onAddressesChange],
  )

  const handleDelete = useCallback(
    (id) => {
      const updated = addresses.filter((a) => a.id !== id)
      if (updated.length > 0 && addresses.find((a) => a.id === id)?.isDefault) {
        updated[0].isDefault = true
      }
      onAddressesChange(updated)
      toast.success('Address removed')
    },
    [addresses, onAddressesChange],
  )

  const handleSetDefault = useCallback(
    (id) => {
      onAddressesChange(addresses.map((a) => ({ ...a, isDefault: a.id === id })))
      toast.success('Default address updated')
    },
    [addresses, onAddressesChange],
  )

  const handleEdit = useCallback((address) => {
    setEditingAddress(address)
    setShowForm(true)
  }, [])

  const handleCancel = useCallback(() => {
    setShowForm(false)
    setEditingAddress(null)
  }, [])

  const handleAddNew = useCallback(() => {
    setEditingAddress(null)
    setShowForm(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-primary" aria-hidden="true" />
          <h2 className="text-base font-heading font-semibold text-secondary">Saved Addresses</h2>
        </div>
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-xl hover:bg-primary/20 transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <Plus size={14} />
            <span>Add New</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {showForm && (
          <div className="mb-4">
            <AddressForm
              key={editingAddress?.id || 'new'}
              address={editingAddress}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {addresses.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400 text-center py-8"
            >
              No addresses saved yet. Add one to get started.
            </motion.p>
          ) : (
            addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default memo(AddressManager)
