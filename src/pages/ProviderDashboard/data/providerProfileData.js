const personalInfo = {
  fullName: 'Arun Kumar',
  email: 'arun.kumar@example.com',
  phone: '+91 98765 43210',
  address: '123, MG Road, Indiranagar, Bengaluru, Karnataka 560038',
  avatar: null,
  bio: 'Professional home services provider with over 8 years of experience in plumbing, electrical work, and home renovations. Certified and fully insured.',
  experience: 8,
  skills: ['Plumbing', 'Electrical', 'Renovation', 'Painting', 'Carpentry'],
  certifications: ['Certified Plumber - Govt of India', 'Electrical Safety Certification', 'First Aid Certified'],
  languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
}

const businessInfo = {
  businessName: 'Arun Home Services',
  category: 'Home Maintenance & Repairs',
  description: 'We provide top-quality home maintenance and repair services including plumbing, electrical work, renovations, and painting. Our team of certified professionals ensures timely and reliable service.',
  registrationNumber: 'GST-29AABCU1234D1Z5',
  yearsInBusiness: 8,
  teamSize: 12,
  website: 'https://arunhomeservices.in',
}

const serviceArea = {
  cities: ['Bengaluru', 'Whitefield', 'Electronic City', 'Koramangala', 'HSR Layout', 'JP Nagar'],
  radius: 25,
  pincodes: ['560001', '560038', '560066', '560068', '560100', '560102', '560103'],
  coordinates: { lat: 12.9716, lng: 77.5946 },
}

const verification = {
  status: 'verified',
  kycStatus: 'verified',
  documents: [
    { id: 'doc-1', name: 'Aadhaar Card', type: 'identity', status: 'verified', uploadedAt: '2026-01-15' },
    { id: 'doc-2', name: 'PAN Card', type: 'identity', status: 'verified', uploadedAt: '2026-01-15' },
    { id: 'doc-3', name: 'Business Registration', type: 'business', status: 'verified', uploadedAt: '2026-02-01' },
    { id: 'doc-4', name: 'Certificate of Insurance', type: 'certificate', status: 'pending', uploadedAt: '2026-06-20' },
  ],
  verifiedAt: '2026-02-15',
}

const bankDetails = {
  accountHolderName: 'Arun Kumar',
  bankName: 'State Bank of India',
  accountNumber: 'XXXXXXXX3210',
  ifscCode: 'SBIN0001234',
  upiId: 'arun.kumar@upi',
  paymentMethods: ['Bank Transfer', 'UPI'],
}

const preferences = {
  language: 'English',
  theme: 'system',
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  marketingEmails: false,
  weeklyDigest: true,
  bookingReminders: true,
  paymentAlerts: true,
}

const security = {
  twoFactorEnabled: false,
  lastLogin: '2026-07-16T08:30:00',
  lastPasswordChange: '2026-03-10',
  loginHistory: [
    { date: '2026-07-16T08:30:00', device: 'Chrome on Windows', ip: '192.168.1.100', location: 'Bengaluru, India' },
    { date: '2026-07-15T19:15:00', device: 'Safari on iPhone', ip: '192.168.1.101', location: 'Bengaluru, India' },
    { date: '2026-07-14T09:00:00', device: 'Chrome on Windows', ip: '192.168.1.100', location: 'Bengaluru, India' },
  ],
}

const stats = {
  rating: 4.8,
  reviewCount: 127,
  completedServices: 843,
  activeListings: 6,
  responseRate: 98,
  responseTime: '< 30 min',
  memberSince: '2024-01',
  totalEarnings: 584000,
}

export {
  personalInfo,
  businessInfo,
  serviceArea,
  verification,
  bankDetails,
  preferences,
  security,
  stats,
}
