"use client";

import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Users, 
  IndianRupee, 
  Video, 
  GraduationCap, 
  Search, 
  LogOut, 
  Plus, 
  Check, 
  Calendar, 
  ExternalLink,
  ShieldAlert,
  Loader2,
  Clock,
  MapPin,
  Mail,
  Phone
} from "lucide-react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"members" | "payments" | "sessions" | "batches">("members");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dashboard state
  const [loadingData, setLoadingData] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  // Form states
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New Session details
  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    speaker_name: "",
    speaker_bio: "",
    session_date: "",
    duration_min: "60",
    meet_link: "",
  });

  // New Batch details
  const [newBatch, setNewBatch] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    whatsapp_link: "",
    status: "upcoming",
  });

  // Check authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/login");
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch {
        setAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch data if authenticated
  useEffect(() => {
    if (authenticated === true) {
      fetchDashboardData();
    }
  }, [authenticated]);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const json = await res.json();
        setDashboardData(json);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
      } else {
        const json = await res.json();
        setLoginError(json.error || "Invalid password.");
      }
    } catch {
      setLoginError("Connection failed.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
      setAuthenticated(false);
      setDashboardData(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "session", ...newSession }),
      });
      if (res.ok) {
        setShowSessionForm(false);
        setNewSession({
          title: "",
          description: "",
          speaker_name: "",
          speaker_bio: "",
          session_date: "",
          duration_min: "60",
          meet_link: "",
        });
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "batch", ...newBatch }),
      });
      if (res.ok) {
        setShowBatchForm(false);
        setNewBatch({
          title: "",
          description: "",
          start_date: "",
          end_date: "",
          whatsapp_link: "",
          status: "upcoming",
        });
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8F5EC] flex items-center justify-center">
        <Loader2 className="animate-spin text-satic-blue" size={32} />
      </div>
    );
  }

  // 1. LOGIN SCREEN
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F8F5EC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-satic-blue/10">
            <Lock className="h-6 w-6 text-satic-blue" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold font-display text-satic-navy">
            SATIC Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-satic-charcoal/60 font-body">
            Secure workspace administration access
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 border border-satic-gray/40 shadow-xl rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 uppercase tracking-wider mb-2">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator passcode"
                  className="w-full text-sm border border-satic-gray rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue bg-[#faf9f6]/40"
                />
              </div>

              {loginError && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 flex items-center space-x-2">
                  <ShieldAlert size={16} />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-satic-blue text-white py-3 rounded-xl font-semibold text-sm hover:bg-satic-navy transition-premium cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Authorizing...</span>
                  </>
                ) : (
                  <span>Access Dashboard</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || { totalMembers: 0, activeMembers: 0, pendingMembers: 0, totalRevenue: 0 };
  const members = dashboardData?.members || [];
  const payments = dashboardData?.payments || [];
  const sessions = dashboardData?.sessions || [];
  const batches = dashboardData?.batches || [];

  // Filter query logic
  const filteredMembers = members.filter((m: any) => 
    m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.mobile.includes(searchQuery) ||
    m.school_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPayments = payments.filter((p: any) => 
    p.members?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.members?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.razorpay_payment_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F5EC] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-satic-navy text-white flex flex-col justify-between border-r border-satic-navy/10 flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <span className="text-xl font-bold font-display tracking-wider">SATIC ADMIN</span>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "members", label: "Members", icon: Users },
              { id: "payments", label: "Payments", icon: IndianRupee },
              { id: "sessions", label: "Live Sessions", icon: Video },
              { id: "batches", label: "Daily Practice", icon: GraduationCap },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); setSearchQuery(""); }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? "bg-satic-blue text-white shadow-md shadow-satic-blue/15" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-200 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display text-satic-navy">Control Dashboard</h1>
            <p className="text-satic-charcoal/60 text-sm font-body">Manage member profiles, payments, webinars and learning batches</p>
          </div>

          <button 
            onClick={fetchDashboardData}
            className="bg-white hover:bg-satic-cream border border-satic-gray text-satic-charcoal/80 font-medium px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <span>Refresh Stats</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Members Registered", value: stats.totalMembers, icon: Users, color: "text-satic-blue" },
            { label: "Active Annual Subscriptions", value: stats.activeMembers, icon: Check, color: "text-emerald-600" },
            { label: "Pending Signups", value: stats.pendingMembers, icon: Clock, color: "text-amber-500" },
            { label: "Gross Revenues Collected", value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-satic-blue" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white border border-satic-gray/40 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] font-semibold text-satic-charcoal/50 uppercase tracking-wider leading-relaxed">{stat.label}</span>
                  <div className={`p-2 rounded-lg bg-satic-cream/50 ${stat.color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <span className="text-2xl font-bold font-display text-satic-navy">{stat.value}</span>
              </div>
            );
          })}
        </div>

        {/* Search Bar & Action Buttons */}
        <div className="bg-white border border-satic-gray/40 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-satic-charcoal/40" size={18} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm border border-satic-gray rounded-xl pl-10 pr-4 py-2.5 bg-[#faf9f6]/40 focus:outline-none focus:ring-2 focus:ring-satic-blue/20 focus:border-satic-blue"
              />
            </div>

            {/* Quick Actions based on tabs */}
            {activeTab === "sessions" && (
              <button 
                onClick={() => setShowSessionForm(true)}
                className="bg-satic-blue hover:bg-satic-navy text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-lg shadow-satic-blue/10"
              >
                <Plus size={16} />
                <span>Publish New Session</span>
              </button>
            )}

            {activeTab === "batches" && (
              <button 
                onClick={() => setShowBatchForm(true)}
                className="bg-satic-blue hover:bg-satic-navy text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-lg shadow-satic-blue/10"
              >
                <Plus size={16} />
                <span>Create Learning Batch</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Forms */}
        {showSessionForm && (
          <div className="bg-white border border-satic-gray/60 rounded-2xl p-6 shadow-md mb-6 animate-in slide-in-from-top-4 duration-300">
            <h3 className="text-lg font-bold font-display text-satic-navy mb-4">Add a New Teachers' Talk Webinar</h3>
            <form onSubmit={handleCreateSession} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Webinar Title *</label>
                <input 
                  type="text" required value={newSession.title} 
                  onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Integrating AI Tools in Classroom Planning" 
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Session Description</label>
                <textarea 
                  value={newSession.description} 
                  onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Details and agenda of the webinar" 
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20 h-20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Speaker Name</label>
                <input 
                  type="text" value={newSession.speaker_name} 
                  onChange={(e) => setNewSession(prev => ({ ...prev, speaker_name: e.target.value }))}
                  placeholder="Dr. S. Kumar" 
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Speaker Bio</label>
                <input 
                  type="text" value={newSession.speaker_bio} 
                  onChange={(e) => setNewSession(prev => ({ ...prev, speaker_bio: e.target.value }))}
                  placeholder="Associate Professor, DU" 
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Session Date & Time (ISO String) *</label>
                <input 
                  type="datetime-local" required value={newSession.session_date} 
                  onChange={(e) => setNewSession(prev => ({ ...prev, session_date: e.target.value }))}
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20 text-satic-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Google Meet/Zoom Link</label>
                <input 
                  type="url" value={newSession.meet_link} 
                  onChange={(e) => setNewSession(prev => ({ ...prev, meet_link: e.target.value }))}
                  placeholder="https://meet.google.com/..." 
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20"
                />
              </div>
              <div className="md:col-span-2 flex justify-end space-x-3 mt-2">
                <button type="button" onClick={() => setShowSessionForm(false)} className="px-4 py-2 border border-satic-gray rounded-lg text-xs font-semibold text-satic-charcoal hover:bg-satic-cream transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-satic-blue hover:bg-satic-navy text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-75">{isSubmitting ? "Publishing..." : "Publish Live"}</button>
              </div>
            </form>
          </div>
        )}

        {showBatchForm && (
          <div className="bg-white border border-satic-gray/60 rounded-2xl p-6 shadow-md mb-6 animate-in slide-in-from-top-4 duration-300">
            <h3 className="text-lg font-bold font-display text-satic-navy mb-4">Create a New Daily Learning Batch</h3>
            <form onSubmit={handleCreateBatch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Batch Course Title *</label>
                <input 
                  type="text" required value={newBatch.title} 
                  onChange={(e) => setNewBatch(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. AI-Enhanced Pedagogy" 
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Course Description</label>
                <textarea 
                  value={newBatch.description} 
                  onChange={(e) => setNewBatch(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Details of the 30-day curriculum" 
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20 h-20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Start Date *</label>
                <input 
                  type="date" required value={newBatch.start_date} 
                  onChange={(e) => setNewBatch(prev => ({ ...prev, start_date: e.target.value }))}
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20 text-satic-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">End Date</label>
                <input 
                  type="date" value={newBatch.end_date} 
                  onChange={(e) => setNewBatch(prev => ({ ...prev, end_date: e.target.value }))}
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20 text-satic-charcoal"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Dedicated WhatsApp Group Invite URL</label>
                <input 
                  type="url" value={newBatch.whatsapp_link} 
                  onChange={(e) => setNewBatch(prev => ({ ...prev, whatsapp_link: e.target.value }))}
                  placeholder="https://chat.whatsapp.com/..." 
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-satic-charcoal/80 mb-1">Batch Status</label>
                <select 
                  value={newBatch.status} 
                  onChange={(e) => setNewBatch(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full text-sm border border-satic-gray rounded-lg px-3 py-2 bg-satic-cream/20 text-satic-charcoal"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-3 mt-2">
                <button type="button" onClick={() => setShowBatchForm(false)} className="px-4 py-2 border border-satic-gray rounded-lg text-xs font-semibold text-satic-charcoal hover:bg-satic-cream transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-satic-blue hover:bg-satic-navy text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors disabled:opacity-75">{isSubmitting ? "Publishing..." : "Create Batch"}</button>
              </div>
            </form>
          </div>
        )}

        {/* Main Workspace Render */}
        <div className="bg-white border border-satic-gray/40 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
          {loadingData ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="animate-spin text-satic-blue" size={24} />
            </div>
          ) : (
            <div className="p-6">
              
              {/* MEMBERS TAB */}
              {activeTab === "members" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-satic-gray/60 text-satic-charcoal/50 uppercase tracking-wider text-[10px]">
                        <th className="pb-4 font-semibold">Teacher Name</th>
                        <th className="pb-4 font-semibold">Email & Phone</th>
                        <th className="pb-4 font-semibold">School & City</th>
                        <th className="pb-4 font-semibold">Subject & Experience</th>
                        <th className="pb-4 font-semibold">ID Code</th>
                        <th className="pb-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-satic-gray/40">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member: any) => (
                          <tr key={member.id} className="hover:bg-satic-cream/20">
                            <td className="py-4 font-semibold text-satic-navy text-sm font-display">{member.full_name}</td>
                            <td className="py-4 font-body text-satic-charcoal/80">
                              <div className="flex items-center space-x-1"><Mail size={12} className="text-satic-charcoal/40" /><span>{member.email}</span></div>
                              <div className="flex items-center space-x-1 mt-0.5"><Phone size={12} className="text-satic-charcoal/40" /><span>{member.mobile}</span></div>
                            </td>
                            <td className="py-4 font-body text-satic-charcoal/80">
                              <div className="flex items-center space-x-1 font-semibold"><span>{member.school_name}</span></div>
                              <div className="flex items-center space-x-1 mt-0.5 text-satic-charcoal/60"><MapPin size={12} className="text-satic-charcoal/40" /><span>{member.city}, {member.state}</span></div>
                            </td>
                            <td className="py-4 font-body text-satic-charcoal/80">
                              <span className="font-medium text-satic-blue">{member.subject}</span>
                              <span className="block mt-0.5 text-satic-charcoal/60 text-[11px]">{member.experience}</span>
                            </td>
                            <td className="py-4 font-mono font-bold text-satic-charcoal/80 text-[11px]">{member.member_id || "PENDING"}</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                                member.status === "active" 
                                  ? "bg-emerald-500/10 text-emerald-700" 
                                  : "bg-amber-500/10 text-amber-700"
                              }`}>
                                {member.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-satic-charcoal/40">No members match search query.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PAYMENTS TAB */}
              {activeTab === "payments" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-satic-gray/60 text-satic-charcoal/50 uppercase tracking-wider text-[10px]">
                        <th className="pb-4 font-semibold">Member</th>
                        <th className="pb-4 font-semibold">Method</th>
                        <th className="pb-4 font-semibold">Order Details</th>
                        <th className="pb-4 font-semibold">Amount Paid</th>
                        <th className="pb-4 font-semibold">Timestamp</th>
                        <th className="pb-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-satic-gray/40">
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment: any) => (
                          <tr key={payment.id} className="hover:bg-satic-cream/20">
                            <td className="py-4 font-body">
                              <div className="font-semibold text-satic-navy text-sm font-display">{payment.members?.full_name || "Unknown Member"}</div>
                              <div className="text-satic-charcoal/60 mt-0.5">{payment.members?.email}</div>
                            </td>
                            <td className="py-4 font-body uppercase text-satic-blue font-semibold">{payment.payment_method}</td>
                            <td className="py-4 font-mono text-[11px] text-satic-charcoal/70">
                              <div>ID: {payment.razorpay_payment_id || "N/A"}</div>
                              <div className="text-satic-charcoal/40 mt-0.5">Order: {payment.razorpay_order_id || "N/A"}</div>
                            </td>
                            <td className="py-4 font-semibold text-satic-navy text-sm">₹{payment.amount / 100}</td>
                            <td className="py-4 font-body text-satic-charcoal/60">{new Date(payment.created_at).toLocaleString("en-IN")}</td>
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                                payment.status === "paid" 
                                  ? "bg-emerald-500/10 text-emerald-700" 
                                  : "bg-red-500/10 text-red-700"
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-satic-charcoal/40">No payments found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SESSIONS TAB */}
              {activeTab === "sessions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sessions.length > 0 ? (
                    sessions.map((session: any) => (
                      <div key={session.id} className="border border-satic-gray/40 hover:border-satic-blue/20 rounded-xl p-5 bg-satic-cream/5 transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] font-bold tracking-wider uppercase bg-satic-blue/10 text-satic-blue px-2.5 py-1 rounded-full flex items-center space-x-1"><Clock size={10} /><span>{session.duration_min} MIN</span></span>
                          <span className={`text-[9px] font-bold tracking-wider uppercase ${session.is_published ? "text-emerald-600 bg-emerald-500/10" : "text-amber-600 bg-amber-500/10"} px-2.5 py-1 rounded-full`}>
                            {session.is_published ? "PUBLISHED" : "DRAFT"}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-satic-navy font-display mb-1">{session.title}</h4>
                        <p className="text-xs text-satic-charcoal/60 mb-4 line-clamp-2">{session.description}</p>
                        
                        <div className="border-t border-satic-gray/60 pt-4 flex justify-between items-center text-xs">
                          <div>
                            <span className="block font-semibold text-satic-charcoal/80">Speaker: {session.speaker_name || "Unassigned"}</span>
                            <span className="block text-[11px] text-satic-charcoal/50 mt-0.5">{new Date(session.session_date).toLocaleString("en-IN")}</span>
                          </div>
                          {session.meet_link && (
                            <a href={session.meet_link} target="_blank" rel="noreferrer" className="text-satic-blue hover:text-satic-navy flex items-center space-x-1 font-semibold text-[11px]">
                              <span>Google Meet</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-satic-charcoal/40">No webinars added yet.</div>
                  )}
                </div>
              )}

              {/* BATCHES TAB */}
              {activeTab === "batches" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {batches.length > 0 ? (
                    batches.map((batch: any) => (
                      <div key={batch.id} className="border border-satic-gray/40 hover:border-satic-blue/20 rounded-xl p-5 bg-satic-cream/5 transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                            batch.status === "active" 
                              ? "bg-emerald-500/10 text-emerald-700" 
                              : batch.status === "completed" 
                              ? "bg-satic-gray text-satic-charcoal/60" 
                              : "bg-satic-blue/10 text-satic-blue"
                          }`}>
                            {batch.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-satic-navy font-display mb-1">{batch.title}</h4>
                        <p className="text-xs text-satic-charcoal/60 mb-4 line-clamp-2">{batch.description}</p>
                        
                        <div className="border-t border-satic-gray/60 pt-4 flex justify-between items-center text-xs">
                          <div>
                            <span className="block font-semibold text-satic-charcoal/80">
                              Starts: {batch.start_date ? new Date(batch.start_date).toLocaleDateString("en-IN") : "TBD"}
                            </span>
                            {batch.end_date && (
                              <span className="block text-[11px] text-satic-charcoal/50 mt-0.5">
                                Ends: {new Date(batch.end_date).toLocaleDateString("en-IN")}
                              </span>
                            )}
                          </div>
                          {batch.whatsapp_link && (
                            <a href={batch.whatsapp_link} target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700 flex items-center space-x-1 font-semibold text-[11px]">
                              <span>WhatsApp Invite</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-satic-charcoal/40">No learning batches created yet.</div>
                  )}
                </div>
              )}

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
