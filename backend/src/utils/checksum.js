import { createHash } from 'node:crypto';

export function computeChecksum(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

export function isDuplicate(newChecksum, existingChecksums) {
  if (existingChecksums instanceof Set) {
    return existingChecksums.has(newChecksum);
  }
  return Array.isArray(existingChecksums) && existingChecksums.includes(newChecksum);
}
