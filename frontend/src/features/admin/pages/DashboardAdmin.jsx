import {
  Users,
  FolderKanban,
  UserRound,
  CalendarDays,
  Phone,
  PhoneCall,
  PhoneForwarded,
  Plus,
  Settings,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CircleAlert,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DashboardAdmin() {
  const statistics = [
    {
      label: "Collaborateurs",
      value: 12,
      icon: Users,
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      label: "Projets",
      value: 5,
      icon: FolderKanban,
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
    {
      label: "Clients",
      value: 48,
      icon: UserRound,
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      label: "Rendez-vous",
      value: 16,
      icon: CalendarDays,
      color: "#ea580c",
      bg: "#fff7ed",
    },
  ];

  const quickActions = [
    {
      label: "Ajouter un collaborateur",
      icon: UserPlus,
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      label: "Créer un projet",
      icon: Plus,
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
    {
      label: "Gérer mes paramètres",
      icon: Settings,
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      label: "Déléguer un appel",
      icon: PhoneForwarded,
      color: "#ea580c",
      bg: "#fff7ed",
    },
    {
      label: "Passer un appel",
      icon: PhoneCall,
      color: "#0891b2",
      bg: "#ecfeff",
    },
    {
      label: "Programmer un appel",
      icon: CalendarDays,
      color: "#db2777",
      bg: "#fdf2f8",
    },
  ];

  const callsData = [
    { jour: "Lun", appels: 12 },
    { jour: "Mar", appels: 18 },
    { jour: "Mer", appels: 14 },
    { jour: "Jeu", appels: 23 },
    { jour: "Ven", appels: 19 },
    { jour: "Sam", appels: 9 },
    { jour: "Dim", appels: 5 },
  ];

  const recentActivities = [
    {
      title: "Appel avec Paul Mbarga",
      description: "Compte rendu en attente",
      time: "Il y a 15 min",
      icon: Phone,
      color: "#ea580c",
    },
    {
      title: "Marie Ngo a rejoint un projet",
      description: "Application mobile",
      time: "Il y a 1 h",
      icon: UserPlus,
      color: "#2563eb",
    },
    {
      title: "Rendez-vous programmé",
      description: "Client : Société ABC",
      time: "Il y a 2 h",
      icon: CalendarDays,
      color: "#7c3aed",
    },
    {
      title: "Appel non effectué",
      description: "Client : Jean Dupont",
      time: "Il y a 3 h",
      icon: CircleAlert,
      color: "#dc2626",
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1
          className="text-base font-semibold"
          style={{ color: "var(--text-h)" }}
        >
          Dashboard
        </h1>

        <p
          className="mt-1 text-xs"
          style={{ color: "var(--text)" }}
        >
          Vue générale de votre espace administrateur.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((statistic) => {
          const Icon = statistic.icon;

          return (
            <div
              key={statistic.label}
              className="rounded-xl bg-white p-4"
              style={{
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: statistic.bg,
                    color: statistic.color,
                  }}
                >
                  <Icon size={17} />
                </div>

                <span
                  className="text-xs"
                  style={{ color: "var(--text)" }}
                >
                  Ce mois
                </span>
              </div>

              <p
                className="mt-4 text-xl font-semibold"
                style={{ color: "var(--text-h)" }}
              >
                {statistic.value}
              </p>

              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text)" }}
              >
                {statistic.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Actions rapides */}
      <div>
        <div className="mb-3">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            Actions rapides
          </h2>

          <p
            className="mt-1 text-xs"
            style={{ color: "var(--text)" }}
          >
            Accédez rapidement aux principales fonctionnalités.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                type="button"
                className="flex items-center gap-3 rounded-xl bg-white p-3 text-left transition hover:-translate-y-0.5"
                style={{
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: action.bg,
                    color: action.color,
                  }}
                >
                  <Icon size={17} />
                </div>

                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-h)" }}
                >
                  {action.label}
                </span>

                <ArrowRight
                  size={14}
                  className="ml-auto"
                  style={{ color: "var(--text)" }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Graphique */}
      <div
        className="rounded-xl bg-white p-4 sm:p-5"
        style={{
          border: "1px solid var(--border)",
        }}
      >
        <div className="mb-5">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            Appels clients
          </h2>

          <p
            className="mt-1 text-xs"
            style={{ color: "var(--text)" }}
          >
            Évolution du nombre d'appels effectués cette semaine.
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={callsData}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />

              <XAxis
                dataKey="jour"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--text)",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{
                  fontSize: 11,
                  fill: "var(--text)",
                }}
              />

              <Tooltip
                contentStyle={{
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  fontSize: "12px",
                }}
                labelStyle={{
                  color: "var(--text-h)",
                }}
              />

              <Line
                type="monotone"
                dataKey="appels"
                stroke="var(--accent)"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "var(--accent)",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fonctionnement + Activité */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className="rounded-xl bg-white p-5"
          style={{
            border: "1px solid var(--border)",
          }}
        >
          <div className="mb-5">
            <h2
              className="text-sm font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              Comment fonctionne ClientFlow ?
            </h2>

            <p
              className="mt-1 text-xs"
              style={{ color: "var(--text)" }}
            >
              Les principales étapes de gestion de votre activité.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                number: 1,
                title: "Créez vos projets",
                text: "Créez vos projets et associez les collaborateurs concernés.",
              },
              {
                number: 2,
                title: "Ajoutez vos clients",
                text: "Centralisez les informations de vos clients dans ClientFlow.",
              },
              {
                number: 3,
                title: "Gérez vos appels",
                text: "Passez, programmez ou déléguez vos appels et ajoutez vos comptes rendus.",
              },
              {
                number: 4,
                title: "Suivez votre activité",
                text: "Consultez vos statistiques, rendez-vous et activités depuis le dashboard.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="flex gap-3"
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--accent-bg)",
                    color: "var(--accent)",
                  }}
                >
                  {item.number}
                </div>

                <div>
                  <h3
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-h)" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: "var(--text)" }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-xl bg-white p-5"
          style={{
            border: "1px solid var(--border)",
          }}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2
                className="text-sm font-semibold"
                style={{ color: "var(--text-h)" }}
              >
                Activité récente
              </h2>

              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text)" }}
              >
                Les dernières activités de votre espace.
              </p>
            </div>

            <Clock3
              size={17}
              style={{ color: "var(--text)" }}
            />
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="flex gap-3"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${activity.color}15`,
                      color: activity.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>

                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "var(--text-h)" }}
                    >
                      {activity.title}
                    </p>

                    <p
                      className="mt-0.5 text-xs"
                      style={{ color: "var(--text)" }}
                    >
                      {activity.description}
                    </p>

                    <p
                      className="mt-1 text-[10px]"
                      style={{ color: "var(--text)" }}
                    >
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Résumé des appels */}
      <div
        className="rounded-xl bg-white p-5"
        style={{
          border: "1px solid var(--border)",
        }}
      >
        <div className="mb-4">
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--text-h)" }}
          >
            Résumé des appels
          </h2>

          <p
            className="mt-1 text-xs"
            style={{ color: "var(--text)" }}
          >
            État actuel de vos appels.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: "#ecfdf5" }}
          >
            <CheckCircle2
              size={18}
              style={{ color: "#059669" }}
            />

            <p
              className="mt-3 text-lg font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              72
            </p>

            <p
              className="text-xs"
              style={{ color: "var(--text)" }}
            >
              Appels terminés
            </p>
          </div>

          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: "#fff7ed" }}
          >
            <Clock3
              size={18}
              style={{ color: "#ea580c" }}
            />

            <p
              className="mt-3 text-lg font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              18
            </p>

            <p
              className="text-xs"
              style={{ color: "var(--text)" }}
            >
              Appels programmés
            </p>
          </div>

          <div
            className="rounded-lg p-4"
            style={{ backgroundColor: "#fef2f2" }}
          >
            <CircleAlert
              size={18}
              style={{ color: "#dc2626" }}
            />

            <p
              className="mt-3 text-lg font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              10
            </p>

            <p
              className="text-xs"
              style={{ color: "var(--text)" }}
            >
              Appels non effectués
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardAdmin;