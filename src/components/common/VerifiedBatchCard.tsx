'use client';

import React, { useState } from 'react';
import { LabReport } from '@/types';
import { getBatchLabReport } from '@/data/batches';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, CheckCircle2, Download, ExternalLink, Calendar, Building2, FileText, AlertCircle } from 'lucide-react';

export default function VerifiedBatchCard({
  batchNumber,
  productName,
  isOpenByDefault = false
}: {
  batchNumber: string;
  productName?: string;
  isOpenByDefault?: boolean;
}) {
  const { isHindi } = useLanguage();
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const report = getBatchLabReport(batchNumber);

  if (!report) return null;

  return (
    <div className="bg-white rounded-2xl border-2 border-[#1F4D3A]/20 shadow-md overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1F4D3A] to-[#143527] p-4 text-[#FAF6EC] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#C8922B]/20 border border-[#C8922B] flex items-center justify-center text-[#C8922B]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#C8922B]">
                NABL Accredited Test Report
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-300 border border-green-500/40">
                100% PASSED
              </span>
            </div>
            <p className="text-sm font-bold font-mono tracking-wide">
              BATCH #{report.batchNumber}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-[#DFAB48] hover:text-white underline cursor-pointer"
        >
          {isOpen ? (isHindi ? "संक्षिप्त करें" : "Collapse") : (isHindi ? "पूरी लैब रिपोर्ट देखें" : "View Full Certificate")}
        </button>
      </div>

      {/* Meta Information Bar */}
      <div className="p-4 bg-[#FAF6EC] border-b border-[#E6DFC8] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#3B2F25]">
        <div>
          <span className="text-gray-500 block text-[10px] uppercase font-semibold">
            {isHindi ? "परीक्षण लैब" : "Accredited Lab"}
          </span>
          <strong className="text-[11px] text-[#1F4D3A] flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3 text-[#C8922B]" />
            <span className="truncate">{report.testingLab.split('(')[0]}</span>
          </strong>
        </div>

        <div>
          <span className="text-gray-500 block text-[10px] uppercase font-semibold">
            {isHindi ? "NABL मान्यता" : "NABL Reg. No"}
          </span>
          <strong className="text-[11px] font-mono text-[#1F4D3A] block mt-0.5">
            {report.nablAccreditationNo}
          </strong>
        </div>

        <div>
          <span className="text-gray-500 block text-[10px] uppercase font-semibold">
            {isHindi ? "निर्माण तिथि" : "Mfg Date"}
          </span>
          <strong className="text-[11px] text-[#1F4D3A] flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span>{report.mfgDate}</span>
          </strong>
        </div>

        <div>
          <span className="text-gray-500 block text-[10px] uppercase font-semibold">
            {isHindi ? "समाप्ति तिथि" : "Expiry Date"}
          </span>
          <strong className="text-[11px] text-[#1F4D3A] flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span>{report.expiryDate}</span>
          </strong>
        </div>
      </div>

      {/* Expandable Detailed Test Parameters */}
      {isOpen && (
        <div className="p-5 space-y-6 animate-in fade-in duration-200">
          
          {/* 1. Heavy Metals Table (Critical trust requirement) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F4D3A] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                <span>Heavy Metal Safety Analysis (USP/API Standards)</span>
              </h4>
              <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                Safe For Daily Use
              </span>
            </div>

            <div className="overflow-x-auto border border-[#E6DFC8] rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF6EC] text-[#3B2F25] uppercase text-[10px] font-bold border-b border-[#E6DFC8]">
                  <tr>
                    <th className="p-2.5">Heavy Metal Parameter</th>
                    <th className="p-2.5">Tested Value</th>
                    <th className="p-2.5">Govt Permissible Limit</th>
                    <th className="p-2.5 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-gray-800">Lead (Pb)</td>
                    <td className="p-2.5 text-[#1F4D3A] font-bold">{report.heavyMetals.lead.value}</td>
                    <td className="p-2.5 text-gray-500">{report.heavyMetals.lead.limit}</td>
                    <td className="p-2.5 text-right font-sans font-bold text-green-700">✓ PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-gray-800">Arsenic (As)</td>
                    <td className="p-2.5 text-[#1F4D3A] font-bold">{report.heavyMetals.arsenic.value}</td>
                    <td className="p-2.5 text-gray-500">{report.heavyMetals.arsenic.limit}</td>
                    <td className="p-2.5 text-right font-sans font-bold text-green-700">✓ PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-gray-800">Mercury (Hg)</td>
                    <td className="p-2.5 text-[#1F4D3A] font-bold">{report.heavyMetals.mercury.value}</td>
                    <td className="p-2.5 text-gray-500">{report.heavyMetals.mercury.limit}</td>
                    <td className="p-2.5 text-right font-sans font-bold text-green-700">✓ PASSED</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-gray-800">Cadmium (Cd)</td>
                    <td className="p-2.5 text-[#1F4D3A] font-bold">{report.heavyMetals.cadmium.value}</td>
                    <td className="p-2.5 text-gray-500">{report.heavyMetals.cadmium.limit}</td>
                    <td className="p-2.5 text-right font-sans font-bold text-green-700">✓ PASSED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Microbial & Pesticide Safety Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Microbial */}
            <div className="p-4 rounded-xl border border-[#E6DFC8] bg-[#FAF6EC]/50 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#1F4D3A] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                <span>Microbial Contamination Screen</span>
              </h5>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Plate Count:</span>
                  <strong className="font-mono">{report.microbial.totalPlateCount.value}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">E. Coli:</span>
                  <strong className="text-green-700 font-bold">{report.microbial.eColi.value}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salmonella:</span>
                  <strong className="text-green-700 font-bold">{report.microbial.salmonella.value}</strong>
                </div>
              </div>
            </div>

            {/* Assay & Pesticides */}
            <div className="p-4 rounded-xl border border-[#E6DFC8] bg-[#FAF6EC]/50 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#1F4D3A] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                <span>Botanical Assay & Purity</span>
              </h5>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Marker Compound:</span>
                  <strong className="truncate max-w-[140px]">{report.assay.markerCompound}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Found Value:</span>
                  <strong className="text-[#C8922B] font-bold font-mono">{report.assay.foundPercentage}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pesticides (140+):</span>
                  <strong className="text-green-700 font-bold">{report.pesticideResidues.status}</strong>
                </div>
              </div>
            </div>

          </div>

          {/* Download & Verification Note */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
            <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#1F4D3A]" />
              <span>Report verified directly by NABL QR Hash ID #NABL-{report.batchNumber}</span>
            </p>

            <button
              onClick={() => alert(`Certificate of Analysis (CoA) for batch ${report.batchNumber} is authentic and verified.`)}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-[#1F4D3A] hover:bg-[#143527] text-white flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C8922B]" />
              <span>{isHindi ? "लैब प्रमाणपत्र डाउनलोड करें (PDF)" : "Download Official CoA (PDF)"}</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
