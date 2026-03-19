class UserController {

    // 🔐 LOGIN
    static async login(user) {

        if (
            this.isEmpty(user.email) ||
            this.isEmpty(user.password)
        ) {
            return { success: false, message: "Preencha email e senha." };
        }

        try {

            const response = await UserService.login(user);

            if (!response?.Success) {
                return { success: false, message: response?.Message };
            }

            // 🔥 salva sessão
            Auth.setSession(response.Data);

            return { success: true, message: response.Message };

        } catch (e) {
            return { success: false, message: ErrorHelper.getMessage(e) };
        }
    }

    static async save(user) {

        try {
            if (
                this.isEmpty(user.name) ||
                this.isEmpty(user.email) ||
                this.isEmpty(user.phone) ||
                this.isEmpty(user.password)
            ) {
                return { success: false, message: "Preencha todos os campos obrigatórios" };
            }

            const response = await UserService.save(user)

            if (!response?.Success) {
                return { success: false, message: response?.Message };
            }

            // 🔥 salva sessão
            Auth.setSession(response.Data);

            return { success: true, message: response.Message };

        } catch (e) {
            return { success: false, message: ErrorHelper.getMessage(e) };
        }

    }

    static isEmpty(value) {
        return !value || !value.trim();
    }

    // 🔄 INIT (quando abre app)
    static async init() {

        if (!Auth.isAuthenticated()) {
            renderVisitor()
            return;
        }

        try {

            const response = await UserService.refheshUsuario();

            if (response?.Success) {
                Auth.setSession({
                    token: Auth.getToken(),
                    user: response.Data.user
                });
            }

        } catch {
            console.warn("Usando usuário do cache");
        }

        renderUser();
    }

    // 🚪 LOGOUT
    static logout() {
        Auth.logout();
    }

}