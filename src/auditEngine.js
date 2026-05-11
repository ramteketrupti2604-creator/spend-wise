/**
 * SpendWise AI - Audit Engine Logic
 * Handles calculations for different AI tools and team sizes.
 */

export const runAudit = (currentTool, teamSize, monthlySpend) => {
  let recommendation = "";
  let potentialSavings = 0;

  // Logic for different tools using a Switch Case
  switch (currentTool) {
    case "ChatGPT Plus":
      if (teamSize >= 3) {
        // Savings based on moving to a Team plan
        potentialSavings = monthlySpend * 0.20;
        recommendation = "Switch to ChatGPT Team for better admin controls and cost efficiency.";
      } else {
        potentialSavings = 0;
        recommendation = "For a single user, ChatGPT Plus is currently your best option.";
      }
      break;

    case "Cursor + ChatGPT":
      // Direct savings by eliminating redundant subscriptions
      potentialSavings = 20; 
      recommendation = "Cancel your ChatGPT Plus sub. Use Cursor with API keys to save $20/month.";
      break;

    case "GitHub Copilot":
      if (teamSize > 10) {
        potentialSavings = monthlySpend * 0.15;
        recommendation = "Consider GitHub Copilot Enterprise for advanced security and custom models.";
      } else {
        potentialSavings = 0;
        recommendation = "Your Copilot subscription is well-optimized for your team size.";
      }
      break;

    case "Midjourney":
      if (monthlySpend > 60) {
        // Annual billing usually offers ~30% discount
        potentialSavings = monthlySpend * 0.30;
        recommendation = "Switch to an Annual Plan to save 30% on your Midjourney subscription.";
      } else {
        potentialSavings = 0;
        recommendation = "You are on the most cost-effective plan for Midjourney.";
      }
      break;

    default:
      potentialSavings = 0;
      recommendation = "Your current AI spend is well-optimized. No changes needed.";
  }

  // --- ANALYTICS CALCULATIONS ---

  // Calculate annual projected savings
  const annualSavings = potentialSavings * 12;

  // Efficiency Score: How much of the budget is effectively used?
  // Formula: ((Total Spend - Savings) / Total Spend) * 100
  const efficiency = monthlySpend > 0 
    ? (((monthlySpend - potentialSavings) / monthlySpend) * 100).toFixed(0) 
    : 100;

  // Return all metrics to the frontend
  return { 
    recommendation, 
    potentialSavings, 
    annualSavings, 
    efficiency 
  };
};