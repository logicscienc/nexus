import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";

type Competitor = {
  name: string;
  pricing?: string;
  targetAudience?: string;
  positioning?: string;
  strengths?: string[];
  weaknesses?: string[];
  confidenceScore?: number;
  score?: number;
  source?: string;
};

type Props = {
  data: Competitor;
  onCompare: (competitor: Competitor) => void;
};

export default function CompetitorCard({ data, onCompare }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4 backdrop-blur-md transition-all"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {data.name}
          </h3>

          <button
            onClick={() => onCompare(data)}
            className="text-blue-400 text-xs mt-1 hover:text-blue-300 transition"
          >
            Compare with Us
          </button>
        </div>

        {/* SCORE FIX*/}
        <span className="flex items-center gap-1 text-green-400 text-sm bg-green-500/10 px-2 py-1 rounded-lg">
          <FaStar className="text-green-400" />
          {(data.score ?? data.confidenceScore ?? 0)}%
        </span>
      </div>

      {/* BASIC INFO */}
      <div className="space-y-1 text-gray-300 text-sm">
        <p>
          <span className="font-semibold text-white">Pricing:</span>{" "}
          {data.pricing || "N/A"}
        </p>

        <p>
          <span className="font-semibold text-white">Audience:</span>{" "}
          {data.targetAudience || "N/A"}
        </p>

        <p>
          <span className="font-semibold text-white">Positioning:</span>{" "}
          {data.positioning || "N/A"}
        </p>
      </div>

      {/* STRENGTHS & WEAKNESSES */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="text-green-400 font-semibold mb-2">
            Strengths
          </h4>

          {(data.strengths ?? []).length > 0 ? (
            data.strengths!.map((s, i) => (
              <p key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <FaCheckCircle className="text-green-400 mt-1" />
                {s}
              </p>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No strengths data</p>
          )}
        </div>

        <div>
          <h4 className="text-red-400 font-semibold mb-2">
            Weaknesses
          </h4>

          {(data.weaknesses ?? []).length > 0 ? (
            data.weaknesses!.map((w, i) => (
              <p key={i} className="flex items-start gap-2 text-sm text-gray-300">
                <FaTimesCircle className="text-red-400 mt-1" />
                {w}
              </p>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No weaknesses data</p>
          )}
        </div>
      </div>

      {/* SOURCE */}
      <p className="text-xs text-gray-500 mt-4 border-t border-white/10 pt-3">
        Source: {data.source || "N/A"}
      </p>
    </motion.div>
  );
}