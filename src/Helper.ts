export abstract class Helper {
    static HIGHSCORE: number;

    static save(name: string, value: any) {
        localStorage.setItem(name, String(value));
    }

    static load(name: string, defaultValue: any, purge = true): any {
        const storage = localStorage.getItem(name);
        if (purge) localStorage.clear();
        return storage === undefined || storage === null
            ? defaultValue
            : storage;
    }

    static isIOS(): boolean {
        return (
            !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
        );
    }
}
