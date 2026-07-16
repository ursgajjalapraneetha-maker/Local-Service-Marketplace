const conversations = [
  {
    id: 'conv-1',
    customer: { id: 'cust-1', name: 'Rahul Sharma', avatar: null, isOnline: true },
    service: 'Deep Cleaning',
    bookingRef: 'BK-2024-0042',
    lastMessage: { text: 'Perfect! See you tomorrow at 9 AM.', timestamp: '2026-07-16T10:30:00', sender: 'provider' },
    unreadCount: 0,
    status: 'active',
  },
  {
    id: 'conv-2',
    customer: { id: 'cust-2', name: 'Anita Desai', avatar: null, isOnline: false },
    service: 'Bathroom Renovation',
    bookingRef: 'BK-2024-0043',
    lastMessage: { text: 'Could you bring the tile samples you mentioned?', timestamp: '2026-07-16T09:15:00', sender: 'customer' },
    unreadCount: 2,
    status: 'active',
  },
  {
    id: 'conv-3',
    customer: { id: 'cust-3', name: 'Vikram Patel', avatar: null, isOnline: true },
    service: 'Plumbing Repair',
    bookingRef: 'BK-2024-0044',
    lastMessage: { text: 'The pipe has been replaced successfully.', timestamp: '2026-07-15T16:45:00', sender: 'provider' },
    unreadCount: 0,
    status: 'completed',
  },
  {
    id: 'conv-4',
    customer: { id: 'cust-4', name: 'Priya Singh', avatar: null, isOnline: false },
    service: 'Electrical Wiring',
    bookingRef: 'BK-2024-0045',
    lastMessage: { text: 'Thanks for the quick service!', timestamp: '2026-07-15T14:20:00', sender: 'customer' },
    unreadCount: 1,
    status: 'active',
  },
  {
    id: 'conv-5',
    customer: { id: 'cust-5', name: 'Amit Verma', avatar: null, isOnline: false },
    service: 'Deep Cleaning',
    bookingRef: 'BK-2024-0046',
    lastMessage: { text: 'Confirmed. I will be there at 10 AM on Monday.', timestamp: '2026-07-14T11:00:00', sender: 'provider' },
    unreadCount: 0,
    status: 'active',
  },
  {
    id: 'conv-6',
    customer: { id: 'cust-6', name: 'Neha Gupta', avatar: null, isOnline: true },
    service: 'Kitchen Repair',
    bookingRef: 'BK-2024-0047',
    lastMessage: { text: 'Is the estimate still valid?', timestamp: '2026-07-14T09:30:00', sender: 'customer' },
    unreadCount: 3,
    status: 'pending',
  },
  {
    id: 'conv-7',
    customer: { id: 'cust-7', name: 'Deepak Kumar', avatar: null, isOnline: false },
    service: 'Plumbing Repair',
    bookingRef: 'BK-2024-0048',
    lastMessage: { text: 'All set for Friday morning.', timestamp: '2026-07-13T17:00:00', sender: 'provider' },
    unreadCount: 0,
    status: 'active',
  },
  {
    id: 'conv-8',
    customer: { id: 'cust-8', name: 'Sneha Reddy', avatar: null, isOnline: false },
    service: 'AC Service',
    bookingRef: 'BK-2024-0049',
    lastMessage: { text: 'The AC is working perfectly now. Thank you!', timestamp: '2026-07-12T13:15:00', sender: 'customer' },
    unreadCount: 2,
    status: 'completed',
  },
]

const messages = {
  'conv-1': [
    { id: 'm1', sender: 'customer', text: 'Hi, I wanted to confirm the deep cleaning appointment for tomorrow.', timestamp: '2026-07-16T09:00:00', status: 'read' },
    { id: 'm2', sender: 'provider', text: 'Hello Rahul! Yes, confirmed. I will arrive at 9 AM sharp.', timestamp: '2026-07-16T09:05:00', status: 'read' },
    { id: 'm3', sender: 'customer', text: 'Great! Do I need to prepare anything beforehand?', timestamp: '2026-07-16T09:10:00', status: 'read' },
    { id: 'm4', sender: 'provider', text: 'Just ensure the house is accessible. I will bring all equipment and cleaning supplies.', timestamp: '2026-07-16T09:12:00', status: 'read' },
    { id: 'm5', sender: 'customer', text: 'Perfect! See you tomorrow at 9 AM.', timestamp: '2026-07-16T10:30:00', status: 'read' },
  ],
  'conv-2': [
    { id: 'm6', sender: 'customer', text: 'Hi, I wanted to discuss the tile selection for the bathroom.', timestamp: '2026-07-16T08:30:00', status: 'read' },
    { id: 'm7', sender: 'provider', text: 'Sure Anita! I have a few options to show you.', timestamp: '2026-07-16T08:35:00', status: 'read' },
    { id: 'm8', sender: 'customer', text: 'Could you bring the tile samples you mentioned?', timestamp: '2026-07-16T09:15:00', status: 'delivered' },
  ],
  'conv-4': [
    { id: 'm12', sender: 'customer', text: 'The wiring work was excellent!', timestamp: '2026-07-15T14:15:00', status: 'read' },
    { id: 'm13', sender: 'customer', text: 'Thanks for the quick service!', timestamp: '2026-07-15T14:20:00', status: 'sent' },
  ],
  'conv-6': [
    { id: 'm14', sender: 'customer', text: 'Hi, I need an estimate for kitchen cabinet repair.', timestamp: '2026-07-14T08:00:00', status: 'read' },
    { id: 'm15', sender: 'provider', text: 'Sure Neha! The estimate is ₹1,299 for the repair work including materials.', timestamp: '2026-07-14T08:30:00', status: 'read' },
    { id: 'm17', sender: 'customer', text: 'Is the estimate still valid?', timestamp: '2026-07-14T09:30:00', status: 'delivered' },
  ],
}

const notifications = [
  { id: 'notif-1', type: 'booking', title: 'New Booking Received', description: 'Rahul Sharma booked Deep Cleaning for Jul 17, 2026 at 9:00 AM', timestamp: '2026-07-16T08:00:00', read: false },
  { id: 'notif-2', type: 'payment', title: 'Payment Received', description: '₹2,499 credited for Deep Cleaning - Customer: Rahul Sharma', timestamp: '2026-07-15T18:30:00', read: false },
  { id: 'notif-3', type: 'message', title: 'New Message from Anita Desai', description: 'Anita Desai sent you a message regarding Bathroom Renovation', timestamp: '2026-07-16T09:15:00', read: false },
  { id: 'notif-4', type: 'review', title: 'New Review Received', description: 'Vikram Patel rated your Plumbing Repair service 5 stars', timestamp: '2026-07-15T20:00:00', read: true },
  { id: 'notif-5', type: 'booking', title: 'Booking Completed', description: 'Electrical Wiring for Priya Singh has been marked completed', timestamp: '2026-07-15T14:30:00', read: true },
  { id: 'notif-6', type: 'system', title: 'Profile Verification', description: 'Your provider profile has been verified successfully', timestamp: '2026-07-14T12:00:00', read: true },
  { id: 'notif-7', type: 'payment', title: 'Withdrawal Processed', description: 'Your withdrawal of ₹15,000 has been transferred to your bank account', timestamp: '2026-07-13T10:00:00', read: true },
  { id: 'notif-8', type: 'message', title: 'Message from Neha Gupta', description: 'Neha Gupta asked about kitchen repair estimate', timestamp: '2026-07-14T08:00:00', read: true },
  { id: 'notif-9', type: 'booking', title: 'Booking Rescheduled', description: 'AC Service with Sneha Reddy has been rescheduled to Jul 20', timestamp: '2026-07-12T16:00:00', read: true },
  { id: 'notif-10', type: 'system', title: 'Weekly Summary Available', description: 'Your earnings summary for this week is now available', timestamp: '2026-07-11T09:00:00', read: true },
]

const notificationSettings = {
  email: { booking: true, payment: true, message: false, review: true, system: false },
  push: { booking: true, payment: true, message: true, review: false, system: true },
}

export { conversations, messages, notifications, notificationSettings }
