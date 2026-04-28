/**
 * Mock Risk Engine
 * This simulates an AI-based risk prediction model.
 * In a real application, this would use an ML model or complex rules
 * factoring in historical incident data, density, lighting APIs, etc.
 */

export function calculateRiskScore(lat, lng, time) {
  let baseScore = 20; // Default low risk
  
  const hour = time ? new Date(time).getHours() : new Date().getHours();
  
  // Time penalty (Late night increases risk)
  if (hour >= 20 || hour <= 4) {
    baseScore += 40;
  } else if (hour >= 18) {
    baseScore += 20;
  }

  // Location penalty (mocking "bad areas")
  // Let's pretend some coordinates are artificially more dangerous
  const latMod = Math.abs(lat % 1);
  const lngMod = Math.abs(lng % 1);
  
  if (latMod > 0.5 && lngMod < 0.5) {
    baseScore += 30; // "High risk zone"
  } else if (latMod < 0.3) {
    baseScore += 15; // "Moderate risk zone"
  }

  // Ensure score is bounded between 0 and 100
  return Math.min(Math.max(Math.round(baseScore), 0), 100);
}
