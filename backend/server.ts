import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (_, res) => {
  res.json({ message: "API working" });
});

app.post("/analyze", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        message: "Query is required",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a startup research analyst.

Return ONLY valid JSON. No markdown, no explanation.

You must always follow this exact structure:

{
  "competitors": [
    {
      "name": "",
      "pricing": "",
      "targetAudience": "",
      "positioning": "",
      "strengths": [],
      "weaknesses": [],
      "confidenceScore": 0,
      "source": ""
    }
  ],

  "featureMatrix": [
  {
    "feature": "",
    "ourProduct": true,
    "CompetitorNameA": false,
  "CompetitorNameB": true,
  "CompetitorNameC": true,
  "CompetitorNameD": false,
  "CompetitorNameE": false,
  }
],



  "comparison": {
    "ourProductName": "",
    "competitors": [
      {
        "name": "",
        "features": [
          {
            "feature": "",
            "ourProduct": true,
            "competitor": true
          }
        ],
        "weWinIn": [],
        "weLoseIn": [],
        "verdict": "",
        "confidenceScore": 0,
        "reasoning": ""
      }
    ]
  },

  "recommendations": {
    "topFeaturesToBuild": [],
    "marketOpportunities": [],
    "risks": []
  },

  "leads": [
    {
      "company": "",
      "website": "",
      "industry": "",
      "employeeSize": "",
      "location": "",
      "contactPerson": "",
      "jobTitle": "",
      "linkedIn": "",
      "email": "",
      "reason": ""
    }
  ]
}

────────────────────────────
RULES — STRICT OUTPUT CONTROL
────────────────────────────

FEATURE MATRIX RULES:

- Generate 8–12 feature rows.
- Use the exact names of the identified competitors as column keys.
- The same competitor names must be used consistently across ALL feature rows.
- Competitor names must exactly match the competitors array.
- Never use Buffer, Hootsuite, SproutSocial, or any unrelated example company names.
- Include both strengths of our product and features competitors offer that our product lacks.
- Include feature gaps and differentiation opportunities.

FEATURE MATRIX EXAMPLE:

{
  "feature": "Mock Technical Interviews",
  "ourProduct": true,
  "<competitor_name_1>": false,
  "<competitor_name_2>": true,
  "<competitor_name_3>": true,
  "<competitor_name_4>": false,
  "<competitor_name_5>": false
}

GENERAL RULES:
- Output MUST be valid JSON only
- Never include markdown or explanation
- Always return ALL sections (no missing keys)
- Keep data realistic and consistent
- confidenceScore must be integer 0–100

COMPETITOR RULES:
- Identify exactly 5 competitors
- Each competitor must have strengths and weaknesses
- Include pricing, audience, positioning
- Include valid source string

COMPARISON RULES:
- MUST compare OUR product vs EACH competitor
- MUST explicitly define where we WIN
- MUST explicitly define where we LOSE
- MUST include final verdict:
  WINNING | COMPETITIVE | HIGH THREAT
- MUST include 1–2 line reasoning
- MUST NOT leave empty arrays (always fill with insights)

RECOMMENDATION RULES:
- topFeaturesToBuild = exactly 5 items
- marketOpportunities = exactly 5 items
- risks = exactly 3 items
- All items must be actionable and specific

LEAD RULES:
- Generate exactly 5 leads
- Must include decision makers (CEO, Head, Manager etc.)
- Email can be inferred if not known
- Must be realistic and consistent
- Include all fields even if approximate

IMPORTANT RULE:
All items in "weWinIn" and "weLoseIn" MUST come from the feature comparison table.
Do NOT invent extra features outside the table.

STRICT RULE:
WeLoseIn can ONLY include features where "Our Product = false" AND competitor = true.

WeWinIn can ONLY include features where "Our Product = true" AND competitor = false.

If both are true OR both are false → do NOT include in either list.


Verdict MUST be derived using:
- WINNING → more wins than losses by large margin
- COMPETITIVE → balanced wins and losses
- HIGH THREAT → more losses than wins

RULE:
WeWinIn = ONLY features where Our Product = true AND Competitor = false

WeLoseIn = ONLY features where Our Product = false AND Competitor = true

If both are same (true/true or false/false) → IGNORE completely (do not include anywhere)
          `,
        },
        {
          role: "user",
          content: `Analyze this product idea: ${query}`,
        },
      ],
    });

    const result = completion.choices[0].message.content;

    if (!result) {
      return res.status(500).json({
        message: "No response from AI",
      });
    }

    const parsed = JSON.parse(result);

    return res.json(parsed);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to analyze product",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});