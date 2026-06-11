import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

import { toPng } from "html-to-image";
import { useRef } from "react";

export default function CompetitorCharts({ data }: any) {
  const chartRef = useRef<HTMLDivElement>(null);

   if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No analytics available yet
      </p>
    );
  }


  const confidenceData = data.map((c: any) => ({
    name: c.name,
    confidence: c.confidenceScore || 0,
  }));

  const featureData = data.map((c: any) => ({
    name: c.name,
    features: c.strengths?.length || 0,
    gap: 10 - (c.strengths?.length || 0), // fake "gap trend"
  }));

  const pieData = data.map((c: any) => ({
    name: c.name,
    value: c.confidenceScore || 0,
  }));

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7"];

   const hasData =
  Array.isArray(data) &&
  data.length > 0 &&
  data.some((c: any) => c.name);

  
  const exportChart = async () => {
    if(!hasData || !chartRef.current)
    {
      return;
    }
    if (!chartRef.current) return;

    const dataUrl = await toPng(chartRef.current);
    const link = document.createElement("a");
    link.download = "competitor-analysis.png";
    link.href = dataUrl;
    link.click();
  };



  return (
    <div className="space-y-10">

     {hasData && (
  <button
    onClick={exportChart}
    className="bg-green-500 text-black px-3 py-1 rounded"
  >
    Export Chart
  </button>
)}

      <div ref={chartRef} className="space-y-10">

        {/* ---------------- CONFIDENCE BAR ---------------- */}
        <div style={{ width: "100%", height: 200, marginBottom: "40px" }}>
          <h3>Confidence Score</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={confidenceData} >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="confidence" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ---------------- PIE CHART ---------------- */}
        <div style={{ width: "100%", height: 300, marginTop: "80px", marginBottom: "40px" }}>
          <h3>Market Distribution</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((_: any, index: number) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ---------------- LINE GRAPH ---------------- */}
        <div style={{ width: "100%", height: 300 }}>
          <h3>Feature Gap Trend</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={featureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="features"
                stroke="#22c55e"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="gap"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}