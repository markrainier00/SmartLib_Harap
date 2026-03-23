interface Props {
  password: string;
}

export default function PasswordStrength({ password }: Props) {
  if (!password) return null;

  const rules = [
    { label: "At least 8 characters",    valid: password.length >= 8 },
    { label: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Contains a number",         valid: /\d/.test(password) },
    { label: "Contains a symbol",         valid: /\W/.test(password) },
  ];
  
  const allValid = rules.every(rule => rule.valid);

  if (allValid) return null;

  return (
    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
      {rules.map(({ label, valid }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: valid ? "var(--color-success)" : "var(--color-error)", transition: "color 0.2s" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {valid
              ? <polyline points="20 6 9 17 4 12"/>
              : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            }
          </svg>
          {label}
        </div>
      ))}
    </div>
  );
}