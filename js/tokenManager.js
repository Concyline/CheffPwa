class TokenManager {

    static TOKEN_KEY = "auth_token";

    static set(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    static get() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static remove() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    static isLogged() {
        return !!this.get();
    }
}