class StorageManager {

    static set(key, value) {
        //console.log('StorageManager set')
        if (typeof value === "object") {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }

    static get(key) {
        //console.log('StorageManager get')
        const value = localStorage.getItem(key);

        // tenta converter JSON automaticamente
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static contains(key) {
        return localStorage.getItem(key) !== null;
    }

    static clear() {
        localStorage.clear();
    }
}