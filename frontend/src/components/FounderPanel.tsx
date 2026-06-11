import { motion } from "framer-motion";

type Props = {
  competitors: any[];
  recommendations: any;
  leads: any[];
};

export default function FounderPanel({
  competitors,
  recommendations,
  leads,
}: Props) {
  if (!competitors?.length) return null;

  
  const biggestThreat = competitors.reduce((max, c) =>
    c.confidenceScore > (max?.confidenceScore || 0) ? c : max,
  null);

 
  const topFeature = recommendations?.topFeaturesToBuild?.[0];

  
  const topLead = leads?.[0];

 
  const nextAction =
    topFeature && biggestThreat
      ? `Focus on competing with ${biggestThreat.name} by building ${topFeature}`
      : "Analyze more data to generate strategy";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card mt-6"
    >
      <h2 className="text-white text-xl font-semibold mb-4">
        🧠 Founder Decision Panel
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Biggest Threat */}
        <div className="p-4 bg-black/30 rounded-lg border border-gray-700">
          <h3 className="text-gray-300 text-sm">Biggest Competitor Threat</h3>
          <p className="text-white font-semibold mt-1">
            {biggestThreat?.name}
          </p>
          <p className="text-gray-400 text-sm">
            Score: {biggestThreat?.confidenceScore}%
          </p>
        </div>

        {/* Top Feature Gap */}
        <div className="p-4 bg-black/30 rounded-lg border border-gray-700">
          <h3 className="text-gray-300 text-sm">Top Feature Gap</h3>
          <p className="text-white font-semibold mt-1">
            {topFeature || "Not available"}
          </p>
        </div>

        {/* Top Lead */}
        <div className="p-4 bg-black/30 rounded-lg border border-gray-700">
          <h3 className="text-gray-300 text-sm">Priority Lead</h3>
          <p className="text-white font-semibold mt-1">
            {topLead?.company}
          </p>
          <p className="text-gray-400 text-sm">
            {topLead?.industry} • {topLead?.location}
          </p>
        </div>

        {/* Next Action */}
        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500">
          <h3 className="text-green-300 text-sm">Next Action</h3>
          <p className="text-white font-semibold mt-1">
            {nextAction}
          </p>
        </div>

      </div>
    </motion.div>
  );
}