import { ingestSourceDocument } from '../services/sourceDocument.service.js';

export async function scrapeNseAnnualReports() {
  // Mocking the extraction
  const mockAnnualReports = [
    { symbol: "NTPC", url: "https://www.nseindia.com/companies/NTPC/annual-report-2024.pdf", date: "2024-06-10" },
    { symbol: "SAIL", url: "https://www.nseindia.com/companies/SAIL/annual-report-2024.pdf", date: "2024-06-15" }
  ];

  const results = [];
  
  for (const report of mockAnnualReports) {
    const doc = {
      source_name: "NSE Annual Reports",
      source_type: "Registry",
      source_tier: "B",
      source_url: report.url,
      title: `Annual Report 2023-24 - ${report.symbol}`,
      document_type: "annual_report",
      publication_date: report.date,
      scraped_at: new Date().toISOString(),
      jurisdiction: "India",
      company_tags: [report.symbol],
      confidence_score: 90, 
      provenance: "company_disclosed",
      data_status: "verified"
    };

    const ingested = ingestSourceDocument(doc);
    if (ingested.changed) results.push(ingested.record);
  }

  return { status: "success", count: results.length, reports: results, lastScraped: new Date().toISOString() };
}
