import React, { useState } from 'react';

const SpendWiseApp = () => {
  const [formData, setFormData] = useState({
    email: '',
    tool: 'Cursor',
    plan: 'Pro/Individual',
    teamSize: 1,
    monthlySpend: 100
  });

  const [auditResult, setAuditResult] = useState(null);

  const runAudit = () => {
    // Logic: Agar user Cursor Pro pe 1 seat se zyada hai, toh optimize karein
    const current = formData.monthlySpend;
    let optimized = current;
    let advice = "";

    if (formData.tool === 'Cursor' && formData.teamSize > 1) {
      optimized = formData.teamSize * 20; // Example Business Plan rate
      advice = "Your team size suggests you could benefit from a centralized Business Plan instead of individual Pro seats, saving on administrative overhead.";
    } else {
      optimized = current * 0.8; // General 20% optimization logic
      advice = "Based on your usage patterns, switching to an annual billing cycle or consolidating API keys could reduce your monthly burn significantly.";
    }

    setAuditResult({
      currentSpend: current,
      optimizedSpend: optimized,
      monthlySavings: current - optimized,
      annualSavings: (current - optimized) * 12,
      recommendation: advice
    });
  };

  const copyLink = () => {
    const fakeLink = `${window.location.origin}/audit/${Math.random().toString(36).substr(2, 9)}`;
    navigator.clipboard.writeText(fakeLink);
    alert("Shareable Link Copied: " + fakeLink);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-500">SpendWise AI</h1>
        <p className="text-slate-400">Professional AI Audit Engine</p>
      </header>

      <main className="w-full max-w-md bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700">
        <div className="space-y-4">
          {/* Form Inputs */}
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-slate-700 p-2 rounded border border-slate-600 outline-none focus:border-blue-500"
              placeholder="name@company.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">AI Tool</label>
              <select className="w-full bg-slate-700 p-2 rounded border border-slate-600">
                <option>Cursor</option>
                <option>GitHub Copilot</option>
                <option>Claude</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Plan</label>
              <select className="w-full bg-slate-700 p-2 rounded border border-slate-600">
                <option>Pro/Individual</option>
                <option>Business/Enterprise</option>
              </select>
            </div>
          </div>

          <button 
            onClick={runAudit}
            className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold transition-all"
          >
            Run Professional Audit
          </button>
        </div>

        {/* 1. & 3. Result Section with Breakdown & AI Advice */}
        {auditResult && (
          <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-blue-500/30 animate-fade-in">
            <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Audit Summary</h2>
            
            {/* Logic Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-sm mb-4 text-slate-300">
              <span>Current Monthly:</span> <span className="text-right">${auditResult.currentSpend}</span>
              <span>Optimized Monthly:</span> <span className="text-right text-green-400">${auditResult.optimizedSpend}</span>
              <span className="font-bold">Net Monthly Savings:</span> <span className="text-right font-bold text-green-400">${auditResult.monthlySavings}</span>
            </div>

            {/* AI Recommendation */}
            <div className="bg-blue-900/20 p-3 rounded text-sm mb-4 italic text-blue-200">
              <span className="font-bold not-italic text-blue-400">AI Advice: </span> 
              "{auditResult.recommendation}"
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400 uppercase tracking-widest">Annual Savings</p>
              <p className="text-4xl font-black text-green-500">${auditResult.annualSavings}</p>
            </div>

            {/* 2. Shareable Link Button */}
            <button 
              onClick={copyLink}
              className="mt-6 w-full py-2 border border-slate-600 rounded-md text-sm hover:bg-slate-700 flex items-center justify-center gap-2"
            >
              🔗 Copy Shareable Result Link
            </button>
          </div>
        )}
      </main>

      {/* 4. Footer with Documentation Links */}
      <footer className="mt-auto py-6 text-slate-500 text-xs flex gap-4">
        <a href="#" className="hover:text-blue-400">Methodology</a>
        <span>|</span>
        <a href="#" className="hover:text-blue-400">Pricing Data</a>
        <span>|</span>
        <a href="#" className="hover:text-blue-400">Contact Credex</a>
      </footer>
    </div>
  );
};

export default SpendWiseApp;