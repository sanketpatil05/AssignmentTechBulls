import React, { useMemo } from "react";
import ChartBar from "../components/ChartBar";
import ChartPie from "../components/ChartPie";
import { salesData } from "../data/sales";

export default function Dashboard() {
  // Total sales (sum of all totals)
  const totalSales = useMemo(
    () => salesData.reduce((sum, x) => sum + x.total, 0),
    []
  );

  // Monthly sales
  const monthly = useMemo(() => {
    const map = {};
    salesData.forEach((s) => {
      const m = new Date(s.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      map[m] = (map[m] || 0) + s.total;
    });
    return Object.entries(map).map(([month, sales]) => ({ month, sales }));
  }, []);

  // Sales by category
  const byCat = useMemo(() => {
    const map = {};
    salesData.forEach((s) => {
      map[s.category] = (map[s.category] || 0) + s.total;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <div className="page">
      {/* Widgets */}
      <div className="widgets">
        <div className="widget card">
          <h3>Total Sales</h3>
          <p className="big">${totalSales}</p>
        </div>
        <div className="widget card">
          <h3>Orders</h3>
          <p className="big">{salesData.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid-2">
        <ChartBar data={monthly} />
        <ChartPie data={byCat} />
      </div>
    </div>
  );
}
