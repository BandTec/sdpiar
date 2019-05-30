function cadastrarpf() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(pessoaf));
    fetch("/usuarios/cadastrarpf", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        
        if (response.ok) {

            window.location.href='login.html';

        } else {

            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                erros.innerHTML = resposta;
            });
            finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    botaoFisica.disabled = true;
    img_aguarde.style.display='block';
    erros.style.display='none';
}

function finalizar_aguardar() {
    botaoFisica.disabled = false;
    img_aguarde.style.display='none';
    erros.style.display='block';
}

function cadastrarpj() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(pessoaj));
    fetch("/usuarios/cadastrarpj", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        
        if (response.ok) {

            window.location.href='login.html';

        } else {

            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                erros.innerHTML = resposta;
            });
            finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    botaoFisica.disabled = true;
    img_aguarde.style.display='block';
    erros.style.display='none';
}

function finalizar_aguardar() {
    botaoFisica.disabled = false;
    img_aguarde.style.display='none';
    erros.style.display='block';
}