'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ShieldCheck, Plus, Search, Edit2, CheckCircle2, AlertTriangle, X, Sparkles } from 'lucide-react';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Product Form State
  const [formData, setFormData] = useState({
    name: '',
    hindiName: '',
    categoryId: 'digestive-gut-health',
    form: 'vati',
    price: 499,
    originalPrice: 649,
    size: '60 Tablets',
    defaultBatch: 'AB-2026-085',
    stockCount: 150,
    dosha: 'tridoshic',
    dosage: '1-2 tablets twice daily with lukewarm water after meals',
    shortDescription: 'Classical standardized Ayurvedic formulation tested for active phytocompounds.',
  });

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.defaultBatch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStock = (id: string, newStock: number) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockCount: Math.max(0, newStock) } : p))
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const slug = 'aaru-' + formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const selectedCategory = CATEGORIES.find((c) => c.id === formData.categoryId);

    const newProduct = {
      id: 'prod-' + Date.now(),
      slug,
      name: formData.name,
      hindiName: formData.hindiName || formData.name,
      tagline: 'Standardized classical botanical formula',
      hindiTagline: 'मानकीकृत शास्त्रीय वानस्पतिक फॉर्मूला',
      shortDescription: formData.shortDescription,
      hindiShortDescription: 'पारंपरिक विधि से निर्मित शुद्ध आयुर्वेदिक औषधि।',
      categoryId: formData.categoryId,
      categoryName: selectedCategory ? selectedCategory.name : 'Wellness Formulation',
      hindiCategoryName: selectedCategory ? selectedCategory.hindiName : '',
      form: formData.form as any,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      rating: 5.0,
      reviewCount: 1,
      image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
      badge: 'New Launch',
      size: formData.size,
      dosage: formData.dosage,
      hindiDosage: 'दिन में 1-2 गोली गुनगुने पानी के साथ भोजन के बाद लें।',
      anupana: 'Lukewarm water or cow milk',
      samhitaReference: 'Charaka Samhita / Bhavaprakasha',
      defaultBatch: formData.defaultBatch,
      certificateType: 'NABL Certified',
      stockCount: Number(formData.stockCount),
      dosha: [formData.dosha] as any,
      ingredients: [
        {
          sanskritName: 'Shuddha Dravya',
          botanicalName: 'Standardized Herbal Actives',
          partUsed: 'Roots and Fruits',
          sourceRegion: 'Uttarakhand Foothills',
          percentage: '100%',
          extractionMethod: 'Classical Ghan Satva Extract',
          whyItWorks: 'Synergistic formulation balancing doshas naturally'
        }
      ],
      trustPoints: [
        'AYUSH Certified Classical Formula',
        'NABL Tested - Zero Toxic Heavy Metals',
        'Non-GMO Botanical Actives',
        'GMP Cleanroom Standardized'
      ]
    };

    setProductList([newProduct as any, ...productList]);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: '',
      hindiName: '',
      categoryId: 'digestive-gut-health',
      form: 'vati',
      price: 499,
      originalPrice: 649,
      size: '60 Tablets',
      defaultBatch: 'AB-2026-085',
      stockCount: 150,
      dosha: 'tridoshic',
      dosage: '1-2 tablets twice daily with lukewarm water after meals',
      shortDescription: 'Classical standardized Ayurvedic formulation tested for active phytocompounds.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-ayur text-[#1F4D3A]">
            Product Catalog & Stock Management
          </h1>
          <p className="text-xs text-gray-500">
            Manage formulations, pricing, inventory thresholds, and batch linkages.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 text-xs font-bold gold-gradient-btn rounded-xl flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Formulation</span>
        </button>
      </div>

      {/* Search Bar & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-auto bg-white p-3 rounded-2xl border border-[#E6DFC8] flex items-center gap-2 max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by product name, category or batch..."
            className="w-full text-xs focus:outline-none"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing <strong>{filtered.length}</strong> of <strong>{productList.length}</strong> formulations
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#E6DFC8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FAF6EC] text-[#1F4D3A] uppercase text-[10px] font-bold border-b border-[#E6DFC8]">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Form</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock Units</th>
                <th className="p-3">Batch Code</th>
                <th className="p-3">Certification</th>
                <th className="p-3">Claims Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FAF6EC]/40 transition-colors">
                  <td className="p-3">
                    <span className="font-bold text-[#1F4D3A] block">{prod.name}</span>
                    <span className="text-[10px] text-gray-400">{prod.hindiName || prod.slug}</span>
                  </td>
                  <td className="p-3 text-gray-600">{prod.categoryName}</td>
                  <td className="p-3 capitalize">{prod.form}</td>
                  <td className="p-3 font-mono font-bold">₹{prod.price}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={prod.stockCount}
                      onChange={(e) => handleUpdateStock(prod.id, parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 text-xs border border-[#E6DFC8] rounded-lg font-mono text-center"
                    />
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#C8922B] font-bold">
                    {prod.defaultBatch}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF6EC] text-[#1F4D3A] border border-[#E6DFC8]">
                      {prod.certificateType}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
                      APPROVED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Formulation Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#E6DFC8] shadow-2xl max-w-2xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-[#E6DFC8] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1F4D3A]/10 text-[#1F4D3A] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#C8922B]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-serif-ayur text-[#1F4D3A]">
                    Add New Ayurvedic Formulation
                  </h2>
                  <p className="text-xs text-gray-500">
                    Register a new formulation with batch traceability and herbal provenance.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Formulation Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AARU Brahmi Mind & Focus"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Formulation Name (हिन्दी)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. आरु ब्राह्मी स्मृति रसायन"
                    value={formData.hindiName}
                    onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Format / Form *</label>
                  <select
                    value={formData.form}
                    onChange={(e) => setFormData({ ...formData, form: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  >
                    <option value="vati">Vati (Tablets)</option>
                    <option value="churna">Churna (Powder)</option>
                    <option value="kashayam">Kashayam (Decoction)</option>
                    <option value="taila">Taila (Infused Oil)</option>
                    <option value="asava">Asava / Arishta</option>
                    <option value="ghee">Ghrita (Medicated Ghee)</option>
                    <option value="capsules">Vegetarian Capsules</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Primary Dosha</label>
                  <select
                    value={formData.dosha}
                    onChange={(e) => setFormData({ ...formData, dosha: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  >
                    <option value="tridoshic">Tridoshic (All)</option>
                    <option value="vata">Vata Shamaka</option>
                    <option value="pitta">Pitta Shamaka</option>
                    <option value="kapha">Kapha Shamaka</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Pack Size / Net</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Linked NABL Batch Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.defaultBatch}
                    onChange={(e) => setFormData({ ...formData, defaultBatch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] font-mono focus:outline-none focus:border-[#C8922B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Standard Dosage</label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6DFC8] focus:outline-none focus:border-[#C8922B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6DFC8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold gold-gradient-btn rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Formulation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
