"use client";

import { IconLogo, IconBookmark } from "@/components/icons";

interface BookCardProps {
  book: any;
  onClick: (book: any) => void;
  handleWishlist: (e: React.MouseEvent, book: any) => void;
  isSaved: boolean;
}

export default function BookCard({ book, onClick, handleWishlist, isSaved }: BookCardProps) {
  return (
    <div className="rec-book" onClick={() => onClick(book)}>
      <div style={{ position: "relative" }}>
        <div className="book-cover" style={{ width: 140, height: 190 }}>
          {book.actual_image ? (
            <img src={book.actual_image} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>
              <IconLogo className="w-20 h-20 text-primary" />
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="rb-title" title={book.title}>
          {book.title?.length > 24 ? book.title.slice(0, 24) + "…" : book.title}
        </div>

        <button className="bookmark-btn" onClick={(e) => handleWishlist(e, book)}
          style={{ color: isSaved ? "var(--color-primary, #1B5E35)" : "#fff" }}
        ><IconBookmark style={{ fill: "currentColor" }}  />
        </button>
      </div>

      <span className={`badge ${book.available ? "badge-green" : "badge-red"}`}>
        {book.available ? "Available" : "Unavailable"}
      </span>
    </div>
  );
}