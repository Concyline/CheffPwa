class ApiClient {

    constructor() {
        this.baseURL = "http://localhost:5022/v1";
    }

    async request(endpoint, options = {}) {

        TopProgressBar.start();

        try {

            const token = StorageManager.get(Constantes.Token)

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

           //console.log(`${this.baseURL}${endpoint}`)

            const response = await fetch(`${this.baseURL}${endpoint}`, config);

            return await response.json();

        } finally {
            TopProgressBar.finish();
        }
    }

    get(url) {
        return this.request(url, { method: "GET" });
    }

    post(url, body) {
        return this.request(url, {
            method: "POST",
            body: JSON.stringify(body)
        });
    }

    put(url, body) {
        return this.request(url, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    }

    delete(url) {
        return this.request(url, {
            method: "DELETE"
        });
    }
}