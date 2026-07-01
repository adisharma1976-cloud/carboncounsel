const HTML_TAG_RE = /<[^>]*>/g;
const MULTI_SPACE_RE = /[^\S\n]+/g;
const MULTI_NEWLINE_RE = /\n{3,}/g;

const DOMAIN_KEYWORDS = [
  'ccts', 'cbam', 'carbon credit', 'gei', 'greenhouse gas', 'emissions',
  'bee', 'moefcc', 'article 6', 'rec', 'escert', 'compliance', 'offset',
  'acva', 'methodology', 'baseline', 'monitoring', 'verification',
  'paris agreement', 'ndc', 'net-zero', 'scope 1', 'scope 2', 'scope 3',
  'energy intensity', 'renewable energy',
];

export function cleanText(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';
  return rawText
    .replace(HTML_TAG_RE, '')
    .replace(/\r\n?/g, '\n')
    .replace(MULTI_SPACE_RE, ' ')
    .replace(MULTI_NEWLINE_RE, '\n\n')
    .trim();
}

export function extractKeywords(text) {
  if (!text || typeof text !== 'string') return [];
  const lower = text.toLowerCase();
  return DOMAIN_KEYWORDS.filter((kw) => lower.includes(kw));
}

export function truncate(text, maxLength) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
