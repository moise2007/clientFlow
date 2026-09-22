function Input({
  label,
  type = "text",
  placeholder,
  icon,
  errors = [],
}) {
  const hasError = errors.length > 0;

  const inputModes = {
    text: "text",
    email: "email",
    tel: "tel",
  };

  const inputMode = inputModes[type] || "text";

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium"
        style={{ color: "var(--text-h)" }}
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{
              color: hasError ? "#dc2626" : "var(--text)",
            }}
          >
            {icon}
          </div>
        )}

        <input
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          className="w-full rounded-lg bg-white py-3 pr-3 text-sm outline-none transition"
          style={{
            color: "var(--text-h)",
            border: `1px solid ${
              hasError ? "#dc2626" : "var(--border)"
            }`,
            paddingLeft: icon ? "2.5rem" : "0.75rem",
          }}
        />
      </div>

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-xs text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Input;