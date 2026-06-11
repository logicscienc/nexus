import { motion } from "framer-motion";

type Props = {
  competitor: any;
  onClose: () => void;
};

export default function ComparisonModal({ competitor, onClose }: Props) {
  if (!competitor) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#111] text-white p-6 rounded-lg w-[90%] max-w-2xl relative"
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-400 text-xl"
        >
          ✕
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-bold mb-4">
          Our Product vs {competitor.name}
        </h2>

        {/* FEATURE TABLE */}
        <table className="w-full text-sm border border-gray-700">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-2">Feature</th>
              <th className="p-2">Our Product</th>
              <th className="p-2">{competitor.name}</th>
            </tr>
          </thead>

          <tbody>
            {competitor.features?.map((f: any, i: number) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="p-2">{f.feature}</td>
                <td className="p-2">{f.ourProduct ? "✔" : "✖"}</td>
                <td className="p-2">{f.competitor ? "✔" : "✖"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* WIN / LOSE SECTION */}
        <div className="mt-4">

          <h3 className="font-semibold text-green-400">
            We Win In:
          </h3>
          <p className="text-sm text-gray-300">
            {competitor.weWinIn?.length > 0
              ? competitor.weWinIn.join(", ")
              : "No strong wins yet"}
          </p>

          <h3 className="font-semibold text-red-400 mt-2">
            We Lose In:
          </h3>
          <p className="text-sm text-gray-300">
            {competitor.weLoseIn?.length > 0
              ? competitor.weLoseIn.join(", ")
              : "No major gaps"}
          </p>
        </div>

        {/* REASONING */}
        <div className="mt-4 p-3 bg-black border border-gray-700 rounded">
          <h3 className="font-bold mb-1">Why this verdict?</h3>
          <p className="text-sm text-gray-300">
            {competitor.reasoning}
          </p>
        </div>

        {/* VERDICT */}
        <div className="mt-3 p-3 bg-white/5 rounded">
          <h3 className="font-bold">Verdict</h3>
          <p className="text-sm text-gray-300">
            {competitor.verdict}
          </p>
        </div>

      </motion.div>
    </div>
  );
}