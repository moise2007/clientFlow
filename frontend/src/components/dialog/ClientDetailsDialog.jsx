import { useRef, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Building2,
  CircleDollarSign,
  CalendarDays,
  Clock3,
  PhoneCall,
  FileText,
  Download,
  Trash2,
} from "lucide-react";
import AppDialog from "./AppDialog";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ClientDetailsDialog({
  open,
  onClose,
  client,
  onDelete,
}) {
  const contentRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  if (!client) return null;

  const statusConfig = {
    prospect: {
      label: "Prospect",
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
    qualifie: {
      label: "Qualifié",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    en_negociation: {
      label: "En négociation",
      color: "#ea580c",
      bg: "#fff7ed",
    },
    converti: {
      label: "Converti",
      color: "#059669",
      bg: "#ecfdf5",
    },
    perdu: {
      label: "Perdu",
      color: "#dc2626",
      bg: "#fef2f2",
    },
  };

  const currentStatus =
    statusConfig[client.statut] || statusConfig.prospect;

  const downloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      setDownloading(true);

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imageWidth = pageWidth;
      const imageHeight =
        (canvas.height * imageWidth) / canvas.width;

      let position = 0;

      while (position < imageHeight) {
        pdf.addImage(
          image,
          "PNG",
          0,
          -position,
          imageWidth,
          imageHeight
        );

        position += pageHeight;

        if (position < imageHeight) {
          pdf.addPage();
        }
      }

      const safeName = `${client.prenom || ""}-${client.nom || "client"}`
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();

      pdf.save(`client-${safeName}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Fiche client"
      description="Informations, appels et historique du client."
      size="lg"
    >
      <div ref={contentRef}>
        {/* EN-TÊTE CLIENT */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "#eff6ff",
                color: "#2563eb",
              }}
            >
              <UserRound size={20} />
            </div>

            <div className="min-w-0">
              <h2
                className="truncate text-sm font-semibold"
                style={{ color: "var(--text-h)" }}
              >
                {client.prenom} {client.nom}
              </h2>

              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--text)" }}
              >
                Client depuis{" "}
                {client.dateCreation || "Date inconnue"}
              </p>
            </div>
          </div>

          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium"
            style={{
              color: currentStatus.color,
              backgroundColor: currentStatus.bg,
            }}
          >
            {currentStatus.label}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadPDF}
            disabled={downloading}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium text-white disabled:opacity-50"
            style={{
              backgroundColor: "#2563eb",
            }}
          >
            <Download size={14} />

            {downloading ? "Génération..." : "Télécharger"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(client)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium"
            style={{
              backgroundColor: "#fef2f2",
              color: "#dc2626",
            }}
          >
            <Trash2 size={14} />
            Supprimer
          </button>
        </div>

        {/* INFORMATIONS PRINCIPALES */}
        <div className="mt-5">
          <SectionTitle title="Informations du client" />

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              icon={Mail}
              label="Email"
              value={client.email || "Non renseigné"}
            />

            <InfoItem
              icon={Phone}
              label="Téléphone"
              value={client.telephone || "Non renseigné"}
            />

            <InfoItem
              icon={Building2}
              label="Entreprise"
              value={client.entreprise || "Non renseignée"}
            />

            <InfoItem
              icon={CircleDollarSign}
              label="Coût d'acquisition"
              value={`${formatMoney(client.coutClient)} FCFA`}
            />
          </div>
        </div>

        {/* INFORMATIONS COMMERCIALES */}
        <div className="mt-6">
          <SectionTitle title="Informations commerciales" />

          <div
            className="mt-3 grid grid-cols-2 gap-3 rounded-lg border p-3"
            style={{ borderColor: "var(--border)" }}
          >
            <Metric
              label="Appels"
              value={client.appels?.length || 0}
              icon={PhoneCall}
            />

            <Metric
              label="Rapports"
              value={
                client.appels?.filter(
                  (appel) => appel.rapport
                ).length || 0
              }
              icon={FileText}
            />
          </div>
        </div>

        {/* HISTORIQUE DES APPELS */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <SectionTitle title="Historique des appels" />

            <span
              className="text-[10px]"
              style={{ color: "var(--text)" }}
            >
              {client.appels?.length || 0} appel(s)
            </span>
          </div>

          <div className="mt-3 space-y-3">
            {!client.appels ||
            client.appels.length === 0 ? (
              <EmptyState />
            ) : (
              client.appels.map((appel) => (
                <CallHistory
                  key={appel.id}
                  appel={appel}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </AppDialog>
  );
}

function SectionTitle({ title }) {
  return (
    <h3
      className="text-xs font-semibold"
      style={{ color: "var(--text-h)" }}
    >
      {title}
    </h3>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-2">
        <Icon
          size={14}
          style={{ color: "var(--text)" }}
        />

        <span
          className="text-[10px]"
          style={{ color: "var(--text)" }}
        >
          {label}
        </span>
      </div>

      <p
        className="mt-1.5 truncate text-xs font-medium"
        style={{ color: "var(--text-h)" }}
      >
        {value}
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon
        size={15}
        style={{ color: "var(--text)" }}
      />

      <div>
        <p
          className="text-[10px]"
          style={{ color: "var(--text)" }}
        >
          {label}
        </p>

        <p
          className="text-xs font-semibold"
          style={{ color: "var(--text-h)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function CallHistory({ appel }) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "#eff6ff",
              color: "#2563eb",
            }}
          >
            <PhoneCall size={14} />
          </div>

          <div className="min-w-0">
            <p
              className="text-xs font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              {appel.titre || "Appel client"}
            </p>

            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              <span
                className="flex items-center gap-1 text-[10px]"
                style={{ color: "var(--text)" }}
              >
                <CalendarDays size={11} />
                {appel.date || "Date inconnue"}
              </span>

              <span
                className="flex items-center gap-1 text-[10px]"
                style={{ color: "var(--text)" }}
              >
                <Clock3 size={11} />
                {appel.heure || "--:--"}
              </span>
            </div>
          </div>
        </div>

        <CallStatus status={appel.statut} />
      </div>

      <div
        className="mt-3 border-t pt-3"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[10px]"
            style={{ color: "var(--text)" }}
          >
            Commercial
          </span>

          <span
            className="text-[10px] font-medium"
            style={{ color: "var(--text-h)" }}
          >
            {appel.commercial
              ? `${appel.commercial.prenom} ${appel.commercial.nom}`
              : "Non attribué"}
          </span>
        </div>

        <div className="mt-3">
          <div className="mb-1.5 flex items-center gap-1.5">
            <FileText
              size={12}
              style={{ color: "var(--text)" }}
            />

            <span
              className="text-[10px] font-medium"
              style={{ color: "var(--text-h)" }}
            >
              Rapport
            </span>
          </div>

          <div
            className="rounded-md p-2.5 text-[11px] leading-5"
            style={{
              backgroundColor: "#f8f8f8",
              color: "var(--text)",
            }}
          >
            {appel.rapport ||
              "Aucun rapport n'a été ajouté pour cet appel."}
          </div>
        </div>
      </div>
    </div>
  );
}

function CallStatus({ status }) {
  const config = {
    programme: {
      label: "Programmé",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    en_cours: {
      label: "En cours",
      color: "#ea580c",
      bg: "#fff7ed",
    },
    termine: {
      label: "Terminé",
      color: "#059669",
      bg: "#ecfdf5",
    },
    annule: {
      label: "Annulé",
      color: "#dc2626",
      bg: "#fef2f2",
    },
  };

  const current = config[status] || config.programme;

  return (
    <span
      className="shrink-0 rounded-full px-2 py-1 text-[9px] font-medium"
      style={{
        color: current.color,
        backgroundColor: current.bg,
      }}
    >
      {current.label}
    </span>
  );
}

function EmptyState() {
  return (
    <div
      className="rounded-lg border border-dashed p-6 text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <PhoneCall
        size={20}
        className="mx-auto"
        style={{ color: "var(--text)" }}
      />

      <p
        className="mt-2 text-xs font-medium"
        style={{ color: "var(--text-h)" }}
      >
        Aucun appel
      </p>

      <p
        className="mt-1 text-[10px]"
        style={{ color: "var(--text)" }}
      >
        Aucun appel n'est encore associé à ce client.
      </p>
    </div>
  );
}

function formatMoney(value) {
  if (value === undefined || value === null) {
    return "0";
  }

  return new Intl.NumberFormat("fr-FR").format(value);
}

export default ClientDetailsDialog;