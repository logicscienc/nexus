import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";



const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },

  title: {
    fontSize: 22,
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "bold",
  },

  section: {
    marginBottom: 16,
    paddingBottom: 10,
    borderBottom: "1 solid #dddddd",
  },

  heading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },

  card: {
    border: "1 solid #ddd",
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
  },

  summaryCard: {
    border: "1 solid #000",
    padding: 12,
    marginBottom: 10,
  },
});

export const ReportPDF = ({
  query,
  competitors,
  recommendations,
  leads,
}: any) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* TITLE */}
      <Text style={styles.title}>
        Nexus Intelligence Report
      </Text>

      {/* EXECUTIVE SUMMARY */}
      <View style={styles.section}>
        <Text style={styles.heading}>
           Executive Summary
        </Text>

        <View style={styles.summaryCard}>
          <Text>Product: {query}</Text>
          <Text> Top Competitor: {competitors?.[0]?.name}</Text>
          <Text> Total Competitors: {competitors?.length}</Text>
          <Text> Top Lead: {leads?.[0]?.company}</Text>
        </View>
      </View>

      {/* COMPETITORS */}
      <View style={styles.section}>
        <Text style={styles.heading}>
          Competitors
        </Text>

        {competitors.map((c: any) => (
          <View key={c.name} style={styles.card}>

            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              {c.name}
            </Text>

            <Text> Score: {c.confidenceScore}%</Text>
            <Text> Pricing: {c.pricing}</Text>
            <Text> Audience: {c.targetAudience}</Text>
            <Text> Positioning: {c.positioning}</Text>
          </View>
        ))}
      </View>

      {/* RECOMMENDATIONS */}
      <View style={styles.section}>
        <Text style={styles.heading}>
           Recommendations
        </Text>

        {recommendations?.topFeaturesToBuild?.map(
  (item: string, i: number) => (
    <Text key={i}>✔ {item}</Text>
  )
)}
        
      </View>

      {/* LEADS */}
      <View style={styles.section}>
  <Text style={styles.heading}>Leads</Text>

  {leads.map((lead: any, i: number) => (
    <View key={i} style={styles.card}>

      <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
        {lead.company}
      </Text>

      <Text>Industry: {lead.industry}</Text>
      <Text>Location: {lead.location}</Text>
      <Text>Size: {lead.employeeSize}</Text>

      <Text>Contact: {lead.contactPerson}</Text>
      <Text>Role: {lead.jobTitle}</Text>

      <Text>Email: {lead.email}</Text>
      <Text>Website: {lead.website}</Text>

      <Text style={{ marginTop: 4 }}>
        Why: {lead.reason}
      </Text>

    </View>
  ))}
</View>

    </Page>
  </Document>
);