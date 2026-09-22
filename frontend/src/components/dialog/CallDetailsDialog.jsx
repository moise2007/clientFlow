import {
  CalendarDays,
  Clock3,
  Phone,
  UserRound,
  FileText,
} from "lucide-react";
import AppDialog from "./AppDialog";

function CallDetailsDialog({
  open,
  onClose,
  call,
}) {
  if (!call) return null;

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Détails de l'appel"
      description="Informations et suivi de l'appel."
      size="md"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Info
            icon={CalendarDays}
            label="Date"
            value={call.date}
          />

          <Info
            icon={Clock3}
            label="Heure"
            value={call.heure}
          />

          <Info
            icon={UserRound}
            label="Client"
            value={call.client}
          />

          <Info
            icon={Phone}
            label="Commercial"
            value={call.commercial || "Non attribué"}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <FileText size={15} />

            <h3
              className="text-xs font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              Rapport
            </h3>
          </div>

          <div
            className="rounded-lg p-3 text-xs leading-5"
            style={{
              backgroundColor: "#f8f8f8",
              color: "var(--text)",
            }}
          >
            {call.rapport || "Aucun rapport pour cet appel."}
          </div>
        </div>
      </div>
    </AppDialog>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <Icon size={14} style={{ color: "var(--text)" }} />

        <span
          className="text-[10px]"
          style={{ color: "var(--text)" }}
        >
          {label}
        </span>
      </div>

      <p
        className="mt-1 text-xs font-medium"
        style={{ color: "var(--text-h)" }}
      >
        {value}
      </p>
    </div>
  );
}

export default CallDetailsDialog;