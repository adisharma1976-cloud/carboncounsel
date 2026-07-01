const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

const ISO_RE = /^\d{4}-\d{2}-\d{2}(T.+)?$/;
const DMY_SLASH_RE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const DMY_DASH_RE = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
const MONTH_DD_YYYY_RE = /^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/;
const DD_MONTH_YYYY_RE = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/;

function monthIndex(name) {
  return MONTHS[name.toLowerCase()] ?? -1;
}

function safeDateOrNull(y, m, d) {
  const date = new Date(Date.UTC(y, m, d));
  if (Number.isNaN(date.getTime())) return null;
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m || date.getUTCDate() !== d) return null;
  return date.toISOString();
}

export function parseDate(dateString) {
  if (!dateString || typeof dateString !== 'string') return null;
  const s = dateString.trim();

  if (ISO_RE.test(s)) {
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }

  let match = s.match(DMY_SLASH_RE);
  if (match) return safeDateOrNull(+match[3], +match[2] - 1, +match[1]);

  match = s.match(DMY_DASH_RE);
  if (match) return safeDateOrNull(+match[3], +match[2] - 1, +match[1]);

  match = s.match(MONTH_DD_YYYY_RE);
  if (match) {
    const mi = monthIndex(match[1]);
    return mi >= 0 ? safeDateOrNull(+match[3], mi, +match[2]) : null;
  }

  match = s.match(DD_MONTH_YYYY_RE);
  if (match) {
    const mi = monthIndex(match[2]);
    return mi >= 0 ? safeDateOrNull(+match[3], mi, +match[1]) : null;
  }

  return null;
}

export function daysSince(dateString) {
  const iso = parseDate(dateString);
  if (!iso) return null;
  const diff = Date.now() - new Date(iso).getTime();
  return Math.floor(diff / 86_400_000);
}

export function isRecent(dateString, withinDays) {
  const days = daysSince(dateString);
  if (days == null) return false;
  return days <= withinDays;
}
