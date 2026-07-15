import {
  Zap, Droplets, Hammer, PaintBucket, SprayCan, Sparkles, Snowflake, BookOpen,
} from 'lucide-react'

export const popularSearches = [
  { name: 'Electrician', icon: Zap },
  { name: 'Plumber', icon: Droplets },
  { name: 'Cleaning', icon: SprayCan },
  { name: 'Salon', icon: Sparkles },
  { name: 'AC Repair', icon: Snowflake },
  { name: 'Tutor', icon: BookOpen },
  { name: 'Painter', icon: PaintBucket },
  { name: 'Mechanic', icon: Hammer },
]

export const heroStats = [
  { count: '10,000+', label: 'Verified Professionals', icon: 'Shield' },
  { count: '50,000+', label: 'Happy Customers', icon: 'Users' },
  { count: '100,000+', label: 'Bookings Completed', icon: 'CheckCircle' },
]

export const floatingCards = [
  {
    type: 'booking',
    x: '5%',
    y: '8%',
    title: 'Full Home Cleaning',
    price: '₹2,499',
    status: 'Confirmed',
    delay: 0.3,
  },
  {
    type: 'rating',
    x: '70%',
    y: '5%',
    rating: 4.8,
    label: 'Avg Rating',
    stars: 5,
    delay: 0.6,
  },
  {
    type: 'professional',
    x: '72%',
    y: '72%',
    count: '10K+',
    label: 'Professionals',
    delay: 0.9,
  },
  {
    type: 'service',
    x: '3%',
    y: '75%',
    title: 'AC Service',
    time: 'Today, 4:00 PM',
    technician: 'Rajesh',
    delay: 0.5,
  },
]

export const locations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow',
]
