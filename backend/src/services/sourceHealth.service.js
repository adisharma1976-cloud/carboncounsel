const registry = new Map();

const MS_24H = 86_400_000;
const MS_48H = 172_800_000;

function getOrCreate(sourceName) {
  if (!registry.has(sourceName)) {
    registry.set(sourceName, {
      source: sourceName,
      success_count: 0,
      failure_count: 0,
      avg_response_time: 0,
      last_success: null,
      last_failure: null,
      latest_error: null,
    });
  }
  return registry.get(sourceName);
}

function deriveStatus(entry) {
  const now = Date.now();
  const sinceLast = entry.last_success ? now - new Date(entry.last_success).getTime() : Infinity;

  if (sinceLast <= MS_24H && entry.failure_count < 3) return 'healthy';
  if (sinceLast <= MS_48H || (entry.failure_count >= 3 && entry.failure_count <= 5)) return 'degraded';
  return 'failed';
}

export function recordSuccess(sourceName, responseTimeMs) {
  const entry = getOrCreate(sourceName);
  const total = entry.avg_response_time * entry.success_count + responseTimeMs;
  entry.success_count += 1;
  entry.avg_response_time = Math.round(total / entry.success_count);
  entry.last_success = new Date().toISOString();
}

export function recordFailure(sourceName, error) {
  const entry = getOrCreate(sourceName);
  entry.failure_count += 1;
  entry.last_failure = new Date().toISOString();
  entry.latest_error = error instanceof Error ? error.message : String(error);
}

export function getHealth(sourceName) {
  const entry = registry.get(sourceName);
  if (!entry) return null;
  return { ...entry, status: deriveStatus(entry) };
}

export function getAllHealth() {
  const result = {};
  for (const [name, entry] of registry) {
    result[name] = { ...entry, status: deriveStatus(entry) };
  }
  return result;
}

export function getHealthSummary() {
  let healthy = 0;
  let degraded = 0;
  let failed = 0;

  for (const entry of registry.values()) {
    const status = deriveStatus(entry);
    if (status === 'healthy') healthy++;
    else if (status === 'degraded') degraded++;
    else failed++;
  }

  return {
    total_sources: registry.size,
    healthy,
    degraded,
    failed,
    last_check: new Date().toISOString(),
  };
}
