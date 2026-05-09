export const runAudit = (currentTool, teamSize, monthlySpend) => {
  let recommendation = "";
  let potentialSavings = 0;

  // Example Logic for ChatGPT
  if (currentTool === "ChatGPT Plus" && teamSize >= 2) {
    potentialSavings = (monthlySpend - (25 * teamSize)); 
    recommendation = "Switch to ChatGPT Team for better collaboration and admin controls.";
  } 
  
  // Example Logic for Redundancy (Cursor + ChatGPT)
  else if (currentTool === "Cursor + ChatGPT") {
    potentialSavings = 20; // Saving one subscription cost
    recommendation = "Use Cursor with API keys to cancel your separate ChatGPT Plus sub.";
  }

  return { recommendation, potentialSavings };
};