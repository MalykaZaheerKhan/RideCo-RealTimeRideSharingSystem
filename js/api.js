/* ================================================================
   js/api.js — All fetch() calls to your backend REST API.
   LEAVE THIS FILE UNTOUCHED until your backend server is ready.
   Everything is commented out — uncomment one function at a time
   as you build each API endpoint.
   ================================================================ */

/* ----------------------------------------------------------------
   BASE URL — set this when backend is ready
   ----------------------------------------------------------------
   const API_BASE = 'http://localhost:3000';       // local dev
   const API_BASE = 'https://api.rideco.com';      // production
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   HELPERS
   ----------------------------------------------------------------
   function getToken()      { return localStorage.getItem('rideco_token'); }
   function getDriverToken(){ return localStorage.getItem('rideco_driver_token'); }
   function getAdminToken() { return localStorage.getItem('rideco_admin_token'); }

   function authHeaders(tokenFn = getToken) {
     return { 'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + tokenFn() };
   }
   ---------------------------------------------------------------- */

/* ================================================================
   PASSENGER AUTH
   ================================================================ */

/* POST /api/auth/login
   async function loginPassenger(email, password) {
     const res  = await fetch(API_BASE + '/api/auth/login', {
       method: 'POST', headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });
     const data = await res.json();
     if (data.token) {
       localStorage.setItem('rideco_token', data.token);
       window.location.href = 'dashboard.html';
     } else { alert(data.message || 'Login failed'); }
   }
*/

/* POST /api/auth/register
   async function registerPassenger(formData) {
     const res  = await fetch(API_BASE + '/api/auth/register', {
       method: 'POST', headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
     });
     const data = await res.json();
     if (res.ok) {
       localStorage.setItem('rideco_token', data.token);
       window.location.href = 'dashboard.html';
     } else { alert(data.message || 'Registration failed'); }
   }
*/

/* POST /api/auth/logout
   async function logout() {
     await fetch(API_BASE + '/api/auth/logout', {
       method: 'POST', headers: authHeaders()
     });
     localStorage.removeItem('rideco_token');
     window.location.href = '../../index.html';
   }
*/

/* ================================================================
   PASSENGER ENDPOINTS
   ================================================================ */

/* GET /api/user/me
   async function fetchCurrentUser() {
     const res = await fetch(API_BASE + '/api/user/me', { headers: authHeaders() });
     return await res.json();
   }
*/

/* GET /api/rides?filter=all
   async function fetchRideHistory(filter = 'all') {
     const res = await fetch(API_BASE + '/api/rides?filter=' + filter, { headers: authHeaders() });
     return await res.json();
   }
*/

/* POST /api/rides/request
   async function requestRide(pickup, destination, rideType, promoCode) {
     const res  = await fetch(API_BASE + '/api/rides/request', {
       method: 'POST', headers: authHeaders(),
       body: JSON.stringify({ pickup, destination, rideType, promoCode })
     });
     const data = await res.json();
     if (res.ok) window.location.href = 'tracking.html?rideId=' + data.rideId;
     return data;
   }
*/

/* GET /api/rides/:id/status
   async function fetchRideStatus(rideId) {
     const res = await fetch(API_BASE + '/api/rides/' + rideId + '/status', { headers: authHeaders() });
     return await res.json();
   }
   // Poll on tracking page:
   // const poller = setInterval(() => fetchRideStatus(rideId).then(updateTrackingUI), 5000);
*/

/* POST /api/rides/:id/cancel
   async function cancelRide(rideId) {
     const res = await fetch(API_BASE + '/api/rides/' + rideId + '/cancel', {
       method: 'POST', headers: authHeaders()
     });
     return await res.json();
   }
*/

/* POST /api/rating
   async function submitRating(rideId, rating, tags, comment, tip) {
     const res = await fetch(API_BASE + '/api/rating', {
       method: 'POST', headers: authHeaders(),
       body: JSON.stringify({ rideId, rating, tags, comment, tip })
     });
     return await res.json();
   }
*/

/* GET /api/payment/methods
   async function fetchPaymentMethods() {
     const res = await fetch(API_BASE + '/api/payment/methods', { headers: authHeaders() });
     return await res.json();
   }
*/

/* POST /api/promo/validate
   async function validatePromo(code) {
     const res = await fetch(API_BASE + '/api/promo/validate', {
       method: 'POST', headers: authHeaders(),
       body: JSON.stringify({ code })
     });
     return await res.json();
     // returns: { valid: true, discount: 0.10, type: 'percent' }
     //      or: { valid: false, message: 'Invalid code' }
   }
*/

/* ================================================================
   DRIVER ENDPOINTS
   ================================================================ */

/* POST /api/driver/auth/login
   async function loginDriver(email, password) {
     const res  = await fetch(API_BASE + '/api/driver/auth/login', {
       method: 'POST', headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });
     const data = await res.json();
     if (data.token) {
       localStorage.setItem('rideco_driver_token', data.token);
       window.location.href = 'dashboard.html';
     } else { alert(data.message || 'Login failed'); }
   }
*/

/* PATCH /api/driver/status
   async function updateDriverStatus(online) {
     const res = await fetch(API_BASE + '/api/driver/status', {
       method: 'PATCH', headers: authHeaders(getDriverToken),
       body: JSON.stringify({ online })
     });
     return await res.json();
   }
*/

/* POST /api/driver/rides/:id/accept
   async function acceptRide(rideId) {
     const res = await fetch(API_BASE + '/api/driver/rides/' + rideId + '/accept', {
       method: 'POST', headers: authHeaders(getDriverToken)
     });
     if (res.ok) window.location.href = 'active-ride.html?rideId=' + rideId;
   }
*/

/* POST /api/driver/rides/:id/decline
   async function declineRide(rideId) {
     await fetch(API_BASE + '/api/driver/rides/' + rideId + '/decline', {
       method: 'POST', headers: authHeaders(getDriverToken)
     });
     window.location.href = 'dashboard.html';
   }
*/

/* POST /api/driver/rides/:id/end
   async function endRide(rideId) {
     const res = await fetch(API_BASE + '/api/driver/rides/' + rideId + '/end', {
       method: 'POST', headers: authHeaders(getDriverToken)
     });
     if (res.ok) window.location.href = 'earnings.html';
   }
*/

/* GET /api/driver/earnings?period=week
   async function fetchDriverEarnings(period = 'week') {
     const res = await fetch(API_BASE + '/api/driver/earnings?period=' + period, {
       headers: authHeaders(getDriverToken)
     });
     return await res.json();
   }
*/

/* ================================================================
   ADMIN ENDPOINTS
   ================================================================ */

/* POST /api/admin/auth/login
   async function loginAdmin(email, password, twoFactorCode) {
     const res  = await fetch(API_BASE + '/api/admin/auth/login', {
       method: 'POST', headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password, twoFactorCode })
     });
     const data = await res.json();
     if (data.token) {
       localStorage.setItem('rideco_admin_token', data.token);
       window.location.href = 'dashboard.html';
     } else { alert(data.message || 'Login failed'); }
   }
*/

/* GET /api/admin/stats
   async function fetchAdminStats() {
     const res = await fetch(API_BASE + '/api/admin/stats', { headers: authHeaders(getAdminToken) });
     return await res.json();
   }
*/

/* GET /api/admin/drivers?status=all&search=
   async function fetchDriversList(status = 'all', search = '') {
     const res = await fetch(API_BASE + '/api/admin/drivers?status=' + status + '&search=' + search, {
       headers: authHeaders(getAdminToken)
     });
     return await res.json();
   }
*/

/* PATCH /api/admin/drivers/:id
   async function updateDriverStatus_Admin(driverId, status) {
     const res = await fetch(API_BASE + '/api/admin/drivers/' + driverId, {
       method: 'PATCH', headers: authHeaders(getAdminToken),
       body: JSON.stringify({ status })  // 'active' | 'suspended'
     });
     return await res.json();
   }
*/

/* GET /api/admin/rides/live
   async function fetchLiveRides() {
     const res = await fetch(API_BASE + '/api/admin/rides/live', { headers: authHeaders(getAdminToken) });
     return await res.json();
   }
   // Poll every 10s on admin dashboard:
   // setInterval(() => fetchLiveRides().then(renderLiveRides), 10000);
*/
