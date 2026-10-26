'use client';

import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Phone, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aaru_leads');
      if (saved) {
        setLeads(JSON.parse(saved));
      } else {
        setLeads([
          {
            id: 'LEAD-101',
            name: 'Kavita Sundaram',
            phone: '9876543210',
            email: 'kavita.s@example.com',
            dosha: 'Pitta',
            concern: 'Women’s Hormonal Wellness',
            date: '2024-10-22T06:14:00.000Z'
          },
          {
            id: 'LEAD-102',
            name: 'Sunil Rao',
            phone: '9811122233',
            email: 'sunil.rao@example.com',
            dosha: 'Vata',
            concern: 'Gut, Digestion & Acidity',
            date: '2024-10-21T18:22:00.000Z'
          }
        ]);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Prakriti Quiz Leads & Consultation Enquiries
          </h1>
          <p className="text-xs text-gray-500">
            Leads captured from the 2-minute Prakriti quiz and doctor inquiry booking form.
          </p>
        </div>
        <span className="text-xs font-bold font-mono text-[#1F4D3A] bg-white px-3 py-1.5 rounded-xl border border-[#E6DFC8]">
          Total Leads: {leads.length}
        </span>
      </div>

      <div className="space-y-4">
        {leads.map((lead, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-[#E6DFC8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <strong className="text-sm text-[#1F4D3A]">{lead.name}</strong>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF6EC] text-[#C8922B] border border-[#C8922B]/30">
                  {lead.dosha} Prakriti
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Primary Concern: <strong>{lead.concern}</strong>
              </p>
              <div className="flex items-center gap-4 text-[11px] text-gray-400 font-mono">
                <span>Phone: {lead.phone}</span>
                <span>•</span>
                <span>Email: {lead.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/91${lead.phone}?text=Namaste%20${encodeURIComponent(lead.name)},%20I%20am%20calling%20from%20AARU%20Ayurveda%20regarding%20your%20Prakriti%20report%20for%20${encodeURIComponent(lead.concern)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center gap-1.5 transition-all shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Follow-Up</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
