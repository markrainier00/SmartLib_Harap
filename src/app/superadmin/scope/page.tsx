"use client";

import { api } from "@/lib/api";
import { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import { IconSearch, IconX } from "@/components/icons";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";
import FloatingInput from "@/components/ui/FloatingInput";

const PER_PAGE = 10;

export default function SuperAdminAccounts() {
    const [programs, setPrograms] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedProgram, setSelectedProgram] = useState<any>(null);
    const [showAddProgram, setShowAddProgram] = useState(false);
    const [programForm, setProgramForm] = useState({ department: "", program: "", duration: 0 });
    const [editForm, setEditForm] = useState({ department: "", program: "", duration: 0 });

    const [confirmModal, setConfirmModal] = useState<{
        open: boolean;
        title: string;
        message: React.ReactNode;
        onConfirm: () => void;
        confirmLabel: string;
        confirmColor: string;
    }>({ open: false, title: "", message: "", onConfirm: () => {}, confirmLabel: "Confirm", confirmColor: "" });

    const closeConfirm = () => setConfirmModal(prev => ({ ...prev, open: false }));
    
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Processing...");
    const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
    const [systemResponse, setSystemResponse] = useState("");

    const fetchAccounts = async () => {
        setIsLoading(true);
        try {
            const json = await api.get("/api/admin/school");
            
            if (json.retCode === "200") {
                setPrograms(json.data);
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

    const handleAddProgram = async () => {
        setLoadingMessage("Adding program...");
        setIsLoadingOpen(true);
        try {
            const json = await api.post("/api/admin/program", programForm);
            if (json.retCode === "201") {
                setPrograms(prev => [...prev, json.data]);
                setProgramForm({ department: "", program: "", duration: 0 });
                setShowAddProgram(false);
                setSystemResponse("Program added successfully.");
            } else {
                setSystemResponse(json.message || "Failed to add program.");
            }
        } catch {
            setSystemResponse("Server error. Try again later.");
        } finally {
            setIsLoadingOpen(false);
            setSystemResponseOpen(true);
        }
    };

    const handleDelete = (a: any) => {
        setConfirmModal({
            open: true,
            title: "Remove Program",
            message: <>Remove <b>{a.program}</b> from <b>{a.department}</b>? Students under this program won't be able to register.</>,
            confirmLabel: "Remove",
            confirmColor: "bg-error",
            onConfirm: async () => {
                closeConfirm();
                setLoadingMessage("Removing program...");
                setIsLoadingOpen(true);
                try {
                    const json = await api.delete(`/api/admin/program/${a.id}`);
                    if (json.retCode === "200") {
                        setPrograms(prev => prev.filter(x => x.id !== a.id));
                        setSystemResponse("Program removed successfully.");
                    } else {
                        setSystemResponse("Failed to remove program.");
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

    const handleEditProgram = async () => {
        const id = selectedProgram.id;
        setSelectedProgram(null);
        setLoadingMessage("Updating program...");
        setIsLoadingOpen(true);
        try {
            const json = await api.put(`/api/admin/program/${id}`, editForm); // ← use id
            if (json.retCode === "200") {
                setPrograms(prev => prev.map(x => x.id === id ? { ...x, ...editForm } : x)); // ← use id
                setSystemResponse("Program updated successfully.");
            } else {
                setSystemResponse(json.message || "Failed to update program.");
            }
        } catch {
            setSystemResponse("Server error. Try again later.");
        } finally {
            setIsLoadingOpen(false);
            setSystemResponseOpen(true);
        }
    };

    const filtered = programs.filter((a) => {
        const matchesSearch =
        a.department.toLowerCase().includes(search.toLowerCase()) ||
        a.program.toLowerCase().includes(search.toLowerCase());
        
        return matchesSearch;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated  = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
    
    const schoolColumns = [
        {
            header: "Department",
            thStyle: { textAlign: "center" as const },
            tdStyle: { textAlign: "center" as const },
            render: (a: any) => a.department,
        },
        {
            header: "Program",
            thStyle: { textAlign: "center" as const },
            tdStyle: { textAlign: "center" as const },
            render: (a: any) => a.program,
        },
        {
            header: "Duration (Years)",
            thStyle: { textAlign: "center" as const },
            tdStyle: { textAlign: "center" as const },
            render: (a: any) => a.duration,
        },
        {
            header: "Actions",
            thStyle: { textAlign: "center" as const },
            tdStyle: { textAlign: "center" as const },
            render: (a: any) => (
                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                <button className="badge" style={{ background: "var(--color-success)", color: "#ffffff", cursor: "pointer", fontWeight: "300" }}
                    onClick={() => {
                        setSelectedProgram(a);
                        setEditForm({ department: a.department, program: a.program, duration: a.duration });
                    }}>
                    Edit
                </button>
                <button className="badge" style={{ background: "var(--color-error)", color: "#ffffff", cursor: "pointer", fontWeight: "300" }}
                    onClick={() => handleDelete(a)}>
                    Remove
                </button>
                </div>
            ),
            },
    ];

    return (
    <>
    <div className="app">
        <div className="page-layout fadeUp">
        <div style={{ marginBottom: 20 }}>
            <div className="page-header">Manage Programs</div>
            <div className="page-sub">Control which departments and programs are allowed to register.</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 10 }}>
            <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
                <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
            </div>
            <button className="btn w-auto px-4 py-2" onClick={() => setShowAddProgram(true)}>Add Program</button>
            {(search) && (
                <button className="pills" onClick={() => { setSearch(""); }} style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777777" }}>
                Reset
                </button>
            )}
            </div>
        </div>

        {/* Table */}
        <DataTable
            columns={schoolColumns}
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

    {/* Add Program Modal */}
    {showAddProgram && (
    <div className="overlay" onClick={() => setShowAddProgram(false)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
            <button className="close" onClick={() => setShowAddProgram(false)}><IconX /></button>
        </div>
        <div className="modal-scroll">
            <div className="page-header">Add Program</div>
            <div style={{ marginTop: 20 }}>
            <FloatingInput label="Department" value={programForm.department} onChange={e => setProgramForm({ ...programForm, department: e.target.value })} required />
            <FloatingInput label="Program" value={programForm.program} onChange={e => setProgramForm({ ...programForm, program: e.target.value })} required />
            <FloatingInput label="Duration (years)" type="number" value={String(programForm.duration)} onChange={e => setProgramForm({ ...programForm, duration: parseInt(e.target.value) || 0 })} required />
            </div>
        </div>
        <div className="modal-footer" style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn" style={{ background: "var(--color-primary)", color: "#fff" }} onClick={handleAddProgram}>
            Add Program
            </button>
        </div>
        </div>
    </div>
    )}
    {selectedProgram && (
        <div className="overlay" onClick={() => setSelectedProgram(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close" onClick={() => setSelectedProgram(null)}><IconX /></button>
                </div>
                <div className="modal-scroll">
                    <div className="page-header mb-5">Edit Program</div>
                    <div style={{ marginTop: 20 }}>
                        <FloatingInput label="Department" value={editForm.department} onChange={e => setEditForm({ ...editForm, department: e.target.value })} required />
                        <FloatingInput label="Program" value={editForm.program} onChange={e => setEditForm({ ...editForm, program: e.target.value })} required />
                        <FloatingInput label="Duration (years)" type="number" value={String(editForm.duration)} onChange={e => setEditForm({ ...editForm, duration: parseInt(e.target.value) || 0 })} required />
                    </div>
                </div>
                <div className="modal-footer" style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button className="btn" style={{ background: "var(--color-primary)", color: "#fff" }}
                        onClick={handleEditProgram}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )}
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