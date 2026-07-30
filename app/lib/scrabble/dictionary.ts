// Dictionary backed by a sorted word array. `isWord` uses a Set for O(1)
// membership; `hasPrefix` uses binary search over the sorted array so we get
// prefix pruning during move generation without building a large trie.

export interface Dictionary {
  isWord(word: string): boolean;
  hasPrefix(prefix: string): boolean;
  size: number;
}

function lowerBound(words: string[], target: string): number {
  let lo = 0;
  let hi = words.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (words[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function createDictionary(rawWords: string[]): Dictionary {
  const words = rawWords
    .map((w) => w.trim().toUpperCase())
    .filter((w) => w.length > 0);
  words.sort();

  const set = new Set(words);

  return {
    size: words.length,
    isWord(word: string) {
      return set.has(word);
    },
    hasPrefix(prefix: string) {
      if (prefix === "") return true;
      const i = lowerBound(words, prefix);
      const candidate = words[i];
      return candidate !== undefined && candidate.startsWith(prefix);
    },
  };
}

let cached: Promise<Dictionary> | null = null;

// Loads /scrabble/dictionary.txt once and memoizes the parsed dictionary.
export function loadDictionary(): Promise<Dictionary> {
  if (cached) return cached;
  cached = fetch("/scrabble/dictionary.txt")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load dictionary (status ${res.status})`);
      }
      return res.text();
    })
    .then((text) => createDictionary(text.split(/\r?\n/)))
    .catch((err) => {
      cached = null; // allow a retry on failure
      throw err;
    });
  return cached;
}
