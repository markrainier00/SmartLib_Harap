"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/lib/user";
import { api } from "@/lib/api"
import DataTable from "@/components/DataTable";
import { IconLogo, IconBookmark, IconNotif, IconNotNotif, IconX } from "@/components/icons";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";

const TABS = ["Active Borrow", "Pending Request", "Wishlist"];
const PER_PAGE = 5;

export default function MyListPage() {
  const { school_id } = useUser();
  const [wish, setWish] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Active Borrow");
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("");
  const [cancelConfirmModal, setCancelConfirmModal] = useState<any>(null);
  
  useEffect(() => {
    if (!school_id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
          
        const [wishRes, detailsRes, booksRes] = await Promise.all([
          api.get(`/api/transactions/getWishlist/${school_id}`),
          api.get(`/api/transactions/allDetails/${school_id}`),
          api.getPublic(`/api/books/getBooks`),
        ]);

        if (detailsRes.retCode === "200") setTransactions(detailsRes.data || []);
        if (wishRes.isSuccess) setWish(wishRes.data || []);
        if (booksRes.isSuccess || booksRes.retCode === "200") setBooks(booksRes.data || []);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [school_id]);

  const pendingRequests = transactions.filter( t => t.status === "Pending" );
  const activeBorrows = transactions.filter( t => t.status === "Borrowed" );

  let filtered = [];
  if (activeTab === "Active Borrow") filtered = activeBorrows;
  if (activeTab === "Pending Request") filtered = pendingRequests;
  if (activeTab === "Wishlist") filtered = wish;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const totalPages   = Math.ceil(filtered.length / PER_PAGE);
  const paginated    = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const bookMap = new Map(books.map(b => [b.isbn, b]));

  const listColumn = [
    {
      header: "Title",
      render: (r: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          
          {/* IMAGE BOX */}
          <div
            style={{
              width: 42,
              height: 54,
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid #e2dfd6",
              background: "#f8f8f6",
              flexShrink: 0,
            }}
          >
            {bookMap.get(r.isbn)?.actual_image && !imgError[bookMap.get(r.isbn)?.id] ? (
              <img
                src={bookMap.get(r.isbn)?.actual_image}
                alt={bookMap.get(r.isbn)?.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={() =>
                  setImgError((prev) => ({
                    ...prev,
                    [bookMap.get(r.isbn)?.id]: true,
                  }))
                }
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                }}
              >
                <IconLogo />
              </div>
            )}
          </div>

          {/* TEXT */}
          <div>
            <div>{bookMap.get(r.isbn)?.title}</div>
          </div>

        </div>
      ),
    },
    {
      header: "AUthor",
      render: (r: any) => bookMap.get(r.isbn)?.author,
    },
  ];
  const tabColumn = {
    Requested: [
      {
        header: "Pickup Date",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => new Date(r.pickup_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      },
      {
        header: "Date of Request",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => new Date(r.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      },
      {
        header: "Actions",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="badge" style={{ background: "var(--color-error)", color: "#ffffff", cursor: "pointer", fontWeight: "300" }}
              onClick={() => setCancelConfirmModal(r)}
            >
              Cancel Request
            </button>
          </div>
        ),
      },
    ],
    Borrowed:  [
      {
        header: "Borrowed Date",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => new Date(r.borrow_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      },
      {
        header: "Return Date",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => new Date(r.return_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      },
    ],
    Wishlist: [
      {
        header: "ISBN",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => r.isbn,
      },
      {
        header: "Actions",
        thStyle: { textAlign: "center" as const },
        tdStyle: { textAlign: "center" as const },
        render: (r: any) => (
          <div style={{ display:"flex", justifyContent:"center", gap:"10px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button title={(r.notify ?? true) ? "Notify when available" : "Do not get notification"}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-primary)" }}
                onClick={() => handleToggleNotify(r)}
              >
                {(r.status ?? "Notify") ? <IconNotif /> : <IconNotNotif />}
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button title="Remove from wishlist"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-primary)" }}
                onClick={() => handleRemoveWishlist(r)}
              >
                <IconBookmark style={{ fill: "currentColor" }} />
              </button>
            </div>
          </div>
        ),
      },
    ],
  };
  const bookColumns = [
    ...listColumn,
    ...(activeTab === "Active Borrow" ? tabColumn.Borrowed : []),
    ...(activeTab === "Pending Request" ? tabColumn.Requested : []),
    ...(activeTab === "Wishlist" ? tabColumn.Wishlist : []),
  ];

  const handleRemoveWishlist = async (r: any) => {
    if (isLoadingOpen) return;
    setLoadingMessage("Removing from wishlist...");
    setIsLoadingOpen(true);
    try {
      await api.post("/api/transactions/removeWishlist", {
        school_id,
        isbn: r.isbn,
      });
      setWish(prev => prev.filter(w => w.isbn !== r.isbn));
      setSystemResponse("Removed from wishlist.");
    } catch (err) {
      setSystemResponse("Server connection failed.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const handleToggleNotify = async (r: any) => {
    const isCurrentlyNotifying = r.status === "Notify";
    setLoadingMessage(isCurrentlyNotifying ? "Turning off notifications..." : "Turning on notifications...");
    setIsLoadingOpen(true);

    setWish(prev =>
      prev.map(w => w.isbn === r.isbn
        ? { ...w, status: isCurrentlyNotifying ? "Wish" : "Notify" }
        : w
      )
    );

    try {
      await api.post("/api/transactions/toggleNotify", {
        school_id,
        isbn: r.isbn,
      });
      setSystemResponse(isCurrentlyNotifying ? "You will no longer be notified about this book." : "You will be notified when this book is available.");
    } catch (err) {
      setWish(prev =>
        prev.map(w => w.isbn === r.isbn
          ? { ...w, status: isCurrentlyNotifying ? "Notify" : "Wish" }
          : w
        )
      );
      setSystemResponse("Server connection failed.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const handleCancelRequest = async () => {
    const r = cancelConfirmModal;
    if (!r || isLoadingOpen) return;
    setLoadingMessage("Cancelling request...");
    setIsLoadingOpen(true);
    setCancelConfirmModal(null);
    try {
      const json = await api.post("/api/transactions/cancelRequest", { id: r.id });
      if (json.retCode === "200" || json.isSuccess) {
        setTransactions(prev =>
          prev.map(t => t.id === r.id ? { ...t, status: "Cancelled" } : t)
        );
        setSystemResponse("Request cancelled.");
      } else {
        setSystemResponse(json.message || "Failed to cancel request.");
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
        <div className="page-header">My Books</div>
        <div className="page-sub">Track your book requests and active borrows</div>

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

        {/* Table */}
        <DataTable
          columns={bookColumns}
          data={paginated}
          loading={isLoading}
          emptyText="No books found."
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={paginated.length}
          perPage={PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>

    {/* Confirm to cancel request */}
    <Modal
      isOpen={!!cancelConfirmModal}
      title="Cancel Request?"
      message={`Are you sure you want to cancel your borrow request for "${bookMap.get(cancelConfirmModal?.isbn)?.title}"?`}
      onClose={() => setCancelConfirmModal(null)}
      onConfirm={handleCancelRequest}
      confirmColor="bg-error"
      cancelColor="bg-subtext"
      confirmText="Yes, Cancel"
      cancelText="No"
    />

    {/* Modal for displaying messages */}
    <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-primary" cancelText="Okay"/>
    <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
    </>
  );
}