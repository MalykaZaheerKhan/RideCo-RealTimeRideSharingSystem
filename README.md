# RideCo — Frontend Scaffold

Backend & API integration ready. No frameworks, no build tools.
Plain HTML, CSS, and JavaScript only.

---

## Folder Structure

```
rideco/
├── index.html                        ← Landing / welcome page
│
├── assets/
│   ├── images/                       ← Logo, icons, screenshots
│   └── css/
│       ├── base.css                  ← LAYER 1: shared across every page
│       ├── layouts.css               ← LAYER 2: shared layouts (auth card, admin sidebar, etc.)
│       ├── landing.css               ← LAYER 3: index.html only
│       ├── passenger/
│       │   ├── dashboard.css
│       │   ├── request.css
│       │   ├── tracking.css
│       │   ├── payment.css
│       │   ├── history.css
│       │   └── rating.css
│       ├── driver/
│       │   ├── dashboard.css
│       │   ├── ride-request.css
│       │   ├── active-ride.css
│       │   └── earnings.css
│       └── admin/
│           ├── dashboard.css
│           ├── drivers.css
│           ├── rides.css
│           └── reports.css
│
├── js/
│   ├── nav.js      ← go() navigation + sidebar active states
│   ├── data.js     ← all mock data (replace with fetch() later)
│   ├── ui.js       ← all interactive behaviour (no backend needed)
│   └── api.js      ← all API fetch() calls (leave untouched until backend ready)
│
├── data/
│   ├── rides.json
│   ├── drivers.json
│   └── users.json
│
└── pages/
    ├── passenger/
    │   ├── login.html
    │   ├── register.html
    │   ├── dashboard.html
    │   ├── request.html
    │   ├── tracking.html
    │   ├── payment.html
    │   ├── history.html
    │   └── rating.html
    ├── driver/
    │   ├── login.html
    │   ├── dashboard.html
    │   ├── ride-request.html
    │   ├── active-ride.html
    │   └── earnings.html
    └── admin/
        ├── login.html
        ├── dashboard.html
        ├── drivers.html
        ├── rides.html
        └── reports.html
```

---

## CSS — The 3-Layer System

| Layer | File(s) | Rule |
|-------|---------|------|
| 1 | `base.css` | Link on **every** page. Shared components: buttons, badges, avatars, inputs, utilities, stat cards, tables, map placeholder, animations. |
| 2 | `layouts.css` | Link on pages that need shared layouts: auth card, dark/light headers, admin sidebar, home layout (driver). |
| 3 | `passenger/*.css`, `driver/*.css`, `admin/*.css` | Link only on the one page it belongs to. Page-specific layout and components only. |

**Rule of thumb:** if a CSS class appears on 2+ pages → Layer 1 or 2. If it appears on only 1 page → Layer 3.

---

## How to Build (step by step)

### 1. Fill the CSS files
Start with `base.css` — copy all shared styles from the original `rideco.html`.
Then `layouts.css` — copy header, auth layout, admin sidebar, home layout.
Then each page-specific CSS file using the comment blocks as your guide.

### 2. Fill the JS files
- `nav.js` — copy the `go()` function + sidebar listeners (2 blocks)
- `data.js` — the mock objects and arrays are already written in comments, just uncomment them
- `ui.js` — copy/write each interactive feature (all described in comments)
- `api.js` — **leave completely untouched** until your backend exists

### 3. Fill the HTML pages
Each HTML file has a comment block telling you:
- Exactly which `<div id="p-...">` block to copy from the original HTML
- Which `id=""` attributes to add to elements
- Which links to change from `onclick="go()"` to `href=""`
- Which `<script>` block to write

### 4. Connect your backend (when ready)
1. Set `API_BASE` at the top of `js/api.js`
2. Uncomment the relevant function in `api.js`
3. In each page's `<script>` block, replace the `// PROTOTYPING:` line
   with the `// BACKEND READY:` line below it
4. Delete the matching mock data block from `data.js`

---

## Script Load Order (every page)

```html
<script src="../../js/nav.js"></script>
<script src="../../js/data.js"></script>
<script src="../../js/ui.js"></script>
<script src="../../js/api.js"></script>
<script>
  /* page-specific code here */
</script>
```

Pages at root level (`index.html`) use `js/nav.js` without `../../`.

---

## API Endpoints Quick Reference

| Method | Endpoint | Page |
|--------|----------|------|
| POST | /api/auth/login | passenger/login |
| POST | /api/auth/register | passenger/register |
| GET | /api/user/me | passenger/dashboard |
| GET | /api/rides | passenger/history |
| POST | /api/rides/request | passenger/request |
| GET | /api/rides/:id/status | passenger/tracking |
| POST | /api/rides/:id/cancel | passenger/tracking |
| POST | /api/rating | passenger/rating |
| GET | /api/payment/methods | passenger/payment |
| POST | /api/promo/validate | passenger/request |
| POST | /api/driver/auth/login | driver/login |
| PATCH | /api/driver/status | driver/dashboard |
| POST | /api/driver/rides/:id/accept | driver/ride-request |
| POST | /api/driver/rides/:id/decline | driver/ride-request |
| POST | /api/driver/rides/:id/end | driver/active-ride |
| GET | /api/driver/earnings | driver/earnings |
| POST | /api/admin/auth/login | admin/login |
| GET | /api/admin/stats | admin/dashboard |
| GET | /api/admin/drivers | admin/drivers |
| PATCH | /api/admin/drivers/:id | admin/drivers |
| GET | /api/admin/rides/live | admin/rides, admin/dashboard |

All endpoints are pre-written (commented out) in `js/api.js`.
