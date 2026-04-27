"use client";

import { api } from "@/lib/api";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { IconCameraOff, IconX } from "../icons";
import Modal from "../Modal";
import { useRouter } from "next/navigation";

interface ScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onScan?: (decodedText: string) => void;
    onConfirmRelease?: (requests: any) => void;
}

export default function ScannerModal({ isOpen, onClose, onScan, onConfirmRelease }: ScannerModalProps) {
    const router = useRouter();
    const [view, setView] = useState<"scanner" | "result">("scanner");
    const [scannedResult, setScannedResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [studentInfo, setStudentInfo] = useState<any>(null);

    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isStoppingRef = useRef(false);

    const [isSystemResponseOpen, setSystemResponseOpen] = useState(false);
    const [systemResponse, setSystemResponse] = useState("");

    const stopCamera = useCallback(() => {
        if (!html5QrCodeRef.current || isStoppingRef.current) return;

        if (html5QrCodeRef.current.isScanning) {
            isStoppingRef.current = true;
            html5QrCodeRef.current.stop()
                .then(() => {
                    html5QrCodeRef.current?.clear();
                    html5QrCodeRef.current = null;
                    isStoppingRef.current = false;
                })
                .catch(() => {
                    html5QrCodeRef.current = null;
                    isStoppingRef.current = false;
                });
        } else {
            html5QrCodeRef.current.clear();
            html5QrCodeRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (!isOpen) {
            stopCamera();
            setView("scanner");
            setScannedResult(null);
            setStudentInfo(null);
            setIsScanning(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !isScanning) return;

        html5QrCodeRef.current = new Html5Qrcode("scanner-modal-reader");
        html5QrCodeRef.current.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 220, height: 220 } },
            (decodedText) => processScan(decodedText),
            () => {}
        ).catch(() => {
            setIsScanning(false);
            setSystemResponse("Unable to open camera. Check your browser permissions.");
            setSystemResponseOpen(true);
        });

        return () => { stopCamera(); };
    }, [isScanning, isOpen]);

    const processScan = async (decodedText: string) => {
        stopCamera();
        setIsScanning(false);

        const studentQrId = decodedText.trim();
        setScannedResult(studentQrId);
        onScan?.(studentQrId);

        try {
            const [userJson, requestsJson, booksJson] = await Promise.all([
                api.get(`/api/admin/specificUser/${studentQrId}`),
                api.get(`/api/transactions/getRequests/${studentQrId}`),
                api.get(`/api/books/getBooks`)
            ]);

            const user = userJson.data[0];
            const pendingRequests = requestsJson.isSuccess ? requestsJson.data : [];
            const books = booksJson.data ?? [];

            const bookMap: Record<string, string> = {};
            books.forEach((b: any) => { bookMap[b.isbn] = b.title; });

            setStudentInfo({
                name: `${user.firstname} ${user.lastname}`,
                school_id: user.school_id,
                email: user.email,
                department: user.department,
                program: user.program,
                year: user.year,
                role: user.role,
                status: user.status,
                offense_count: user.offense_count,
                requests: pendingRequests.map((req: any) => ({
                    ...req,
                    book_title: bookMap[req.isbn] ?? `ISBN: ${req.isbn}`,
                })),
                requests_count: pendingRequests.length,
            });

            setView("result");
            console.log(pendingRequests)
        } catch {
            setSystemResponse("Student not found.");
            setSystemResponseOpen(true);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const html5QrCode = new Html5Qrcode("scanner-modal-reader");
        try {
            const decodedText = await html5QrCode.scanFile(file, false);
            processScan(decodedText);
        } catch {
            setSystemResponse("Unable to read the QR code from the provided image.");
            setSystemResponseOpen(true);
        }
            e.target.value = "";
        }
    };

    const handleScanAnother = () => {
        setScannedResult(null);
        setStudentInfo(null);
        setView("scanner");
    };

    if (!isOpen) return null;

    return (
        <>
        <style>{`
            @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
            @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
            #scanner-modal-reader { border: none !important; border-radius: 16px; overflow: hidden; background: var(--color-primary-hover); width: 100%; min-height: 220px; }
            #scanner-modal-reader video { object-fit: cover !important; border-radius: 16px; }
        `}</style>

        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close" type="button" onClick={onClose} aria-label="Close modal"><IconX /></button>
                </div>

                <div className="modal-scroll">
                    <div className="page-header" style={{ marginBottom: "10px" }}>
                    {view === "scanner" ? "QR Scanner" : "Scan Result"}
                    </div>

                    {/* SCANNER VIEW */}
                    {view === "scanner" && (
                        <div style={{ animation: "fadeUp .2s ease" }}>
                            <div style={{ position: "relative", background: "var(--color-primary-hover)", borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
                                {!isScanning && (
                                <div style={{ padding: "30px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--color-success-bg)" }}>
                                    <IconCameraOff />
                                    <p>Camera is off</p>
                                </div>
                                )}
                                <div id="scanner-modal-reader" />
                            </div>
                        </div>
                    )}

                    {/* RESULT VIEW */}
                    {view === "result" && studentInfo && (
                    <div style={{ animation: "fadeUp .25s ease" }}>
                        {[
                            { label: "Name",       value: studentInfo.name },
                            { label: "School ID",  value: studentInfo.school_id },
                            { label: "Email",      value: studentInfo.email },
                            { label: "Department", value: studentInfo.department ? `College of ${studentInfo.department}` : "—" },
                            { label: "Program",    value: studentInfo.program },
                            { label: "Year",       value: `${studentInfo.year} Year` },
                            { label: "Offense",    value: studentInfo.offense_count },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: "1px solid var(--color-surface)" }}>
                                <span style={{ color: "var(--color-subtext)" }}>{label}</span>
                                <span style={{ fontWeight: 600 }}>{value}</span>
                            </div>
                        ))}

                        <div style={{ marginTop: 12, background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 16 }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-subtext)", marginBottom: 4 }}>
                                PENDING BORROW REQUESTS
                            </div>
                            <div style={{ fontSize: 22, fontWeight: 700 }}>
                                {studentInfo.requests_count}
                            </div>
                            {studentInfo.requests_count > 0 && (
                                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                                    {studentInfo.requests.map((req: any) => (
                                        <div
                                            key={req.id}
                                            onClick={() => {
                                                onClose();
                                                router.push(`/admin/requests?openRequest=${req.id}`);
                                            }}
                                            style={{
                                                fontSize: 12,
                                                color: "var(--color-subtext)",
                                                padding: "4px 0",
                                                borderTop: "1px solid var(--color-border)",
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            {req.book_title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    )}
                </div>

                <div className="modal-footer">
                    {view === "scanner" ? (
                    <>
                        {!isScanning ? (
                        <>
                            <button className="btn" onClick={() => setIsScanning(true)}>Start Camera</button>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} style={{ display: "none" }} />
                            <button className="btn" onClick={() => fileInputRef.current?.click()}>Upload QR Image</button>
                        </>
                        ) : (
                        <button className="btn" onClick={() => setIsScanning(false)} style={{ backgroundColor: "var(--color-border)", color: "var(--color-text)" }}>Stop Camera</button>
                        )}
                    </>
                    ) : (
                        <div style={{ display: "flex", gap: 10, width: "100%" }}>
                            <button className="btn"
                                onClick={() => {
                                    localStorage.setItem("prefillStudent", JSON.stringify({
                                        school_id: studentInfo.school_id,
                                        firstname: studentInfo.name.split(" ")[0],
                                        lastname: studentInfo.name.split(" ").slice(1).join(" "),
                                        department: studentInfo.department,
                                        program: studentInfo.program,
                                        offense_count: studentInfo.offense_count,
                                    }));
                                    onClose();
                                    router.push("/admin/borrows");
                                }}
                            >
                                Process Borrow
                            </button>
                            <button className="btn" onClick={handleScanAnother}>Scan Again</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
        <Modal isOpen={isSystemResponseOpen} message={systemResponse} onClose={() => setSystemResponseOpen(false)} cancelColor="bg-subtext" cancelText="Close" />
        </>
  );
}