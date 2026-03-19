class UserService {

    static async login(user) {
        return await new ApiClient().post("/user/login", user);
    }

    static async save(user) {
        return await new ApiClient().post("/user", user);
    }

    static async refheshUsuario() {
        return await new ApiClient().get("/user/me");
    }

}