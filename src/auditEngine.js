/**
 * SpendWise AI - Professional Audit Engine
 * Logic verified against official pricing as of May 13, 2026.
 */

export const runAudit = (currentTool, teamSize, monthlySpend, plan) => {
  let recommendation = "";
  let potentialSavings = 0;

  // Exact pricing from PRICING_DATA.md
  const prices = {
    cursorPro: 20,
    cursorBusiness: 40,
    chatgptPlus: 20,
    chatgptTeam: 25,
    copilotIndividual: 10,
    copilotBusiness: 19,
    claudePro: 20,
    claudeTeam: 25,
    geminiPro: 20
  };

  switch (currentTool) {
    case "Cursor":
      if (teamSize === 1 && plan === "Business") {
        potentialSavings = monthlySpend - prices.cursorPro;
        recommendation = "You're paying for a Business plan for 1 user. Downgrade to Cursor Pro to save $20/mo.";
      } else if (teamSize > 1 && plan === "Pro") {
        recommendation = "Pro plan is for individuals. For team collaboration, consider Business features.";
      } else {
        recommendation = "Your Cursor subscription is correctly optimized.";
      }
      break;

    case "ChatGPT":
      if (teamSize >= 2 && plan === "Plus") {
        // Explaining that Plus is individual, Team is better for sharing
        recommendation = "Switch to ChatGPT Team. It offers shared workspaces and higher message limits for teams.";
      } else if (teamSize === 1 && monthlySpend > 20) {
        potentialSavings = monthlySpend - prices.chatgptPlus;
        recommendation = "You are overpaying for a single user. Revert to ChatGPT Plus at $20/mo.";
      } else {
        recommendation = "ChatGPT setup looks solid. No overspend detected.";
      }
      break;

    case "GitHub Copilot":
      if (teamSize === 1 && plan === "Business") {
        potentialSavings = monthlySpend - prices.copilotIndividual;
        recommendation = "Downgrade to Copilot Individual since you have only 1 seat.";
      } else if (teamSize > 5 && plan === "Individual") {
        recommendation = "Moving to Copilot Business will provide better license management for your growing team.";
      } else {
        recommendation = "Your Copilot spend is well-optimized.";
      }
      break;

    case "Claude":
      if (teamSize >= 5 && plan === "Pro") {
        recommendation = "Consider Claude Team for better administrative control and shared credits.";
      } else {
        recommendation = "Claude subscription is efficient for your current team size.";
      }
      break;

    case "Gemini":
      if (monthlySpend > 20 && teamSize === 1) {
        potentialSavings = monthlySpend - prices.geminiPro;
        recommendation = "Standardize on Gemini Pro at $20/mo to eliminate excess costs.";
      } else {
        recommendation = "Your Gemini spend is within the optimal range.";
      }
      break;

    case "API Direct (OpenAI/Anthropic)":
      if (monthlySpend > 500) {
        potentialSavings = monthlySpend * 0.15; // 15% via Credex credits
        recommendation = "You are a high-volume API user. Contact Credex to get 15%+ off on infrastructure credits.";
      } else {
        recommendation = "API spend is normal. Monitor token usage to prevent future spikes.";
      }
      break;

    default:
      recommendation = "Your current AI spend is well-optimized based on industry benchmarks.";
  }

  // --- ANALYTICS CALCULATIONS ---

  // Ensure potentialSavings is never negative
  potentialSavings = Math.max(0, potentialSavings);
  const annualSavings = potentialSavings * 12;

  // Efficiency Score (Finance-literate reasoning)
  // If no savings, efficiency is 100%. If saving 50%, efficiency is 50%.
  const efficiency = monthlySpend > 0 
    ? (((monthlySpend - potentialSavings) / monthlySpend) * 100).toFixed(0) 
    : 100;

  return {
    recommendation,
    potentialSavings,
    annualSavings,
    efficiency: Number(efficiency)
  };
};