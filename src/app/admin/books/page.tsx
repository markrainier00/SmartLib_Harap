"use client";

import { api } from "@/lib/api"
import { useRouter } from "next/navigation";
import { IconImage, IconX, IconSearch, IconLogo } from "@/components/icons";
import React, { useState, useRef, useEffect } from "react";
import { BookDetails } from "@/components/BookDetails";
import DataTable from "@/components/DataTable";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";
import FloatingInput from "@/components/ui/FloatingInput";
import FloatingTextarea from "@/components/ui/FloatingTextarea";


const STATUS = ["All Status", "Available", "Unavailable"]
const PER_PAGE = 5;

const BOOK = {
  title: "",
  author: "",
  isbn: "",
  publisher: "",
  publication_date: "",
  edition: "",
  category: "",
  pages: "",
  copies: "",
  description: "",
  actual_image: null as File | string | null,
};

export default function AdminLibraryPage() {
  const router = useRouter();
  const [books, setBooks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [available, setAvailable] = useState("All Status");
  const [imgError, setImgError] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  
  const [modal, setModal] = useState<any>(null);
  const [bookForm, setBookForm] = useState<any>(BOOK);
  const [deleteModal, setDeleteModal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Processing...");
  const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
  const [systemResponse, setSystemResponse] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newCategory, setNewCategory] = useState("");
  

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const json = await api.getPublic("/api/books/getBooks");
      if (json.retCode === "200" || json.isSuccess) {
        setBooks(json.data || []);
      } else {
        setSystemResponse("Failed to load books" );
      }
    } catch (err: any) {
      setSystemResponse("Cannot connect to the server.");
    }
    finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  
  const allCategories = books.flatMap(b => 
    b.category ? b.category.split(',').map((c: string) => c.trim()) : []
  );
  const CATEGORIES = ["All Categories", "Uncategorized", ...new Set(allCategories)];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSystemResponse("Please upload a valid image file.");
      return;
    }
    if(file.size > 2 * 1024 * 1024) {
      setSystemResponse("Image must be under 2MB.");
      return;
    }

    setBookForm(prev => ({ ...prev, actual_image: file }));
  };

  const removeImage = () => {
    setBookForm(prev => ({ ...prev, actual_image: null}));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── Filter ──
  const filtered = books.filter(b => {
    const term = search.toLowerCase().trim();
    const matchesSearch = !term ||
      (b.title?.toLowerCase() || "").includes(term) ||
      (b.author?.toLowerCase() || "").includes(term);
    
    const bookCategory = b.category 
      ? b.category.split(',').map((c: string) => c.trim()) 
      : ["Uncategorized"];

    const matchesCategory = category === "All Categories" || bookCategory.includes(category);
    
    const bookAvailableCount = b.available || 0;
    const matchesStatus =
      available === "All Status" ||
      (available === "Available" && bookAvailableCount > 0) ||
      (available === "Unavailable" && bookAvailableCount === 0);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, available]);

  const openAdd = () => {
    setBookForm({ ...BOOK });
    setModal({ mode: "add" });
  };
  
  const openEdit = (b: any) => { 
    setBookForm({ 
      title: b.title, 
      author: b.author,
      isbn: b.isbn,
      publisher: b.publisher || "",
      publication_date: b.publication_date || "",
      edition: b.edition,
      category: b.category || "", 
      pages: b.pages || "", 
      copies: b.copies, 
      description: b.description || "", 
      actual_image: b.actual_image || "" 
    }); 
    setModal({ mode: "edit", book: b });
  };
  
  const openView = (book: any) => {
    setModal({ mode: "view", book });
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEdit = modal.mode === "edit";
    setLoadingMessage(
      isEdit 
        ? `Updating "${bookForm.title}"...` 
        : `Adding "${bookForm.title}" to library...`);
    setIsLoadingOpen(true);

    try {
      const formData = new FormData();
      formData.append("title", bookForm.title);
      formData.append("author", bookForm.author);
      formData.append("isbn", bookForm.isbn);
      formData.append("publisher", bookForm.publisher || "");
      formData.append("publication_date", bookForm.publication_date || "");
      formData.append("edition", bookForm.edition || "");
      formData.append("category", bookForm.category || "");
      formData.append("pages", String(bookForm.pages || 0));
      formData.append("copies", String(bookForm.copies || 1));
      formData.append("description", bookForm.description || "");
      if (bookForm.actual_image instanceof File) {
        formData.append("actual_image", bookForm.actual_image);
      }

      const json = isEdit
        ? await api.putForm(`/api/books/updateBook/${modal.book.id}`, formData)
        : await api.postForm("/api/books/addBook", formData);
    
      if (json.retCode === "200") {
        setSystemResponse(
          isEdit 
            ? `"${bookForm.title}" updated successfully.` 
            : `"${bookForm.title}" added to library. Students will be notified!`
        );
        await fetchBooks();
        setModal(null);
      } else {
        setSystemResponse( json.message || "Failed to save book." );
      }
    } catch (err) {
      setSystemResponse("Server connection failed.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };
    
  const openDelete = async () => {
    if (!deleteModal?.id) return;
    setLoadingMessage(`Deleteing "${bookForm.title}" to library...`);
    setIsLoadingOpen(true);

    try {
      const json = await api.delete(`/api/books/deleteBook/${deleteModal.id}`);

      if (json.retCode === "200" || json.isSuccess) {
        await fetchBooks();
        setDeleteModal(null);
      } else {
        setDeleteModal(null);
        setSystemResponse(json.message || "Failed to delete book.")
        setSystemResponseOpen(true);
      }
    } catch (err: any) {
      setDeleteModal(null);
      setSystemResponse("Failed to delete book.");
    } finally {
      setIsLoadingOpen(false);
      setSystemResponseOpen(true);
    }
  };

  const updateForm = (fields: Partial<typeof bookForm>) => {
    setBookForm(prev => ({ ...prev, ...fields }));
  };

  const totalPages   = Math.ceil(filtered.length / PER_PAGE);
  const paginated    = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setModal(null);
      }
    };

    if (modal?.mode === "view") {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  const bookColumns = [
    {
      header: "Title",
      render: (b) => (
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
            {b.actual_image && !imgError[b.id] ? (
              <img
                src={b.actual_image}
                alt={b.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={() =>
                  setImgError((prev) => ({
                    ...prev,
                    [b.id]: true,
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
            <div>{b.title}</div>
          </div>

        </div>
      ),
    },
    {
      header: "ISBN",
      render: (b: any) => b.isbn
    },
    {
      header: "Author",
      render: (b: any) => b.author
    },
    {
      header: "Category",
      render: (b: any) => b.category
        ? b.category.split(",").join(", ")
        : "-",
    },
    {
      header: "Copies",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (b: any) => b.copies
    },
    {
      header: "Status",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (b: any) => (
        <span className={`badge ${b.available > 0 ? "badge-green" : "badge-red"}`}>
          {b.available > 0 ? "Available" : "Unavailable"}
        </span>
      ),
    },
    {
      header: "Action",
      thStyle: { textAlign: "center" as const },
      tdStyle: { textAlign: "center" as const },
      render: (row) => (
        <button className="badge badge-green" style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            openView(row);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-subtext)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-primary)";
          }}
        >
          See Details
        </button>
      )
    },
  ];

  return (
  <>
    <div className="app">
      <div className="page-layout fadeUp">
        <div style={{ marginBottom: 20}}>
          <div className="page-header">Library Management</div>
          <div className="page-sub">{books.length} books in your library.</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 18, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="search-wrapper" style={{ flex: 1, maxWidth: 300 }}>
              <IconSearch/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="pills">
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={available} onChange={e => setAvailable(e.target.value)} className="pills">
              {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {(category !== "All Categories" || available !== "All Status" || search) && (
              <button className="pills" onClick={() => { setCategory("All Categories"); setAvailable("All Status"); setSearch(""); }} style={{ background: "#f5f5f5", borderColor: "#dadada", color: "#777777" }}>
                Reset
              </button>
            )}
          </div>
          <button className="btn w-auto px-4 py-2" onClick={openAdd}>Add New Book</button>
        </div>

        {/* Table */}
        <DataTable
          columns={bookColumns}
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

    {/* Book Details Panel */}
    {modal && modal.mode === "view" && (
      <BookDetails
        book={modal.book}
        onClose={() => setModal(null)}
        mode="view"
        role="Staff"
        onEdit={openEdit}
        onDelete={setDeleteModal}
        onProcessBorrow={(book) => {
          localStorage.setItem("prefillBook", JSON.stringify(book));
          router.push("/admin/borrows");
        }}
      />
    )}

    {/* Modal: Add / Edit Book */}
    {modal && modal.mode !== "view" && (
      <form onSubmit={handleSaveBook}>
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close" type="button" onClick={() => setModal(null)} aria-label="Close modal" ><IconX/></button>
            </div>
            <div className="modal-scroll">
              <div style={{ textAlign: "center" }}>
                <div className="page-header">{modal.mode === "add" ? "New Library Book" : "Edit Book"}</div>
              </div>
                <div className="field" style={{ display:"flex", justifyContent: "center", margin: 30 }}>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} style={{ display: "none" }}/>

                  {!bookForm.actual_image ? (
                    <div className="book-cover" onClick={() => fileInputRef.current?.click()}>
                      <div className="upload-icon"><IconImage/></div>
                      <div className="upload-text">Click to upload book cover</div>
                      <div className="upload-hint">JPG, PNG, WEBP — max 2MB</div>
                    </div>
                  ) : (
                    <div className="book-cover">
                      <div className="img-wrap">
                        <img src={
                          typeof bookForm.actual_image === "string"
                            ? bookForm.actual_image
                            : URL.createObjectURL(bookForm.actual_image)
                          } alt="Book preview" className="img-preview"
                        />
                        <button type="button" className="img-remove" onClick={() => setBookForm((prev) => ({ ...prev, actual_image: null }))}><IconX/></button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="form-row">
                  <FloatingInput label="Title" type="text" value={bookForm.title} onChange={(e) => setBookForm(prev => ({ ...prev, title: e.target.value }))} required/>
                  <FloatingInput label="Author" type="text" value={bookForm.author} onChange={(e) => setBookForm(prev => ({ ...prev, author: e.target.value }))} required/>
                </div>
                <div className="form-row">
                  <FloatingInput label="ISBN" type="text" value={bookForm.isbn} onChange={(e) => setBookForm(prev => ({ ...prev, isbn: e.target.value }))} required/>
                  <FloatingInput label="Edition" type="text" value={bookForm.edition} onChange={(e) => setBookForm(prev => ({ ...prev, edition: e.target.value }))} required/>
                </div>
                <div className="form-row">
                  <FloatingInput label="Pages" type="number" value={bookForm.pages} onChange={(e) => setBookForm(prev => ({ ...prev, pages: Math.max(1, Number(e.target.value)) }))} required/>
                  <FloatingInput label="Quantity" type="number" value={bookForm.copies} onChange={(e) => setBookForm(prev => ({ ...prev, copies:  Math.max(1, Number(e.target.value)) }))} required/>
                </div>
                <div className="form-row">
                  <FloatingInput label="Publisher" type="text" value={bookForm.publisher} onChange={(e) => setBookForm(prev => ({ ...prev, publisher: e.target.value }))}/>
                  <FloatingInput label="Publication Date" type="text" value={bookForm.publication_date} onChange={(e) => setBookForm(prev => ({ ...prev, publication_date: e.target.value }))}/>
                </div>
                <FloatingTextarea
                  label="Sypnosis / Description"
                  value={bookForm.description}
                  onChange={(e) =>
                  setBookForm(prev => (
                    { ...prev, description: e.target.value }
                  ))}
                  required
                />
                <label className="page-sub text-xs text-primary-deep">Genre/Category</label>
                <div style={{ marginBottom: 13, border: "1px solid var(--color-muted)", borderRadius: "10px", padding: "10px"}}>
                  <div className="field">
                    <div style={{ display: "flex", gap: 8 }}>
                      <select
                        value="" onChange={(e) => {
                          if (!e.target.value) return;
                          const current = bookForm.category ? bookForm.category.split(',').map((c: string) => c.trim()) : [];
                          if (!current.includes(e.target.value)) {
                            const newValue = current.length > 0 ? current.join(',') + ',' + e.target.value : e.target.value;
                            updateForm({ category: newValue });
                          }
                        }}
                        style={{ 
                          flex: 1, 
                          padding: "11px 13px", 
                          border: "1.5px solid var(--color-primary-deep)",
                          borderRadius: 11,
                          background: "white",
                          outline: "none",
                          transition: "all 0.2s",
                        }}
                      >
                        <option value="">Select existing category...</option>
                        {CATEGORIES.slice(2).map(cat => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Type new category"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const trimmed = newCategory.trim();
                            if (!trimmed) return;
                            const current = bookForm.category
                              ? bookForm.category.split(',').map((c: string) => c.trim())
                              : [];
                            if (!current.includes(trimmed)) {
                              const newValue = current.length > 0
                                ? current.join(',') + ',' + trimmed
                                : trimmed;
                              updateForm({ category: newValue });
                            }
                            setNewCategory("");
                          }
                        }}
                        style={{ flex: 1, padding: "11px 13px", border: "1.5px solid var(--color-primary-deep)", borderRadius: 11 }}
                      />
                    </div>
                    <small className="page-sub text-xs">Select from dropdown or type and press Enter to add new category.</small>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8, marginTop: 10 }}>
                      {bookForm.category && bookForm.category.trim() !== "" &&
                        bookForm.category.split(',').map((cat: string, idx: number) => {
                          const trimmed = cat.trim();
                          if (!trimmed) return null;
                          return (
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
                              {trimmed}
                              <button
                                type="button"
                                onClick={() => {
                                  const newCats = bookForm.category
                                    .split(',')
                                    .filter((c: string) => c.trim() !== trimmed)
                                    .join(',');
                                  updateForm({ category: newCats });
                                }}
                                style={{ background: "none", border: "none", color: "#c94040", fontSize: 14, cursor: "pointer" }}
                                aria-label="Remove category"
                              >
                                <IconX/>
                              </button>
                            </span>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn" disabled={isLoadingOpen}>
                {modal.mode === "add" ? "Add Book" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </form>
    )}

    {/* Modal for delete confirmation */}
    <Modal
      isOpen={!!deleteModal}
      title="Delete Book?"
      message={
        <>
          Are you sure you want to remove "{deleteModal?.title}"?
          <br />
          This action cannot be undone.
        </>
      }
      onClose={() => setDeleteModal(null)}
      onConfirm={openDelete}
      confirmColor="bg-error"
      cancelColor="bg-subtext"
      confirmText="Delete Book"
      cancelText="Cancel"
    />
        
    {/* Modal for displaying messages */}
    <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-primary" cancelText="Okay"/>
    <LoadingModal isOpen={isLoadingOpen} message={loadingMessage} />
  </>
  );
}