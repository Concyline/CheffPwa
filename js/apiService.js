class ApiService {

    constructor() {
        this.baseURL = "http://localhost:5022/v1";
    }

    async request(endpoint, options = {}) {

        const token = TokenManager.get();

        const headers = {
            "Content-Type": "application/json",
            ...options.headers
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers
        };

        const response = await fetch(`${this.baseURL}${endpoint}`, config);

        if (response.status === 401) {
            TokenManager.remove();
            window.location.href = "/login.html";
            return;
        }

        if (!response.ok) {
            throw new Error(`Erro ${response.status}`);
        }

        return response.json();
    }

    // ✅ GET
    get(url) {
        return this.request(url, {
            method: "GET"
        });
    }

    // ✅ POST
    post(url, body) {
        return this.request(url, {
            method: "POST",
            body: JSON.stringify(body)
        });
    }

    // ✅ PUT
    put(url, body) {
        return this.request(url, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    }

    // ✅ DELETE
    delete(url) {
        return this.request(url, {
            method: "DELETE"
        });
    }
}