export const DEFAULT_PROFILE = {
  id: 1,
  name: 'Syed Rizvi',
  email: 'syed.rizvi@example.com',
  phone: '+1 (555) 123-4567',
  avatar: null,
  memberSince: '2024-03-15',
}

export const DEFAULT_ADDRESSES = [
  {
    id: 1,
    label: 'Home',
    street: '123 Main Street',
    apt: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Work',
    street: '456 Business Ave',
    apt: '',
    city: 'New York',
    state: 'NY',
    zip: '10002',
    isDefault: false,
  },
]

export const DEFAULT_PREFERENCES = {
  email: {
    marketing: false,
    reminders: true,
    updates: true,
    newsletter: false,
  },
  push: {
    messages: true,
    bookings: true,
    promotions: false,
    reminders: true,
  },
  privacy: {
    showProfile: true,
    showBookings: false,
    showReviews: true,
    activityStatus: true,
  },
  appearance: {
    theme: 'light',
    fontSize: 'medium',
    reducedMotion: false,
  },
}
