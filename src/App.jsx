import { useState } from 'react'
import { runAudit } from './auditEngine'

function App() {
  const [tool, setTool] = useState('ChatGPT Plus')
  const [teamSize, setTeamSize] = useState(1)
  const [monthlySpend, setMonthlySpend] = useState(20)
  const [result, setResult] = useState(null)

  const handleAudit = () => {
    // Audit Engine ko call kar rahe hain naye logic ke saath
    const auditData = runAudit(tool, parseInt(teamSize), parseFloat(monthlySpend)); 
    setResult(auditData)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-gray-100">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 text-center">
          SpendWise AI
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm font-medium">Optimize your team's AI subscriptions</p>
        
        <div className="space-y-5">
          {/* 1. Tool Selection (Updated for Day 5) */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Current AI Tool</label>
            <select 
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="ChatGPT Plus">ChatGPT Plus</option>
              <option value="Cursor + ChatGPT">Cursor + ChatGPT Bundle</option>
              <option value="GitHub Copilot">GitHub Copilot</option>
              <option value="Midjourney">Midjourney</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 2. Team Size */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Team Size</label>
              <input 
                type="number" 
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                min="1"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            {/* 3. Monthly Spend */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Monthly Spend ($)</label>
              <input 
                type="number" 
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Run Audit Button */}
          <button 
            onClick={handleAudit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Run AI Audit
          </button>
        </div>

        {/* Result Dashboard Section */}
        {result && (
          <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Savings Dashboard</h2>
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Live Audit
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Monthly</p>
                <p className="text-2xl font-black text-blue-900">${result.potentialSavings}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Annual</p>
                <p className="text-2xl font-black text-indigo-900">${result.annualSavings}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <p className="text-sm font-semibold text-gray-500">Efficiency Score</p>
                <p className="text-lg font-black text-green-600">{result.efficiency}%</p>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000" 
                  style={{ width: `${result.efficiency}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-2xl">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-lg">💡</span>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-yellow-800 font-black uppercase tracking-tight">Strategic Recommendation</p>
                  <p className="text-sm text-yellow-900 mt-1 font-medium leading-relaxed">{result.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App