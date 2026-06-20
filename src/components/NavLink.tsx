import { NavLink as RouterNavLink } from 'react-router-dom'

type NavLinkProps = {
  to: string
  label: string
  end?: boolean
}

function NavLink({ to, label, end = false }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive ? 'navigation-link navigation-link--active' : 'navigation-link'
      }
    >
      {label}
    </RouterNavLink>
  )
}

export default NavLink
