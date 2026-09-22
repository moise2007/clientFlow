import { AlertTriangle, Trash2} from "lucide-react";
import AppDialog from "./AppDialog";

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  danger = true,
  loading = false,
}) {
  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
    >
      <div className="flex gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: danger ? "#fef2f2" : "#fff7ed",
            color: danger ? "#dc2626" : "#f97316",
          }}
        >
          {danger ? (
            <Trash2 size={17} />
          ) : (
            <AlertTriangle size={17} />
          )}
        </div>

        <p
          className="text-xs leading-5"
          style={{ color: "var(--text)" }}
        >
          {description}
        </p>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-lg border px-3 py-2 text-xs font-medium"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-h)",
          }}
        >
          {cancelText}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="rounded-lg px-3 py-2 text-xs font-medium text-white"
          style={{
            backgroundColor: danger ? "#dc2626" : "#2563eb",
          }}
        >
          {loading ? "Traitement..." : confirmText}
        </button>
      </div>
    </AppDialog>
  );
}

export default ConfirmDialog;