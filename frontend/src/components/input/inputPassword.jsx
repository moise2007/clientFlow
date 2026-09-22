import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function PasswordInput({ label, placeholder, errors = [] }) {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = errors.length > 0;

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium"
        style={{ color: "var(--text-h)" }}
      >
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          size={19}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: hasError ? "#dc2626" : "var(--text)" }}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full rounded-lg bg-white py-3 pl-10 pr-11 text-sm outline-none transition"
          style={{
            color: "var(--text-h)",
            border: `1px solid ${
              hasError ? "#dc2626" : "var(--border)"
            }`,
          }}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 transition"
          style={{ color: "var(--text)" }}
        >
          {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
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

export default PasswordInput;