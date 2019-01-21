export function save(name: string, value: any) {
    localStorage.setItem(name, String(value));
}

export function load(name: string, defaultValue: any, purge = true): any {
    const storage = localStorage.getItem(name);
    if (purge) localStorage.clear();
    return storage === undefined || storage === null ? defaultValue : storage;
}
