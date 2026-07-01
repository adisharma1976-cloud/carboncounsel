const TIER_BASE = { A: 95, B: 85, C: 75, D: 60, E: 40 };

const STATUS_MODIFIER = {
  verified: 5,
  unverified: 0,
  estimated: -10,
  inferred: -15,
  stale: -25,
  needs_review: -5,
};

function recencyModifier(recencyDays) {
  if (recencyDays == null || recencyDays < 0) return 0;
  if (recencyDays < 30) return 5;
  if (recencyDays <= 90) return 0;
  if (recencyDays <= 180) return -5;
  if (recencyDays <= 365) return -10;
  return -20;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function computeConfidence(params) {
  const { source_tier, recency_days, human_verified, data_status } = params;

  let score = TIER_BASE[source_tier] ?? 50;
  score += recencyModifier(recency_days);
  if (human_verified) score += 10;
  score += STATUS_MODIFIER[data_status] ?? 0;

  return clamp(Math.round(score), 0, 100);
}

export function getConfidenceLabel(score) {
  if (score >= 80) return 'High';
  if (score >= 60) return 'Medium';
  if (score >= 40) return 'Low';
  return 'Unknown';
}
