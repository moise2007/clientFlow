import {
  CircleDollarSign,
  PhoneCall,
  Users,
} from "lucide-react";

function ProjectStats({ stats }) {
  if (!stats) {
    return null;
  }

  const items = [
    {
      label: "Clients",
      value: stats.nombreClients,
      icon: Users,
      color: "#60a5fa",
      background: "#172554",
    },
    {
      label: "Prix total",
      value: formatMoney(stats.prixTotal),
      icon: CircleDollarSign,
      color: "#fb923c",
      background: "#431407",
    },
    {
      label: "Prix moyen / client",
      value: formatMoney(stats.prixMoyenClient),
      icon: CircleDollarSign,
      color: "#34d399",
      background: "#052e1b",
    },
    {
      label: "Appels / client",
      value: stats.appelsMoyensClient,
      icon: PhoneCall,
      color: "#a78bfa",
      background: "#2e1065",
    },
  ];

  return (
    <div className="max-w-150">
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-lg border bg-white p-3"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  color: item.color,
                  backgroundColor: item.background,
                }}
              >
                <Icon size={16} strokeWidth={2} />
              </div>

              <p
                className="mt-2 text-sm font-semibold"
                style={{
                  color: "var(--text-h)",
                }}
              >
                {item.value}
              </p>

              <p
                className="mt-0.5 text-[10px]"
                style={{
                  color: "var(--text)",
                }}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatMoney(value = 0) {
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}

export default ProjectStats;