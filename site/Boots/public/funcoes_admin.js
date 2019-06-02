var contador = 1 ;
var total_areas ;

function nova_area () {
    contador = 1 ;
    total_areas = 0 ;
    pf.disabled = true ;
    pj.disabled = true ;
    ac.disabled = true ;
    programas.innerHTML = ` <br>
        Quantos sensores tem na propriedade?
        <br>
        <input type="number" id="sensores">
        <br><br>
        <button class="btn-success" type="button" onclick="nova_area2(sensores)">Prosseguir</button>
    `
}

function nova_area2 (s) {
    var qtd_s = parseInt ( Number (s.value) / 3 );
    total_areas = qtd_s ;
    programas.innerHTML = ` <br>
        Quem é o usuário proprietário destes sensores?
        <br>
        <input type="text" id="proprietario" placeholder="ID do usuário">
        <br><br>
        <button class="btn-success" type="button" onclick="just_name(),nova_area3(${qtd_s})">Prosseguir</button>
    `
}

function just_name () {
    n_user.value = proprietario.value ;
}

function nova_area3 (s) {
    programas.innerHTML = "" ;
    programas.innerHTML = `<br> O usuário de ID ${n_user.value} pode cadastrar ${s} áreas <br> 
        <form method="post" onsubmit="return enviar_banco()" id="areas">
        <input name="area" type="hidden" value="${contador}">
        <input name="usuario" type="hidden" value="${n_user.value}">
        <br>
        Área ${contador} = <input name="s1" type="number" placeholder="sensor 1">
        <input name="s2" type="number" placeholder="sensor 2"> 
        <input name="s3" type="number" placeholder="sensor 3"> ;
        <br><br> 
        <button id="botao_areas">Cadastrar áreas</button> </form> <br>
        <img src="aguarde2.gif" id="img_aguarde" style="display: none; margin-left: 40%;" width="100px">
        <div id="erros"></div>
    ` ;
    if (contador > total_areas) {
        alert ("Cadastro realizado com sucesso! \nCadastrado todas as áreas permitidas!") ;
        programas.innerHTML = "" ;
        pf.disabled = false;
        pj.disabled = false;
        ac.disabled = false;
    }
}

function enviar_banco() {
        aguardar();
        var formulario = new URLSearchParams(new FormData(areas));
        fetch("/usuarios/cadastrar_areas", {
            method: "POST",
            body: formulario
        }).then(function (response) {
            
            if (response.ok) {

                finalizar_aguardar();
                var areias = total_areas-contador ;
                contador++;
                nova_area3(areias);

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
    botao_areas.disabled = true;
    img_aguarde.style.display='block';
    erros.style.display='none';
}

function finalizar_aguardar() {
    botao_areas.disabled = false;
    img_aguarde.style.display='none';
    erros.style.display='block';
}

function pfs () {
   var pessoas_fisicas_cadastradas = [] ;

   img_aguarde.style.display = 'inline' ;

   fetch('/leituras/pfs', { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
        response.json().then(function (resposta) {

            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            resposta.reverse();

            for (i = 0; i < resposta.length; i++) {
                var registro = resposta[i];

                pessoas_fisicas_cadastradas.push({
                    id : registro.idusuario ,
                    nome : registro.nome ,
                    email : registro.email ,
                    cep : registro.cep ,
                    cpf : registro.CPF_CNPJ ,
                    usuario : registro.usuario
                });
            } 

            console.log(JSON.stringify(pessoas_fisicas_cadastradas));

            img_aguarde.style.display = 'none' ;

        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
    }
})
    setTimeout(function(){content_of_page.innerHTML += ` <div class="row">
                            <div id="ids" class="col-2 text-center"> IDUSUARIO </div> 
                            <div id="nomes" class="col-2 text-center"> NOME </div>
                            <div id="emails" class="col-2 text-center"> EMAIL </div>
                            <div id="ceps" class="col-2 text-center"> CEP </div>
                            <div id="cpfs" class="col-2 text-center"> CPF </div>
                            <div id="usuarios" class="col-2 text-center"> USUARIO </div>
                            </div>
    `;
    ;
    for ( c = 0 ; c < pessoas_fisicas_cadastradas.length ; c++ ) {
        ids.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].id}` ;
        nomes.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].nome}` ;
        emails.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].email}` ;
        ceps.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].cep}` ;
        cpfs.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].cpf}` ;
        usuarios.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].usuario}` ;
    }
    }, 3000) ;

    
}