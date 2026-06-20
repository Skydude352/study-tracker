import NavLink from './NavLink'

const navigationItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/timer', label: 'Timer' },
  { to: '/pomodoro', label: 'Pomodoro' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/calculator', label: 'Study Calculator' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Study Tracker</div>
      <nav className="navigation" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
