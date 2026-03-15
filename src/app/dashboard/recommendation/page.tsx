"use client";

import React, { useState, useEffect } from "react";

export default function RecommendationPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 💡 Sa totoong app, kukunin mo ito sa login session/context ng student
  const userCourse = "BSCS";
  const studentID = "2024-0001"; 

  // 🚀 1. KUNIN ANG MGA LIBRO MULA SA GO BACKEND
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Siguraduhin na may GET /api/books endpoint ka sa Go server
        const res = await fetch("http://localhost:8080/api/books");
        const result = await res.json();

        if (res.ok && result.isSuccess) {
          setBooks(result.data); // I-save ang mga libro mula sa database
        } else {
          console.error("Failed to load books from server.");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 🚀 2. I-FILTER ANG MGA LIBRO BASE SA COURSE
  // Ina-accommodate natin kung ang course ay Array o String (gaya ng na-set mo sa Admin)
  const recommended = books.filter((b: any) => {
    if (!b.course) return false;
    if (Array.isArray(b.course)) return b.course.includes(userCourse);
    return b.course === userCourse || b.course === "All"; // Kung string lang ang sinend ng Admin
  });

  // 🚀 3. HUMIRAM NG LIBRO
  const handleBorrow = async (bookTitle: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/transactions/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_id: studentID,
          book_title: bookTitle,
        }),
      });

      const result = await res.json();

      if (res.ok && result.isSuccess) {
        alert(`✅ Success! Naipadala na ang request mo para sa: ${bookTitle}`);
      } else {
        alert(`❌ Oops! Hindi pumasok: ${result.message}`);
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("⚠️ May problema sa connection sa server.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 className="np" style={{ fontSize: 24, color: "#e2e2ee" }}>For You</h1>
        <p style={{ fontSize: 13, color: "rgba(226,226,238,.5)", marginTop: 4 }}>
          Curated for <span style={{ color: "#c9a84c", fontWeight: 600 }}>{userCourse}</span> students
        </p>
      </div>

      <div style={{ background: "rgba(201,168,76,.05)", border: "1px solid rgba(201,168,76,.14)", borderRadius: 12, padding: "12px 16px", marginBottom: 22, fontSize: 13, color: "rgba(226,226,238,.8)", display: "flex", gap: 9, alignItems: "center" }}>
        <span>⭐</span> 
        Recommendations are based on your enrolled course.
      </div>

      {loading ? (
        <div style={{ color: "#8a8ea8", textAlign: "center", padding: "40px" }}>
          Naglo-load ng mga libro mula sa database...
        </div>
      ) : recommended.length === 0 ? (
        <div style={{ color: "#8a8ea8", textAlign: "center", padding: "40px", border: "1px dashed rgba(226,226,238,.14)", borderRadius: 12 }}>
          Walang nakitang libro para sa course na {userCourse}.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 14 }}>
          {recommended.map((b: any) => (
            <div key={b.id || b.title} className="card" style={{ display: "flex", gap: 14, padding: 16, background: "#1a1a2e", borderRadius: 12, border: "1px solid rgba(226,226,238,.08)" }}>
              <div style={{ width: 50, height: 64, borderRadius: 8, background: b.cover || "#16213e", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${b.accent || "#c9a84c"}44`, overflow: "hidden" }}>
                {b.actualImage ? (
                   <img src={b.actualImage} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                   <span style={{ fontSize: 20 }}>📗</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: "#e2e2ee" }}>{b.title}</p>
                <p style={{ fontSize: 12, color: "rgba(226,226,238,.5)", marginTop: 3 }}>{b.author}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: b.available !== false ? "rgba(45, 122, 79, 0.2)" : "rgba(201, 64, 64, 0.2)", color: b.available !== false ? "#4caf6e" : "#ef4444" }}>
                    {b.available !== false ? "Available" : "Unavailable"}
                  </span>
                  
                  {/* BUTTON NA TATAWAG SA BACKEND */}
                  <button 
                    onClick={() => handleBorrow(b.title)}
                    disabled={b.available === false}
                    style={{ 
                      padding: "6px 14px", 
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: 8,
                      background: b.available !== false ? "linear-gradient(135deg, #c9a84c, #b08d35)" : "#3a3a4e",
                      color: b.available !== false ? "#1a1a2e" : "rgba(226,226,238,.4)",
                      border: "none",
                      cursor: b.available !== false ? "pointer" : "not-allowed",
                      transition: "all 0.2s"
                    }}
                  >
                    {b.available !== false ? "Borrow" : "Reserved"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}