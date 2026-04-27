import React from "react";
import { IconX, IconEdit, IconTrash, IconLogo } from "@/components/icons";
import FloatingInput from "./ui/FloatingInput";

interface Book {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  publication_date?: string;
  isbn?: string;
  edition?: string;
  pages?: number;
  description?: string;
  actual_image?: string;
  category?: string;
  available?: number;
}

interface BookDetailsProps {
  book: Book | null;
  mode?: "view" | "edit";
  onClose: () => void;
  role?: "Student" | "Staff";
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  onProcessBorrow?: (book: Book) => void;
  handleBookRequest?: (pickupDate: string) => void;
  handleWishlist?: (e: React.MouseEvent | null, book: Book) => void;
  isSaved?: boolean;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ 
  book, mode = "view", onClose, role, onEdit, onDelete, onProcessBorrow,
  handleBookRequest, handleWishlist, isSaved 
}) => {
    const [imgError, setImgError] = React.useState<{ [key: string]: boolean }>({});
    const [requestStep, setRequestStep] = React.useState<"details" | "form">("details");
    const [pickupDate, setPickupDate] = React.useState("");
    if (!book || mode !== "view") return null;

    return (
    <div className="overlay" onClick={onClose}>
      <div className="book-details" onClick={(e) => e.stopPropagation()}>
        <div className="bd-header">
          <button className="close" onClick={onClose}>
            <IconX />
          </button>
        </div>

        <div className="bd-scroll">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px", paddingTop: "10px" }}>
            <div className="book-cover" style={{ width: 130, height: 180 }}>
              {book.actual_image && !imgError[book.id] ? (
                <img
                  src={book.actual_image}
                  alt={book.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={() => setImgError((prev) => ({ ...prev, [book.id]: true }))}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>
                  <IconLogo className="w-20 h-20 text-primary" />
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h3 className="page-header text-black">{book.title}</h3>
            <p className="page-sub">by {book.author}</p>
            {(book.publisher || book.publication_date) && (
              <p className="page-sub text-xs">
                Published by<br />
                {book.publisher}
                {book.publisher && book.publication_date && <br />}
                {book.publication_date && <em>{book.publication_date}</em>}
              </p>
            )}
            {(book.isbn || book.edition || book.pages) && (
              <p className="page-sub text-xs">
                {book.isbn && <>ISBN {book.isbn}<br /></>}
                {(book.edition || book.pages) && (
                  <>
                    {book.edition && `${book.edition} Edition`}
                    {book.edition && book.pages && " • "}
                    {book.pages && `${book.pages} pages`}
                  </>
                )}
              </p>
            )}
            <div className="bd-description">
              <h4 className="page-sub text-primary"><strong>Synopsis / Description</strong></h4>
              <p style={{ fontSize: "13px", color: "#3B6B50", lineHeight: 1.6, margin: 0 }}>
                {book.description || "No description provided."}
              </p>
            </div>
          </div>

          {book.category && book.category.trim().length > 0 && (
            <>
              <p className="page-sub text-xs mb-1">Category</p>
              <div className="bd-horizontal-scroll">
                {book.category.split(",").map((cat, idx) => (
                  <span key={idx} className="badge" style={{ background: "#EBF7F0", color: "#1B5E35", flex: "0 0 auto" }}>
                    {cat.trim()}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="bd-footer">
        {role === "Staff" && (
            <>
            <button
                className="btn px-4 py-2 text-sm"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}
                onClick={() => onProcessBorrow && onProcessBorrow(book)}
                disabled={(book.available || 0) === 0}
            >
                <span>Process Borrow</span>
                {(book.available || 0) > 0 ? (
                <em className="text-xs">{book.available} {book.available > 1 ? "copies" : "copy"} available</em>
                ) : (
                <em className="text-xs">Unavailable</em>
                )}
            </button>
            {onEdit && <button className="btn px-4 py-2 w-auto" onClick={() => onEdit(book)}><IconEdit /></button>}
            {onDelete && <button className="btn px-4 py-2 bg-error w-auto" onClick={() => onDelete(book)}><IconTrash /></button>}
            </>
        )}

        {role === "Student" && handleBookRequest && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            {requestStep === "details" && (
              <>
                {book.available ? (
                  <button className="btn" onClick={() => setRequestStep("form")}>Request</button>
                ) : (
                  <button
                    className="btn"
                    style={{
                      background: isSaved ? "#fff" : "#1B5E35",
                      color: isSaved ? "#1B5E35" : "#fff",
                      border: "2px solid #1B5E35",
                      boxShadow: "none"
                    }}
                    onClick={(e) => handleWishlist && handleWishlist(e, book)}
                  >
                    {isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                )}
              </>
            )}

            {requestStep === "form" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <FloatingInput label="Pickup Date" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)}/>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{ flex: 1, padding: "10px", borderRadius: "12px", border: "none", background: "#1B5E35", color: "#fff", fontWeight: 600 }}
                    onClick={() => handleBookRequest(pickupDate)}
                    disabled={!pickupDate}
                  >
                    Confirm
                  </button>
                  <button
                    style={{ flex: 1, padding: "10px", borderRadius: "12px", border: "2px solid #C3DDD0", background: "#fff", color: "#1B5E35", fontWeight: 600 }}
                    onClick={() => setRequestStep("details")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};