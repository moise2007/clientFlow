function AppDialog({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}) {
  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`w-full ${sizes[size]} max-h-[90vh] overflow-hidden rounded-xl bg-white`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="flex items-start justify-between border-b px-5 py-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="min-w-0">
            <h2
              className="text-sm font-semibold"
              style={{ color: "var(--text-h)" }}
            >
              {title}
            </h2>

            {description && (
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text)" }}
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-4 shrink-0 rounded-md px-2 py-1 text-lg hover:bg-gray-100"
            style={{ color: "var(--text)" }}
          >
            ×
          </button>
        </div>

        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AppDialog;