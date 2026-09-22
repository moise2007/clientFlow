import { Outlet } from "react-router-dom";
import AdminNavbar from "../features/admin/components/AdminNavbar";
function AppAdmin() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >

      <AdminNavbar />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppAdmin;