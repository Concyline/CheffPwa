class Auth {

    // 🔐 Verifica se está autenticado
    static isAuthenticated() {
        return StorageManager.contains(Constantes.Token);
    }

    // 🔑 Retorna o token
    static getToken() {
        return StorageManager.get(Constantes.Token);
    }

    // 👤 Retorna o usuário (cache local)
    static getUser() {
        return StorageManager.get(Constantes.User);
    }

    // 💾 Salva sessão (login)
    static setSession(data) {

        if (!data) return;

        if (data.token) {
            StorageManager.set(Constantes.Token, data.token);
        }

        if (data.user) {
            StorageManager.set(Constantes.User, data.user);
        }
    }

    // 🧹 Limpa sessão (logout)
    static clearSession() {
        StorageManager.remove(Constantes.Token);
        StorageManager.remove(Constantes.User);
    }

    // 🚪 Logout completo
    static logout() {
        this.clearSession();
    }

    // 🔄 Atualiza apenas o usuário (mantém token)
    static updateUser(user) {
        if (!user) return;
        StorageManager.set(Constantes.User, user);
    }

}