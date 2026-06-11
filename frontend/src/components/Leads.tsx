import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaUserTie } from "react-icons/fa";

type Lead = {
  company: string;
  website: string;
  industry: string;
  employeeSize: string;
  location: string;
  contactPerson: string;
  jobTitle: string;
  linkedIn: string;
  email: string;
  reason: string;
};

export default function Leads({ data }: { data: Lead[] }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No leads generated yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((lead, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-semibold">
                {lead.company}
              </h3>
              <p className="text-gray-400 text-sm">
                {lead.industry} • {lead.location}
              </p>
            </div>

            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
              {lead.employeeSize}
            </span>
          </div>

          {/* CONTACT PERSON */}
          <div className="mt-3 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <FaUserTie className="text-gray-400" />
              {lead.contactPerson} — {lead.jobTitle}
            </p>
          </div>

          {/* CONTACT LINKS */}
          <div className="flex gap-4 mt-3 text-sm">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-2 text-blue-400 hover:underline"
              >
                <FaEnvelope /> Email
              </a>
            )}

            {lead.linkedIn && (
              <a
                href={lead.linkedIn}
                target="_blank"
                className="flex items-center gap-2 text-blue-400 hover:underline"
              >
                <FaLinkedin /> LinkedIn
              </a>
            )}
          </div>

          {/* WHY THIS LEAD */}
          <p className="text-gray-400 text-xs mt-3 border-t border-white/10 pt-3">
            <span className="text-white font-medium">
              Why this lead:
            </span>{" "}
            {lead.reason}
          </p>
        </motion.div>
      ))}
    </div>
  );
}