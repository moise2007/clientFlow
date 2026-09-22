import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  FolderKanban,
  Users,
} from "lucide-react";

function AdminNavbar() {
  const links = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Paramètres",
      path: "/admin/parametres",
      icon: Settings,
    },
    {
      label: "Mes projets",
      path: "/admin/projets",
      icon: FolderKanban,
    },
    {
      label: "Mes collaborateurs",
      path: "/admin/collaborateurs",
      icon: Users,
    },
  ];

  return (
    <nav
      className="py-2 mx-auto"
      style={{
        backgroundColor: "var(--bg)",
      }}
    >
      <div className="mx-auto flex max-w-7xl justify-center overflow-x-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className="flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-medium transition-all"
                style={({ isActive }) => ({
                  color: isActive
                    ? "var(--primary)"
                    : "var(--text)",
                  backgroundColor: isActive
                    ? "var(--primary-light)"
                    : "transparent",
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      style={{
                        color: isActive
                          ? "var(--primary)"
                          : "var(--text)",
                      }}
                    />

                    <span>{link.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;