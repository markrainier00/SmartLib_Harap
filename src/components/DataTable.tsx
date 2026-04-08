type Column = {
  header: React.ReactNode;
  render: (row: any) => React.ReactNode;
  tdStyle?: React.CSSProperties;
  thStyle?: React.CSSProperties;
};

type DataTableProps = {
  columns: Column[];
  data: any[];
  loading?: boolean;
  emptyText?: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onRowClick?: (row: any) => void;
};

export default function DataTable({
  columns,
  data,
  loading,
  emptyText = "No data found.",
  currentPage,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
  onRowClick,
}: DataTableProps) {
  return (
    <div className="data-card">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={col.thStyle}>{col.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: 40,
                  textAlign: "center",
                  color: "var(--color-subtext)",
                }}
              >
                Loading...
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => onRowClick?.(row)}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {columns.map((col, j) => (
                  <td key={j} style={col.tdStyle}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: 40,
                  textAlign: "center",
                  color: "var(--color-subtext)",
                  fontStyle: "italic",
                  background: "var(--color-surface)",
                }}
              >
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer */}
      <div className="data-footer">
        <span>
          {totalItems > 0
            ? `Showing ${(currentPage - 1) * perPage + 1}–${Math.min(
                currentPage * perPage,
                totalItems
              )} of ${totalItems} records`
            : ""}
        </span>

        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                padding: "4px 10px",
                borderRadius: 8,
                border: `1.5px solid var(--color-border)`,
                background:
                  currentPage === 1 ? "var(--color-surface)" : "#fff",
                color:
                  currentPage === 1
                    ? "var(--color-muted)"
                    : "var(--color-primary)",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 8,
                    border: `1.5px solid ${
                      page === currentPage
                        ? "var(--color-primary)"
                        : "var(--color-border)"
                    }`,
                    background:
                      page === currentPage
                        ? "var(--color-primary)"
                        : "#fff",
                    color:
                      page === currentPage
                        ? "#fff"
                        : "var(--color-primary)",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              style={{
                padding: "4px 10px",
                borderRadius: 8,
                border: `1.5px solid var(--color-border)`,
                background:
                  currentPage === totalPages
                    ? "var(--color-surface)"
                    : "#fff",
                color:
                  currentPage === totalPages
                    ? "var(--color-muted)"
                    : "var(--color-primary)",
                cursor:
                  currentPage === totalPages
                    ? "not-allowed"
                    : "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}