"use client";

import React, { useState } from "react";
import { X, Check, Loader2, Landmark, GraduationCap, Phone, Mail, ShieldCheck } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "Principal",
    schoolName: "",
    mobile: "",
    email: "",
    numTeachers: "10-25 Teachers",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.schoolName.trim()) newErrors.schoolName = "School name is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setApiError(null);

    // Convert teachers select value to number representation
    let numVal = 10;
    if (formData.numTeachers === "26-50 Teachers") numVal = 35;
    else if (formData.numTeachers === "51-100 Teachers") numVal = 75;
    else if (formData.numTeachers === "100+ Teachers") numVal = 150;

    try {
      const res = await fetch("/api/schools/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          jobTitle: formData.jobTitle,
          schoolName: formData.schoolName,
          mobile: formData.mobile,
          email: formData.email,
          numTeachers: numVal,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setApiError(json.error || "Submission failed. Please try again.");
        return;
      }
      setSubmitSuccess(true);
    } catch {
      setApiError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset state
    setFormData({
      fullName: "",
      jobTitle: "Principal",
      schoolName: "",
      mobile: "",
      email: "",
      numTeachers: "10-25 Teachers",
    });
    setErrors({});
    setSubmitSuccess(false);
    setApiError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-satic-navy/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-satic-gray/40 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-satic-charcoal/60 hover:text-satic-charcoal transition-premium p-1.5 hover:bg-satic-cream rounded-full cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          {!submitSuccess ? (
            <div>
              <div className="flex items-center space-x-2.5 mb-2 text-satic-blue">
                <Landmark size={24} />
                <h2 className="text-xl font-bold font-display text-satic-navy">Bring SATIC to Your School</h2>
              </div>
              <p className="text-satic-charcoal/60 text-xs mb-6 font-body">
                Partner with us to give your entire teaching faculty access to continuous professional development (CPD) designed for their busy schedules.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 font-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-satic-charcoal/85 mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Ramesh Gupta" 
                      className={`w-full text-xs border ${errors.fullName ? "border-red-500" : "border-satic-gray"} rounded-lg px-3 py-2 focus:outline-none focus:border-satic-blue bg-[#faf9f6]/40 text-satic-charcoal`}
                    />
                    {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-satic-charcoal/85 mb-1">Your Role / Job Title</label>
                    <select 
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full text-xs border border-satic-gray rounded-lg px-3 py-2 focus:outline-none focus:border-satic-blue bg-[#faf9f6]/40 text-satic-charcoal"
                    >
                      <option>Principal</option>
                      <option>Director / Trustee</option>
                      <option>Academic Coordinator</option>
                      <option>Head of Department</option>
                      <option>Administrator</option>
                      <option>Teacher</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-satic-charcoal/85 mb-1">School Name *</label>
                  <input 
                    type="text" 
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    placeholder="e.g. Modern Public School" 
                    className={`w-full text-xs border ${errors.schoolName ? "border-red-500" : "border-satic-gray"} rounded-lg px-3 py-2 focus:outline-none focus:border-satic-blue bg-[#faf9f6]/40 text-satic-charcoal`}
                  />
                  {errors.schoolName && <p className="text-red-500 text-[10px] mt-0.5">{errors.schoolName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-satic-charcoal/85 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. admin@school.com" 
                      className={`w-full text-xs border ${errors.email ? "border-red-500" : "border-satic-gray"} rounded-lg px-3 py-2 focus:outline-none focus:border-satic-blue bg-[#faf9f6]/40 text-satic-charcoal`}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-satic-charcoal/85 mb-1">Contact Number (WhatsApp) *</label>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength={10}
                      placeholder="10-digit mobile number" 
                      className={`w-full text-xs border ${errors.mobile ? "border-red-500" : "border-satic-gray"} rounded-lg px-3 py-2 focus:outline-none focus:border-satic-blue bg-[#faf9f6]/40 text-satic-charcoal`}
                    />
                    {errors.mobile && <p className="text-red-500 text-[10px] mt-0.5">{errors.mobile}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-satic-charcoal/85 mb-1">Faculty Size of Your School</label>
                  <select 
                    name="numTeachers"
                    value={formData.numTeachers}
                    onChange={handleInputChange}
                    className="w-full text-xs border border-satic-gray rounded-lg px-3 py-2 focus:outline-none focus:border-satic-blue bg-[#faf9f6]/40 text-satic-charcoal"
                  >
                    <option>10-25 Teachers</option>
                    <option>26-50 Teachers</option>
                    <option>51-100 Teachers</option>
                    <option>100+ Teachers</option>
                  </select>
                </div>

                <div className="bg-satic-blue/[0.03] border border-satic-blue/10 rounded-lg p-3 flex items-start space-x-2 text-[10px] text-satic-navy/85 mt-2">
                  <ShieldCheck size={16} className="text-satic-blue shrink-0 mt-0.5" />
                  <p>Our outreach associate will get in touch with you over WhatsApp / Call within 24 hours to guide you more about SATIC.</p>
                </div>

                {apiError && (
                  <p className="text-red-500 text-xs bg-red-50 border border-red-200 rounded-lg p-2.5 text-center">{apiError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-satic-blue text-white py-3 rounded-xl font-bold text-xs tracking-wider transition-premium flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed shadow-md shadow-satic-blue/15"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>SUBMITTING ENQUIRY...</span>
                    </>
                  ) : (
                    <span>REQUEST CALL / PROPOSAL</span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
                <Check size={28} className="text-emerald-500 stroke-[3px]" />
              </div>
              <h2 className="text-2xl font-bold font-display text-satic-navy mb-2">Successfully submitted</h2>
              <p className="text-satic-charcoal/70 text-sm max-w-sm mx-auto mb-6 font-body">
                We will contact you soon.
              </p>
              <button 
                onClick={handleClose}
                className="bg-satic-blue hover:bg-satic-navy text-white px-8 py-3 rounded-xl font-bold text-xs shadow-md tracking-wider transition-premium cursor-pointer font-display"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
