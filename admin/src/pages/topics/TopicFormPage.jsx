"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Editor } from "@tinymce/tinymce-react"
import api from "../../services/api"

const TopicFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [topic, setTopic] = useState({
    name: "",
    notes: "",
    order: 0,
  })

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [activeMainTab, setActiveMainTab] = useState("general")

  useEffect(() => {
    if (isEditMode) {
      const fetchTopic = async () => {
        try {
          setLoading(true)
          const response = await api.get(`/topics/${id}`)
          setTopic(response.data)
          setError(null)
        } catch (err) {
          console.error("Error fetching topic:", err)
          setError("Failed to load topic. Please try again later.")
        } finally {
          setLoading(false)
        }
      }

      fetchTopic()
    }
  }, [id, isEditMode])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTopic({ ...topic, [name]: value })
  }

  const handleNotesChange = (content) => {
    setTopic({ ...topic, notes: content })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)

      if (isEditMode) {
        await api.put(`/topics/${id}`, topic)
      } else {
        await api.post("/topics", topic)
      }

      navigate("/topics")
    } catch (err) {
      console.error("Error saving topic:", err)
      setError("Failed to save topic. Please check your inputs and try again.")
      window.scrollTo(0, 0)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {isEditMode ? "Edit Topic" : "Create New Topic"}
        </h1>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => navigate("/topics")}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-md text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
          >
            {saving ? "Saving..." : "Save Topic"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg shadow-sm animate-pulse">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 font-medium">{error}</div>
          </div>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="mb-8 p-1 bg-gray-200/50 backdrop-blur-sm rounded-xl flex space-x-1 shadow-inner max-w-md">
        {[
          { id: "general", label: "General Info", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
          { id: "content", label: "Learning Content", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMainTab(tab.id)}
            className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeMainTab === tab.id
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
            }`}
          >
            <svg className={`w-5 h-5 mr-2 ${activeMainTab === tab.id ? "text-blue-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[500px]">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {activeMainTab === "general" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800">Topic Details</h2>
                  <p className="text-gray-500 text-sm">Set the core identification and display properties.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                      Topic Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Dynamic Programming"
                      value={topic.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="order" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                      Display Order
                    </label>
                    <input
                      type="number"
                      id="order"
                      name="order"
                      value={topic.order}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    />
                    <p className="mt-2 text-xs text-gray-400 font-medium italic">Lower values appear first in the syllabus.</p>
                  </div>
                </div>
              </div>
            )}

            {activeMainTab === "content" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800">Learning Content</h2>
                  <p className="text-gray-500 text-sm">Create comprehensive guide and notes for students.</p>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">Educational Material</label>
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Editor
                      apiKey="rx8s1n4uhn4vdupvlnm85zk613zhdofco8qowo82unxgepdg"
                      initialValue={topic.notes}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help",
                        content_style: 'body { font-family:Inter,sans-serif; font-size:14px }'
                      }}
                      onEditorChange={handleNotesChange}
                    />
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Use consistent formatting for a better reading experience.</p>
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
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default TopicFormPage
