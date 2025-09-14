import React, { useMemo } from "react";
import ChartBar from "../components/ChartBar";
import ChartPie from "../components/ChartPie";
import { salesData } from "../data/sales";

// Utility function to export data to CSV
function exportToCSV(rows, filename = "report.csv") {
  if (!rows || !rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(",")]
    .concat(
      rows.map((r) =>
        keys.map((k) => `"${(r[k] ?? "").toString().replace(/"/g, '""')}"`).join(",")
      )
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  // Monthly totals
  const monthly = useMemo(() => {
    const map = {};
    salesData.forEach((s) => {
      const month = new Date(s.date).toLocaleString("default", { month: "short" });
      map[month] = (map[month] || 0) + s.total;
    });
    return Object.entries(map).map(([month, sales]) => ({ month, sales }));
  }, []);

  // Category totals
  const byCat = useMemo(() => {
    const map = {};
    salesData.forEach((s) => {
      map[s.category] = (map[s.category] || 0) + s.total;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <div className="page">
      <h2>Reports</h2>

      <div className="grid-2">
        <ChartBar data={monthly} />
        <ChartPie data={byCat} />
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          className="btn"
          onClick={() =>
            exportToCSV(
              salesData.map((s) => ({
                date: s.date,
                category: s.category,
                total: s.total,
              })),
              "sales.csv"
            )
          }
        >
          Export Sales CSV
        </button>
      </div>
    </div>
  );
}
