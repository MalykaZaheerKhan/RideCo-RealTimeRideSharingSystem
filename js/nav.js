/* ================================================================
   js/nav.js — Page navigation + sidebar active states
   Include on EVERY page.
   ================================================================ */

/* checkAuth() — placeholder until backend is ready
   Call at the top of every protected page's inline <script>.
   When backend is ready, replace this with the real token check below. */
function checkAuth() {
  // PROTOTYPING: no-op — lets everyone through
  return true;
  // BACKEND READY:
  // if (!localStorage.getItem('rideco_token')) {
  //   window.location.href = '../../pages/passenger/login.html';
  //   return false;
  // }
  // return true;
}

/* goTo(page) — navigate with auth check before moving.
   Use on any button that needs logic before navigating.
   Simple links with no conditions should use <a href> instead. */
function goTo(page) {
  if (!checkAuth()) return;
  window.location.href = page;
}

/* ----------------------------------------------------------------
   go(pageId) — switches visible page in the single-file prototype
   ----------------------------------------------------------------
   Copy from original HTML <script>:

   function go(pageId) {
     document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
     const target = document.getElementById(pageId);
     if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
   }

   NOTE: Once every page is its own HTML file, replace all
   onclick="go('p-xxx')" with normal href="xxx.html" links.
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   Passenger sidebar active state (.ph-nav-item)
   ----------------------------------------------------------------
   Copy from original HTML <script>:

   document.addEventListener('click', function(e) {
     const item = e.target.closest('.ph-nav-item');
     if (!item) return;
     item.closest('.ph-sidebar')
       ?.querySelectorAll('.ph-nav-item')
       .forEach(i => i.classList.remove('active'));
     item.classList.add('active');
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   Admin sidebar active state (.sidebar-item)
   ----------------------------------------------------------------
   Copy from original HTML <script>:

   document.addEventListener('click', function(e) {
     const item = e.target.closest('.sidebar-item');
     if (!item) return;
     item.closest('.admin-sidebar')
       ?.querySelectorAll('.sidebar-item')
       .forEach(i => i.classList.remove('active'));
     item.classList.add('active');
   });
   ---------------------------------------------------------------- */

/* ----------------------------------------------------------------
   AUTH HELPER — add when backend is ready
   ----------------------------------------------------------------
   function getToken()     { return localStorage.getItem('rideco_token'); }
   function getAdminToken(){ return localStorage.getItem('rideco_admin_token'); }
   function getDriverToken(){ return localStorage.getItem('rideco_driver_token'); }

   function checkAuth(tokenKey, redirectTo) {
     if (!localStorage.getItem(tokenKey)) {
       window.location.href = redirectTo;
       return false;
     }
     return true;
   }
   // Usage at top of each protected page's <script>:
   // checkAuth('rideco_token', '../../pages/passenger/login.html');
   ---------------------------------------------------------------- */
