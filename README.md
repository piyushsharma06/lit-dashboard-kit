# ⚡ Lit Dashboard Kit

A reusable, composable **dashboard UI component library** built with [Lit Web Components](https://lit.dev/) — the same technology stack used by Progress Software's enterprise UI platform (Telerik / Kendo UI).

> Built to demonstrate real-world component-driven development using modern Web Standards.

---

## 🧩 Components

| Component | Tag | Description |
|-----------|-----|-------------|
| Stat Card | `<stat-card>` | KPI metric card with trend indicator |
| Data Table | `<data-table>` | Sortable, paginated data table |
| Sidebar Nav | `<sidebar-nav>` | Collapsible navigation sidebar |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/piyushsharma06/lit-dashboard-kit
cd lit-dashboard-kit

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` to see the live demo.

---

## 📦 Usage

### Stat Card
```html
<stat-card
  label="Total Users"
  value="24,521"
  trend="up"
  delta="+12% this week"
  icon="👥">
</stat-card>
```

**CSS Custom Properties:**
| Variable | Default | Description |
|----------|---------|-------------|
| `--card-bg` | `#ffffff` | Card background |
| `--accent` | `#6366f1` | Accent color |
| `--text-primary` | `#111827` | Primary text |
| `--border-color` | `#e5e7eb` | Border color |

---

### Data Table
```html
<data-table id="table"></data-table>

<script type="module">
  const table = document.getElementById('table');
  table.columns = [
    { key: 'name',   label: 'Name',   sortable: true },
    { key: 'status', label: 'Status', badge: { Active: 'success', Pending: 'warning' } },
  ];
  table.rows = [
    { name: 'Piyush', status: 'Active' },
  ];
  table.pageSize = 5;
</script>
```

---

### Sidebar Nav
```html
<sidebar-nav brand="MyApp"></sidebar-nav>

<script type="module">
  document.querySelector('sidebar-nav').items = [
    { icon: '🏠', label: 'Home',     href: '/',      active: true },
    { icon: '👥', label: 'Users',    href: '/users', badge: '3' },
    { icon: '⚙️', label: 'Settings', href: '/settings' },
  ];
</script>
```

---

## 🏗️ Tech Stack

- **[Lit 3.x](https://lit.dev/)** — Web Components framework
- **Vanilla JS / ES Modules** — No build-time dependencies for component usage
- **[Vite](https://vitejs.dev/)** — Dev server & build tool
- **CSS Custom Properties** — Full theming support

---

## 🎨 Theming

All components use CSS Custom Properties. Override at `:root` level:

```css
:root {
  --accent: #0ea5e9;       /* Blue theme */
  --sidebar-bg: #0f172a;   /* Dark sidebar */
  --card-bg: #1e293b;      /* Dark cards */
}
```

---

## 📁 Project Structure

```
lit-dashboard-kit/
├── src/
│   └── components/
│       ├── stat-card.js      # KPI metric card
│       ├── data-table.js     # Sortable data table
│       └── sidebar-nav.js    # Collapsible sidebar
├── index.html                # Live demo
├── package.json
└── README.md
```

---

## 👨‍💻 Author

**Piyush Sharma** — B.Tech CSE @ G.L. Bajaj Institute of Technology  
[GitHub](https://github.com/piyushsharma06) · [LinkedIn](https://www.linkedin.com/in/)

---

## 📄 License

MIT
