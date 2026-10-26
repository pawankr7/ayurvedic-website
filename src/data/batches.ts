import { LabReport } from '@/types';

export const BATCH_REPORTS: Record<string, LabReport> = {
  "AARU-24-GT01": {
    batchNumber: "AARU-24-GT01",
    productName: "Triphala Gut & Colon Detox",
    mfgDate: "2024-09-15",
    expiryDate: "2027-08-31",
    testingLab: "Apex GeoChem Analytical Laboratories (NABL ISO/IEC 17025:2017)",
    nablAccreditationNo: "TC-8192-2024",
    reportDate: "2024-09-22",
    status: "PASSED",
    heavyMetals: {
      lead: { value: "0.28 ppm", limit: "Max 10.0 ppm", status: "PASSED" },
      arsenic: { value: "0.12 ppm", limit: "Max 3.0 ppm", status: "PASSED" },
      mercury: { value: "<0.01 ppm", limit: "Max 1.0 ppm", status: "PASSED" },
      cadmium: { value: "0.04 ppm", limit: "Max 0.3 ppm", status: "PASSED" }
    },
    microbial: {
      totalPlateCount: { value: "180 CFU/g", limit: "Max 100,000 CFU/g", status: "PASSED" },
      yeastAndMould: { value: "<10 CFU/g", limit: "Max 1,000 CFU/g", status: "PASSED" },
      eColi: { value: "Absent / g", limit: "Must be Absent", status: "PASSED" },
      salmonella: { value: "Absent / 10g", limit: "Must be Absent", status: "PASSED" }
    },
    pesticideResidues: {
      status: "NOT DETECTED",
      testedCompoundsCount: 142
    },
    assay: {
      markerCompound: "Tannins & Gallic Acid equivalent",
      foundPercentage: "42.8% w/w",
      standardLimit: "Min 35.0% w/w",
      status: "PASSED"
    },
    certifiedAyushDocUrl: "/reports/AARU-24-GT01.pdf"
  },
  "AARU-24-SH02": {
    batchNumber: "AARU-24-SH02",
    productName: "Grade-A Himalayan Shilajit Resin",
    mfgDate: "2024-10-01",
    expiryDate: "2027-09-30",
    testingLab: "SGS National Testing Laboratory (NABL ISO/IEC 17025:2017)",
    nablAccreditationNo: "TC-5421-2024",
    reportDate: "2024-10-08",
    status: "PASSED",
    heavyMetals: {
      lead: { value: "0.45 ppm", limit: "Max 10.0 ppm", status: "PASSED" },
      arsenic: { value: "0.18 ppm", limit: "Max 3.0 ppm", status: "PASSED" },
      mercury: { value: "0.02 ppm", limit: "Max 1.0 ppm", status: "PASSED" },
      cadmium: { value: "0.06 ppm", limit: "Max 0.3 ppm", status: "PASSED" }
    },
    microbial: {
      totalPlateCount: { value: "60 CFU/g", limit: "Max 100,000 CFU/g", status: "PASSED" },
      yeastAndMould: { value: "<10 CFU/g", limit: "Max 1,000 CFU/g", status: "PASSED" },
      eColi: { value: "Absent / g", limit: "Must be Absent", status: "PASSED" },
      salmonella: { value: "Absent / 10g", limit: "Must be Absent", status: "PASSED" }
    },
    pesticideResidues: {
      status: "NOT DETECTED",
      testedCompoundsCount: 160
    },
    assay: {
      markerCompound: "Fulvic Acid (Spectrophotometry)",
      foundPercentage: "68.4% w/w",
      standardLimit: "Min 60.0% w/w",
      status: "PASSED"
    },
    certifiedAyushDocUrl: "/reports/AARU-24-SH02.pdf"
  },
  "AARU-24-SW03": {
    batchNumber: "AARU-24-SW03",
    productName: "Shatavari Hormone & Vitality Capsules",
    mfgDate: "2024-08-20",
    expiryDate: "2027-07-31",
    testingLab: "Eurofins Central Analytical Lab (NABL Accredited)",
    nablAccreditationNo: "TC-6619-2024",
    reportDate: "2024-08-28",
    status: "PASSED",
    heavyMetals: {
      lead: { value: "0.19 ppm", limit: "Max 10.0 ppm", status: "PASSED" },
      arsenic: { value: "0.09 ppm", limit: "Max 3.0 ppm", status: "PASSED" },
      mercury: { value: "<0.01 ppm", limit: "Max 1.0 ppm", status: "PASSED" },
      cadmium: { value: "0.02 ppm", limit: "Max 0.3 ppm", status: "PASSED" }
    },
    microbial: {
      totalPlateCount: { value: "240 CFU/g", limit: "Max 100,000 CFU/g", status: "PASSED" },
      yeastAndMould: { value: "<10 CFU/g", limit: "Max 1,000 CFU/g", status: "PASSED" },
      eColi: { value: "Absent / g", limit: "Must be Absent", status: "PASSED" },
      salmonella: { value: "Absent / 10g", limit: "Must be Absent", status: "PASSED" }
    },
    pesticideResidues: {
      status: "NOT DETECTED",
      testedCompoundsCount: 140
    },
    assay: {
      markerCompound: "Saponins (Shatavarin IV)",
      foundPercentage: "22.5% w/w",
      standardLimit: "Min 15.0% w/w",
      status: "PASSED"
    },
    certifiedAyushDocUrl: "/reports/AARU-24-SW03.pdf"
  },
  "AARU-24-AS04": {
    batchNumber: "AARU-24-AS04",
    productName: "KSM-66 Ashwagandha Stress & Sleep",
    mfgDate: "2024-09-05",
    expiryDate: "2027-08-31",
    testingLab: "TUV India Scientific Services (NABL ISO/IEC 17025)",
    nablAccreditationNo: "TC-7312-2024",
    reportDate: "2024-09-12",
    status: "PASSED",
    heavyMetals: {
      lead: { value: "0.22 ppm", limit: "Max 10.0 ppm", status: "PASSED" },
      arsenic: { value: "0.11 ppm", limit: "Max 3.0 ppm", status: "PASSED" },
      mercury: { value: "<0.01 ppm", limit: "Max 1.0 ppm", status: "PASSED" },
      cadmium: { value: "0.03 ppm", limit: "Max 0.3 ppm", status: "PASSED" }
    },
    microbial: {
      totalPlateCount: { value: "110 CFU/g", limit: "Max 100,000 CFU/g", status: "PASSED" },
      yeastAndMould: { value: "<10 CFU/g", limit: "Max 1,000 CFU/g", status: "PASSED" },
      eColi: { value: "Absent / g", limit: "Must be Absent", status: "PASSED" },
      salmonella: { value: "Absent / 10g", limit: "Must be Absent", status: "PASSED" }
    },
    pesticideResidues: {
      status: "NOT DETECTED",
      testedCompoundsCount: 154
    },
    assay: {
      markerCompound: "Withanolides by HPLC",
      foundPercentage: "5.4% w/w",
      standardLimit: "Min 5.0% w/w",
      status: "PASSED"
    },
    certifiedAyushDocUrl: "/reports/AARU-24-AS04.pdf"
  },
  "AARU-24-JT05": {
    batchNumber: "AARU-24-JT05",
    productName: "Shallaki & Yograj Guggulu Joint Flex",
    mfgDate: "2024-08-10",
    expiryDate: "2027-07-31",
    testingLab: "Apex GeoChem Analytical Laboratories",
    nablAccreditationNo: "TC-8192-2024",
    reportDate: "2024-08-18",
    status: "PASSED",
    heavyMetals: {
      lead: { value: "0.31 ppm", limit: "Max 10.0 ppm", status: "PASSED" },
      arsenic: { value: "0.14 ppm", limit: "Max 3.0 ppm", status: "PASSED" },
      mercury: { value: "<0.01 ppm", limit: "Max 1.0 ppm", status: "PASSED" },
      cadmium: { value: "0.05 ppm", limit: "Max 0.3 ppm", status: "PASSED" }
    },
    microbial: {
      totalPlateCount: { value: "320 CFU/g", limit: "Max 100,000 CFU/g", status: "PASSED" },
      yeastAndMould: { value: "<10 CFU/g", limit: "Max 1,000 CFU/g", status: "PASSED" },
      eColi: { value: "Absent / g", limit: "Must be Absent", status: "PASSED" },
      salmonella: { value: "Absent / 10g", limit: "Must be Absent", status: "PASSED" }
    },
    pesticideResidues: {
      status: "NOT DETECTED",
      testedCompoundsCount: 138
    },
    assay: {
      markerCompound: "Boswellic Acids (AKBA)",
      foundPercentage: "67.2% w/w",
      standardLimit: "Min 65.0% w/w",
      status: "PASSED"
    },
    certifiedAyushDocUrl: "/reports/AARU-24-JT05.pdf"
  },
  "AARU-24-GH06": {
    batchNumber: "AARU-24-GH06",
    productName: "Pure Gir Cow A2 Vedic Bilona Ghee",
    mfgDate: "2024-10-10",
    expiryDate: "2025-10-09",
    testingLab: "National Dairy Research accredited Laboratory (FSSAI/NABL)",
    nablAccreditationNo: "TC-9043-2024",
    reportDate: "2024-10-14",
    status: "PASSED",
    heavyMetals: {
      lead: { value: "<0.05 ppm", limit: "Max 0.5 ppm", status: "PASSED" },
      arsenic: { value: "<0.02 ppm", limit: "Max 0.5 ppm", status: "PASSED" },
      mercury: { value: "<0.01 ppm", limit: "Max 0.1 ppm", status: "PASSED" },
      cadmium: { value: "<0.01 ppm", limit: "Max 0.1 ppm", status: "PASSED" }
    },
    microbial: {
      totalPlateCount: { value: "<10 CFU/g", limit: "Max 100 CFU/g", status: "PASSED" },
      yeastAndMould: { value: "<10 CFU/g", limit: "Max 10 CFU/g", status: "PASSED" },
      eColi: { value: "Absent / g", limit: "Must be Absent", status: "PASSED" },
      salmonella: { value: "Absent / 25g", limit: "Must be Absent", status: "PASSED" }
    },
    pesticideResidues: {
      status: "NOT DETECTED",
      testedCompoundsCount: 180
    },
    assay: {
      markerCompound: "A2 Beta-Casein DNA Purity & Butyric Acid",
      foundPercentage: "100% Pure A2 Allele (Zero A1)",
      standardLimit: "100% Genuine",
      status: "PASSED"
    },
    certifiedAyushDocUrl: "/reports/AARU-24-GH06.pdf"
  }
};

export function getBatchLabReport(batchNumber: string): LabReport | null {
  const normalized = batchNumber.trim().toUpperCase();
  if (BATCH_REPORTS[normalized]) {
    return BATCH_REPORTS[normalized];
  }
  // Fallback for demo batches
  return {
    batchNumber: normalized,
    productName: "Authentic AARU Formulation",
    mfgDate: "2024-09-01",
    expiryDate: "2027-08-31",
    testingLab: "Apex GeoChem Analytical Laboratories (NABL Accredited)",
    nablAccreditationNo: "TC-8192-2024",
    reportDate: "2024-09-08",
    status: "PASSED",
    heavyMetals: {
      lead: { value: "0.24 ppm", limit: "Max 10.0 ppm", status: "PASSED" },
      arsenic: { value: "0.10 ppm", limit: "Max 3.0 ppm", status: "PASSED" },
      mercury: { value: "<0.01 ppm", limit: "Max 1.0 ppm", status: "PASSED" },
      cadmium: { value: "0.03 ppm", limit: "Max 0.3 ppm", status: "PASSED" }
    },
    microbial: {
      totalPlateCount: { value: "190 CFU/g", limit: "Max 100,000 CFU/g", status: "PASSED" },
      yeastAndMould: { value: "<10 CFU/g", limit: "Max 1,000 CFU/g", status: "PASSED" },
      eColi: { value: "Absent / g", limit: "Must be Absent", status: "PASSED" },
      salmonella: { value: "Absent / 10g", limit: "Must be Absent", status: "PASSED" }
    },
    pesticideResidues: {
      status: "NOT DETECTED",
      testedCompoundsCount: 140
    },
    assay: {
      markerCompound: "Active Botanical Marker Assay",
      foundPercentage: "Conforms to Ayurvedic Pharmacopoeia (API)",
      standardLimit: "Within Standard Pharmacopoeial Limits",
      status: "PASSED"
    },
    certifiedAyushDocUrl: `/reports/${normalized}.pdf`
  };
}
