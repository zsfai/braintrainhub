export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode
  }
}

export type ScoreBoard = {
  best?: number;
  last?: number;
  updatedAt?: string;
};

export function updateBest(key: string, value: number, prefer: 'min' | 'max' = 'min'): ScoreBoard {
  const current = loadJson<ScoreBoard>(key, {});
  const next: ScoreBoard = {
    last: value,
    updatedAt: new Date().toISOString(),
    best: current.best,
  };
  if (current.best == null) {
    next.best = value;
  } else if (prefer === 'min') {
    next.best = Math.min(current.best, value);
  } else {
    next.best = Math.max(current.best, value);
  }
  saveJson(key, next);
  return next;
}
