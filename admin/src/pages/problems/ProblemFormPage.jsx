"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import MonacoEditor from "@monaco-editor/react";
import api from "../../services/api";

// Component for managing test cases
const TestCaseManager = ({ testCases, setTestCases }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const addTestCase = () => {
    const newIndex = testCases.length;
    setTestCases([
      ...testCases,
      { input: "", expectedOutput: "", isVisible: false },
    ]);
    setExpandedIndex(newIndex);
  };

  const removeTestCase = (e, index) => {
    e.stopPropagation();
    const newTestCases = [...testCases];
    newTestCases.splice(index, 1);
    setTestCases(newTestCases);
    if (expandedIndex === index) setExpandedIndex(null);
    else if (expandedIndex > index) setExpandedIndex(expandedIndex - 1);
  };

  const updateTestCase = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center group">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Test Case Suite</h3>
          <p className="text-gray-500 text-sm">Configure inputs and assertions for validation.</p>
        </div>
        <button
          type="button"
          onClick={addTestCase}
          className="flex items-center px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
          </svg>
          Add Case
        </button>
      </div>

      {testCases.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">No test cases yet. Start by adding one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testCases.map((testCase, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                expandedIndex === index 
                  ? "border-blue-500 shadow-lg ring-4 ring-blue-500/5 bg-white scale-[1.02]" 
                  : "border-gray-200 bg-gray-50/50 hover:bg-white hover:border-blue-300"
              }`}
            >
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    expandedIndex === index ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Test Case</span>
                    <span className="ml-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                      {testCase.isVisible ? "Public" : "Private"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => removeTestCase(e, index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedIndex === index && (
                <div className="p-6 pt-0 border-t border-gray-100 space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Input Data</label>
                      <textarea
                        value={testCase.input}
                        onChange={(e) => updateTestCase(index, "input", e.target.value)}
                        rows={4}
                        placeholder="Enter the input for this case..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm font-mono"
                      ></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expected Output</label>
                      <textarea
                        value={testCase.expectedOutput}
                        onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                        rows={4}
                        placeholder="Enter the expected output..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm font-mono"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        id={`visible-${index}`}
                        type="checkbox"
                        checked={testCase.isVisible}
                        onChange={(e) => updateTestCase(index, "isVisible", e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <label 
                        htmlFor={`visible-${index}`}
                        className="ml-3 text-sm font-semibold text-blue-700"
                      >
                        Public Visibility (Example Test Case)
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProblemFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [problem, setProblem] = useState({
    title: "",
    statement: "",
    difficulty: "Easy",
    topic: null,
    tags: [],
    examples: [],
    constraints: [],
    timeLimit: 1000,
    memoryLimit: 128000,
    initialCode: {
      javascript: "",
      python: "",
      java: "",
      cpp: "",
    },
    testCases: [],
    solution: {
      explanation: "",
      code: {
        javascript: "",
        python: "",
        java: "",
        cpp: "",
      },
      complexity: {
        time: "",
        space: "",
      },
    },
    visualizationAssetUrl: "",
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [newConstraint, setNewConstraint] = useState("");
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeCodeTab, setActiveCodeTab] = useState("javascript");
  const [activeSolutionTab, setActiveSolutionTab] = useState("javascript");
  const [activeMainTab, setActiveMainTab] = useState("basic");
  const [testCases, setTestCases] = useState([]);
  const [visualizationFile, setVisualizationFile] = useState(null);
  const [availableTopics, setAvailableTopics] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/topics");
        setAvailableTags(response.data.map((topic) => topic.name));
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };

    fetchTags();

    const fetchTopics = async () => {
      try {
        const response = await api.get("/topics");
        setAvailableTopics(response.data);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };

    fetchTopics();

    if (isEditMode) {
      const fetchProblem = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/problems/${id}`);
          setProblem(response.data);
          setTestCases(response.data.testCases || []);
          setError(null);
        } catch (err) {
          console.error("Error fetching problem:", err);
          setError("Failed to load problem. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchProblem();
    }
  }, [id, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProblem({ ...problem, [name]: value });
  };

  const handleStatementChange = (content) => {
    setProblem({ ...problem, statement: content });
  };

  const handleSolutionExplanationChange = (content) => {
    setProblem({
      ...problem,
      solution: { ...problem.solution, explanation: content },
    });
  };

  const handleInitialCodeChange = (value) => {
    setProblem({
      ...problem,
      initialCode: {
        ...problem.initialCode,
        [activeCodeTab]: value,
      },
    });
  };

  const handleSolutionCodeChange = (value) => {
    setProblem({
      ...problem,
      solution: {
        ...problem.solution,
        code: {
          ...problem.solution.code,
          [activeSolutionTab]: value,
        },
      },
    });
  };

  const handleComplexityChange = (e) => {
    const { name, value } = e.target;
    setProblem({
      ...problem,
      solution: {
        ...problem.solution,
        complexity: {
          ...problem.solution.complexity,
          [name]: value,
        },
      },
    });
  };

  const addTag = () => {
    if (newTag && !problem.tags.includes(newTag)) {
      setProblem({ ...problem, tags: [...problem.tags, newTag] });
      setNewTag("");
    }
  };

  const removeTag = (tag) => {
    setProblem({
      ...problem,
      tags: problem.tags.filter((t) => t !== tag),
    });
  };

  const addConstraint = () => {
    if (newConstraint) {
      setProblem({
        ...problem,
        constraints: [...problem.constraints, newConstraint],
      });
      setNewConstraint("");
    }
  };

  const removeConstraint = (index) => {
    const newConstraints = [...problem.constraints];
    newConstraints.splice(index, 1);
    setProblem({ ...problem, constraints: newConstraints });
  };

  const handleVisualizationChange = (e) => {
    setVisualizationFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      // Prepare the problem data with test cases
      const problemData = {
        ...problem,
        testCases,
      };

      let response;
      if (isEditMode) {
        response = await api.put(`/problems/${id}`, problemData);
      } else {
        response = await api.post("/problems", problemData);
      }

      // If there's a visualization file, upload it
      if (visualizationFile) {
        const formData = new FormData();
        formData.append("visualization", visualizationFile);
        await api.post(
          `/problems/${response.data.id || id}/visualization`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      navigate("/problems");
    } catch (err) {
      console.error("Error saving problem:", err);
      setError(
        "Failed to save problem. Please check your inputs and try again."
      );
      window.scrollTo(0, 0);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {isEditMode ? "Edit Problem" : "Create New Problem"}
        </h1>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => navigate("/problems")}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-md text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
          >
            {saving ? "Saving..." : "Save Problem"}
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
      <div className="mb-8 p-1 bg-gray-200/50 backdrop-blur-sm rounded-xl flex space-x-1 shadow-inner">
        {[
          { id: "basic", label: "Basic Info", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
          { id: "content", label: "Content", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
          { id: "verification", label: "Verification", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
          { id: "templates", label: "Templates", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
          { id: "solution", label: "Solution", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75V19a2 2 0 11-4 0v-.25c0-.476-.12-.942-.347-1.353l-.548-.547z" }
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

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px]">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Tab */}
            {activeMainTab === "basic" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
                  <p className="text-gray-500 text-sm">Set the core details of the coding challenge.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="group">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                      Problem Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      placeholder="e.g. Two Sum"
                      value={problem.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={problem.difficulty}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    >
                      <option value="Easy">🟢 Easy</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="Hard">🔴 Hard</option>
                    </select>
                  </div>
                  <div className="group">
                    <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                      Primary Topic
                    </label>
                    <select
                      id="topic" 
                      name="topic" 
                      value={problem.topic || ""} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    >
                      <option value="">-- Select a Category --</option>
                      {availableTopics.map((topic) => (
                        <option key={topic._id} value={topic._id}>
                          {topic.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">Tags & Keywords</label>
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-gray-50 border border-dashed border-gray-300 rounded-xl">
                    {problem.tags.length === 0 && <span className="text-gray-400 text-sm italic">No tags added yet...</span>}
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 animate-scaleIn"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 transition-colors"
                        >
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        list="available-tags"
                        placeholder="Type a tag name..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none shadow-sm"
                      />
                      <datalist id="available-tags">
                        {availableTags.map((tag) => (
                          <option key={tag} value={tag} />
                        ))}
                      </datalist>
                    </div>
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeMainTab === "content" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800">Problem Content</h2>
                  <p className="text-gray-500 text-sm">Define the description, constraints, and visual aids.</p>
                </div>
                
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">Problem Statement</label>
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Editor
                      apiKey="rx8s1n4uhn4vdupvlnm85zk613zhdofco8qowo82unxgepdg"
                      initialValue={problem.statement}
                      init={{
                        height: 400,
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
                      onEditorChange={handleStatementChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Constraints Section */}
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Constraints</label>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3 min-h-[150px]">
                      {problem.constraints.length === 0 && <p className="text-gray-400 italic text-sm">No constraints defined.</p>}
                      <ul className="space-y-2">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index} className="flex items-center group bg-white p-2 rounded-lg border border-gray-100 shadow-sm transition-all hover:border-blue-200 animate-scaleIn">
                            <span className="flex-grow text-sm text-gray-700">• {constraint}</span>
                            <button
                              type="button"
                              onClick={() => removeConstraint(index)}
                              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newConstraint}
                        onChange={(e) => setNewConstraint(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addConstraint())}
                        placeholder="e.g. 1 <= nums.length <= 10^4"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={addConstraint}
                        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all active:scale-95 flex-shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Limits Section */}
                  <div className="space-y-6">
                    <label className="block text-sm font-semibold text-gray-700">Execution Limits</label>
                    <div className="space-y-4">
                      <div className="group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Time Limit (ms)</label>
                        <input
                          type="number"
                          id="timeLimit"
                          name="timeLimit"
                          value={problem.timeLimit}
                          onChange={handleInputChange}
                          min="100"
                          step="100"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Memory Limit (KB)</label>
                        <input
                          type="number"
                          id="memoryLimit"
                          name="memoryLimit"
                          value={problem.memoryLimit}
                          onChange={handleInputChange}
                          min="1000"
                          step="1000"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visualization Asset */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">Visualization Asset</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50/50 hover:bg-gray-50 hover:border-blue-400 transition-all group relative">
                    {problem.visualizationAssetUrl && !visualizationFile && (
                      <div className="mb-6 flex flex-col items-center">
                        <p className="text-sm text-gray-500 mb-3 font-medium">Currently Active:</p>
                        {problem.visualizationAssetUrl.endsWith(".mp4") ? (
                          <video controls className="max-w-xs rounded-xl shadow-lg border-4 border-white">
                            <source src={problem.visualizationAssetUrl} />
                          </video>
                        ) : (
                          <img src={problem.visualizationAssetUrl} alt="Visual" className="max-w-xs h-32 object-contain rounded-xl shadow-md border-4 border-white bg-white p-2" />
                        )}
                        <div className="mt-4 p-2 bg-blue-600 rounded-full animate-bounce shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 group-hover:scale-110 transition-transform">
                        <svg className="h-8 w-8 text-gray-400 group-hover:text-blue-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="flex flex-col text-sm text-gray-600">
                        <label htmlFor="visualization-upload" className="relative cursor-pointer font-bold text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span className="px-4 py-2 bg-white border border-blue-200 rounded-lg shadow-sm hover:shadow-md inline-block mb-2">Choose File</span>
                          <input id="visualization-upload" type="file" className="sr-only" accept="image/gif,image/png,image/jpeg,video/mp4" onChange={handleVisualizationChange} />
                        </label>
                        <p className="font-medium text-gray-400 mt-2">GIF, PNG, JPG, MP4 up to 10MB</p>
                      </div>
                      {visualizationFile && (
                        <div className="mt-4 flex items-center justify-center space-x-2 bg-green-50 text-green-700 py-2 px-4 rounded-xl border border-green-200 animate-fadeIn">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-bold uppercase tracking-tight">{visualizationFile.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Tab */}
            {activeMainTab === "verification" && (
              <div className="animate-fadeIn">
                <div className="border-b pb-4 mb-8">
                  <h2 className="text-xl font-bold text-gray-800">Verification & Testing</h2>
                  <p className="text-gray-500 text-sm">Add test cases that will be used to judge solutions.</p>
                </div>
                <TestCaseManager testCases={testCases} setTestCases={setTestCases} />
              </div>
            )}

            {/* Templates Tab */}
            {activeMainTab === "templates" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800">Code Templates</h2>
                  <p className="text-gray-500 text-sm">Define the boilerplate code users start with.</p>
                </div>
                
                <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="flex bg-gray-50 border-b overflow-x-auto scrollbar-hide">
                    {["javascript", "python", "java", "cpp"].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setActiveCodeTab(lang)}
                        className={`px-6 py-4 text-sm font-bold tracking-tight transition-all uppercase ${
                          activeCodeTab === lang
                            ? "bg-white text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
                        }`}
                      >
                        {lang === "cpp" ? "C++" : lang}
                      </button>
                    ))}
                  </div>
                  <div className="h-[450px]">
                    <MonacoEditor
                      language={activeCodeTab === "cpp" ? "cpp" : activeCodeTab}
                      value={problem.initialCode[activeCodeTab] || ""}
                      onChange={handleInitialCodeChange}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: true },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        padding: { top: 16 }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Solution Tab */}
            {activeMainTab === "solution" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-800">Model Solution</h2>
                  <p className="text-gray-500 text-sm">The official solution and its technical analysis.</p>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">Explanation</label>
                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Editor
                      apiKey="rx8s1n4uhn4vdupvlnm85zk613zhdofco8qowo82unxgepdg"
                      initialValue={problem.solution.explanation}
                      init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | bold italic | \
                          bullist numlist | removeformat",
                        content_style: 'body { font-family:Inter,sans-serif; font-size:14px }'
                      }}
                      onEditorChange={handleSolutionExplanationChange}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">Official Solution Code</label>
                  <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="flex bg-gray-50 border-b overflow-x-auto">
                      {["javascript", "python", "java", "cpp"].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setActiveSolutionTab(lang)}
                          className={`px-6 py-4 text-sm font-bold tracking-tight transition-all uppercase ${
                            activeSolutionTab === lang
                              ? "bg-white text-blue-600 border-b-2 border-blue-600"
                              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/50"
                          }`}
                        >
                          {lang === "cpp" ? "C++" : lang}
                        </button>
                      ))}
                    </div>
                    <div className="h-[400px]">
                      <MonacoEditor
                        language={activeSolutionTab === "cpp" ? "cpp" : activeSolutionTab}
                        value={problem.solution.code[activeSolutionTab] || ""}
                        onChange={handleSolutionCodeChange}
                        theme="vs-dark"
                        options={{
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          fontSize: 14,
                          padding: { top: 16 }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">Time Complexity</label>
                    <input
                      type="text"
                      id="time"
                      name="time"
                      value={problem.solution.complexity.time}
                      onChange={handleComplexityChange}
                      placeholder="e.g. O(n log n)"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="space" className="block text-sm font-semibold text-gray-700 mb-2">Space Complexity</label>
                    <input
                      type="text"
                      id="space"
                      name="space"
                      value={problem.solution.complexity.space}
                      onChange={handleComplexityChange}
                      placeholder="e.g. O(1)"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Styles for the page */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProblemFormPage;
