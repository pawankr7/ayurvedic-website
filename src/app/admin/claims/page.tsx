'use client';

import React, { useState } from 'react';
import { CLAIMS_REGISTRY, auditClaimText, FORBIDDEN_WORDS } from '@/data/claimsCompliance';
import { ShieldCheck, CheckCircle2, AlertTriangle, Search, FileText, Check } from 'lucide-react';

export default function AdminClaimsPage() {
  const [claims, setClaims] = useState(CLAIMS_REGISTRY);
  const [testInput, setTestInput] = useState('');
  const [auditResult, setAuditResult] = useState<{ isValid: boolean; matchedForbiddenWords: string[] } | null>(null);

  const handleAuditText = (e: React.FormEvent) => {
    e.preventDefault();
    if (testInput.trim()) {
      setAuditResult(auditClaimText(testInput));
    }
  };

  const handleUpdateStatus = (id: string, newStatus: 'APPROVED' | 'PENDING' | 'FLAGGED') => {
    setClaims((prev) =>
      prev.map((c) => (c.id === id ? { ...c, legalReviewStatus: newStatus } : c))
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
          Regulatory Claims Review & Legal Compliance
        </h1>
        <p className="text-xs text-gray-500">
          Strict adherence to AYUSH regulations and ASCI Advertising Guidelines. Prevent disease curing claims.
        </p>
      </div>

      {/* Live Text Auditor Tool */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6DFC8] shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1F4D3A] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C8922B]" />
          <span>Live Copy Compliance Auditor</span>
        </h3>
        <p className="text-xs text-gray-500">
          Paste any proposed marketing headline, description or ad copy to screen against prohibited terms.
        </p>

        <form onSubmit={handleAuditText} className="space-y-3">
          <textarea
            rows={3}
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Type or paste promotional copy here (e.g. 'Supports digestive ease naturally' or 'Cures diabetes completely')..."
            className="w-full p-3 text-xs bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl focus:outline-none focus:border-[#1F4D3A]"
          />

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400">
              Prohibited keywords: {FORBIDDEN_WORDS.slice(0, 6).join(', ')}...
            </span>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold gold-gradient-btn rounded-xl cursor-pointer"
            >
              Audit Copy
            </button>
          </div>
        </form>

        {auditResult && (
          <div className={`p-4 rounded-xl text-xs ${
            auditResult.isValid
              ? 'bg-green-50 text-green-900 border border-green-200'
              : 'bg-red-50 text-red-900 border border-red-200'
          }`}>
            {auditResult.isValid ? (
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                <span>COMPLIANT COPY: No prohibited medical disease curing claims detected. Safe for publishing.</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-red-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span>NON-COMPLIANT COPY: Prohibited terms flagged!</span>
                </div>
                <p>
                  Found forbidden keywords: <strong>{auditResult.matchedForbiddenWords.join(', ')}</strong>. Please substitute with compliant phrases like &apos;supports&apos; or &apos;traditionally used for&apos;.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Registry Table */}
      <div className="bg-white rounded-3xl border border-[#E6DFC8] shadow-xs overflow-hidden space-y-4 p-6">
        <h3 className="text-sm font-bold text-[#1F4D3A] border-b pb-2">
          Central Registry of Approved & Pending Product Claims
        </h3>

        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim.id} className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E6DFC8] space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DFC8] pb-2">
                <div>
                  <span className="font-mono font-bold text-[#1F4D3A] mr-2">{claim.id}</span>
                  <strong className="text-gray-700">{claim.category} • {claim.productSlug}</strong>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <button
                    onClick={() => handleUpdateStatus(claim.id, 'APPROVED')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      claim.legalReviewStatus === 'APPROVED' ? 'bg-green-700 text-white' : 'bg-white border text-gray-600'
                    }`}
                  >
                    APPROVED
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(claim.id, 'PENDING')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      claim.legalReviewStatus === 'PENDING' ? 'bg-amber-600 text-white' : 'bg-white border text-gray-600'
                    }`}
                  >
                    PENDING
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(claim.id, 'FLAGGED')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      claim.legalReviewStatus === 'FLAGGED' ? 'bg-red-700 text-white' : 'bg-white border text-gray-600'
                    }`}
                  >
                    FLAGGED
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">Published Claim (EN):</span>
                  <p className="text-gray-800 font-medium">{claim.claimEnglish}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 block">Published Claim (HI):</span>
                  <p className="text-gray-800 font-medium">{claim.claimHindi}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6DFC8] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-gray-500 gap-1">
                <span>Citation: <strong className="font-mono text-[#1F4D3A]">{claim.classicalCitation}</strong></span>
                <span>Auditor Note: {claim.reviewerNotes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
