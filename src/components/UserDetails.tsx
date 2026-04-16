import React from "react";
import { IconX, IconEdit, IconTrash, IconLogo } from "@/components/icons";

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

interface BookDetailsProps {
  user: User | null;
  mode?: "view" | "edit";
  onClose: () => void;
  role?: "Student" | "Staff";
  onEdit?: (book: User) => void;
  onDelete?: (book: User) => void;
  handleBookRequest?: (pickupDate: string) => void;
}

export const UserDetails: React.FC<BookDetailsProps> = ({ user, mode = "view", onClose, role, onEdit, onDelete, handleBookRequest }) => {
    const [imgError, setImgError] = React.useState<{ [key: string]: boolean }>({});
    const [requestStep, setRequestStep] = React.useState<"details" | "form">("details");
    const [pickupDate, setPickupDate] = React.useState("");
    if (!user || mode !== "view") return null;

    return (
    <div className="overlay" onClick={onClose}>
      <div className="book-details" onClick={(e) => e.stopPropagation()}>
        <div className="bd-header">
          <button className="close" onClick={onClose}>
            <IconX />
          </button>
        </div>

        <div className="bd-scroll">
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h3 className="page-header text-black">{user.firstname} {user.lastname}</h3>
            <p className="page-sub">{user.school_id}</p>
            <p className="page-sub">{user.email}</p>
            <p className="page-sub text-xs">
                College of {user.department}<br />
                {user.program}<br />
                {user.year} Year
            </p>
          </div>
        </div>
            <>
                <p className="text-xs">{user.status}</p>
            {onEdit && <button className="btn px-4 py-2 w-auto" onClick={() => onEdit(user)}><IconEdit /></button>}
            {onDelete && <button className="btn px-4 py-2 bg-error w-auto" onClick={() => onDelete(user)}><IconTrash /></button>}
            </>

        <div className="bd-footer">
        
        <>
            {/* {requestStep === "details" && (
            <div style={{ display: "flex", gap: "10px" }}>
                {user.available ? (
                <button
                    style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "#1B5E35", color: "#fff", fontWeight: 600, cursor: "pointer" }}
                    onClick={() => setRequestStep("form")}
                >
                    Request
                </button>
                ) : (
                <button
                    style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "#e89940", color: "#fff", fontWeight: 600, cursor: "pointer" }}
                    onClick={() => { alert('You are now in queue!'); onClose(); }}
                >
                    Notify When Available
                </button>
                )}
            </div>
            )} */}

            {/* {requestStep === "form" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                style={{ padding: "10px", borderRadius: "10px", border: "1px solid #C3DDD0" }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                <button
                    style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: "#1B5E35", color: "#fff", fontWeight: 600 }}
                    onClick={() => handleBookRequest(pickupDate)}
                    disabled={!pickupDate}
                >
                    Confirm
                </button>
                <button
                    style={{ flex: 1, padding: "14px", borderRadius: "12px", border: "2px solid #C3DDD0", background: "#fff", color: "#1B5E35", fontWeight: 600 }}
                    onClick={() => setRequestStep("details")}
                >
                    Cancel
                </button>
                </div>
            </div>
            )} */}
        </>
        </div>
      </div>
    </div>
  );
};