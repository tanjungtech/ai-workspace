import { NavLink } from "react-router-dom";

const menus = [
  { label: 'Dashboard', path: '/' },
  { label: 'Chat', path: '/chat' },
  { label: 'Agents', path: '/agents' },
  { label: 'Models', path: '/models' },
  { label: 'Prompts', path: '/prompts' },
  { label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <aside>
      <h2>AI Workspace</h2>
      <nav>
        { menus.map((menu) => (
          <NavLink key={menu.path} to={menu.path}>
            {menu.label}
          </NavLink>
        )) }
      </nav>
    </aside>
  )
}