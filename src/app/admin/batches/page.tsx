'use client';

import React, { useState } from 'react';
import { BATCH_REPORTS } from '@/data/batches';
import { ShieldCheck, Plus, CheckCircle2, Download, ExternalLink, Calendar, Building2 } from 'lucide-react';

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState(BATCH_REPORTS);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Batch Registry & NABL Lab Reports
          </h1>
          <p className="text-xs text-gray-500">
            Audit Certificates of Analysis (CoA) for heavy metals, microbiology, and pesticide residues.
          </p>
        </div>

        <button
          onClick={() => alert('New NABL batch upload dialog initiated.')}
          className="px-4 py-2 text-xs font-bold gold-gradient-btn rounded-xl flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Lab Report</span>
        </button>
      </div>

      <div className="space-y-4">
        {Object.values(batches).map((report) => (
          <div key={report.batchNumber} className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#1F4D3A] bg-[#FAF6EC] px-2.5 py-1 rounded-lg border border-[#E6DFC8]">
                  BATCH #{report.batchNumber}
                </span>
                <span className="font-semibold text-xs text-gray-700">{report.productName}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200 self-start sm:self-auto">
                ✓ {report.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-600">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">NABL Lab:</span>
                <span className="font-semibold text-[#1F4D3A]">{report.testingLab.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Accreditation:</span>
                <span className="font-mono">{report.nablAccreditationNo}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Lead Level:</span>
                <span className="font-mono font-bold text-green-700">{report.heavyMetals.lead.value}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Assay Marker:</span>
                <span className="font-mono font-bold text-[#C8922B]">{report.assay.foundPercentage}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs border-t border-gray-100">
              <span className="text-[11px] text-gray-400">
                Mfg: {report.mfgDate} • Exp: {report.expiryDate}
              </span>

              <a
                href={`/verify-batch?batch=${report.batchNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#1F4D3A] hover:text-[#C8922B] flex items-center gap-1"
              >
                <span>Live Public QR Landing View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
