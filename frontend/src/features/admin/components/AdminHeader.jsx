import { Menu, X } from "lucide-react";
import { useState } from "react";

function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="border-b"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            ClientFlow
          </p>

          <p
            className="text-xs"
            style={{ color: "var(--text)" }}
          >
            Administration
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg border p-2 md:hidden"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;