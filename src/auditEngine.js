export const runAudit = (currentTool, teamSize, monthlySpend) => {
  let recommendation = "";
  let potentialSavings = 0;

  // 1. Logic for ChatGPT Plus users
  if (currentTool === "ChatGPT Plus" && teamSize >= 3) {
    // Agar team 3+ logo ki hai, toh 'Team Plan' sasta padta hai
    potentialSavings = monthlySpend * 0.20; // Maan lete hain 20% bachat hogi
    recommendation = "Switch to ChatGPT Team for better admin controls and cost efficiency.";
  } 
  
  // 2. Logic for Cursor + ChatGPT Bundle
  else if (currentTool === "Cursor + ChatGPT") {
    // Agar dono use kar rahe hain, toh ek subscription ki cost bacha sakte hain
    potentialSavings = 20; 
    recommendation = "Use Cursor with API keys to eliminate the need for a separate ChatGPT Plus sub.";
  } 
  
  // 3. Default case (Jab sab optimized ho)
  else {
    potentialSavings = 0;
    recommendation = "Your current AI spend is well-optimized. No changes needed.";
  }

  // --- NEW CALCULATIONS (Day 4 Analytics) ---
  
  // Saal bhar ki bachat (Monthly x 12)
  const annualSavings = potentialSavings * 12;

  // Efficiency Score (Kitne percent bacha rahe hain)
  // Formula: (Saving / Total Spend) * 100
  const efficiency = monthlySpend > 0 ? ((potentialSavings / monthlySpend) * 100).toFixed(0) : 0;

  // Saare values ko ek "Object" mein return kar rahe hain
  return { 
    recommendation, 
    potentialSavings, 
    annualSavings, 
    efficiency 
  };
};