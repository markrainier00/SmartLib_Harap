import React from "react";
import { IconX } from "@/components/icons";

interface User {
  school_id: string;
  role: string;
  firstname: string;
  lastname: string;
  email: string;
  department: string;
  program: string;
  year: string;
  status: string;
  violation_count?: number;
  offense_count?: number;
}

interface UserDetailsProps {
  user: User | null;
  mode?: "view" | "edit";
  onClose: () => void;
  onLock?: (user: User) => void;
  onArchive?: (user: User) => void;
  onUnarchive?: (user: User) => void;
  onApprove?: (user: User) => void;
  onReject?: (user: User) => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ 
  user, mode = "view", onClose, onLock, onArchive, onUnarchive, onApprove, onReject 
}) => {
  if (!user || mode !== "view") return null;

  const isLocked = user.status === "Locked";
  const isPending = user.status === "Pending";

  return (
    <div className="overlay" onClick={onClose}>
      <div className="book-details" onClick={(e) => e.stopPropagation()}>

        <div className="bd-header">
          <button className="close" onClick={onClose}>
            <IconX />
          </button>
        </div>

        <div className="bd-scroll">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h3 className="page-header">User Information</h3>
          </div>

          {[
            { label: "Name",      value: `${user.firstname} ${user.lastname}` },
            { label: "School ID", value: user.school_id },
            { label: "Email",     value: user.email },
            ...(user.role === "Student" ? [
              { label: "Department", value: user.department ? `College of ${user.department}` : "—" },
              { label: "Program",    value: user.program || "—" },
              { label: "Year",       value: user.year ? `${user.year} Year` : "—" },
            ] : []),
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: "1px solid var(--color-surface)" }}>
              <span style={{ color: "var(--color-subtext)" }}>{label}</span>
              <span style={{ fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="bd-footer" style={{ justifyContent: "center", gap: 8 }}>
          {isPending ? (
            <>
              {onApprove && (
                <button className="btn bg-primary" onClick={() => onApprove(user)}>Approve</button>
              )}
              {onReject && (
                <button className="btn bg-error" onClick={() => onReject(user)}>Reject</button>
              )}
            </>
          ) : (
            <>
              {onLock && (
                <button className="btn bg-warning" onClick={() => onLock(user)}>{isLocked ? "Unlock Account" : "Lock Account"}</button>
              )}
              {onArchive && (
                <button className="btn bg-error" onClick={() => onArchive(user)}>Archive</button>
              )}
              {onUnarchive && (
                <button className="btn bg-primary" onClick={() => onUnarchive(user)}>Restore Account</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};