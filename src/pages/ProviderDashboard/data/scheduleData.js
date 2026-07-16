const DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const availability = {
  isAvailable: true,
  status: 'available',
}

const workingHours = [
  { day: 0, label: 'Sunday', enabled: false, slots: [] },
  { day: 1, label: 'Monday', enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }] },
  { day: 2, label: 'Tuesday', enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }] },
  { day: 3, label: 'Wednesday', enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }] },
  { day: 4, label: 'Thursday', enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }] },
  { day: 5, label: 'Friday', enabled: true, slots: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }] },
  { day: 6, label: 'Saturday', enabled: true, slots: [{ start: '10:00', end: '14:00' }] },
]

const timeSlots = {
  duration: 60,
  bufferTime: 15,
  availableIntervals: ['30', '60', '90', '120'],
}

const bookingLimits = {
  maxPerDay: 6,
  minNoticePeriod: 120,
  advanceBookingDays: 30,
}

const holidays = [
  { id: 'hol-1', name: 'Independence Day', date: '2026-08-15', reason: 'National holiday' },
  { id: 'hol-2', name: 'Diwali', date: '2026-10-31', reason: 'Festival' },
]

const leaves = [
  { id: 'lv-1', startDate: '2026-07-20', endDate: '2026-07-22', reason: 'Personal time off', type: 'full', status: 'approved' },
  { id: 'lv-2', startDate: '2026-08-05', endDate: '2026-08-05', reason: 'Doctor appointment', type: 'full', status: 'approved' },
  { id: 'lv-3', startDate: '2026-07-28', endDate: '2026-07-28', reason: 'Family event', type: 'full', status: 'pending' },
  { id: 'lv-4', startDate: '2026-07-25', endDate: '2026-07-25', reason: 'Half day - personal', type: 'half', status: 'approved' },
]

const calendarBookings = [
  { id: 'bk-1', date: '2026-07-17', start: '09:00', end: '11:00', service: 'Deep Cleaning', customer: 'Rahul Sharma', customerAvatar: null, status: 'confirmed', amount: 2499 },
  { id: 'bk-2', date: '2026-07-17', start: '14:00', end: '16:00', service: 'Bathroom Renovation', customer: 'Anita Desai', customerAvatar: null, status: 'confirmed', amount: 15999 },
  { id: 'bk-3', date: '2026-07-18', start: '09:00', end: '10:30', service: 'Plumbing Repair', customer: 'Vikram Patel', customerAvatar: null, status: 'confirmed', amount: 899 },
  { id: 'bk-4', date: '2026-07-18', start: '11:00', end: '13:00', service: 'Electrical Wiring', customer: 'Priya Singh', customerAvatar: null, status: 'confirmed', amount: 3499 },
  { id: 'bk-5', date: '2026-07-19', start: '10:00', end: '12:00', service: 'Deep Cleaning', customer: 'Amit Verma', customerAvatar: null, status: 'confirmed', amount: 2499 },
  { id: 'bk-6', date: '2026-07-19', start: '15:00', end: '17:00', service: 'Kitchen Repair', customer: 'Neha Gupta', customerAvatar: null, status: 'pending', amount: 1299 },
  { id: 'bk-7', date: '2026-07-20', start: '09:00', end: '11:00', service: 'Plumbing Repair', customer: 'Deepak Kumar', customerAvatar: null, status: 'confirmed', amount: 899 },
  { id: 'bk-8', date: '2026-07-20', start: '12:00', end: '14:00', service: 'AC Service', customer: 'Sneha Reddy', customerAvatar: null, status: 'confirmed', amount: 1999 },
  { id: 'bk-9', date: '2026-07-21', start: '09:00', end: '11:30', service: 'Deep Cleaning', customer: 'Rohit Mehta', customerAvatar: null, status: 'confirmed', amount: 2499 },
  { id: 'bk-10', date: '2026-07-21', start: '14:00', end: '16:00', service: 'Bathroom Renovation', customer: 'Sonia Kapoor', customerAvatar: null, status: 'confirmed', amount: 15999 },
  { id: 'bk-11', date: '2026-07-22', start: '08:00', end: '10:00', service: 'Plumbing Repair', customer: 'Arun Joshi', customerAvatar: null, status: 'confirmed', amount: 899 },
  { id: 'bk-12', date: '2026-07-22', start: '11:00', end: '12:00', service: 'AC Service', customer: 'Kavita Nair', customerAvatar: null, status: 'confirmed', amount: 1999 },
  { id: 'bk-13', date: '2026-07-23', start: '09:00', end: '13:00', service: 'Kitchen Repair', customer: 'Manoj Tiwari', customerAvatar: null, status: 'pending', amount: 1299 },
]

const scheduleSummary = {
  totalBookings: 13,
  confirmed: 11,
  pending: 2,
  completedThisWeek: 4,
  upcomingThisWeek: 8,
}

export {
  DAY_LABELS,
  availability,
  workingHours,
  timeSlots,
  bookingLimits,
  holidays,
  leaves,
  calendarBookings,
  scheduleSummary,
}
