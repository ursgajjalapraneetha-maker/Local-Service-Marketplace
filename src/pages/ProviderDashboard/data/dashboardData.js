export const providerStats = {
  totalEarnings: 48500,
  earningsGrowth: 12.5,
  totalBookings: 48,
  completedBookings: 36,
  pendingRequests: 8,
  averageRating: 4.8,
  totalReviews: 124,
}

export const weeklyEarnings = [
  { day: 'Mon', amount: 3200 },
  { day: 'Tue', amount: 4500 },
  { day: 'Wed', amount: 2800 },
  { day: 'Thu', amount: 5100 },
  { day: 'Fri', amount: 3900 },
  { day: 'Sat', amount: 6200 },
  { day: 'Sun', amount: 2400 },
]

export const monthlyEarnings = [
  { month: 'Jan', amount: 28500 },
  { month: 'Feb', amount: 32000 },
  { month: 'Mar', amount: 27800 },
  { month: 'Apr', amount: 41000 },
  { month: 'May', amount: 36500 },
  { month: 'Jun', amount: 48500 },
]

export const bookingOverview = {
  today: 3,
  upcoming: 12,
  completed: 156,
  cancelled: 8,
}

export const upcomingBookings = [
  {
    id: 'BKG-001',
    customer: 'Priya Singh',
    service: 'Home Deep Cleaning',
    date: '2026-07-16',
    time: '10:00 AM',
    location: 'Andheri West, Mumbai',
    status: 'confirmed',
  },
  {
    id: 'BKG-002',
    customer: 'Rahul Verma',
    service: 'AC Repair & Service',
    date: '2026-07-16',
    time: '2:00 PM',
    location: 'Bandra East, Mumbai',
    status: 'pending',
  },
  {
    id: 'BKG-003',
    customer: 'Ananya Patel',
    service: 'Office Deep Cleaning',
    date: '2026-07-17',
    time: '9:00 AM',
    location: 'Powai, Mumbai',
    status: 'confirmed',
  },
  {
    id: 'BKG-004',
    customer: 'Vikram Joshi',
    service: 'Electrical Wiring',
    date: '2026-07-18',
    time: '3:00 PM',
    location: 'Malad West, Mumbai',
    status: 'completed',
  },
  {
    id: 'BKG-005',
    customer: 'Neha Gupta',
    service: 'Interior Painting',
    date: '2026-07-20',
    time: '8:00 AM',
    location: 'Juhu, Mumbai',
    status: 'pending',
  },
]

export const recentActivities = [
  {
    type: 'booking',
    title: 'New Booking Received',
    description: 'AC Repair service booked by Rahul Verma for Jul 16 at 2:00 PM',
    time: '10 minutes ago',
  },
  {
    type: 'payment',
    title: 'Payment Completed',
    description: '₹2,499 received for Home Deep Cleaning from Priya Singh',
    time: '1 hour ago',
  },
  {
    type: 'review',
    title: 'New Review Added',
    description: 'Sneha Reddy rated your Home Deep Cleaning service 5 stars',
    time: '2 hours ago',
  },
  {
    type: 'service',
    title: 'Service Updated',
    description: 'Your "Bathroom Deep Clean" service has been updated with new pricing',
    time: '1 day ago',
  },
  {
    type: 'booking',
    title: 'Service Completed',
    description: 'Electrical Wiring for Vikram Joshi marked as completed',
    time: '2 days ago',
  },
  {
    type: 'review',
    title: 'Review Received',
    description: 'Arjun Mehta rated your AC Repair service 4 stars',
    time: '3 days ago',
  },
]

export const ratingDistribution = [
  { stars: 5, count: 82 },
  { stars: 4, count: 28 },
  { stars: 3, count: 10 },
  { stars: 2, count: 3 },
  { stars: 1, count: 1 },
]

export const availabilityData = {
  status: 'available',
  workingHours: {
    weekday: '9:00 AM - 7:00 PM',
    weekend: '10:00 AM - 4:00 PM',
  },
  nextAvailable: 'Today at 2:00 PM',
}
