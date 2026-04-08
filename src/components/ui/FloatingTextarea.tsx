import { useState, useRef, useEffect } from "react";

interface Props {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  id?: string;
  placeholder?: string;
  minLength?: number;
  suffix?: React.ReactNode;
  rows?: number;
}

export default function FloatingTextarea({
  label,
  value,
  onChange,
  required,
  id,
  placeholder,
  minLength,
  suffix
}: Props) {
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isFloating = focused || value.length > 0;

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

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

      <div className="input-wrap" style={{ position: "relative" }}>
        <textarea
            ref={textareaRef}
            id={id}
            value={value}
            onChange={(e) => {
                onChange?.(e);
                adjustHeight();
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            readOnly={!onChange}
            placeholder={placeholder}
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
            resize: "vertical",
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