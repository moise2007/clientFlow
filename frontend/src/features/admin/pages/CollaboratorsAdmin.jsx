import { UserPlus, Users } from "lucide-react";

function CollaboratorsAdmin() {
  const collaborators = [
    {
      nom: "Jean Dupont",
      email: "jean@entreprise.com",
      role: "Commercial",
    },
    {
      nom: "Marie Ngo",
      email: "marie@entreprise.com",
      role: "Commercial",
    },
  ];

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1
            className="text-base font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            Mes collaborateurs
          </h1>

          <p
            className="mt-1 text-xs"
            style={{ color: "var(--text)" }}
          >
            Gérez les collaborateurs de votre entreprise.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white"
          style={{
            backgroundColor: "var(--accent)",
          }}
        >
          <UserPlus size={15} />
          Ajouter
        </button>
      </div>

      <div className="space-y-3">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator.email}
            className="flex items-center gap-3 rounded-lg border bg-white p-4"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--accent-bg)",
                color: "var(--accent)",
              }}
            >
              <Users size={17} />
            </div>

            <div className="min-w-0">
              <h2
                className="text-sm font-medium"
                style={{ color: "var(--text-h)" }}
              >
                {collaborator.nom}
              </h2>

              <p
                className="text-xs"
                style={{ color: "var(--text)" }}
              >
                {collaborator.email}
              </p>
            </div>

            <span
              className="ml-auto text-xs"
              style={{ color: "var(--text)" }}
            >
              {collaborator.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CollaboratorsAdmin;