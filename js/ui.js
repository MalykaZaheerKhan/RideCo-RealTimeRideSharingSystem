/* ================================================================
   js/ui.js — All interactive UI behaviour
   No backend needed for anything in this file.
   Include on pages that need interactivity.
   ================================================================ */

/* ----------------------------------------------------------------
   1. RIDE TYPE SELECTOR  →  passenger/request.html
   ----------------------------------------------------------------
   Copy from original HTML <script> (the .req-type-card listener):

   document.addEventListener('click', function(e) {
     const card = e.target.closest('.req-type-card');
     if (!card) return;
     const panel = card.closest('.req-panel-inner');
     if (!panel) return;

     panel.querySelectorAll('.req-type-card').forEach(c => c.classList.remove('selected'));
     card.classList.add('selected');

     const typeName = card.querySelector('.req-type-name')?.textContent?.trim() || 'Economy';
     const fare = FARES[typeName] || FARES.Economy;

     const fareNum = panel.querySelector('.req-fare-num');
     if (fareNum) fareNum.textContent = fare.est;

     const ctaBtn = panel.querySelector('#request-ride-btn');
     if (ctaBtn) ctaBtn.textContent = '🚗 Request ' + fare.label + ' — ' + fare.est;

     const stepPills = card.closest('.req-layout')?.querySelectorAll('.req-step-pill');
     if (stepPills) {
       stepPills[0].className = 'req-step-pill done';
       stepPills[0].textContent = '✓ Route';
       stepPills[1].className = 'req-step-pill done';
       stepPills[1].textContent = '✓ Ride Type';
       stepPills[2].className = 'req-step-pill active';
       stepPills[2].textContent = '3 Confirm';
     }
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   2. SWAP PICKUP / DESTINATION  →  passenger/request.html
   ----------------------------------------------------------------
   Copy from original HTML <script> (the .req-swap-btn listener):

   document.addEventListener('click', function(e) {
     const btn = e.target.closest('.req-swap-btn');
     if (!btn) return;
     const box = btn.closest('.req-location-box');
     if (!box) return;
     const inputs = box.querySelectorAll('.req-loc-input');
     if (inputs.length < 2) return;
     const tmp = inputs[0].value;
     inputs[0].value = inputs[1].value;
     inputs[1].value = tmp;
     box.style.transition = 'opacity 0.15s';
     box.style.opacity = '0.5';
     setTimeout(() => { box.style.opacity = '1'; }, 150);
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   3. QUICK DESTINATION CLICK  →  passenger/request.html
   ----------------------------------------------------------------
   Copy from original HTML <script>:

   document.addEventListener('click', function(e) {
     const item = e.target.closest('.quick-dest-item');
     if (!item) return;
     const label = item.querySelector('.quick-dest-label')?.textContent?.trim();
     if (!label) return;
     const destInput = document.getElementById('dest-input');
     if (destInput) {
       destInput.value = label;
       const fareNum = document.querySelector('.req-fare-num');
       if (fareNum) {
         fareNum.style.transition = 'opacity 0.2s';
         fareNum.style.opacity = '0';
         setTimeout(() => { fareNum.style.opacity = '1'; }, 200);
       }
       const pills = document.querySelectorAll('.req-step-pill');
       if (pills[0]) { pills[0].className = 'req-step-pill done'; pills[0].textContent = '✓ Route'; }
       if (pills[1]) { pills[1].className = 'req-step-pill active'; pills[1].textContent = '2 Ride Type'; }
     }
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   4. RIDE NOW / SCHEDULE TOGGLE  →  passenger/request.html
   ----------------------------------------------------------------
   Copy from original HTML <script>:

   document.addEventListener('click', function(e) {
     const btn = e.target.closest('#p-request .btn');
     if (!btn) return;
     const row = btn.parentElement;
     if (!row || !row.querySelector('.btn-accent') || !row.querySelector('.btn-outline-dark')) return;
     if (btn.classList.contains('btn-accent') || btn.classList.contains('btn-outline-dark')) {
       const btns = row.querySelectorAll('.btn');
       if (btns.length === 2) {
         btns.forEach(b => { b.classList.remove('btn-accent'); b.classList.add('btn-outline-dark'); });
         btn.classList.remove('btn-outline-dark');
         btn.classList.add('btn-accent');
       }
     }
   });

   NOTE: When using separate HTML files replace '#p-request .btn'
   selector with just '.schedule-toggle-btn' and add that class
   to both buttons in request.html.
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   5. PROMO CODE APPLY  →  passenger/request.html
   ----------------------------------------------------------------
   Copy from original HTML <script> and update to use PROMO_CODES
   from data.js instead of hardcoded strings:

   document.addEventListener('click', function(e) {
     const btn = e.target.closest('#promo-apply-btn');
     if (!btn) return;
     const input = document.getElementById('promo-input');
     if (!input) return;
     const code = input.value.trim().toUpperCase();
     const fareNum = document.querySelector('.req-fare-num');
     const ctaBtn  = document.getElementById('request-ride-btn');

     const promo = PROMO_CODES[code];   // from data.js
     if (promo) {
       input.style.borderColor = 'var(--dp-success)';
       btn.textContent = '✓ Applied';
       btn.style.color = 'var(--dp-success)';
       const currentFare = parseFloat(fareNum?.textContent?.replace('$','')) || 10.40;
       const discounted  = (currentFare * (1 - promo.discount)).toFixed(2);
       if (fareNum) fareNum.textContent = '$' + discounted;
       if (ctaBtn)  ctaBtn.textContent  = '🚗 Request Ride — $' + discounted;
     } else if (code) {
       input.style.borderColor = 'var(--dp-danger)';
       btn.textContent = '✗ Invalid';
       btn.style.color = 'var(--dp-danger)';
       setTimeout(() => {
         btn.textContent = 'Apply'; btn.style.color = '';
         input.style.borderColor = '';
       }, 2000);
     }
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   6. LANDING PAGE STAT COUNTERS  →  index.html
   ----------------------------------------------------------------
   Copy from original HTML <script> (the IIFE IntersectionObserver):

   (function() {
     let ran = false;
     const bar = document.querySelector('.lp-stats-bar');
     if (!bar) return;
     const obs = new IntersectionObserver(function(entries) {
       if (!entries[0].isIntersecting || ran) return;
       ran = true;
       bar.querySelectorAll('.cnt-num').forEach(function(el) {
         const target = parseFloat(el.dataset.target);
         const dec    = parseInt(el.dataset.dec) || 0;
         const dur    = 1400;
         let start    = null;
         function step(ts) {
           if (!start) start = ts;
           const p    = Math.min((ts - start) / dur, 1);
           const ease = 1 - Math.pow(1 - p, 3);
           el.textContent = (target * ease).toFixed(dec);
           if (p < 1) requestAnimationFrame(step);
           else el.textContent = target.toFixed(dec);
         }
         requestAnimationFrame(step);
       });
     }, { threshold: 0.4 });
     obs.observe(bar);
   })();
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   7. REVIEW HELPFUL BUTTON  →  index.html
   ----------------------------------------------------------------
   Copy from original HTML <script>:

   document.addEventListener('click', function(e) {
     const btn = e.target.closest('.lp-review-helpful');
     if (!btn) return;
     if (btn.dataset.voted) return;
     btn.dataset.voted = '1';
     const n = parseInt(btn.dataset.n || 0) + 1;
     btn.dataset.n = n;
     btn.textContent = '👍 ' + n + ' helpful';
     btn.style.color = 'var(--dp-accent)';
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   8. STAR RATING TAPS  →  passenger/rating.html
   ----------------------------------------------------------------
   Write this yourself (beginner-friendly):

   let selectedRating = 0;
   const stars = document.querySelectorAll('.star');

   stars.forEach((star, index) => {
     star.addEventListener('click', () => {
       selectedRating = index + 1;
       stars.forEach((s, i) => {
         s.classList.toggle('filled', i <= index);
       });
     });
     star.addEventListener('mouseover', () => {
       stars.forEach((s, i) => s.classList.toggle('filled', i <= index));
     });
     star.addEventListener('mouseout', () => {
       stars.forEach((s, i) => s.classList.toggle('filled', i < selectedRating));
     });
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   9. RATING QUICK TAG CHIPS  →  passenger/rating.html
   ----------------------------------------------------------------
   Write this yourself:

   const selectedTags = [];
   document.querySelectorAll('.rating-tag').forEach(tag => {
     tag.addEventListener('click', () => {
       tag.classList.toggle('selected');
       const label = tag.dataset.tag || tag.textContent.trim();
       if (tag.classList.contains('selected')) {
         selectedTags.push(label);
       } else {
         const i = selectedTags.indexOf(label);
         if (i > -1) selectedTags.splice(i, 1);
       }
     });
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   10. TIP SELECTOR  →  passenger/rating.html
   ----------------------------------------------------------------
   Write this yourself:

   let selectedTip = 0;
   document.querySelectorAll('.tip-btn').forEach(btn => {
     btn.addEventListener('click', () => {
       document.querySelectorAll('.tip-btn').forEach(b => {
         b.classList.remove('btn-accent');
         b.classList.add('btn-ghost');
       });
       btn.classList.add('btn-accent');
       btn.classList.remove('btn-ghost');
       selectedTip = parseFloat(btn.dataset.amount) || 0;
     });
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   11. DRIVER ONLINE TOGGLE  →  driver/dashboard.html
   ----------------------------------------------------------------
   Write this yourself:

   const toggle     = document.getElementById('driver-online-toggle');
   const statusText = document.getElementById('driver-status-text');

   if (toggle) {
     toggle.addEventListener('change', () => {
       if (toggle.checked) {
         statusText.textContent = '● Currently Online';
         statusText.style.color = 'var(--dp-success)';
       } else {
         statusText.textContent = '● Currently Offline';
         statusText.style.color = 'var(--dp-danger)';
       }
       // BACKEND: fetch('/api/driver/status', { method:'PATCH', body: JSON.stringify({ online: toggle.checked }) })
     });
   }
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   12. HISTORY TABLE FILTER  →  passenger/history.html
   ----------------------------------------------------------------
   Write this yourself:

   function renderRidesTable(rides) {
     const tbody = document.getElementById('history-tbody');
     if (!tbody) return;
     tbody.innerHTML = '';
     if (rides.length === 0) {
       tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:32px"><div class="history-empty"><div class="history-empty-icon">📋</div><div class="history-empty-text">No rides found</div></div></td></tr>';
       return;
     }
     rides.forEach(ride => {
       const badgeClass = ride.status === 'completed' ? 'badge-success' : 'badge-danger';
       const label      = ride.status === 'completed' ? 'Done' : 'Cancelled';
       const row = document.createElement('tr');
       row.innerHTML = `
         <td><div>${ride.date}</div><div style="font-size:11px;color:var(--dp-sub)">${ride.time}</div></td>
         <td><div style="font-weight:600;color:#fff">${ride.from}</div><div style="font-size:12px;color:var(--dp-sub)">→ ${ride.to}</div></td>
         <td>${ride.driver || '—'}</td>
         <td>${ride.distance}</td>
         <td>${ride.duration}</td>
         <td style="font-weight:600">${ride.fare}</td>
         <td><span class="badge ${badgeClass}">${label}</span></td>
       `;
       tbody.appendChild(row);
     });
   }

   const filterSelect = document.getElementById('history-filter');
   if (filterSelect) {
     filterSelect.addEventListener('change', function() {
       renderRidesTable(RIDE_HISTORY);
       // BACKEND: fetchRideHistory(this.value).then(renderRidesTable);
     });
   }
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   13. ADMIN DRIVERS TABLE  →  admin/drivers.html
   ----------------------------------------------------------------
   Write this yourself:

   function renderDriversTable(drivers) {
     const tbody = document.getElementById('drivers-tbody');
     if (!tbody) return;
     tbody.innerHTML = '';
     if (drivers.length === 0) {
       tbody.innerHTML = '<tr><td colspan="7"><div class="drivers-empty"><div class="drivers-empty-icon">🔍</div><div class="drivers-empty-text">No drivers match your search</div></div></td></tr>';
       return;
     }
     drivers.forEach(driver => {
       const statusClass = { online:'badge-success-l', offline:'badge-sub', suspended:'badge-danger-l' }[driver.status] || 'badge-sub';
       const row = document.createElement('tr');
       row.innerHTML = `
         <td><div style="display:flex;align-items:center;gap:10px">
           <div class="avatar avatar-light avatar-sm">${driver.initials}</div>
           <div><div style="font-weight:600">${driver.name}</div><div style="font-size:12px;color:var(--lp-sub)">${driver.car}</div></div>
         </div></td>
         <td>${driver.email}</td>
         <td>${driver.phone}</td>
         <td>⭐ ${driver.rating}</td>
         <td>${driver.totalTrips.toLocaleString()}</td>
         <td><span class="badge ${statusClass}">${driver.status}</span></td>
         <td><div style="display:flex;gap:6px">
           <button class="btn btn-outline-light btn-sm">View</button>
           <button class="btn btn-danger-light btn-sm" onclick="suspendDriver('${driver.id}')">Suspend</button>
         </div></td>
       `;
       tbody.appendChild(row);
     });
   }

   function suspendDriver(driverId) {
     if (!confirm('Suspend this driver?')) return;
     const driver = DRIVERS_LIST.find(d => d.id === driverId);
     if (driver) { driver.status = 'suspended'; renderDriversTable(DRIVERS_LIST); }
     // BACKEND: updateDriverStatus_Admin(driverId, 'suspended').then(() => renderDriversTable(DRIVERS_LIST));
   }

   const driverSearch = document.getElementById('driver-search');
   if (driverSearch) {
     driverSearch.addEventListener('input', function() {
       const q = this.value.toLowerCase();
       renderDriversTable(DRIVERS_LIST.filter(d =>
         d.name.toLowerCase().includes(q) ||
         d.email.toLowerCase().includes(q) ||
         d.car.toLowerCase().includes(q)
       ));
     });
   }

   const statusFilter = document.getElementById('driver-status-filter');
   if (statusFilter) {
     statusFilter.addEventListener('change', function() {
       const s = this.value;
       renderDriversTable(s === 'All' ? DRIVERS_LIST : DRIVERS_LIST.filter(d => d.status === s.toLowerCase()));
     });
   }
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   14. ADMIN LIVE RIDES TABLE  →  admin/rides.html + admin/dashboard.html
   ----------------------------------------------------------------
   Write this yourself:

   function renderLiveRides(rides) {
     const tbody = document.getElementById('live-rides-tbody');
     if (!tbody) return;
     tbody.innerHTML = '';
     rides.forEach(ride => {
       const statusClass = { in_progress:'badge-primary-l', waiting:'badge-warning-l', completed:'badge-success-l' }[ride.status] || 'badge-sub';
       const row = document.createElement('tr');
       row.innerHTML = `
         <td style="font-size:11px;color:var(--lp-sub);font-family:monospace">${ride.id}</td>
         <td>${ride.passenger}</td>
         <td>${ride.driver}</td>
         <td><div style="font-weight:600">${ride.from}</div><div style="font-size:12px;color:var(--lp-sub)">→ ${ride.to}</div></td>
         <td>${ride.startedAt}</td>
         <td style="font-weight:600">${ride.fare}</td>
         <td><span class="badge ${statusClass}">${ride.status.replace('_',' ')}</span></td>
         <td><button class="btn btn-outline-light btn-sm">Track</button></td>
       `;
       tbody.appendChild(row);
     });
   }

   const rideFilterBtns = document.querySelectorAll('.rides-filter-btn');
   rideFilterBtns.forEach(btn => {
     btn.addEventListener('click', () => {
       rideFilterBtns.forEach(b => b.classList.remove('active'));
       btn.classList.add('active');
       const status = btn.dataset.status;
       renderLiveRides(status === 'all' ? LIVE_RIDES : LIVE_RIDES.filter(r => r.status === status));
     });
   });
   ---------------------------------------------------------------- */
