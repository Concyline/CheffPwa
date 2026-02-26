    
    
    function getParam(param) {
         const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

        // Pegando o parâmetro "token"
    const token = getParam('token');

    if (token) {
      
        console.log("token: ", token)

            // Salvando no localStorage
        localStorage.setItem('token', token);
    }