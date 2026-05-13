import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { runAudit } from './auditEngine'; // 'runAudit' use karein kyunki file mein yahi naam hai

function App() {
  const [email, setEmail] = useState('');
  const [tool, setTool] = useState('Cursor');
  const [teamSize, setTeamSize] = useState(1);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [plan, setPlan] = useState('Pro');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveToSupabase = async (userEmail, selectedTool, annualSavings) => {
    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            email: userEmail, 
            tool: selectedTool, 
            savings: parseFloat(annualSavings) 
          }
        ]);

      if (error) throw error;
      console.log("Data saved to Supabase!");
    } catch (error) {
      console.error("Supabase Error:", error.message);
    }
  };

  const handleAudit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Aapki auditEngine.js ke 'runAudit' function ko call kar rahe hain
    const auditResult = runAudit(tool, parseInt(teamSize), parseFloat(monthlySpend), plan);
    setResult(auditResult);

    // Database mein data bhej rahe hain
    await saveToSupabase(email, tool, auditResult.annualSavings);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-400">SpendWise AI</h1>
        <p className="text-gray-400 mt-2">Professional AI Audit Engine</p>
      </header>

      <main className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
        <form onSubmit={handleAudit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">AI Tool</label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
                value={tool}
                onChange={(e) => setTool(e.target.value)}
              >
                <option value="Cursor">Cursor</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="GitHub Copilot">GitHub Copilot</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Plan</label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="Pro">Pro/Individual</option>
                <option value="Business">Business/Team</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Team Size</label>
              <input
                type="number"
                min="1"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Monthly Spend ($)</label>
              <input
                type="number"
                min="0"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition shadow-lg"
          >
            {loading ? 'Analyzing...' : 'Run Audit'}
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/50 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Audit Summary</h3>
            <div className="space-y-2">
              <p className="text-gray-300"><span className="font-bold">Recommendation:</span> {result.recommendation}</p>
              <p className="text-gray-300"><span className="font-bold">Efficiency Score:</span> {result.efficiency}%</p>
              <p className="text-2xl font-bold text-green-400 mt-4">Annual Savings: ${result.annualSavings}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;