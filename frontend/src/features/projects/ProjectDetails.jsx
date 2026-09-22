import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  FolderKanban,
  PhoneCall,
  Plus,
  Users,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProject,
  getProjectStats,
} from "../../services/projectService";
import { getProjectCalls } from "../../services/callService";
import { getProjectClients } from "../../services/clientService";
import { getProjectCommercials } from "../../services/commercialService";

import ProjectCalls from "../../components/projects/ProjectCalls";
import ProjectClients from "../../components/projects/ProjectClients";
import ProjectCommercials from "../../components/projects/ProjectCommercials";

function ProjectDetails() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [stats, setStats] = useState(null);
  const [calls, setCalls] = useState([]);
  const [clients, setClients] = useState([]);
  const [commercials, setCommercials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("clients");

  useEffect(() => {
    loadProject();
  }, [projectId]);

  function loadProject() {
    setLoading(true);

    const projectData = getProject(projectId);
    const statsData = getProjectStats(projectId);
    const callsData = getProjectCalls(projectId);
    const clientsData = getProjectClients(projectId);
    const commercialsData = getProjectCommercials(projectId);

    setProject(projectData);
    setStats(statsData);
    setCalls(callsData);
    setClients(clientsData);
    setCommercials(commercialsData);

    setLoading(false);
  }

  const formattedStats = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: "Clients",
        value: stats.nombreClients,
        icon: Users,
        color: "var(--primary)",
        bg: "var(--primary-light)",
      },
      {
        label: "Prix total",
        value: formatMoney(stats.prixTotal),
        icon: CircleDollarSign,
        color: "var(--accent)",
        bg: "var(--accent-bg)",
      },
      {
        label: "Prix moyen / client",
        value: formatMoney(stats.prixMoyenClient),
        icon: CircleDollarSign,
        color: "var(--success)",
        bg: "var(--success-light)",
      },
      {
        label: "Appels / client",
        value: stats.appelsMoyensClient,
        icon: PhoneCall,
        color: "var(--primary-dark)",
        bg: "var(--primary-light)",
      },
    ];
  }, [stats]);

  function handleDeleteClient(clientId) {
    setClients((current) =>
      current.filter((client) => client.id !== clientId)
    );
  }

  function handleDeleteCall(callIds) {
    setCalls((current) =>
      current.filter((call) => !callIds.includes(call.id))
    );
  }

  function handleCancelCall(callIds) {
    setCalls((current) =>
      current.map((call) =>
        callIds.includes(call.id)
          ? {
              ...call,
              statut: "annule",
            }
          : call
      )
    );
  }

  function handleAssignCalls(callIds, commercialId) {
    setCalls((current) =>
      current.map((call) =>
        callIds.includes(call.id)
          ? {
              ...call,
              commercialId,
            }
          : call
      )
    );
  }

  function handleAddCommercial(commercial) {
    setCommercials((current) => {
      const exists = current.some(
        (item) => item.id === commercial.id
      );

      if (exists) return current;

      return [...current, commercial];
    });
  }

  function handleRemoveCommercial(commercialId) {
    setCommercials((current) =>
      current.filter(
        (commercial) => commercial.id !== commercialId
      )
    );
  }

  if (loading) {
    return (
      <div
        className="py-10 text-center text-sm"
        style={{ color: "var(--text)" }}
      >
        Chargement du projet...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-10 text-center">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--text-h)" }}
        >
          Projet introuvable
        </p>

        <button
          type="button"
          onClick={() => navigate("/admin/projets")}
          className="mt-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white"
          style={{
            backgroundColor: "var(--primary)",
          }}
        >
          Retour aux projets
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/projets")}
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition hover:bg-gray-50"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <ArrowLeft size={17} />
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1
                className="text-xl font-semibold"
                style={{
                  color: "var(--text-h)",
                }}
              >
                {project.nom}
              </h1>

              <ProjectStatus status={project.statut} />
            </div>

            {/* <p
              className="mt-1 max-w-2xl text-sm leading-5"
              style={{
                color: "var(--text)",
              }}
            >
              {project.description}
            </p> */}

            <div
              className="mt-2 flex items-center gap-2 text-xs"
              style={{
                color: "var(--text)",
              }}
            >
              <CalendarDays size={14} />
              Créé le {formatDate(project.dateCreation)}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          style={{
            backgroundColor: "var(--primary)",
          }}
        >
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        {formattedStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-lg border bg-white p-3"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: stat.bg,
                  color: stat.color,
                }}
              >
                <Icon
                  size={18}
                  strokeWidth={2}
                />
              </div>

              <p
                className="mt-2 text-[15px] font-semibold"
                style={{
                  color: "var(--text-h)",
                }}
              >
                {stat.value}
              </p>

              <p
                className="mt-1 text-[11px] font-medium"
                style={{
                  color: "var(--text)",
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <ProjectTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        clientsCount={clients.length}
        callsCount={calls.length}
        commercialsCount={commercials.length}
      />

      {/* Contenu */}
      <div>
        {activeTab === "clients" && (
          <section
            className="rounded-xl border bg-white"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <SectionHeader
              icon={Users}
              iconColor="var(--success)"
              iconBackground="var(--success-light)"
              title="Clients"
              description="Consultez et gérez les clients de ce projet."
            />

            <div className="p-4">
              <ProjectClients
                clients={clients}
                calls={calls}
                commercials={commercials}
                onDelete={handleDeleteClient}
              />
            </div>
          </section>
        )}

        {activeTab === "appels" && (
          <section
            className="rounded-xl border bg-white"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <SectionHeader
              icon={PhoneCall}
              iconColor="var(--primary)"
              iconBackground="var(--primary-light)"
              title="Appels"
              description="Gérez les appels programmés et terminés."
            />

            <div className="p-4">
              <ProjectCalls
                calls={calls}
                commercials={commercials}
                clients={clients}
                onAssign={handleAssignCalls}
                onCancel={handleCancelCall}
                onDelete={handleDeleteCall}
              />
            </div>
          </section>
        )}

        {activeTab === "commerciaux" && (
          <section
            className="rounded-xl border bg-white"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <SectionHeader
              icon={FolderKanban}
              iconColor="var(--accent)"
              iconBackground="var(--accent-bg)"
              title="Commerciaux"
              description="Gérez les commerciaux affectés à ce projet."
            />

            <div className="p-4">
              <ProjectCommercials
                commercials={commercials}
                calls={calls}
                onAdd={handleAddCommercial}
                onRemove={handleRemoveCommercial}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ProjectTabs({
  activeTab,
  onChange,
  clientsCount,
  callsCount,
  commercialsCount,
}) {
  const tabs = [
    {
      id: "clients",
      label: "Clients",
      count: clientsCount,
      icon: Users,
    },
    {
      id: "appels",
      label: "Appels",
      count: callsCount,
      icon: PhoneCall,
    },
    {
      id: "commerciaux",
      label: "Commerciaux",
      count: commercialsCount,
      icon: FolderKanban,
    },
  ];

  return (
    <nav
      className="overflow-x-auto border-b"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <div className="flex min-w-max items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className="relative flex items-center gap-2 px-4 py-3 text-[13px] font-medium transition"
              style={{
                color: active
                  ? "var(--primary)"
                  : "var(--text)",
              }}
            >
              <Icon
                size={16}
                strokeWidth={active ? 2.2 : 1.8}
              />

              <span>{tab.label}</span>

              <span
                className="rounded-full px-1.5 py-0.5 text-[10px]"
                style={{
                  color: active
                    ? "var(--primary)"
                    : "var(--text)",
                  backgroundColor: active
                    ? "var(--primary-light)"
                    : "#f3f4f6",
                }}
              >
                {tab.count}
              </span>

              {active && (
                <span
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--primary)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function SectionHeader({
  icon: Icon,
  iconColor,
  iconBackground,
  title,
  description,
}) {
  return (
    <div
      className="border-b px-4 py-4"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{
            color: iconColor,
            backgroundColor: iconBackground,
          }}
        >
          <Icon
            size={18}
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0">
          <h2
            className="text-sm font-semibold"
            style={{
              color: "var(--text-h)",
            }}
          >
            {title}
          </h2>

          <p
            className="mt-0.5 text-xs"
            style={{
              color: "var(--text)",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectStatus({ status }) {
  const config = {
    en_cours: {
      label: "En cours",
      color: "var(--primary)",
      bg: "var(--primary-light)",
    },
    planifie: {
      label: "Planifié",
      color: "var(--accent)",
      bg: "var(--accent-bg)",
    },
    termine: {
      label: "Terminé",
      color: "var(--success)",
      bg: "var(--success-light)",
    },
  };

  const current =
    config[status] || config.en_cours;

  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{
        color: current.color,
        backgroundColor: current.bg,
      }}
    >
      {current.label}
    </span>
  );
}

function formatMoney(value) {
  return `${new Intl.NumberFormat("fr-FR").format(
    value
  )} FCFA`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default ProjectDetails;