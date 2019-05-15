function validacao_login () {
    if ( email_login.value == "admin" && senha_login.value == "sdpiar" ) {
        location.href = 'grafico.html';
    } else {
        alert ( "Login ou senha incorretos" ) ;
    }
}