import { UserRound } from "lucide-react";
import AppDialog from "./AppDialog";

function SelectCommercialDialog({
  open,
  onClose,
  commercials,
  selectedIds,
  onSelect,
  onConfirm,
  loading = false,
}) {
  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="Attribuer les appels"
      description="Sélectionnez le commercial qui prendra en charge les appels."
      size="sm"
    >
      <div className="space-y-2">
        {commercials.map((commercial) => {
          const selected = selectedIds.includes(commercial.id);

          return (
            <button
              key={commercial.id}
              type="button"
              onClick={() => onSelect(commercial.id)}
              className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition"
              style={{
                borderColor: selected
                  ? "#2563eb"
                  : "var(--border)",
                backgroundColor: selected
                  ? "#eff6ff"
                  : "#fff",
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                }}
              >
                <UserRound size={16} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="text-xs font-semibold"
                  style={{ color: "var(--text-h)" }}
                >
                  {commercial.prenom} {commercial.nom}
                </p>

                <p
                  className="truncate text-[10px]"
                  style={{ color: "var(--text)" }}
                >
                  {commercial.email}
                </p>
              </div>

              <div
                className="h-4 w-4 rounded-full border"
                style={{
                  borderColor: selected
                    ? "#2563eb"
                    : "#d1d5db",
                  backgroundColor: selected
                    ? "#2563eb"
                    : "transparent",
                }}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={selectedIds.length === 0 || loading}
        onClick={onConfirm}
        className="mt-5 w-full rounded-lg py-2.5 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: "#2563eb" }}
      >
        {loading
          ? "Attribution..."
          : `Attribuer ${selectedIds.length} appel(s)`}
      </button>
    </AppDialog>
  );
}

export default SelectCommercialDialog;