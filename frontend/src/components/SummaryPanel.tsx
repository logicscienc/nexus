import { motion } from "framer-motion";

type Props = {
  competitors: any[];
  recommendations: any;
  leads: any[];
};

export default function SummaryPanel({
  competitors,
  recommendations,
  leads,
}: Props) {
  const topCompetitor = competitors?.[0]?.name || "N/A";
  const topLead = leads?.[0]?.company || "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 mb-4 w-full mx-auto"
    >
      <h2 className="text-white text-xl font-semibold mb-3">
        🧠 Founder Summary
      </h2>

      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">

        <div>
          <p className="text-gray-400">Biggest Competitor</p>
          <p className="text-white font-semibold">{topCompetitor}</p>
        </div>

        <div>
          <p className="text-gray-400">Top Lead</p>
          <p className="text-white font-semibold">{topLead}</p>
        </div>

        <div>
          <p className="text-gray-400">Ready Insights</p>
          <p className="text-green-400 font-semibold">
            {competitors?.length || 0} competitors • {leads?.length || 0} leads
          </p>
        </div>

      </div>
    </motion.div>
  );
}