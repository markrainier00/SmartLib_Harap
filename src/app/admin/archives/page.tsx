"use client";

import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import { IconSearch, IconX } from "@/components/icons";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";
import { UserDetails } from "@/components/UserDetails";

const PER_PAGE = 10;

export default function SuperAdminAccounts() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedUser, setSelectedUser] = useState<any>(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Processing...");
    const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
    const [systemResponse, setSystemResponse] = useState("");

    const [confirmModal, setConfirmModal] = useState<{
        open: boolean;
        title: string;
        message: string | React.ReactNode;
        onConfirm: () => void;
        confirmLabel: string;
        confirmColor: string;
    }>({ open: false, title: "", message: "", onConfirm: () => {}, confirmLabel: "Confirm", confirmColor: "" });

    const closeConfirm = () => setConfirmModal(prev => ({ ...prev, open: false }));

    const fetchAccounts = async () => {
        setIsLoading(true);
        try {
        const json = await api.get("/api/admin/archivedStudents");
        
        if (json.retCode === "200") {
            setAccounts(json.data);
        }
        } catch (error) {
        setSystemResponse("Failed to connect to server.");
        setSystemResponseOpen(true);
        } finally {
        setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchAccounts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const handleUnarchive = (user: any) => {
    setConfirmModal({
        open: true,
        title: "Restore Account",
        message: <>Restore <b>{user.firstname} {user.lastname}</b>'s account? They will be able to sign in again.</>,
        confirmLabel: "Restore",
        confirmColor: "bg-primary",
        onConfirm: async () => {
        closeConfirm();
        setLoadingMessage("Restoring account...");
        setIsLoadingOpen(true);
        try {
            const json = await api.put("/api/admin/status", {
            school_id: user.school_id,
            status: "Active",
            });
            if (json.retCode === "200") {
            setAccounts(prev => prev.filter(x => x.school_id !== user.school_id));
            setSelectedUser(null);
            setSystemResponse("Account restored successfully.");
            } else {
            setSystemResponse("Failed to restore account.");
            }
        } catch {
            setSystemResponse("Server error. Try again later.");
        } finally {
            setIsLoadingOpen(false);
            setSystemResponseOpen(true);
        }
        },
    });
    };

    const filtered = accounts.filter((a) => {
        const matchesSearch =
        a.firstname.toLowerCase().includes(search.toLowerCase()) ||
        a.lastname.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        a.school_id.toLowerCase().includes(search.toLowerCase());
        

        return matchesSearch;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
    
    const accountColumns = [
        {
            header: "Name",
            render: (a: any) => `${a.firstname} ${a.lastname}`,
        },
        {
            header: "School ID",
            thStyle: { textAlign: "center" as const },
            tdStyle: { textAlign: "center" as const },
            render: (a: any) => a.school_id,
        },
        {
            header: "Email",
            render: (a: any) => a.email,
        },
        {
            header: "Role",
            thStyle: { textAlign: "center" as const },
            tdStyle: { textAlign: "center" as const },
            render: (a: any) => (
                <span className={ `badge ${
                a.role === "Student" ? "badge-blue" :
                a.role === "Staff"   ? "badge-red" :
                "text-text"}`
                }>
                {a.role}
                </span>
            ),
        },
        {
            header: "Actions",
            thStyle: { textAlign: "center" as const },
            tdStyle: { textAlign: "center" as const },
            render: (a: any) => (
                <a href="#" className="hyperlink text-primary" style={{ textDecoration: "underline" }}
                onClick={(e) => { e.preventDefault(); setSelectedUser(a); }}>
                View Details
                </a>
            ),
        },
    ];

    return (
    <>
    <div className="app">
        <div className="page-layout fadeUp">
        <div style={{ marginBottom: 20 }}>
            <div className="page-header">Manage Archived Accounts</div>
            <div className="page-sub">Administrator control panel for archived students.</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 10 }}>
            <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
                <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
            </div>
            </div>
        </div>

        {/* Table */}
        <DataTable
            columns={accountColumns}
            data={paginated}
            loading={isLoading}
            emptyText="No accounts found."
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            perPage={PER_PAGE}
            onPageChange={setCurrentPage}
        />
        </div>
    </div>

    <UserDetails
        user={selectedUser}
        mode="view"
        onClose={() => setSelectedUser(null)}
        onUnarchive={handleUnarchive}
    />

    <Modal
        isOpen={confirmModal.open}
        title={confirmModal.title}
        message={confirmModal.message}
        onClose={closeConfirm}
        onConfirm={confirmModal.onConfirm}
        confirmText={confirmModal.confirmLabel}
        confirmColor={confirmModal.confirmColor}
        cancelText="Cancel"
        cancelColor="bg-subtext"
    />

    <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-primary" cancelText="Okay" />
    <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
    </>
    );
}