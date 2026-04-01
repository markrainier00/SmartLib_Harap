import { useState } from "react";

interface Props {
    label: string;
    type?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    suffix?: React.ReactNode;
    pattern?: string;
    minLength?: number;
    id?: string;
}

export default function FloatingInput({
    label,
    type = "text",
    value,
    onChange,
    required,
    suffix,
    pattern,
    minLength,
    id,
}: Props) {
    const [focused, setFocused] = useState(false);
    const isFloating = focused || (value !== undefined && value !== null && value.toString().length > 0);

  return (
    <div style={{ position: "relative", marginBottom: 12 }}>
        <label
            htmlFor={id}
            style={{
                position: "absolute",
                left: 13,
                top: isFloating ? -8 : "50%",
                transform: isFloating ? "none" : "translateY(-50%)",
                fontSize: isFloating ? 10.5 : 13.5,
                fontWeight: isFloating ? 700 : 400,
                letterSpacing: isFloating ? "0.06em" : "0",
                textTransform: isFloating ? "uppercase" : "none",
                color: isFloating ? "var(--color-primary)" : "var(--color-muted)",
                background: isFloating ? "#fff" : "transparent",
                padding: isFloating ? "0 4px" : "0",
                transition: "all 0.2s ease",
                pointerEvents: "none",
                zIndex: 1,
            }}
        >
        {label}
        </label>
        <div className="input-wrap">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required={required}
                readOnly={!onChange}
                pattern={pattern}
                minLength={minLength}
                className={suffix ? "has-icon" : ""}
                style={{
                    width: "100%",
                    border: `1.5px solid ${focused ? "var(--color-primary-deep)" : "var(--color-muted)"}`,
                    borderRadius: 11,
                    padding: "11px 13px",
                    fontSize: 13.5,
                    color: required ? "black" : "var(--color-subtext)",
                    outline: "none",
                    transition: "all 0.2s",
                    boxShadow: focused ? "none" : "none",
                }}
            />
        {suffix && (
            <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
                {suffix}
            </div>
        )}
    </div>
    </div>
  );
}