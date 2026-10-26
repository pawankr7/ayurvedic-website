'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, Phone, Mail, MapPin, CheckCircle2, Clock, Calendar, Send } from 'lucide-react';

export default function ContactPage() {
  const { isHindi } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Save lead in localStorage for admin portal
    try {
      const leads = JSON.parse(localStorage.getItem('aaru_leads') || '[]');
      leads.push({
        id: `INQ-${Date.now()}`,
        name,
        phone,
        email,
        dosha: 'Pending Consultation',
        concern: topic,
        message,
        date: new Date().toISOString()
      });
      localStorage.setItem('aaru_leads', JSON.stringify(leads));
    } catch {
      // ignore
    }

    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-[#C8922B]">
          {isHindi ? "वैद्य संपर्क एवं परामर्श" : "Direct Clinical Access"}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif-ayur text-[#1F4D3A]">
          {isHindi ? "आरु आयुर्वेदिक परामर्श एवं सहायता" : "Consult a Vaidya & Customer Desk"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Have questions about your Dosha, batch lab reports, or regimen guidelines? Reach out directly to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Methods & WhatsApp Desk */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Instant WhatsApp Card */}
          <div className="bg-[#FAF6EC] p-6 rounded-3xl border border-[#E6DFC8] space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1F4D3A]">
                Instant WhatsApp Consultation
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Connect with an Ayurvedic counselor within 10 minutes. Receive dosage recommendations and batch guidance.
              </p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Namaste,%20I%20would%20like%20to%20consult%20an%20AARU%20Ayurvedic%20doctor."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-white transition-all shadow-sm"
            >
              <span>Chat on WhatsApp Now</span>
              <span>→</span>
            </a>
          </div>

          {/* Contact Details Cards */}
          <div className="space-y-3 text-xs text-gray-700">
            <div className="bg-white p-4 rounded-2xl border border-[#E6DFC8] flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#C8922B] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Toll-Free Helpline</span>
                <strong className="text-[#1F4D3A] text-sm">+91 98765 43210</strong>
                <span className="text-gray-400 text-[10px] block">Mon - Sat (9:00 AM - 7:00 PM IST)</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E6DFC8] flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#C8922B] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Email Us</span>
                <strong className="text-[#1F4D3A]">care@aaruayurveda.com</strong>
                <span className="text-gray-400 text-[10px] block">Responses within 2 business hours</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E6DFC8] flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#C8922B] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Corporate & Lab Hub</span>
                <strong className="text-[#1F4D3A]">AARU Wellness Labs, Haridwar, Uttarakhand, India</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Inquiry / Doctor Booking Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E6DFC8] shadow-md space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-serif-ayur text-[#1F4D3A]">
                Book a Free 15-Minute Vaidya Consultation
              </h2>
              <p className="text-xs text-gray-500">
                Leave your details below and our Ayurvedic medical team will reach out.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#EEF3EA] rounded-2xl border border-[#DDE5D6]">
                <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center text-xl mx-auto">
                  ✓
                </div>
                <h3 className="font-bold text-sm text-[#1F4D3A]">Inquiry Received Successfully!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Namaste {name}. Our senior Vaidya counselor will contact you at {phone} within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold text-[#1F4D3A] underline cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Meera Patel"
                      className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Topic of Consultation</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl text-xs"
                    >
                      <option value="Gut & Digestion">Gut, Digestion & Acidity</option>
                      <option value="Hormones & Women Health">Women&apos;s Hormonal Wellness (PCOD)</option>
                      <option value="Vitality & Energy">Men&apos;s Vitality & Shilajit</option>
                      <option value="Joint Mobility & Stiffness">Joint Pain & Mobility</option>
                      <option value="Sleep & Stress">Sleep & Anxiety Calm</option>
                      <option value="Batch Lab Report Inquiry">Batch Verification Question</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Brief Health History / Questions</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell our Vaidyas about your current routine, symptoms or specific questions..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EC] border border-[#E6DFC8] rounded-xl text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm gold-gradient-btn flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Consultation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
