import { loadJson, saveJson } from './storage';

export type SessionEntry = {
  at: string;
  metrics: Record<string, number | string | boolean>;
};

const MAX_ENTRIES = 20;

export function appendSession(toolKey: string, metrics: SessionEntry['metrics']): void {
  const key = `bth:sessions:${toolKey}`;
  const list = loadJson<SessionEntry[]>(key, []);
  list.unshift({ at: new Date().toISOString(), metrics });
  if (list.length > MAX_ENTRIES) list.length = MAX_ENTRIES;
  saveJson(key, list);
}

export function loadSessions(toolKey: string): SessionEntry[] {
  return loadJson<SessionEntry[]>(`bth:sessions:${toolKey}`, []);
}

export function formatSessionTime(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  } catch {
    return iso;
  }
}
