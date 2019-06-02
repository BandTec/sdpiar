var contador = 1 ;
var total_areas ;

function nova_area () {
    contador = 1 ;
    total_areas = 0 ;
    pf.disabled = true ;
    pj.disabled = true ;
    ac.disabled = true ;
    ids.style.display = "none" ;
    nomes.style.display = "none" ;
    empresas_pai.style.display = "none" ;
    ceps.style.display = "none" ;
    cpfs.style.display = "none" ;
    usuarios.style.display = "none" ;
    cnpjs.style.display = "none" ;
    telefones.style.display = "none" ;
    empresas.style.display = "none" ;
    idsa.style.display = "none" ;
    s1.style.display = "none" ;
    s2.style.display = "none" ;
    s3.style.display = "none" ;
    dono.style.display = "none" ;
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

   ids.style.display = "none" ;
    nomes.style.display = "none" ;
    empresas_pai.style.display = "none" ;
    ceps.style.display = "none" ;
    cpfs.style.display = "none" ;
    usuarios.style.display = "none" ;
    cnpjs.style.display = "none" ;
    telefones.style.display = "none" ;
    empresas.style.display = "none" ;
    idsa.style.display = "none" ;
    s1.style.display = "none" ;
    s2.style.display = "none" ;
    s3.style.display = "none" ;
    dono.style.display = "none" ;

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
                    empresa : registro.empresapai ,
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
    setTimeout(function(){ ids.innerHTML = "IDUSUARIO" ;
    nomes.innerHTML = "NOME" ;
    empresas_pai.innerHTML = "EMP-PAI" ;
    ceps.innerHTML = "CEP" ;
    cpfs.innerHTML = "CPF" ;
    usuarios.innerHTML = "USUARIO" ;
    ids.style.display = "block" ;
    nomes.style.display = "block" ;
    empresas_pai.style.display = "block" ;
    ceps.style.display = "block" ;
    cpfs.style.display = "block" ;
    usuarios.style.display = "block" ;
    for ( c = 0 ; c < pessoas_fisicas_cadastradas.length ; c++ ) {
        ids.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].id}` ;
        nomes.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].nome}` ;
        empresas_pai.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].empresa}` ;
        ceps.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].cep}` ;
        cpfs.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].cpf}` ;
        usuarios.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].usuario}` ;
    } 
    }, 3000) ;

    
}

function pjs () {
    var pessoas_fisicas_cadastradas = [] ;

    ids.style.display = "none" ;
    nomes.style.display = "none" ;
    empresas_pai.style.display = "none" ;
    ceps.style.display = "none" ;
    cpfs.style.display = "none" ;
    usuarios.style.display = "none" ;
    cnpjs.style.display = "none" ;
    telefones.style.display = "none" ;
    empresas.style.display = "none" ;
    idsa.style.display = "none" ;
    s1.style.display = "none" ;
    s2.style.display = "none" ;
    s3.style.display = "none" ;
    dono.style.display = "none" ;
 
    img_aguarde.style.display = 'inline' ;
 
    fetch('/leituras/pjs', { cache: 'no-store' }).then(function (response) {
     if (response.ok) {
         response.json().then(function (resposta) {
 
             console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
 
             resposta.reverse();
 
             for (i = 0; i < resposta.length; i++) {
                 var registro = resposta[i];
 
                 pessoas_fisicas_cadastradas.push({
                     id : registro.idusuario ,
                     nome_emp : registro.NomeEmpresa ,
                     telefone : registro.telefone ,
                     cep : registro.cep ,
                     cnpj : registro.CPF_CNPJ ,
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
     setTimeout(function(){ ids.innerHTML = "IDUSUARIO" ;
     telefones.innerHTML = "TELEFONE" ;
     empresas.innerHTML = "EMPRESA" ;
     ceps.innerHTML = "CEP" ;
     cnpjs.innerHTML = "CNPJ" ;
     usuarios.innerHTML = "USUARIO" ;
     ids.style.display = "block" ;
     telefones.style.display = "block" ;
     empresas.style.display = "block" ;
     ceps.style.display = "block" ;
     cnpjs.style.display = "block" ;
     usuarios.style.display = "block" ;
     for ( c = 0 ; c < pessoas_fisicas_cadastradas.length ; c++ ) {
         ids.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].id}` ;
         telefones.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].telefone}` ;
         empresas.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].nome_emp}` ;
         ceps.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].cep}` ;
         cnpjs.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].cnpj}` ;
         usuarios.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].usuario}` ;
     } 
     }, 3000) ;
 
     
 }

 function areas () {
    var pessoas_fisicas_cadastradas = [] ;
 
    ids.style.display = "none" ;
    nomes.style.display = "none" ;
    empresas_pai.style.display = "none" ;
    ceps.style.display = "none" ;
    cpfs.style.display = "none" ;
    usuarios.style.display = "none" ;
    cnpjs.style.display = "none" ;
    telefones.style.display = "none" ;
    empresas.style.display = "none" ;
    idsa.style.display = "none" ;
    s1.style.display = "none" ;
    s2.style.display = "none" ;
    s3.style.display = "none" ;
    dono.style.display = "none" ;

    img_aguarde.style.display = 'inline' ;
 
    fetch('/leituras/areas', { cache: 'no-store' }).then(function (response) {
     if (response.ok) {
         response.json().then(function (resposta) {
 
             console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
 
             resposta.reverse();
 
             for (i = 0; i < resposta.length; i++) {
                 var registro = resposta[i];
 
                 pessoas_fisicas_cadastradas.push({
                     id : registro.idarea ,
                     s1 : registro.primeiroSensor ,
                     s2 : registro.segundoSensor ,
                     s3 : registro.terceiroSensor ,
                     dono : registro.fkdono ,
                 });
             } 
 
             console.log(JSON.stringify(pessoas_fisicas_cadastradas));
 
             img_aguarde.style.display = 'none' ;
 
         });
     } else {
         console.error('Nenhum dado encontrado ou erro na API');
     }
 })
     setTimeout(function(){ idsa.innerHTML = "IDAREA" ;
     s1.innerHTML = "SENSOR1" ;
     s2.innerHTML = "SENSOR2" ;
     s3.innerHTML = "SENSOR3" ;
     dono.innerHTML = "USUARIO DONO" ;
     idsa.style.display = "block" ;
     s1.style.display = "block" ;
     s2.style.display = "block" ;
     s3.style.display = "block" ;
     dono.style.display = "block" ;
     for ( c = 0 ; c < pessoas_fisicas_cadastradas.length ; c++ ) {
         idsa.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].id}` ;
         s1.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].s1}` ;
         s2.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].s2}` ;
         s3.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].s3}` ;
         dono.innerHTML += `<br> ${pessoas_fisicas_cadastradas[c].dono}` ;
     } 
     }, 3000) ;
 
     
 }