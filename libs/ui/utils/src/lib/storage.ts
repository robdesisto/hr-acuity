export const SessionStore = {
  clear() {
    return sessionStorage.clear();
  },
  getItem<T = unknown>(key: string): T | null {
    const value = sessionStorage.getItem(key);
    try {
      return JSON.parse(value as string);
    } catch {
      return value as T;
    }
  },
  removeItem(key: string) {
    return sessionStorage.removeItem(key);
  },
  setItem(key: string, data: unknown) {
    const serializable = (typeof data === 'object' && data !== null) || Array.isArray(data);
    const savable = serializable ? JSON.stringify(data) : data;

    return sessionStorage.setItem(key, savable as string);
  }
}
