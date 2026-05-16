/* ================================================================
   js/data.js — All mock / dummy data
   Replace each block with a fetch() call when backend is ready.
   ================================================================ */

/* ----------------------------------------------------------------
   FARES — used by request.html ride type selector
   ----------------------------------------------------------------
   Copy from original HTML <script>:

   const FARES = {
     Economy: { range: '$8–12',  est: '$10.40', label: 'Economy' },
     Comfort:  { range: '$14–18', est: '$16.20', label: 'Comfort'  },
     XL:       { range: '$20–26', est: '$22.80', label: 'XL'       }
   };

   BACKEND: replace with  GET /api/fares?from=...&to=...
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   PROMO CODES — used by request.html promo input
   ----------------------------------------------------------------
   const PROMO_CODES = {
     'RIDE10':  { discount: 0.10, type: 'percent' },
     'FIRST10': { discount: 0.10, type: 'percent' }
   };

   BACKEND: replace with  POST /api/promo/validate
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   CURRENT USER (passenger)
   ----------------------------------------------------------------
   const CURRENT_USER = {
     id:           'usr_001',
     firstName:    'Alex',
     lastName:     'Morgan',
     initials:     'AM',
     email:        'alex@example.com',
     phone:        '+1 234 567 8900',
     rating:       4.8,
     totalRides:   47,
     totalSpent:   482,
     totalMiles:   142,
     walletBalance:24.50,
     savedPlaces: [
       { icon: '🏠', name: 'Home', address: '123 Main Street, Downtown' },
       { icon: '💼', name: 'Work', address: '450 Park Ave, Midtown'     }
     ]
   };

   BACKEND: replace with  GET /api/user/me
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   RIDE HISTORY (passenger)
   ----------------------------------------------------------------
   const RIDE_HISTORY = [
     {
       id: 'ride_001', date: 'Jan 18, 2025', time: '2:34 PM',
       from: '123 Main St', to: 'Grand Central Terminal',
       driver: 'James R.', driverInitials: 'JR',
       distance: '3.2 mi', duration: '14 min',
       fare: '$10.74', type: 'Comfort', status: 'completed'
     },
     {
       id: 'ride_002', date: 'Jan 16, 2025', time: '10:05 AM',
       from: 'Office Park', to: 'Central Station',
       driver: 'Sarah A.', driverInitials: 'SA',
       distance: '5.1 mi', duration: '22 min',
       fare: '$16.40', type: 'Economy', status: 'completed'
     },
     {
       id: 'ride_003', date: 'Jan 12, 2025', time: '8:20 AM',
       from: 'JFK Airport', to: 'Midtown Hotel',
       driver: null, driverInitials: null,
       distance: '—', duration: '—',
       fare: '$0.00', type: 'XL', status: 'cancelled'
     }
   ];

   BACKEND: replace with  GET /api/rides
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   CURRENT DRIVER
   ----------------------------------------------------------------
   const CURRENT_DRIVER = {
     id:              'drv_001',
     firstName:       'James',
     lastName:        'Rivera',
     initials:        'JR',
     rating:          4.92,
     totalRides:      847,
     car:             'Toyota Camry',
     plate:           'KAB 7821',
     isOnline:        true,
     todayEarnings:   84,
     todayTrips:      6,
     hoursOnline:     4.2,
     weeklyEarnings:  482,
     weeklyGoal:      600,
     nextPayoutDate:  'Monday, Jan 20',
     bankAccount:     'Chase ••••7892'
   };

   BACKEND: replace with  GET /api/driver/me
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   INCOMING RIDE REQUEST (driver ride-request page)
   ----------------------------------------------------------------
   const INCOMING_REQUEST = {
     id: 'req_001',
     passenger: { name: 'Alex Morgan', initials: 'AM', rating: 4.7 },
     pickup:            '123 Main Street, Downtown',
     destination:       'Grand Central Terminal',
     distance:          '3.2 mi',
     estimatedDuration: '12 min',
     estimatedFare:     '$10.40',
     rideType:          'Economy',
     passengers:        1,
     countdown:         15
   };

   BACKEND: replace with WebSocket push from server
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   ADMIN STATS
   ----------------------------------------------------------------
   const ADMIN_STATS = {
     totalRidesToday: 1284,
     activeDrivers:   48,
     activeRides:     23,
     revenueToday:    9420,
     revenueWeek:     62300,
     avgRating:       4.87,
     completionRate:  96.2
   };

   BACKEND: replace with  GET /api/admin/stats
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   DRIVERS LIST (admin drivers page)
   ----------------------------------------------------------------
   const DRIVERS_LIST = [
     {
       id: 'drv_001', name: 'James Rivera', initials: 'JR',
       email: 'james@example.com', phone: '+1 555 001 0001',
       rating: 4.92, totalTrips: 847,
       status: 'online', car: 'Toyota Camry · KAB 7821'
     },
     {
       id: 'drv_002', name: 'Sarah Ahmed', initials: 'SA',
       email: 'sarah@example.com', phone: '+1 555 001 0002',
       rating: 4.80, totalTrips: 514,
       status: 'offline', car: 'Honda Civic · LMN 4421'
     },
     {
       id: 'drv_003', name: 'Marcus Kim', initials: 'MK',
       email: 'marcus@example.com', phone: '+1 555 001 0003',
       rating: 4.75, totalTrips: 293,
       status: 'online', car: 'Ford Escape · OPQ 8834'
     }
   ];

   BACKEND: replace with  GET /api/admin/drivers
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   LIVE RIDES (admin rides page)
   ----------------------------------------------------------------
   const LIVE_RIDES = [
     {
       id: 'ride_live_001',
       passenger: 'Alex Morgan', driver: 'James Rivera',
       from: '123 Main St', to: 'Grand Central',
       status: 'in_progress', fare: '$10.40', startedAt: '2:34 PM'
     },
     {
       id: 'ride_live_002',
       passenger: 'Sarah Lee', driver: 'Marcus Kim',
       from: 'Westside Mall', to: 'Airport Terminal 3',
       status: 'waiting', fare: '$22.80', startedAt: '2:41 PM'
     }
   ];

   BACKEND: replace with  GET /api/admin/rides/live
   ---------------------------------------------------------------- */
