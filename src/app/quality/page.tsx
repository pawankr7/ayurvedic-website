'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { BATCH_REPORTS } from '@/data/batches';
import { ShieldCheck, Award, FileText, Download, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';

export default function QualityPage() {
  const { isHindi } = useLanguage();

  const certificates = [
    { title: "AYUSH Manufacturing License", number: "AYUSH-UK-2024-9102", authority: "State Licensing Authority, Dept. of AYUSH", validTill: "2029-03-31", type: "Classical & Proprietary Formulations" },
    { title: "Good Manufacturing Practice (GMP)", number: "GMP-MH-2023-7721", authority: "Food & Drug Administration (FDA)", validTill: "2027-12-31", type: "Cleanroom Facility Standard" },
    { title: "ISO 9001:2015 Quality Management", number: "ISO-QMS-9104-IN", authority: "International Standards Accreditation", validTill: "2028-06-30", type: "Process Traceability" },
    { title: "FSSAI Central Food Safety License", number: "FSSAI-10022021000492", authority: "Food Safety and Standards Authority of India", validTill: "2027-08-31", type: "A2 Vedic Ghee & Herbal Teas" }
  ];

  const sourcingRegions = [
    { region: "Ladakh High Himalayas (18,000+ ft)", herb: "Grade-A Shilajit Resin", altitude: "5,500m above sea level", notes: "Sun-purified (Surya-Tapi) with Triphala decoction. Zero solvent residues." },
    { region: "Amarkantak & Pratapgarh Reserves", herb: "Wild Amalaki (Amla)", altitude: "Central Indian Forest Belt", notes: "Hand-picked in winter season; natural heat-stable Vitamin C preservation." },
    { region: "Gir Somnath Sanctuary, Gujarat", herb: "Pure Gir Cow A2 Milk", altitude: "Pasture grazed indigenous cows", notes: "Hand-churned whole curd wooden Bilona method in earthen vats." },
    { region: "Western Ghats, Kerala", herb: "Bhringraj & Medhya Botanicals", altitude: "Biodiversity Hotspot", notes: "72-hour Kshirpak simmer in goat milk for supreme dermal bioavailability." },
    { region: "Pampore, Kashmir Valley", herb: "Pure Mongra Saffron (Kesar)", altitude: "GI-Tagged Saffron Soil", notes: "Red stigmas only. Verified crocin coloring strength > 240 units." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1F4D3A]/10 text-[#1F4D3A] text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
          <span>Provable Trust Standard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-ayur text-[#1F4D3A]">
          {isHindi ? "हमारी गुणवत्ता, लाइसेंस एवं लैब मानक" : "Our Quality, Licenses & Lab Standards"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {isHindi
            ? "आयुर्वेद में विश्वास केवल बातों से नहीं, प्रमाण से बनता है। हमारे सभी विनिर्माण लाइसेंस, सरकारी प्रमाण और स्वतंत्र NABL लैब रिपोर्ट यहां सार्वजनिक हैं।"
            : "In traditional wellness, trust is built through radical transparency. Review our statutory AYUSH licenses, cleanroom GMP validations, and live NABL laboratory certificates."}
        </p>
      </div>

      {/* 1. Official Regulatory Certificates Grid */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-serif-ayur text-[#1F4D3A] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#C8922B]" />
          <span>Statutory Certifications & Accreditations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#1F4D3A]">{cert.title}</h3>
                  <p className="text-xs text-gray-500">{cert.authority}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                  Active & Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-gray-600">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Registration No:</span>
                  <strong className="font-mono text-[#1F4D3A]">{cert.number}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Validity Period:</span>
                  <span>Valid through {cert.validTill}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 bg-[#FAF6EC] p-2.5 rounded-xl border border-[#E6DFC8]">
                <strong>Scope:</strong> {cert.type}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Process Timeline: The 4-Step Scientific Quality Pipeline */}
      <div className="bg-[#FAF6EC] p-6 sm:p-12 rounded-3xl border border-[#E6DFC8] space-y-8">
        <div className="max-w-xl space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8922B]">
            From Soil to Supplement
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            The 4-Step AARU Quality Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center text-xs font-bold">1</span>
            <h4 className="font-bold text-xs sm:text-sm text-[#1F4D3A]">Sustainable Wildcrafting</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Herbs harvested only from their geographical natural habitats during optimal lunar phases (Sharad Ritu) for peak medicinal potency.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center text-xs font-bold">2</span>
            <h4 className="font-bold text-xs sm:text-sm text-[#1F4D3A]">Classical Shodhana</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Minerals and resinated botanicals undergo classical purification (Shodhana) using Triphala decoctions, eliminating raw toxicity.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center text-xs font-bold">3</span>
            <h4 className="font-bold text-xs sm:text-sm text-[#1F4D3A]">Cleanroom GMP Purity</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Formulated in ISO Class 8 cleanrooms with HEPA air filtration. Zero human skin contact during encapsulation and bottling.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E6DFC8] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center text-xs font-bold">4</span>
            <h4 className="font-bold text-xs sm:text-sm text-[#1F4D3A]">Independent NABL Testing</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Every single batch is sent to accredited laboratories for ICP-MS heavy metal checks and published publicly under our batch portal.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Geographical Sourcing Map */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-serif-ayur text-[#1F4D3A] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#C8922B]" />
          <span>Ethical Sourcing Provenance Across India</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sourcingRegions.map((region, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#E6DFC8] shadow-xs space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8922B] block">
                {region.herb}
              </span>
              <h4 className="font-bold text-sm text-[#1F4D3A]">{region.region}</h4>
              <p className="text-[11px] text-gray-400 font-medium">{region.altitude}</p>
              <p className="text-xs text-gray-600 pt-1 leading-relaxed border-t border-gray-100">
                {region.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Lab Reports Library */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold font-serif-ayur text-[#1F4D3A]">
              Public Batch Lab Reports Library
            </h2>
            <p className="text-xs text-gray-500">
              Download complete third-party Certificates of Analysis (CoA) for all active batches.
            </p>
          </div>
          <Link
            href="/verify-batch"
            className="px-4 py-2 text-xs font-bold gold-gradient-btn rounded-xl flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Scan or Verify My Batch Code →</span>
          </Link>
        </div>

        <div className="overflow-x-auto border border-[#E6DFC8] rounded-2xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EC] text-[#1F4D3A] uppercase text-[10px] font-bold border-b border-[#E6DFC8]">
              <tr>
                <th className="p-3">Batch Number</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Testing Laboratory</th>
                <th className="p-3">Tested Date</th>
                <th className="p-3">Heavy Metals</th>
                <th className="p-3 text-right">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {Object.values(BATCH_REPORTS).map((b) => (
                <tr key={b.batchNumber} className="hover:bg-[#FAF6EC]/50 transition-colors">
                  <td className="p-3 font-bold text-[#1F4D3A]">{b.batchNumber}</td>
                  <td className="p-3 font-sans font-semibold text-gray-800">{b.productName}</td>
                  <td className="p-3 font-sans text-gray-600 truncate max-w-[200px]">{b.testingLab.split('(')[0]}</td>
                  <td className="p-3 text-gray-500">{b.reportDate}</td>
                  <td className="p-3 text-green-700 font-bold font-sans">✓ ALL PASSED</td>
                  <td className="p-3 text-right font-sans">
                    <Link
                      href={`/verify-batch?batch=${b.batchNumber}`}
                      className="text-[#C8922B] hover:underline font-bold inline-flex items-center gap-1"
                    >
                      <span>View CoA</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
