"use client"

import { useState, useEffect } from "react"
import api from "../services/api"

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteTitle: "",
    siteDescription: "",
    contactEmail: "",
    maxSubmissionsPerDay: 100,
    enableRegistration: true,
    maintenanceMode: false,
    maintenanceMessage: "The site is currently undergoing maintenance. Please check back later.",
    aiHelpEnabled: true,
    aiHelpCredits: 5,
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [activeSettingsTab, setActiveSettingsTab] = useState("general")

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const response = await api.get("/admin/settings")
        setSettings(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching settings:", err)
        setError("Failed to load settings. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      [name]: Number.parseInt(value, 10),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await api.put("/admin/settings", settings)
      setSuccessMessage("Settings saved successfully!")
      setError(null)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (err) {
      console.error("Error saving settings:", err)
      setError("Failed to save settings. Please try again.")
      setSuccessMessage(null)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Platform Settings</h1>
          <p className="text-gray-500 mt-1 font-medium">Fine-tune your application behavior and configurations.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {saving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </>
          ) : (
            "Propagate Changes"
          )}
        </button>
      </div>

      {/* Notifications */}
      {(error || successMessage) && (
        <div className={`p-4 rounded-2xl flex items-center space-x-3 border shadow-sm transition-all duration-500 ${
          error ? "bg-red-50 border-red-200 text-red-800" : "bg-emerald-50 border-emerald-200 text-emerald-800"
        }`}>
          <div className={`p-2 rounded-xl ${error ? "bg-red-100" : "bg-emerald-100"}`}>
            {error ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            )}
          </div>
          <span className="font-bold">{error || successMessage}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex p-1 bg-gray-200/50 backdrop-blur-md rounded-2xl shadow-inner w-full md:max-w-xl overflow-x-auto no-scrollbar">
        {[
          { id: "general", label: "General", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
          { id: "users", label: "Users & Auth", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
          { id: "system", label: "System & AI", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSettingsTab(tab.id)}
            className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-sm font-bold transition-all ${
              activeSettingsTab === tab.id
                ? "bg-white text-blue-600 shadow-md ring-1 ring-black/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            <svg className={`w-5 h-5 mr-3 ${activeSettingsTab === tab.id ? "text-blue-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-12">
            {activeSettingsTab === "general" && (
              <div className="space-y-10 animate-slideIn">
                <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">General Branding</h2>
                    <p className="text-gray-500 font-medium">Configure site identity and contact endpoints.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Site Title</label>
                    <input
                      type="text"
                      name="siteTitle"
                      value={settings.siteTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. CodePulse"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Support Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={settings.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-gray-600"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Meta Description</label>
                    <textarea
                      name="siteDescription"
                      rows={4}
                      value={settings.siteDescription}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeSettingsTab === "users" && (
              <div className="space-y-10 animate-slideIn">
                <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Access Management</h2>
                    <p className="text-gray-500 font-medium">Control registration flows and user interaction quotas.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-indigo-200 transition-colors group">
                    <div>
                      <h4 className="font-bold text-gray-800">Public Registration</h4>
                      <p className="text-xs text-gray-400 font-bold group-hover:text-indigo-400 transition-colors uppercase tracking-tight mt-0.5">Allow new people to join</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="enableRegistration"
                        checked={settings.enableRegistration}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Rate Limit (Submissions/Day)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="maxSubmissionsPerDay"
                        min="1"
                        value={settings.maxSubmissionsPerDay}
                        onChange={handleNumberChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-bold"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 uppercase">Requests</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSettingsTab === "system" && (
              <div className="space-y-12 animate-slideIn">
                {/* AI Config */}
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Intelligence & Maintenance</h2>
                      <p className="text-gray-500 font-medium">Manage AI integration and platform availability.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-amber-200 transition-colors group">
                      <div>
                        <h4 className="font-bold text-gray-800">AI Assistance</h4>
                        <p className="text-xs text-gray-400 font-bold group-hover:text-amber-500 transition-colors uppercase tracking-tight mt-0.5">Enable ChatGPT-driven help</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="aiHelpEnabled"
                          checked={settings.aiHelpEnabled}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Initial AI Credits</label>
                      <input
                        type="number"
                        name="aiHelpCredits"
                        min="0"
                        value={settings.aiHelpCredits}
                        onChange={handleNumberChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600 transition-all outline-none font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Maintenance */}
                <div className="p-8 bg-red-50/50 rounded-[2rem] border-2 border-dashed border-red-100 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                      <h3 className="text-lg font-bold text-red-900">Critical: Maintenance Mode</h3>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="maintenanceMode"
                        checked={settings.maintenanceMode}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-red-400 uppercase tracking-widest">User-facing Message</label>
                    <textarea
                      name="maintenanceMessage"
                      rows={3}
                      value={settings.maintenanceMessage}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-white border border-red-100 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none font-medium text-red-900 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slideIn { animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

export default SettingsPage
