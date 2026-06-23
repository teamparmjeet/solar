"use client"
import React, { useState } from 'react';
import { baseapi } from '@/app/constants/api';
export default function page() {
  const [formData, setFormData] = useState({
    user_id:"1",
    applicant_name: '',
    father_name: '',
    mobile: '',
    email: '',
    property_type: 'Owned',
    state: '',
    district: '',
    tehsil: '',
    village: '',
    pincode: '',
    consumer_number: '',
    electricity_board: '',
    sanctioned_load: '',
    monthly_consumption: '',
    aadhaar_number: '',
    rooftop_area: '',
    solar_capacity_kw: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    loan_required: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value,
    }));
  };

 const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    const response = await baseapi("/api/pmSuryaGhar", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert("Application submitted successfully");

      setFormData({
        user_id:"1",
        applicant_name: "",
        father_name: "",
        mobile: "",
        email: "",
        property_type: "Owned",
        state: "",
        district: "",
        tehsil: "",
        village: "",
        pincode: "",
        consumer_number: "",
        electricity_board: "",
        sanctioned_load: "",
        monthly_consumption: "",
        aadhaar_number: "",
        rooftop_area: "",
        solar_capacity_kw: "",
        bank_name: "",
        account_number: "",
        ifsc_code: "",
        loan_required: false,
      });
    } else {
      alert(data.message || "Failed to submit application");
    }
  } catch (error) {
    console.error("Application Submit Error:", error);
    alert("Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-slate-50   font-sans">
      <div className="  mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        
        {/* Modern Solar Header Banner */}
        <div className="bg-linear-to-r from-slate-900 via-slate-800 to-sky-950 text-white px-8 py-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400 opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10 flex items-center space-x-4">
            <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.05a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-.707-8.485a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">National Portal Scheme</span>
              <h1 className="text-3xl font-bold tracking-tight mt-0.5">PM Surya Ghar: Muft Bijli Yojana</h1>
              <p className="text-slate-300 text-sm mt-1 font-light">Apply online for solar rooftop installation subsidies & net-metering</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">

          {/* SECTION 1: Applicant Information */}
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
              <span className="h-6 w-1.5 bg-amber-500 rounded-full"></span>
              <h2 className="text-xl font-bold text-slate-800">1. Applicant Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Applicant Full Name *</label>
                <input type="text" name="applicant_name" required value={formData.applicant_name} onChange={handleChange} placeholder="As per official documents" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Father's / Husband's Name</label>
                <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Mobile Number *</label>
                <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} placeholder="10-digit primary number" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@domain.com" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Property Ownership Type</label>
                <select name="property_type" value={formData.property_type} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 bg-white outline-none transition">
                  <option value="Owned">Owned (Self-Owned Premise)</option>
                  <option value="Rented">Rented Premise</option>
                  <option value="Shared/Apartment">Shared / RWA Apartment Block</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Aadhaar Number (Verification)</label>
                <input type="text" name="aadhaar_number" value={formData.aadhaar_number} onChange={handleChange} placeholder="[Aadhaar Redacted/Omitted]" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
            </div>
          </div>

          {/* SECTION 2: Address Details */}
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
              <span className="h-6 w-1.5 bg-amber-500 rounded-full"></span>
              <h2 className="text-xl font-bold text-slate-800">2. Installation Address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">State *</label>
                <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">District *</label>
                <input type="text" name="district" required value={formData.district} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tehsil</label>
                <input type="text" name="tehsil" value={formData.tehsil} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Village / Premise / Street Address</label>
                <input type="text" name="village" value={formData.village} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Pincode *</label>
                <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
            </div>
          </div>

          {/* SECTION 3: Electricity Connection & Capacity Planning */}
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
              <span className="h-6 w-1.5 bg-amber-500 rounded-full"></span>
              <h2 className="text-xl font-bold text-slate-800">3. Utility Connection & Capacity</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Consumer Service Number *</label>
                <input type="text" name="consumer_number" required value={formData.consumer_number} onChange={handleChange} placeholder="Refer to your DISCOM bill" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Electricity Board / DISCOM</label>
                <input type="text" name="electricity_board" value={formData.electricity_board} onChange={handleChange} placeholder="e.g., UPPCL, TPDDL, MSEDCL" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Sanctioned Load (kW)</label>
                <input type="number" step="0.01" name="sanctioned_load" value={formData.sanctioned_load} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Avg. Monthly Consumption (kWh / Units)</label>
                <input type="number" name="monthly_consumption" value={formData.monthly_consumption} onChange={handleChange} placeholder="Helps evaluate optimum capacity" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Available Rooftop Area (Sq. Ft.)</label>
                <input type="number" step="0.01" name="rooftop_area" value={formData.rooftop_area} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Proposed Solar Capacity (kW)</label>
                <input type="number" step="0.01" name="solar_capacity_kw" value={formData.solar_capacity_kw} onChange={handleChange} placeholder="Target installation load" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
            </div>
          </div>

          {/* SECTION 4: Direct Subsidy Bank Credentials & Financing */}
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
              <span className="h-6 w-1.5 bg-amber-500 rounded-full"></span>
              <h2 className="text-xl font-bold text-slate-800">4. Subsidy Bank Details & Financing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Bank Name</label>
                <input type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Account Number</label>
                <input type="text" name="account_number" value={formData.account_number} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">IFSC Code</label>
                <input type="text" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} placeholder="11-character alpha-numeric" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition" />
              </div>
              <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">Do you require dynamic loan financing options?</span>
                  <span className="text-xs text-slate-500">Integrated system options matching Public Sector Banks (PSBs).</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="loan_required" checked={formData.loan_required} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 5: Mandatory Document Dossier Uploads */}
          <div>
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
              <span className="h-6 w-1.5 bg-amber-500 rounded-full"></span>
              <h2 className="text-xl font-bold text-slate-800">5. Mandatory Support Documents Dossier</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Applicant Passport Photo', name: 'applicant_photo_file' },
                { label: 'Aadhaar Identification File', name: 'aadhaar_file' },
                { label: 'Latest Electricity Bill Copy', name: 'electricity_bill_file' },
                { label: 'Property Ownership Proof / NOC', name: 'property_proof_file' },
                { label: 'Cancelled Cheque Copy / Bank Passbook', name: 'cancelled_cheque_file' }
              ].map((doc, idx) => (
                <div key={idx} className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-slate-300 bg-slate-50 flex items-center justify-between transition">
                  <div className="flex flex-col pr-2">
                    <span className="text-sm font-semibold text-slate-700">{doc.label} *</span>
                    <span className="text-xs text-slate-400">PDF, JPG, or PNG (Max 2MB)</span>
                  </div>
                  <label className="cursor-pointer bg-white border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition">
                    Upload
                    <input type="file" name={doc.name} className="hidden" />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Declarations & Action Submission Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 max-w-md text-center sm:text-left">
              By submitting this form, you verify that the information matched against the installation configuration matches national solar portal framework requirements.
            </p>
            <div className="flex space-x-3 w-full sm:w-auto">
              <button type="button" className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-sm font-semibold rounded-xl text-slate-700 hover:bg-slate-50 transition shadow-sm">
                Save Draft
              </button>
              <button type="submit" className="w-full sm:w-auto px-8 py-3 text-sm font-semibold rounded-xl bg-linear-to-r from-amber-500 to-amber-600 text-slate-900 shadow-md shadow-amber-500/10 hover:brightness-105 active:scale-95 transition">
                Submit Application
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}