  import {useState, useEffect, useRef} from "react";


import { pdf } from "@react-pdf/renderer";
import {ReportPDF} from "./pdf/ReportPDF";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import CompetitorCard from "./components/CompetitorCard";
import FeatureMatrix from "./components/FeatureMatrix";
import Recommendations from "./components/Recommendations";
import CompetitorCharts from "./components/CompetitorCharts";
import SummaryPanel from "./components/SummaryPanel";
import Leads from "./components/Leads";
import ComparisonModal from "./modal/ComparisonModal";
import CompetitorSkeleton from "./components/CompetitorSkeleton";
import FounderPanel from "./components/FounderPanel";
import './App.css'

function App() {
 
   const [query, setQuery] = useState("");
   const [loading, setLoading] = useState(false);

   type Competitor = {
  name: string;
  pricing: string;
  targetAudience: string;
  positioning: string;
  strengths: string[];
  weaknesses: string[];
  confidenceScore: number;
  source: string;
};
const [competitors, setCompetitors] = useState<Competitor[]>([]);
const [featureMatrix, setFeatureMatrix] = useState<any[]>([]);
const [recommendations, setRecommendations] = useState<any>(null);
const [leads, setLeads] = useState<any[]>([]);
const [selectedCompetitor, setSelectedCompetitor] = useState<any>(null);
const [showExport, setShowExport] = useState(false);
const exportRef = useRef<HTMLDivElement>(null);
const [comparisonData, setComparisonData] = useState<any>(null);




const handleAnalyze = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log("API Response", data);

    
    setFeatureMatrix(data.featureMatrix || []);
    setRecommendations(data.recommendations || null);
    setLeads(data.leads || []);
    setComparisonData(data.comparison || null);

   
    const competitorsRaw = data.competitors || [];

   
    const getCompetitorScore = (c: any) => {
      const wins = c.weWinIn?.length || 0;
      const losses = c.weLoseIn?.length || 0;

      const base = c.confidenceScore || 50;

      const winWeight = wins * 12;
      const lossWeight = losses * 15;

      let verdictWeight = 0;
      if (c.verdict === "HIGH THREAT") verdictWeight = 25;
      if (c.verdict === "COMPETITIVE") verdictWeight = 10;
      if (c.verdict === "WINNING") verdictWeight = -10;

      return base + winWeight - lossWeight + verdictWeight;
    };

    
    const enriched = competitorsRaw.map((c: any) => ({
      ...c,
      score: getCompetitorScore(c),
    }));

    const sorted = enriched.sort((a: any, b: any) => b.score - a.score);

    
    setCompetitors(sorted);

  } catch (error) {
    console.error("Analyze error:", error);
  } finally {
    setLoading(false);
  }
};


// const getCompetitorScore = (c: any) => {
//   const wins = c.weWinIn?.length || 0;
//   const losses = c.weLoseIn?.length || 0;

//   const base = c.confidenceScore || 50;


//   const winWeight = wins * 12;
//   const lossWeight = losses * 15;

  
//   let verdictWeight = 0;
//   if (c.verdict === "HIGH THREAT") verdictWeight = 25;
//   if (c.verdict === "COMPETITIVE") verdictWeight = 10;
//   if (c.verdict === "WINNING") verdictWeight = -10;

//   return base + winWeight - lossWeight + verdictWeight;
// };




// export csv
const exportCSV = () => {
  const rows = competitors.map((c) => ({
    name: c.name,
    pricing: c.pricing,
    audience: c.targetAudience,
    score: c.confidenceScore,
  }));

  const headers = Object.keys(rows[0] || {}).join(",");
  const values = rows.map((r) => Object.values(r).join(",")).join("\n");

  const csvContent = headers + "\n" + values;

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "nexus-report.csv";
  a.click();
};



// export pdf
const dashboardRef = useRef<HTMLDivElement>(null);

const exportPDF = async () => {
  try {
    const blob = await pdf(
      <ReportPDF
        query={query}
        competitors={competitors}
        recommendations={recommendations}
        leads={leads}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "nexus-report.pdf";

    link.click();

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      exportRef.current &&
      !exportRef.current.contains(e.target as Node)
    ) {
      setShowExport(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
}, []);




  return (
  <div className="app-container px-4 md:px-8 lg:px-12">
     <div ref={dashboardRef} className="w-full max-w-7xl mx-auto">

    {loading && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
    
    {/* SPINNER */}
    <div className="w-12 h-12 border-4 border-gray-600 border-t-green-400 rounded-full animate-spin"></div>

    {/* TEXT */}
    <p className="text-green-400 mt-4 text-sm animate-pulse">
      Analyzing competitors, insights & leads...
    </p>

  </div>
)}

    <Toaster position="top-right" />

    {/* HEADER */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center header"
    >
       <div>
    <h1>Nexus Intelligence Dashboard</h1>
    <p>Competitor Analysis • Insights • Leads</p>
  </div>

   <div ref={exportRef} className="relative flex justify-end">
   <button
  onClick={() => setShowExport(!showExport)}
  className={`px-4 py-2 rounded ${
    competitors.length === 0
      ? "bg-gray-600 cursor-not-allowed"
      : "bg-green-500 text-black"
  }`}
  disabled={competitors.length === 0}
>
  Export
</button>

    
      {showExport && (
  <div
    className="
      absolute
      right-0
      top-12
      w-44
      bg-slate-900
      border
      border-slate-700
      rounded-xl
      overflow-hidden
      shadow-2xl
      z-50
    "
  >
       <button
  onClick={exportPDF}
  className="
    block
    w-full
    px-4
    py-3
    text-left
    text-white
    hover:bg-slate-800
  "
>
  Export PDF
</button>

<button
  onClick={exportCSV}
  className="
    block
    w-full
    px-4
    py-3
    text-left
    text-white
    hover:bg-slate-800
  "
>
   Export CSV
</button>
      </div>
    )}
  </div>


    </motion.div>

    <SummaryPanel
  competitors={competitors}
  recommendations={recommendations}
  leads={leads}
/>

<FounderPanel
  competitors={competitors}
  recommendations={recommendations}
  leads={leads}
/>

    {/* INPUT SECTION */}
    <div className="glass-card input-section w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Enter product idea..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleAnalyze}>
        Analyze
      </button>
    </div>

    {/* MAIN CONTENT */}
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

  {/* 1. COMPETITORS */}
  <div className="glass-card">
    <h2 className="text-white text-xl font-semibold mb-3">
      Competitors
    </h2>

{!loading && competitors.length === 0 ? (
  <p className="text-gray-500 text-sm">
    No competitors yet. Enter a product idea and analyze.
  </p>
) : loading ? (
  Array.from({ length: 3 }).map((_, i) => (
    <CompetitorSkeleton key={i} />
  ))
) : (
  competitors.map((c) => (
    <CompetitorCard
      key={c.name}
      data={c}
      onCompare={(competitor) => {
  const match = comparisonData?.competitors?.find(
  (c: any) => c.name === competitor.name
);

  setSelectedCompetitor(match);
}}
    />
  ))
)}
  </div>

  {/* 2. ANALYTICS */}
  <div className="glass-card">
  <h2 className="text-white text-xl font-semibold mb-3">
    Analytics
  </h2>

  {/* BAR / CONFIDENCE CHART */}
  <CompetitorCharts data={competitors} />

  
</div>

  {/* 3. FEATURE MATRIX */}
  <div className="glass-card">
    <h2 className="text-white text-xl font-semibold mb-3">
      Feature Matrix
    </h2>

    <FeatureMatrix data={featureMatrix} />

    
    {/* <FeatureHeatmap data={featureMatrix} /> */}
  </div>

  {/* 4. RECOMMENDATIONS */}
  <div className="glass-card">
    <h2 className="text-white text-xl font-semibold mb-3">
      Recommendations
    </h2>

    <Recommendations data={recommendations} />
  </div>

  {/* 5. LEADS */}
  <div className="glass-card">
    <h2 className="text-white text-xl font-semibold mb-3">
      Leads
    </h2>

    <Leads data={leads} />
  </div>

</div>

{selectedCompetitor && (
  <ComparisonModal
    competitor={selectedCompetitor}
    onClose={() => setSelectedCompetitor(null)}
  />
)}
</div>
  </div>
);
}

export default App  
