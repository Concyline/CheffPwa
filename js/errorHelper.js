class ErrorHelper {

    static getMessage(error) {

        if (!error) return "Erro inesperado.";

        const msg = (error.message || "").toLowerCase();

        if (!navigator.onLine)
            return "Você está sem conexão com a internet.";

        if (msg.includes("failed to fetch"))
            return "O servidor esta indisponível.";

        if (msg.includes("networkerror"))
            return "Erro de rede ao conectar ao servidor.";

        if (msg.includes("timeout"))
            return "O servidor demorou para responder.";

        if (msg.includes("err_name_not_resolved"))
            return "Não foi possível localizar o servidor.";

        if (msg.includes("connection refused"))
            return "Servidor recusou a conexão.";

        if (msg.includes("connection reset"))
            return "Conexão com o servidor foi interrompida.";

        if (msg.includes("ssl") || msg.includes("certificate"))
            return "Erro na conexão segura com o servidor (falha de ssl ou certificado).";

        if (msg.includes("cors"))
            return "Erro de comunicação com o servidor (cors).";

        return error.message;
    }

}