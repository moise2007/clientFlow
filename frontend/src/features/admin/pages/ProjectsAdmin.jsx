import { useState } from "react";
import {
  FolderKanban,
  Users,
  CircleDollarSign,
  PhoneCall,
  ArrowUpRight,
  MoreHorizontal,
  UserPlus,
  UserRoundPlus,
  Trash2,
} from "lucide-react";

function ProjectsAdmin() {
  const [openMenu, setOpenMenu] = useState(null);

  const [projects, setProjects] = useState([
    {
      id: 1,
      nom: "Projet CRM",
      description: "Mise en place du CRM pour l'équipe commerciale.",
      statut: "en_cours",
      clients: 24,
      prixTotal: "4 320 000 FCFA",
      prixMoyen: "180 000 FCFA",
      appelsMoyen: "5,2",
      progression: 72,
    },
    {
      id: 2,
      nom: "Déploiement commercial",
      description: "Suivi et développement du portefeuille clients.",
      statut: "en_cours",
      clients: 18,
      prixTotal: "3 420 000 FCFA",
      prixMoyen: "190 000 FCFA",
      appelsMoyen: "4,1",
      progression: 58,
    },
    {
      id: 3,
      nom: "Prospection B2B",
      description: "Prospection et suivi des nouveaux prospects.",
      statut: "planifie",
      clients: 12,
      prixTotal: "1 140 000 FCFA",
      prixMoyen: "95 000 FCFA",
      appelsMoyen: "3,8",
      progression: 15,
    },
    {
      id: 4,
      nom: "Fidélisation clients",
      description: "Suivi des clients existants et renouvellements.",
      statut: "termine",
      clients: 31,
      prixTotal: "6 820 000 FCFA",
      prixMoyen: "220 000 FCFA",
      appelsMoyen: "6,3",
      progression: 100,
    },
  ]);

  const stats = [
    {
      label: "Projets",
      value: projects.length,
      icon: FolderKanban,
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      label: "Prix moyen / client",
      value: "185 000 FCFA",
      icon: Users,
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      label: "Prix total",
      value: "8 880 000 FCFA",
      icon: CircleDollarSign,
      color: "#f97316",
      bg: "#fff7ed",
    },
    {
      label: "Appels moyens / client",
      value: "4,6",
      icon: PhoneCall,
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
  ];

  const status = {
    en_cours: {
      label: "En cours",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    planifie: {
      label: "Planifié",
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
    termine: {
      label: "Terminé",
      color: "#059669",
      bg: "#ecfdf5",
    },
  };

  const handleAddClient = (project) => {
    setOpenMenu(null);

    console.log("Ajouter un client au projet :", project);

    // Plus tard :
    // navigate(`/admin/projets/${project.id}/clients/ajouter`);
  };

  const handleAddCommercial = (project) => {
    setOpenMenu(null);

    console.log("Ajouter un commercial au projet :", project);

    // Plus tard :
    // navigate(`/admin/projets/${project.id}/commerciaux/ajouter`);
  };

  const handleDeleteProject = (project) => {
    setOpenMenu(null);

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer le projet "${project.nom}" ?`
    );

    if (!confirmed) return;

    setProjects((currentProjects) =>
      currentProjects.filter(
        (currentProject) => currentProject.id !== project.id
      )
    );
  };

  return (
    <section>
      {/* HEADER */}
      <div className="mb-5">
        <h1
          className="text-base font-semibold"
          style={{ color: "var(--text-h)" }}
        >
          Mes projets
        </h1>

        <p className="mt-1 text-xs" style={{ color: "var(--text)" }}>
          Suivez les performances et l'activité de vos projets.
        </p>
      </div>

      {/* STATISTIQUES */}
      <div className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-lg border bg-white p-3.5"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: stat.bg,
                    color: stat.color,
                  }}
                >
                  <Icon size={16} strokeWidth={2} />
                </div>

                <p
                  className="truncate text-[11px]"
                  style={{ color: "var(--text)" }}
                >
                  {stat.label}
                </p>
              </div>

              <p
                className="mt-3 text-sm font-semibold"
                style={{ color: "var(--text-h)" }}
              >
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* PROJETS */}
      <div className="max-w-350">
        <div className="mb-3">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            Tous les projets
          </h2>

          <p className="mt-0.5 text-[11px]" style={{ color: "var(--text)" }}>
            {projects.length} projets enregistrés
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => {
            const currentStatus = status[project.statut];
            const isMenuOpen = openMenu === project.id;

            return (
              <article
                key={project.id}
                className="group relative rounded-xl border bg-white p-4 transition-all hover:border-gray-300"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                {/* NOM + STATUT */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: "#eff6ff",
                      color: "#2563eb",
                    }}
                  >
                    <FolderKanban size={17} strokeWidth={1.9} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3
                          className="truncate text-sm font-semibold"
                          style={{
                            color: "var(--text-h)",
                          }}
                        >
                          {project.nom}
                        </h3>

                        <p
                          className="mt-0.5 line-clamp-1 text-[11px]"
                          style={{
                            color: "var(--text)",
                          }}
                        >
                          {project.description}
                        </p>
                      </div>

                      <span
                        className="shrink-0 rounded-full px-2 py-1 text-[9px] font-medium"
                        style={{
                          color: currentStatus.color,
                          backgroundColor: currentStatus.bg,
                        }}
                      >
                        {currentStatus.label}
                      </span>
                    </div>
                  </div>

                  {/* MENU */}
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(isMenuOpen ? null : project.id)
                      }
                      className="rounded-md p-1.5 transition hover:bg-gray-100"
                      style={{
                        color: "var(--text)",
                      }}
                      aria-label={`Actions pour ${project.nom}`}
                    >
                      <MoreHorizontal size={17} />
                    </button>

                    {isMenuOpen && (
                      <div
                        className="absolute right-0 top-9 z-20 w-52 overflow-hidden rounded-lg border bg-white py-1"
                        style={{
                          borderColor: "var(--border)",
                          boxShadow:
                            "0 8px 24px rgba(0, 0, 0, 0.08)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleAddClient(project)}
                          className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs transition hover:bg-gray-50"
                          style={{
                            color: "var(--text-h)",
                          }}
                        >
                          <UserPlus
                            size={15}
                            style={{ color: "#2563eb" }}
                          />

                          <span>Ajouter un client</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddCommercial(project)}
                          className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs transition hover:bg-gray-50"
                          style={{
                            color: "var(--text-h)",
                          }}
                        >
                          <UserRoundPlus
                            size={15}
                            style={{ color: "#059669" }}
                          />

                          <span>Ajouter un commercial</span>
                        </button>

                        <div
                          className="my-1 border-t"
                          style={{
                            borderColor: "var(--border)",
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(project)}
                          className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-xs transition hover:bg-red-50"
                          style={{
                            color: "#dc2626",
                          }}
                        >
                          <Trash2 size={15} />

                          <span>Supprimer le projet</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* PROGRESSION */}
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span
                      className="text-[10px]"
                      style={{ color: "var(--text)" }}
                    >
                      Progression
                    </span>

                    <span
                      className="text-[10px] font-medium"
                      style={{ color: "var(--text-h)" }}
                    >
                      {project.progression}%
                    </span>
                  </div>

                  <div
                    className="h-1 overflow-hidden rounded-full"
                    style={{
                      backgroundColor: "#f1f1f1",
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${project.progression}%`,
                        backgroundColor: currentStatus.color,
                      }}
                    />
                  </div>
                </div>

                {/* INFORMATIONS */}
                <div
                  className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 border-t pt-3"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <div>
                    <p
                      className="text-[10px]"
                      style={{ color: "var(--text)" }}
                    >
                      Clients
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5">
                      <Users
                        size={13}
                        style={{ color: "var(--text)" }}
                      />

                      <span
                        className="text-xs font-semibold"
                        style={{ color: "var(--text-h)" }}
                      >
                        {project.clients}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-[10px]"
                      style={{ color: "var(--text)" }}
                    >
                      Prix total
                    </p>

                    <p
                      className="mt-0.5 text-xs font-semibold"
                      style={{ color: "var(--text-h)" }}
                    >
                      {project.prixTotal}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-[10px]"
                      style={{ color: "var(--text)" }}
                    >
                      Prix moyen / client
                    </p>

                    <p
                      className="mt-0.5 text-xs font-semibold"
                      style={{ color: "var(--text-h)" }}
                    >
                      {project.prixMoyen}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-[10px]"
                      style={{ color: "var(--text)" }}
                    >
                      Appels / client
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5">
                      <PhoneCall
                        size={13}
                        style={{ color: "var(--text)" }}
                      />

                      <span
                        className="text-xs font-semibold"
                        style={{ color: "var(--text-h)" }}
                      >
                        {project.appelsMoyen}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTION */}
                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-medium transition hover:bg-gray-100"
                  style={{
                    backgroundColor: "#f8f8f8",
                    color: "var(--text-h)",
                  }}
                >
                  Ouvrir le projet
                  <ArrowUpRight size={13} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsAdmin;