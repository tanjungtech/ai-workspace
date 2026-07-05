import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, FolderKanban } from "lucide-react";

const menus = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    path: '/users',
    icon: Users,
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: FolderKanban,
  },
];

export default function Sidebar() {
  return (
    <aside>
      <h2>AI Workspace</h2>
      <nav>
        { menus.map(({ label, path, icon:Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            <Icon size={20} />

            {label}
          </NavLink>
        )) }
      </nav>
    </aside>
  )
}