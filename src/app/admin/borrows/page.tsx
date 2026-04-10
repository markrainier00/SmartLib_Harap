"use client";

import { api } from "@/lib/api"
import React, { useState, useEffect } from "react";
import { IconSearch, IconX } from "@/components/icons";
import DataTable from "@/components/DataTable";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingTextarea from "@/components/ui/FloatingTextarea";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);
    
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Processing...");
    const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
    const [systemResponse, setSystemResponse] = useState("");

    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("oldest");

    const [returnDate, setReturnDate] = useState("");
    const [returnedModal, setReturnedModal] = useState<any>(null);
    const [rejectRequestReason, setRejectRequestReason] = useState("");
    const [checkboxCondition, setCheckboxCondition] = useState([]);
    const [otherCondition, setOtherCondition] = useState([]);
    const [bookCondition, setBookCondition] = useState("");
    const conditionOptions = [
        "Torn Pages", "Folded Pages", "Food Stains", "Written Marks",
        "Damaged Cover", "Water Damage", "Missing Pages", "Loose Binding"
    ];
    const DATE = ["Recent Borrow", "Oldest Borrow", "Return Soon", "Return Late"]
    const PER_PAGE = 10;
    
    const fetchBorrows = async () => {
        setLoading(true);
        try {
        const json = await api.getPublic("/api/transactions/getActiveBorrow");
        if (json.retCode === "200" || json.isSuccess) {
            setRequests(json.data);
        } else {
            setRequests([]);
        }
        } catch (err) {
        console.error("Failed to fetch requests", err);
        } finally {
        setLoading(false);
        }
    };
    useEffect(() => {
        fetchBorrows();
    }, []);

    // Determine if the book is overdue or still on time
    const getReturnStatus = (returnDateStr: string) => {
        const returnDate = new Date(returnDateStr);
        const today = new Date();

        returnDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
            (today.getTime() - returnDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        return diffDays;
    };

    // ── Filter ──
    const filtered = requests.filter(r => {
        const matchesSearch = (r.isbn || "").toLowerCase().includes(search.toLowerCase()) || (r.school_id || "").includes(search);
        return matchesSearch;
    });
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // ── Sort ──
    const sortedRequests = [...filtered].sort((a, b) => {
        const aCreated = new Date(a.borrow_date).getTime();
        const bCreated = new Date(b.borrow_date).getTime();
        const aPickup = new Date(a.return_date).getTime();
        const bPickup = new Date(b.return_date).getTime();

        if (sortOption === "Recent Borrow") {
            return bCreated - aCreated;
        } 
        else if (sortOption === "Oldest Borrow") {
            return aCreated - bCreated;
        } 
        else if (sortOption === "Return Soon") {
            return aPickup - bPickup;
        } 
        else if (sortOption === "Return Late") {
            return bPickup - aPickup;
        } 
        else {
            return 0;
        }
    });

    // ── Paginate ──
    const totalPages   = Math.ceil(sortedRequests.length / PER_PAGE);
    const paginated    = sortedRequests.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    const borrowColumns = [
        {
        header: "School ID",
        render: (r: any) => r.school_id,
        },
        {
        header: "Book ISBN",
        render: (r: any) => r.isbn,
        },
        {
        header: "Date Borrowed",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => new Date(r.borrow_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", }),
        },
        {
        header: "Return Date",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => {
            const days = getReturnStatus(r.return_date);
            const formatted = new Date(r.return_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", });

            return (
                <span style={{ color: days > 0 ? "#c94040" : "inherit" }}>
                    {formatted} {days > 0 && `(${days} ${ days > 1 ? "days" : "day" } overdue)`}
                </span>
            );
            }
        },
        {
        header: "Actions",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r) => (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", justifyContent: "center" }}>
            <button className="badge" style={{ background: "var(--color-success)", color: "#ffffff", cursor: "pointer", fontWeight: "300" }}
                onClick={() => setReturnedModal({ mode: "approve", ...r })}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1b7d3c";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--color-success)";
                }}
            >
                Mark As Returned
            </button>
            </div>
        )
        },
    ];

    const handleReturn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!returnedModal) return;

        setLoadingMessage("Processing book return...");
        setIsLoadingOpen(true);

        try {
            const overdueDays = getReturnStatus(returnedModal.return_date);
            
            let overduePoint = 0;
            if (overdueDays > 0 && overdueDays <= 3) overduePoint = 1;
            else if (overdueDays > 3 && overdueDays <= 6) overduePoint = 2;
            else if (overdueDays >= 7) overduePoint = 3;

            const conditionPoint = checkboxCondition.length + otherCondition.length;
            const violationCount = overduePoint + conditionPoint;

            const violationList = [
                ...checkboxCondition,
                ...otherCondition,
                ...(overdueDays > 0 
                    ? [`Overdue: ${overdueDays} day${overdueDays > 1 ? "s" : ""}`] 
                    : [])
            ];
            const violation = violationList.join(", ");

            const json = await api.put(`/api/transactions/returnBook/${returnedModal.id}`, {
                violation_count: violationCount,
                violation: violation,
                overdue_point: overduePoint,
            });
        
            if (json.retCode === "200") {
                setSystemResponse("Book marked as returned.");
                await fetchBorrows();
                setReturnedModal(null);
            } else {
                setSystemResponse( json.message || "Failed to process book return." );
            }
        } catch (err) {
            setSystemResponse("Server connection failed.");
        } finally {
            setIsLoadingOpen(false);
            setSystemResponseOpen(true);
        }
    };

    return (
        <>
        <div className="app">
            <div className="page-layout fadeUp">
            <div style={{ marginBottom: 20 }}>
                <div className="page-header">Active Book Borrows</div>
                <div className="page-sub">Manage student book borrows</div>
            </div>
            
            <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, gap: 10 }}>
                <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
                    <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
                </div>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="pills">
                    {DATE.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>

            {/* TABLE */}
            <DataTable
                columns={borrowColumns}
                data={paginated}
                loading={isLoading}
                emptyText="No books found."
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filtered.length}
                perPage={PER_PAGE}
                onPageChange={setCurrentPage}
            />
            </div>
        </div>

        {/* ── Modal: Return ── */}
        {returnedModal && (
            <form onSubmit={handleReturn}>
            <div className="overlay" onClick={() => setReturnedModal(null)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close" onClick={() => setReturnedModal(null)} ><IconX/></button>
                </div>
                <div className="modal-scroll">
                    <div style={{ textAlign: "center" }}>
                        <div className="page-header">Book Return</div>
                    </div>
                    <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "right" }}>
                        <div className="form-row">
                            <FloatingInput label="School ID" type="text" value={returnedModal.school_id}/>
                            <FloatingInput label="Book ISBN" type="text" value={returnedModal.isbn}/>
                        </div>
                        <div className="form-row">
                            <FloatingInput label="Borrow Date" type="text" value={returnedModal?.created_at
                                ? new Date(returnedModal.borrow_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", }) 
                                : "-"}/>
                            <FloatingInput label="Return Date" type="text" value={returnedModal?.created_at
                                ? new Date(returnedModal.return_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", }) 
                                : "-"}/>
                        </div>
                        <p className="badge badge-red">{getReturnStatus(returnedModal.return_date) > 0 && `The book is ${getReturnStatus(returnedModal.return_date)} ${getReturnStatus(returnedModal.return_date) > 1 ? "days" : "day" }  overdue.`}</p>
                    </div>
                    
                    <label className="page-sub text-xs text-primary-deep"></label>
                    <label className="page-sub text-xs text-primary-deep">Book Damage</label>
                    <div style={{ marginBottom: 10, border: "1px solid var(--color-muted)", borderRadius: "10px", padding: "10px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px", marginBottom: 20 }}>
                        {conditionOptions.map((cond) => (
                            <label key={cond} style={{ display: "flex", alignItems: "center", fontSize: "13.5px", gap: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={checkboxCondition.includes(cond)}
                                    onChange={(e) => {
                                    if (e.target.checked) {
                                        setCheckboxCondition([...checkboxCondition, cond]);
                                    } else {
                                        setCheckboxCondition(checkboxCondition.filter(c => c !== cond));
                                    }
                                    }}
                                />
                                {cond}
                            </label>
                        ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <div style={{ flex: 1 }}>
                                <FloatingInput label="Other Condition" type="text" value={bookCondition} onChange={(e) => setBookCondition(e.target.value)}/>
                            </div>
                            <button
                                className="btn w-auto px-4 py-2 mt-0 mb-3"
                                type="button"
                                onClick={() => {
                                    const val = bookCondition.trim();
                                    if (!val || otherCondition.includes(val)) return;
                                    setOtherCondition([...otherCondition, val]);
                                    setBookCondition("");
                                }}
                            >
                                Add
                            </button>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                        {otherCondition.map((cond, idx) => (
                            <span key={idx} style={{
                            background: "var(--color-success-bg)",
                            color: "#2d7a4f",
                            padding: "4px 10px",
                            border: "1px solid var(--color-primary)",
                            borderRadius: 20,
                            fontSize: 12.5,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6
                            }}>
                            {cond}
                            <button
                                type="button"
                                onClick={() => {
                                setOtherCondition(otherCondition.filter((_, i) => i !== idx));
                                }}
                                style={{ background: "none", border: "none", color: "#c94040", cursor: "pointer" }}
                            >
                                <IconX />
                            </button>
                            </span>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn" disabled={isLoadingOpen}>Mark as Returned</button>
                </div>
                </div>
            </div>
            </form>
        )}
            
        {/* Modal for displaying messages */}
        <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-subtext" cancelText="Close"/>
        <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
        </>
    );
}