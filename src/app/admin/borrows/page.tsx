"use client";

import { api } from "@/lib/api"
import { useUser } from "@/lib/user"
import React, { useState, useEffect } from "react";
import { IconSearch, IconX } from "@/components/icons";
import DataTable from "@/components/DataTable";
import FloatingInput from "@/components/ui/FloatingInput";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminRequestsPage() {
    const { fullName }= useUser();
    const [activeTab, setActiveTab] = useState("Approved");
    const [currentPage, setCurrentPage] = useState(1);
    const [borrows, setBorrows] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Processing...");
    const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
    const [systemResponse, setSystemResponse] = useState("");

    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("oldest");

    const [borrowModal, setBorrowModal] = useState<any>(null);
    const [borrowSchoolId, setBorrowSchoolId] = useState("");
    const [borrowIsbn, setBorrowIsbn] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [returnedModal, setReturnedModal] = useState<any>(null);
    const [checkboxCondition, setCheckboxCondition] = useState([]);
    const [otherCondition, setOtherCondition] = useState([]);
    const [bookCondition, setBookCondition] = useState("");
    const conditionOptions = [
        "Torn Pages", "Folded Pages", "Food Stains", "Written Marks",
        "Damaged Cover", "Water Damage", "Missing Pages", "Loose Binding"
    ];
    const TABS = ["Approved", "Borrows"]
    const DATE = ["Recent Borrow", "Oldest Borrow", "Return Soon", "Return Late"]
    const PER_PAGE = 10;
    
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [borrowRes, requestRes, usersRes, booksRes] = await Promise.all([
                api.get("/api/transactions/getActiveBorrow"),
                api.get("/api/transactions/getApprovedRequests"),
                api.get(`/api/admin/studentUsers`),
                api.get(`/api/books/getBooks`),
            ]);

            if (borrowRes.isSuccess) setBorrows(borrowRes.data || []);
            if (requestRes.isSuccess) setRequests(requestRes.data || []);
            if (usersRes.retCode === "200") setUsers(usersRes.data || []);
            if (booksRes.isSuccess) setBooks(booksRes.data || []);
        } catch (err) {
            console.error("Failed to fetch requests", err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();

        const prefillBook = localStorage.getItem("prefillBook");
        const prefillStudent = localStorage.getItem("prefillStudent");

        if (prefillBook || prefillStudent) {
            if (prefillBook) {
                const book = JSON.parse(prefillBook);
                setSelectedBook(book);
                setBorrowIsbn(book.isbn);
                localStorage.removeItem("prefillBook");
            }
            if (prefillStudent) {
                const student = JSON.parse(prefillStudent);
                setSelectedStudent(student);
                setBorrowSchoolId(student.school_id);
                localStorage.removeItem("prefillStudent");
            }
            setBorrowModal({ mode: "add" });
        }
    }, []);

    useEffect(() => {
        fetchData();

        // Autofill from library page redirect
        const prefill = localStorage.getItem("prefillBook");
        if (prefill) {
            const book = JSON.parse(prefill);
            setSelectedBook(book);
            setBorrowIsbn(book.isbn);
            setBorrowModal({ mode: "add" });
            localStorage.removeItem("prefillBook");
        }
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
    const activeData = activeTab === "Borrows" ? borrows : requests;
    const filtered = activeData.filter(r => {
        const matchesSearch = (r.isbn || "").toLowerCase().includes(search.toLowerCase()) || (r.school_id || "").includes(search);
        return matchesSearch;
    });
    useEffect(() => {
        setCurrentPage(1);
    }, [search, activeTab]);

    // ── Sort ──
    const sortedRequests = [...filtered].sort((a, b) => {
        const aCreated = new Date(a.borrow_date).getTime();
        const bCreated = new Date(b.borrow_date).getTime();
        const aPickup = new Date(a.return_date).getTime();
        const bPickup = new Date(b.return_date).getTime();

        if (sortOption === "Recent Borrow") return bCreated - aCreated;
        if (sortOption === "Oldest Borrow") return aCreated - bCreated;
        if (sortOption === "Return Soon") return aPickup - bPickup;
        if (sortOption === "Return Late") return bPickup - aPickup;
        return 0;
    });

    // ── Paginate ──
    const totalPages   = Math.ceil(sortedRequests.length / PER_PAGE);
    const paginated    = sortedRequests.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    const idColumn = [
        {
            header: "School ID",
            render: (r: any) => r.school_id,
        },
        {
            header: "Book ISBN",
            render: (r: any) => r.isbn,
        },
    ]

    const tabColumn = {
        Borrows: [
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
                            onClick={() => setReturnedModal({ ...r })}
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
        ],
        Approved: [
            {
                header: "Date Approved",
                thStyle: { textAlign: "center" as const },
                tdStyle: { textAlign: "center" as const },
                render: (r: any) => new Date(r.approve_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", }),
            },
            {
                header: "Pickup Date",
                thStyle: { textAlign: "center" as const },
                tdStyle: { textAlign: "center" as const },
                render: (r: any) => new Date(r.pickup_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", }),
            },
            {
                header: "Actions",
                thStyle: { textAlign: "center" as const },
                tdStyle: { textAlign: "center" as const },
                render: (r) => (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", justifyContent: "center" }}>
                        <button className="badge" style={{ background: "var(--color-success)", color: "#ffffff", cursor: "pointer", fontWeight: "300" }}
                            onClick={() => {
                                const student = userMap.get(r.school_id) || null;
                                const book = bookMap.get(r.isbn) || null;
                                setSelectedStudent(student);
                                setSelectedBook(book);
                                setBorrowSchoolId(r.school_id);
                                setBorrowIsbn(r.isbn);
                                setBorrowModal({ mode: "process", ...r });
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#1b7d3c";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "var(--color-success)";
                            }}
                        >
                            Process Borrow
                        </button>
                    </div>
                )
            },
        ],
    };
    const columns = [
        ...idColumn,
        ...(activeTab === "Borrows" ? tabColumn.Borrows : []),
        ...(activeTab === "Approved" ? tabColumn.Approved : []),
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
                staff: fullName,
            });
        
            if (json.retCode === "200") {
                setSystemResponse("Book marked as returned.");
                await fetchData();
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

    const handleChange = (e: any) => {
        const value = e.target.value;

        const today = new Date().toLocaleDateString("en-CA");

        if (value < today) {
            setSystemResponse("Date cannot be earlier than today");
            setSystemResponseOpen(true);
            return;
        }

        const max = new Date();
        max.setDate(max.getDate() + 7);
        const maxDate = max.toLocaleDateString("en-CA");

        if (value > maxDate) {
            setSystemResponse("Return date cannot exceed 7 days from today");
            setSystemResponseOpen(true);
            return;
        }

        setReturnDate(value);
    };

    const bookMap = new Map(books.map(b => [b.isbn, b]));
    const userMap = new Map(users.map(b => [b.school_id, b]));
    
    const handleBorrow = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!borrowModal) return;

        const borrowMode = borrowModal.mode === "process";
        setLoadingMessage("Processing book borrow...");
        setIsLoadingOpen(true);

        try {
            let json;

            const isoBorrowDate = new Date().toISOString();
            const isoReturnDate = new Date(returnDate).toISOString();

            if (borrowMode) {
                json = await api.put(`/api/transactions/borrow/process`, {
                    id: borrowModal.id,
                    school_id: borrowSchoolId,
                    isbn: borrowIsbn,
                    borrow_date: isoBorrowDate,
                    return_date: isoReturnDate,
                    staff: fullName,
                });
            } else {
                json = await api.post(`/api/transactions/borrow/add`, {
                    school_id: borrowSchoolId,
                    isbn: borrowIsbn,
                    borrow_date: isoBorrowDate,
                    return_date: isoReturnDate,
                    staff: fullName,
                });
            }
            
            if (json.retCode === "200") {
                setSystemResponse(`"${bookMap.get(borrowIsbn)?.title}" is borrowed by ${userMap.get(borrowSchoolId)?.firstname} ${userMap.get(borrowSchoolId)?.lastname}.`);
                await fetchData();
                setBorrowModal(null);
            } else {
                setSystemResponse( json.message || "Failed to process book borrow." );
            }
        } catch (err) {
            setSystemResponse("Server connection failed.");
        } finally {
            setIsLoadingOpen(false);
            setSystemResponseOpen(true);
        }
    };

    const SearchSelect = ({ label, data, onSelect }) => {
        const [query, setQuery] = useState("");
        const [filtered, setFiltered] = useState([]);

        useEffect(() => {
            if (query.length > 0) {
                const q = query.toLowerCase();

                const results = data.filter((item) =>
                    (item.firstname?.toLowerCase().includes(q)) ||
                    (item.lastname?.toLowerCase().includes(q)) ||
                    (item.title?.toLowerCase().includes(q)) ||
                    (item.school_id?.toLowerCase().includes(q)) ||
                    (item.isbn?.toLowerCase().includes(q))
                );

                setFiltered(results);
            } else {
                setFiltered([]);
            }
        }, [query, data]);

        return (
            <div className="search-wrapper" style={{ maxWidth: "none" }}>
                <input placeholder={label} value={query} onChange={(e) => setQuery(e.target.value)} style={{ paddingLeft: "14px", background: "#ffffff", marginBottom: "10px"}}/>

                {filtered.length > 0 && (
                    <div className="borrow-list">
                    {filtered.map((item) => {
                        const name = item.firstname && item.lastname
                        ? `${item.firstname} ${item.lastname}`
                        : item.title || "Unknown";

                        const meta = item.school_id || item.isbn || "";

                        return (
                            <div
                                key={item.id}
                                className="borrow-item"
                                onClick={() => {
                                onSelect(item);
                                setQuery("");
                                setFiltered([]);
                                }}
                            >
                                {name} {meta && `(${meta})`}
                            </div>
                        );
                    })}
                    </div>
                )}
            </div>
        );
    };

    const closeBorrowModal = () => {
        setBorrowModal(null);
        setBorrowSchoolId("");
        setBorrowIsbn("");
        setReturnDate("");
        setSelectedStudent(null);
        setSelectedBook(null);
    };
    const closeReturnModal = () => {
        setReturnedModal(null);
        setCheckboxCondition([]);
        setOtherCondition([]);
        setBookCondition("");
    };

    return (
        <>
        <div className="app">
            <div className="page-layout fadeUp">
                <div style={{ marginBottom: 20 }}>
                    <div className="page-header">Manage Book Borrows</div>
                    <div className="page-sub">Manage student book requests and borrows </div>
                </div>
                
                {/* Tabs */}
                <div className="page-tabs">
                    {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`page-tab ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                    ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 10 }}>
                        <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
                            <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
                        </div>
                        { activeTab === "Borrows" && (
                            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="pills">
                                {DATE.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        )}
                    </div>
                    <button className="btn w-auto px-4 py-2" onClick={() => {setBorrowSchoolId(""); setBorrowIsbn(""); setBorrowModal({mode:"add"});}}>Add New Borrow</button>
                </div>

                {/* Table */}
                <DataTable
                    columns={columns}
                    data={paginated}
                    loading={isLoading}
                    emptyText="No books found."
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={sortedRequests.length}
                    perPage={PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>


        {/* ── Modal: Borrow ── */}
        {borrowModal && (
            <form onSubmit={handleBorrow}>
            <div className="overlay"  onClick={closeBorrowModal}>
                <div className="modal" style={{ maxHeight: "700px"}} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close"  onClick={closeBorrowModal}><IconX/></button>
                </div>
                <div className="modal-scroll">
                    <div style={{ textAlign: "center" }}>
                        <div className="page-header text-xl">Book Borrow</div>
                    </div>

                    <div style={{ marginTop: "10px", marginBottom: "20px", textAlign: "right" }}>
                        {borrowModal.mode === "add" ? (
                            <div>
                                <div style={{ display:"flex", flexDirection:"column", width:"100%" }}>
                                    <div><p style={{ color: "var(--color-primary)", textAlign: "center", fontWeight: "700" }}>User Details</p>
                                    <SearchSelect label="Student" data={users} onSelect={(user) => { setSelectedStudent(user); setBorrowSchoolId(user.school_id); }} />
                                    {selectedStudent && (
                                        <div className="book-preview">
                                            <div><strong>Name:</strong> {selectedStudent.firstname} {selectedStudent.lastname}</div>
                                            <div><strong>School ID:</strong> {selectedStudent.school_id}</div>
                                            <div><strong>Department:</strong> {selectedStudent.department}</div>
                                            <div><strong>Program:</strong> {selectedStudent.program}</div>
                                            <div><strong>Offense:</strong> {selectedStudent.offense_count ?? 0}</div>
                                        </div>
                                    )}
                                </div></div>
                                <div style={{ display:"flex", flexDirection:"column", width:"100%" }}>
                                    <div><p style={{ color: "var(--color-primary)", textAlign: "center", fontWeight: "700" }}>Book Details</p>
                                    <SearchSelect label="Book" data={books} onSelect={(book) => { setSelectedBook(book); setBorrowIsbn(book.isbn); }} />
                                    {selectedBook && (
                                        <div className="book-preview">
                                            <div><strong>Title:</strong> {selectedBook.title}</div>
                                            <div><strong>Author:</strong> {selectedBook.author}</div>
                                            <div><strong>ISBN:</strong> {selectedBook.isbn}</div>
                                            <div><strong>Edition:</strong> {selectedBook.edition}</div>
                                            <div><strong>Pages:</strong> {selectedBook.pages}</div>
                                            <div><strong>Copies Available:</strong> {selectedBook.available}</div>
                                        </div>
                                    )}
                                </div></div>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                                <div><p style={{ color: "var(--color-primary)", textAlign: "center", fontWeight: "700" }}>User Details</p>
                                <div className="book-preview">
                                    <div><strong>Name:</strong> {selectedStudent.firstname} {selectedStudent.lastname}</div>
                                    <div><strong>School ID:</strong> {selectedStudent.school_id}</div>
                                    <div><strong>Department:</strong> {selectedStudent.department}</div>
                                    <div><strong>Program:</strong> {selectedStudent.program}</div>
                                    <div><strong>Offense:</strong> {selectedStudent.offense_count ?? 0}</div>
                                </div></div>
                                <div><p style={{ color: "var(--color-primary)", textAlign: "center", fontWeight: "700" }}>Book Details</p>
                                <div className="book-preview">
                                    <div><strong>Title:</strong> {selectedBook.title}</div>
                                    <div><strong>Author:</strong> {selectedBook.author}</div>
                                    <div><strong>ISBN:</strong> {selectedBook.isbn}</div>
                                    <div><strong>Edition:</strong> {selectedBook.edition}</div>
                                    <div><strong>Pages:</strong> {selectedBook.pages}</div>
                                </div></div>
                            </div>
                        )}
                        <div className="form-row mt-3">
                            <FloatingInput label="Borrow Date" type="text" value={new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", })}/>
                            <FloatingInput label="Return Date" type="date" placeholder=" " value={returnDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <label className="page-sub text-xs text-primary-deep"></label>
                    
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn" disabled={isLoadingOpen}>Process Borrow</button>
                </div>
                </div>
            </div>
            </form>
        )}

        {/* ── Modal: Return ── */}
        {returnedModal && (
            <form onSubmit={handleReturn}>
            <div className="overlay" onClick={closeReturnModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close" onClick={closeReturnModal}><IconX/></button>
                </div>
                <div className="modal-scroll">
                    <div style={{ textAlign: "center" }}>
                        <div className="page-header text-xl">Book Return</div>
                    </div>
                    <div style={{  marginTop: "10px", display: "flex", flexDirection: "column" }}>
                        <div>
                            <p style={{ color: "var(--color-primary)", textAlign: "center", fontWeight: "700" }}>User Details</p>
                            <div className="book-preview">
                                <div><strong>Name:</strong> {userMap.get(returnedModal.school_id)?.firstname} {userMap.get(returnedModal.school_id)?.lastname}</div>
                                <div><strong>School ID:</strong> {returnedModal.school_id}</div>
                                <div><strong>Department:</strong> {userMap.get(returnedModal.school_id)?.department}</div>
                                <div><strong>Program:</strong> {userMap.get(returnedModal.school_id)?.program}</div>
                                <div><strong>Offense:</strong> {userMap.get(returnedModal.school_id)?.offense_count ?? 0}</div>
                            </div>
                        </div>
                        <div>
                            <p style={{ color: "var(--color-primary)", textAlign: "center", fontWeight: "700" }}>Book Details</p>
                            <div className="book-preview">
                                <div><strong>Title:</strong> {bookMap.get(returnedModal.isbn)?.title}</div>
                                <div><strong>Author:</strong> {bookMap.get(returnedModal.isbn)?.author}</div>
                                <div><strong>ISBN:</strong> {returnedModal.isbn}</div>
                                <div><strong>Edition:</strong> {bookMap.get(returnedModal.isbn)?.edition}</div>
                                <div><strong>Pages:</strong> {bookMap.get(returnedModal.isbn)?.pages}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "10px", marginBottom: "10px", textAlign: "right" }}>
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
        <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-primary" cancelText="Okay"/>
        <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
        </>
    );
}