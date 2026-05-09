import { useState } from 'react'
import { runAudit } from './auditEngine'

function App() {
  const [tool, setTool] = useState('ChatGPT Plus')
  const [teamSize, setTeamSize] = useState(1)
  const [result, setResult] = useState(null)

  const handleAudit = () => {
    // Hamare engine ko call kar rahe hain (Tasks 1 wala logic)
    const auditData = runAudit(tool, teamSize, 20 * teamSize); 
    setResult(auditData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">AI Spend Audit Engine</h1>
        
        <div className="space-y-4">
          {/* 1. Dropdown (Tool selection) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select AI Tool</label>
            <select 
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="ChatGPT Plus">ChatGPT Plus</option>
              <option value="Cursor + ChatGPT">Cursor + ChatGPT Bundle</option>
              <option value="Claude Pro">Claude Pro</option>
            </select>
          </div>

          {/* 2. Input Field (Team Size) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
            <input 
              type="number" 
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* 3. Run Audit Button */}
          <button 
            onClick={handleAudit}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Run Audit
          </button>
        </div>

        {/* Result Display Section */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-lg font-semibold text-green-800">Audit Result:</h2>
            <p className="text-green-700 mt-1">{result.recommendation}</p>
            <p className="text-sm font-bold text-green-900 mt-2">Potential Savings: ${result.potentialSavings}/mo</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App