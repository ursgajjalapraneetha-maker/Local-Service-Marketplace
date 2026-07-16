import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  workingHours as whData,
  timeSlots as tsData,
  bookingLimits as blData,
  holidays as holData,
  leaves as lvData,
} from '../data/scheduleData'
import WorkingHours from './components/WorkingHours'
import TimeSlotPicker from './components/TimeSlotPicker'
import HolidayManager from './components/HolidayManager'
import LeaveManager from './components/LeaveManager'
import ScheduleCard from './components/ScheduleCard'

export default function AvailabilitySettings() {
  const [workingHours, setWorkingHours] = useState(whData)
  const [timeSlots, setTimeSlots] = useState(tsData)
  const [bookingLimits, setBookingLimits] = useState(blData)
  const [holidays, setHolidays] = useState(holData)
  const [leaves, setLeaves] = useState(lvData)

  const handleWorkingHoursSave = useCallback((updated) => {
    setWorkingHours(updated)
  }, [])

  const handleSlotUpdate = useCallback(({ timeSlots: ts, bookingLimits: bl }) => {
    setTimeSlots(ts)
    setBookingLimits(bl)
  }, [])

  const handleHolidayAdd = useCallback((holiday) => {
    setHolidays((prev) => [...prev, holiday])
  }, [])

  const handleHolidayRemove = useCallback((id) => {
    setHolidays((prev) => prev.filter((h) => h.id !== id))
  }, [])

  const handleLeaveAdd = useCallback((leave) => {
    setLeaves((prev) => [leave, ...prev])
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduleCard>
          <WorkingHours workingHours={workingHours} onSave={handleWorkingHoursSave} />
        </ScheduleCard>

        <ScheduleCard>
          <TimeSlotPicker
            timeSlots={timeSlots}
            bookingLimits={bookingLimits}
            onUpdate={handleSlotUpdate}
          />
        </ScheduleCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScheduleCard>
          <HolidayManager
            holidays={holidays}
            onAdd={handleHolidayAdd}
            onRemove={handleHolidayRemove}
          />
        </ScheduleCard>

        <ScheduleCard>
          <LeaveManager leaves={leaves} onAdd={handleLeaveAdd} />
        </ScheduleCard>
      </div>

      <ScheduleCard>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-heading font-semibold text-secondary">Booking Limits Summary</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Maximum {bookingLimits.maxPerDay} bookings per day &middot; {bookingLimits.minNoticePeriod} min notice &middot; bookable {bookingLimits.advanceBookingDays} days ahead
            </p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 rounded-xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-heading font-bold text-primary">{timeSlots.duration}</span>
            <span className="text-[9px] text-primary font-medium -mt-0.5">min slots</span>
          </motion.div>
        </div>
      </ScheduleCard>
    </motion.div>
  )
}
