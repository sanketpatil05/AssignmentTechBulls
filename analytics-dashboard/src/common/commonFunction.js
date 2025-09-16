export function exportToCSV(rows, filename = "report.csv") {
  if (!rows || rows.length === 0) return;

  const header = Object.keys(rows[0]).join(",");

  const values = rows.map(row => Object.values(row).join(","));

  const csv = [header, ...values].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
