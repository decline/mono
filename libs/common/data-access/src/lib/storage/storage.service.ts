export abstract class StorageService {
  abstract clear(): void;

  abstract getItem(key: string): string | null;

  abstract key(index: number): string | null;

  abstract removeItem(key: string): void;

  abstract setItem(key: string, value: string): void;
}

export class LocalStorageService extends StorageService {
  clear(): void {
    localStorage.clear();
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    return localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }
}
