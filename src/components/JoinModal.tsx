"use client";

import React, { useState } from "react";
import { X, Check, ArrowRight, ShieldCheck, CreditCard, Landmark, Smartphone, Loader2, Sparkles, Calendar, GraduationCap } from "lucide-react";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    schoolName: "",
    city: "",
    state: "",
    teachingLevel: "Secondary School (Grades 9-10)",
    subject: "",
    experience: "3-5 Years (Developing)",
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.schoolName.trim()) newErrors.schoolName = "School name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

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

  const handleNext = async () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setIsRegistering(true);
      setApiError(null);
      try {
        const res = await fetch("/api/members/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName:      formData.fullName,
            email:         formData.email,
            mobile:        formData.mobile,
            schoolName:    formData.schoolName,
            city:          formData.city,
            state:         formData.state,
            teachingLevel: formData.teachingLevel,
            subject:       formData.subject,
            experience:    formData.experience,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          setApiError(json.error || "Registration failed. Please try again.");
          return;
        }
        setMemberId(json.memberId);
        setStep(2);
      } catch {
        setApiError("Network error. Please check your connection.");
      } finally {
        setIsRegistering(false);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus("processing");
    setApiError(null);
    try {
      const res = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId,
          method: paymentMethod,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setApiError(json.error || "Payment failed. Please try again.");
        setPaymentStatus("idle");
        return;
      }
      setPaymentStatus("success");
      setStep(4);
    } catch {
      setApiError("Network error. Please try again.");
      setPaymentStatus("idle");
    }
  };

  const handleClose = () => {
    setStep(1);
    setPaymentStatus("idle");
    setUpiId("");
    setApiError(null);
    setMemberId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-satic-navy/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-satic-gray/40 rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">
        
        {/* Header (Hide close on final stages for focus) */}
        {step < 4 && (
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 text-satic-charcoal/60 hover:text-satic-charcoal transition-premium p-1.5 hover:bg-satic-cream rounded-full cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}

        <div className="p-6 md:p-8">
          {/* Step indicator */}
          {step < 4 && (
            <div className="flex items-center space-x-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    s <= step ? "bg-satic-blue" : "bg-satic-gray"
                  }`} 
                />
              ))}
            </div>
          )}

          {/* STEP 1: Registration Form */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold font-display text-satic-navy mb-1">Create Your Teacher Profile</h2>
              <p className="text-satic-charcoal/60 text-sm mb-6 font-body">Tell us a bit about your teaching background to join the club.</p>

              <div className="space-y-4">
                {/* Personal Section */}
                <div className="border-b border-satic-gray pb-4">
                  <h3 className="text-xs font-semibold text-satic-blue tracking-wider uppercase mb-3">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">Full Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Anjali Sharma" 
                        className={`w-full text-sm border ${errors.fullName ? "border-red-500" : "border-satic-gray"} rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40`}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">Mobile Number *</label>
                      <input 
                        type="tel" 
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        maxLength={10}
                        placeholder="10-digit number" 
                        className={`w-full text-sm border ${errors.mobile ? "border-red-500" : "border-satic-gray"} rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40`}
                      />
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@school.com" 
                        className={`w-full text-sm border ${errors.email ? "border-red-500" : "border-satic-gray"} rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Professional Section */}
                <div>
                  <h3 className="text-xs font-semibold text-satic-blue tracking-wider uppercase mb-3">Professional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">School/Institution Name *</label>
                      <input 
                        type="text" 
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleInputChange}
                        placeholder="e.g. National Public School" 
                        className={`w-full text-sm border ${errors.schoolName ? "border-red-500" : "border-satic-gray"} rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40`}
                      />
                      {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">City *</label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Bangalore" 
                        className={`w-full text-sm border ${errors.city ? "border-red-500" : "border-satic-gray"} rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">State *</label>
                      <input 
                        type="text" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="e.g. Karnataka" 
                        className={`w-full text-sm border ${errors.state ? "border-red-500" : "border-satic-gray"} rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40`}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">Teaching Level</label>
                      <select 
                        name="teachingLevel"
                        value={formData.teachingLevel}
                        onChange={handleInputChange}
                        className="w-full text-sm border border-satic-gray rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40 text-satic-charcoal"
                      >
                        <option>Primary School (Grades 1-5)</option>
                        <option>Middle School (Grades 6-8)</option>
                        <option>Secondary School (Grades 9-10)</option>
                        <option>Higher Secondary (Grades 11-12)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">Subject Taught *</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Mathematics, Science" 
                        className={`w-full text-sm border ${errors.subject ? "border-red-500" : "border-satic-gray"} rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40`}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-satic-charcoal/80 mb-1.5">Years of Experience</label>
                      <select 
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full text-sm border border-satic-gray rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40 text-satic-charcoal"
                      >
                        <option>0-2 Years (Early Career)</option>
                        <option>3-5 Years (Developing)</option>
                        <option>6-10 Years (Experienced)</option>
                        <option>10+ Years (Senior Lead)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {apiError && step === 1 && (
                <p className="mt-4 text-red-500 text-xs text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {apiError}
                </p>
              )}

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={isRegistering}
                  className="bg-satic-blue text-white rounded-xl px-6 py-2.5 font-medium text-sm hover:bg-satic-navy transition-premium flex items-center space-x-1.5 group shadow-lg shadow-satic-blue/15 cursor-pointer font-display font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isRegistering ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Membership Details */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold font-display text-satic-navy mb-1">Confirm Membership</h2>
              <p className="text-satic-charcoal/60 text-sm mb-6 font-body">Review your professional club membership details.</p>

              <div className="bg-satic-cream/50 border border-satic-gray rounded-xl p-5 mb-6">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-satic-gray/60">
                  <div>
                    <span className="bg-satic-blue/10 text-satic-blue text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">ANNUAL PLAN</span>
                    <h3 className="text-lg font-bold text-satic-navy mt-2">SATIC Club Membership</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-satic-navy font-display">₹499</span>
                    <span className="text-satic-charcoal/60 text-xs block">/ year</span>
                  </div>
                </div>

                <div className="space-y-3 font-body">
                  <h4 className="text-xs font-semibold text-satic-charcoal/80 uppercase tracking-wider mb-2">Member Benefits Included:</h4>
                  {[
                    "Daily practice worksheets and pedagogy challenges",
                    "Weekly Teachers' Talk interactive live sessions",
                    "Access to nationwide peer educators community",
                    "Classroom-tested resource library",
                    "Early-access entry to upcoming specialist batches",
                    "Verifiable Professional Development Certificates"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-sm text-satic-charcoal/90">
                      <Check size={16} className="text-satic-blue mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-satic-blue/5 border border-satic-blue/10 rounded-lg p-3.5 mb-6 flex items-start space-x-2.5 text-xs text-satic-navy/80 font-body">
                <ShieldCheck size={18} className="text-satic-blue shrink-0 mt-0.5" />
                <p>By proceeding, you secure immediate access to the entire platform. Annual fee is billed once and fully secure. Under ₹1.40 per day.</p>
              </div>

              <div className="flex justify-between items-center">
                <button 
                  onClick={() => setStep(1)}
                  className="text-satic-charcoal/60 hover:text-satic-charcoal text-sm font-medium transition-premium px-2 py-1 cursor-pointer font-body"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  className="bg-satic-blue text-white rounded-xl px-6 py-2.5 font-medium text-sm hover:bg-satic-navy transition-premium flex items-center space-x-1.5 group shadow-lg shadow-satic-blue/15 cursor-pointer font-display font-semibold"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Razorpay Payment Simulation */}
          {step === 3 && (
            <div>
              <div className="text-center mb-6">
                <span className="text-xs text-satic-charcoal/40 font-mono block mb-1">SECURE TRANSACTION</span>
                <h2 className="text-xl font-bold text-satic-navy font-display">SATIC Payment Gateway</h2>
                <p className="text-satic-charcoal/60 text-xs mt-0.5 font-body">Powered by simulated Razorpay client SDK</p>
              </div>

              {/* Razorpay Form Container */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 shadow-inner">
                {/* Simulated Header */}
                <div className="bg-[#123A8F] text-white p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center font-bold text-[#123A8F] text-xs">S</div>
                    <div>
                      <h4 className="text-xs font-semibold tracking-wide">SATIC - The Teachers' Club</h4>
                      <p className="text-[10px] text-white/70">Membership Activation</p>
                    </div>
                  </div>
                  <div className="text-right font-display">
                    <span className="text-sm font-bold block">₹499.00</span>
                    <span className="text-[9px] text-white/70 font-mono font-body">{formData.email}</span>
                  </div>
                </div>

                <form onSubmit={handlePayment} className="p-4 space-y-4 font-body">
                  {/* Payment Methods Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`py-2 px-1 text-xs font-medium rounded-lg border flex flex-col items-center justify-center space-y-1 transition-premium cursor-pointer ${
                        paymentMethod === "upi" 
                          ? "bg-satic-blue/5 border-satic-blue text-satic-blue shadow-sm" 
                          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100/50"
                      }`}
                    >
                      <Smartphone size={16} />
                      <span>UPI / GPay</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-2 px-1 text-xs font-medium rounded-lg border flex flex-col items-center justify-center space-y-1 transition-premium cursor-pointer ${
                        paymentMethod === "card" 
                          ? "bg-satic-blue/5 border-satic-blue text-satic-blue shadow-sm" 
                          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100/50"
                      }`}
                    >
                      <CreditCard size={16} />
                      <span>Card Payment</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setPaymentMethod("net")}
                      className={`py-2 px-1 text-xs font-medium rounded-lg border flex flex-col items-center justify-center space-y-1 transition-premium cursor-pointer ${
                        paymentMethod === "net" 
                          ? "bg-satic-blue/5 border-satic-blue text-satic-blue shadow-sm" 
                          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100/50"
                      }`}
                    >
                      <Landmark size={16} />
                      <span>Netbanking</span>
                    </button>
                  </div>

                  {/* Render Active Tab Details */}
                  <div className="bg-white p-3.5 border border-slate-150 rounded-lg min-h-[100px] flex flex-col justify-center">
                    {paymentMethod === "upi" && (
                      <div className="space-y-3">
                        <label className="block text-[11px] font-semibold text-slate-600">Enter UPI ID</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okaxis or username@okicici"
                            className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-satic-blue bg-slate-50/30"
                          />
                        </div>
                        <div className="flex items-center space-x-1.5 text-[10px] text-slate-400">
                          <ShieldCheck size={12} className="text-emerald-500" />
                          <span>Automatically registers your VPA with secure escrow.</span>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Number</label>
                          <input 
                            type="text" 
                            required
                            placeholder="4111 2222 3333 4444"
                            className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-satic-blue bg-slate-50/30"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Expiry Date</label>
                            <input 
                              type="text" 
                              required
                              placeholder="MM/YY"
                              className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-satic-blue bg-slate-50/30"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">CVV</label>
                            <input 
                              type="password" 
                              required
                              placeholder="•••"
                              className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-satic-blue bg-slate-50/30"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "net" && (
                      <div className="space-y-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Popular Indian Banks</label>
                        <select className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-satic-blue bg-white text-slate-600">
                          <option>SBI (State Bank of India)</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {apiError && (
                    <p className="mb-3 text-red-500 text-xs text-center bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      {apiError}
                    </p>
                  )}

                  <button 
                    type="submit"
                    disabled={paymentStatus === "processing"}
                    className="w-full bg-[#1e5bd7] hover:bg-[#123a8f] text-white py-3 rounded-lg font-bold text-xs shadow-md tracking-wider flex items-center justify-center space-x-2 transition-premium cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {paymentStatus === "processing" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>PROCESSING PAYMENT...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        <span>PAY ₹499.00 SECURELY</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] text-satic-charcoal/40 font-body">
                <span>🔒 256-bit SSL encrypted.</span>
                <span>•</span>
                <span>PCI-DSS compliant server.</span>
              </div>
            </div>
          )}

          {/* STEP 4: Payment Success */}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounce">
                <Check size={32} className="text-emerald-500 stroke-[3px]" />
              </div>

              <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full font-body">PAYMENT COMPLETED</span>
              <h2 className="text-2xl font-bold font-display text-satic-navy mt-4 mb-2">Payment Successful!</h2>
              <p className="text-satic-charcoal/70 text-sm max-w-sm mx-auto mb-8 font-body">
                Welcome to <strong className="text-satic-navy font-semibold">SATIC – The Teachers' Club</strong>. Your annual membership is activated for account <strong className="text-satic-charcoal font-semibold">{formData.email}</strong>.
              </p>

              <div className="border border-satic-gray bg-satic-cream/30 rounded-xl p-4 text-left max-w-sm mx-auto mb-8 text-xs space-y-2 font-body">
                <div className="flex justify-between">
                  <span className="text-satic-charcoal/60">Member ID:</span>
                  <span className="font-mono font-bold text-satic-navy">STC-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-satic-charcoal/60">Amount Paid:</span>
                  <span className="font-bold text-satic-navy">₹499.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-satic-charcoal/60">Valid Until:</span>
                  <span className="font-bold text-satic-navy">{new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              <button 
                onClick={() => setStep(5)}
                className="bg-satic-blue text-white rounded-xl px-8 py-3.5 font-bold text-sm hover:bg-satic-navy transition-premium inline-flex items-center space-x-2 group shadow-lg shadow-satic-blue/20 cursor-pointer font-display"
              >
                <span>Get Started</span>
                <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* STEP 5: Get Started Welcome View */}
          {step === 5 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-10 h-10 bg-satic-blue/10 rounded-full flex items-center justify-center mx-auto mb-2 text-satic-blue">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl font-bold font-display text-satic-navy">Welcome to SATIC!</h2>
                <p className="text-satic-charcoal/60 text-xs mt-1 font-body">Here is your customized access panel. Join these spaces to begin learning.</p>
              </div>

              <div className="space-y-4 font-body">
                {/* 1. Upcoming Practice Batch */}
                <div className="border border-satic-gray hover:border-satic-blue/30 rounded-xl p-4 bg-white shadow-sm transition-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-satic-blue bg-satic-blue/10 px-2 py-0.5 rounded">1. UPCOMING PRACTICE BATCH</span>
                    <h3 className="font-bold text-satic-navy text-sm mt-1">AI Teaching Practice Batch</h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-satic-charcoal/60 pt-0.5">
                      <span className="flex items-center"><GraduationCap size={12} className="mr-1" /> Duration: 4 Weeks</span>
                      <span>•</span>
                      <span>Starts: Aug 1, 2026</span>
                    </div>
                  </div>
                  <a 
                    href="https://chat.whatsapp.com/mock-batch-group"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-2 font-semibold text-xs transition-premium shadow-sm text-center shrink-0 flex items-center justify-center space-x-1.5"
                  >
                    <span>Join Batch Group</span>
                  </a>
                </div>

                {/* 2. Next Teachers' Talk */}
                <div className="border border-satic-gray hover:border-satic-blue/30 rounded-xl p-4 bg-white shadow-sm transition-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-satic-blue bg-satic-blue/10 px-2 py-0.5 rounded">2. NEXT TEACHERS' TALK</span>
                    <h3 className="font-bold text-satic-navy text-sm mt-1">Activity-Based Learning & Pedagogy</h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-satic-charcoal/60 pt-0.5">
                      <span className="flex items-center"><Calendar size={12} className="mr-1" /> Date: Weekly Wednesday</span>
                      <span>•</span>
                      <span>Time: 5:00 PM IST (Google Meet)</span>
                    </div>
                  </div>
                  <a 
                    href="https://whatsapp.com/channel/mock-talk-channel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-2 font-semibold text-xs transition-premium shadow-sm text-center shrink-0 flex items-center justify-center space-x-1.5"
                  >
                    <span>Join Teachers' Talk</span>
                  </a>
                </div>

                {/* 3. Community */}
                <div className="border border-satic-gray hover:border-satic-blue/30 rounded-xl p-4 bg-white shadow-sm transition-premium flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-satic-blue bg-satic-blue/10 px-2 py-0.5 rounded">3. COMMUNITY ACCESS</span>
                    <h3 className="font-bold text-satic-navy text-sm mt-1">Main SATIC WhatsApp Community</h3>
                    <p className="text-xs text-satic-charcoal/60">Connect with 1000+ educators across India, share resources, and get instant answers.</p>
                  </div>
                  <a 
                    href="https://chat.whatsapp.com/mock-main-community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#123A8F] hover:bg-[#1E5BD7] text-white rounded-lg px-4 py-2 font-semibold text-xs transition-premium shadow-sm text-center shrink-0 flex items-center justify-center space-x-1.5"
                  >
                    <span>Join Community</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 border-t border-satic-gray/60 pt-4 flex justify-between items-center text-xs text-satic-charcoal/50 font-body">
                <span>Account Email: {formData.email}</span>
                <button 
                  onClick={handleClose}
                  className="font-semibold text-satic-blue hover:text-satic-navy transition-premium cursor-pointer"
                >
                  Exit Welcome Page
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
