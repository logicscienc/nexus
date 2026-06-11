import { motion } from "framer-motion";
import { FaRocket, FaChartLine, FaExclamationTriangle } from "react-icons/fa";

type RecommendationsType = {
  topFeaturesToBuild?: string[];
  marketOpportunities?: string[];
  risks?: string[];
};

export default function Recommendations({
  data,
}: {
  data: RecommendationsType | null;
}) {
  if (!data) {
    return (
      <p className="text-gray-500 text-sm">
        No recommendations yet
      </p>
    );
  }

  return (
    <div className="space-y-4">

      {/* TOP FEATURES */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md"
      >
        <h3 className="text-green-400 font-semibold flex items-center gap-2 mb-2">
          <FaRocket /> Top Features
        </h3>

        <ul className="text-gray-300 text-sm space-y-1">
          {data.topFeaturesToBuild?.map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
      </motion.div>

      {/* MARKET OPPORTUNITIES */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md"
      >
        <h3 className="text-blue-400 font-semibold flex items-center gap-2 mb-2">
          <FaChartLine /> Market Opportunities
        </h3>

        <ul className="text-gray-300 text-sm space-y-1">
          {data.marketOpportunities?.map((o, i) => (
            <li key={i}>• {o}</li>
          ))}
        </ul>
      </motion.div>

      {/* RISKS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md"
      >
        <h3 className="text-red-400 font-semibold flex items-center gap-2 mb-2">
          <FaExclamationTriangle /> Risks
        </h3>

        <ul className="text-gray-300 text-sm space-y-1">
          {data.risks?.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
}