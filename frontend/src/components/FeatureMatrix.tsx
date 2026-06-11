import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type FeatureRow = {
  feature: string;
  ourProduct: boolean;
  [key: string]: any; 
};

export default function FeatureMatrix({
  data,
}: {
  data: FeatureRow[];
}) {
  if (!data || data.length === 0) return null;

  const competitors = Object.keys(data[0]).filter(
    (key) => key !== "feature"
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border border-white/10 rounded-xl overflow-hidden">
        
        {/* HEADER */}
        <thead className="bg-white/5 text-gray-300">
          <tr>
            <th className="p-3 border border-white/10">Feature</th>
            {competitors.map((comp) => (
              <th key={comp} className="p-3 border border-white/10">
                {comp}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-t border-white/10 hover:bg-white/5 transition"
            >
              {/* FEATURE NAME */}
              <td className="p-3 text-white font-medium">
                {row.feature}
              </td>

              {/* COLUMNS */}
              {competitors.map((comp, idx) => (
                <td key={idx} className="p-3 text-center">
                  {row[comp] ? (
                    <FaCheckCircle className="text-green-400 mx-auto" />
                  ) : (
                    <FaTimesCircle className="text-red-400 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}