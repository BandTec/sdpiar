var controle = 0 ;
var cadastro = [
    { "nome" : "nome1" , "empresa" : "empresa1" , "email" : "email1" , "telefone" : "telefone1" , "data_nasc" : "data1" , "cpf" : "cpf1" , "cep" : "cep1" , "endereco" : "endereço1" , "usuario" : "usuário1" , "senha" : "senha1" , "pessoa" : "pessoa1" } ,
    { "nome" : "nome2" , "empresa" : "empresa2" , "email" : "email2" , "telefone" : "telefone2" , "data_nasc" : "data2" , "cpf" : "cpf2" , "cep" : "cep2" , "endereco" : "endereço2" , "usuario" : "usuário2" , "senha" : "senha2" , "pessoa" : "pessoa2" } ,
    { "nome" : "nome3" , "empresa" : "empresa3" , "email" : "email3" , "telefone" : "telefone3" , "data_nasc" : "data3" , "cpf" : "cpf3" , "cep" : "cep3" , "endereco" : "endereço3" , "usuario" : "usuário3" , "senha" : "senha3" , "pessoa" : "pessoa3" } ,
    { "nome" : "nome4" , "empresa" : "empresa4" , "email" : "email4" , "telefone" : "telefone4" , "data_nasc" : "data4" , "cpf" : "cpf4" , "cep" : "cep4" , "endereco" : "endereço4" , "usuario" : "usuário4" , "senha" : "senha4" , "pessoa" : "pessoa4" } ,
    { "nome" : "nome5" , "empresa" : "empresa5" , "email" : "email5" , "telefone" : "telefone5" , "data_nasc" : "data5" , "cpf" : "cpf5" , "cep" : "cep5" , "endereco" : "endereço5" , "usuario" : "usuário5" , "senha" : "senha5" , "pessoa" : "pessoa5" } ,
    { "nome" : "nome6" , "empresa" : "empresa6" , "email" : "email6" , "telefone" : "telefone6" , "data_nasc" : "data6" , "cpf" : "cpf6" , "cep" : "cep6" , "endereco" : "endereço6" , "usuario" : "usuário6" , "senha" : "senha6" , "pessoa" : "pessoa6" } ,
    { "nome" : "nome7" , "empresa" : "empresa7" , "email" : "email7" , "telefone" : "telefone7" , "data_nasc" : "data7" , "cpf" : "cpf7" , "cep" : "cep7" , "endereco" : "endereço7" , "usuario" : "usuário7" , "senha" : "senha7" , "pessoa" : "pessoa7" } ,
    { "nome" : "nome8" , "empresa" : "empresa8" , "email" : "email8" , "telefone" : "telefone8" , "data_nasc" : "data8" , "cpf" : "cpf8" , "cep" : "cep8" , "endereco" : "endereço8" , "usuario" : "usuário8" , "senha" : "senha8" , "pessoa" : "pessoa8" } ,
    { "nome" : "nome9" , "empresa" : "empresa9" , "email" : "email9" , "telefone" : "telefone9" , "data_nasc" : "data9" , "cpf" : "cpf9" , "cep" : "cep9" , "endereco" : "endereço9" , "usuario" : "usuário9" , "senha" : "senha9" , "pessoa" : "pessoa9" }
]

function validacao_cadastro ( cp1 , cp2 , cp3 , cp4 , cp5 , cp6 , cp7 , cp8 , cp9 , cp10 , cp11 , cp12 ) {
    var c1 = cp1.value ;
    var c2 = cp2.value ;
    var c3 = cp3.value ;
    var c4 = cp4.value ;
    var c5 = cp5.value ;
    var c6 = cp6.value ;
    var c7 = cp7.value ;
    var c8 = cp8.value ;
    var c9 = cp9.value ;
    var c10 = cp10.value ;
    var c11 = cp11.checked ;
    var c12 = cp12.checked ;
    if ( c1 == "" || c2 == "" || c3 == "" || c4 == "" || c5 == "" || c6 == "" || c7 == "" || c8 == "" || c9 == "" || c10 == "" ) {
        alert ( "Preencha todos os campos" ) ;
        c1 == "" ? cp1.className = " new-style form-control-user " : cp1.className = " form-control form-control-user " ;
        c2 == "" ? cp2.className = " new-style form-control-user " : cp2.className = " form-control form-control-user " ;
        c3 == "" ? cp3.className = " new-style form-control-user " : cp3.className = " form-control form-control-user " ;
        c4 == "" ? cp4.className = " new-style form-control-user " : cp4.className = " form-control form-control-user " ;
        c5 == "" ? cp5.className = " new-style form-control-user " : cp5.className = " form-control form-control-user " ;
        c6 == "" ? cp6.className = " new-style form-control-user " : cp6.className = " form-control form-control-user " ;
        c7 == "" ? cp7.className = " new-style form-control-user " : cp7.className = " form-control form-control-user " ;
        c8 == "" ? cp8.className = " new-style form-control-user " : cp8.className = " form-control form-control-user " ;
        c9 == "" ? cp9.className = " new-style form-control-user " : cp9.className = " form-control form-control-user " ;
        c10 == "" ? cp10.className = " new-style form-control-user " : cp10.className = " form-control form-control-user " ;
        
    } else if ( c11 || c12 ) {
        if ( c11 && c12 ) {
            alert ( "Preencha apenas uma das opções de tipo de pessoa" ) ;
        } else {
            controle++
            cadastro.nome[controle] = c1 ; 
            cadastro.empresa[controle] = c2 ;
            cadastro.email[controle] = c3 ;
            cadastro.telefone[controle] = c4 ;
            cadastro.data_nasc[controle] = c5 ;
            cadastro.cpf[controle] = c6 ;
            cadastro.cep[controle] = c7 ;
            cadastro.endereco[controle] = c8 ;
            cadastro.usuario[controle] = c9 ;
            cadastro.senha[controle] = c10 ;
            c11 ? cadastro.pessoa[controle] = "Pessoa Física" : cadastro.pessoa[controle] = "Pessoa Jurídica" ;
            location.href = "login.html" ;
        }
    } else {
        alert ( "Escolha o tipo de pessoa" ) ;
        cp1.className = " form-control form-control-user " ;
        cp2.className = " form-control form-control-user " ;
        cp3.className = " form-control form-control-user " ;
        cp4.className = " form-control form-control-user " ;
        cp5.className = " form-control form-control-user " ;
        cp6.className = " form-control form-control-user " ;
        cp7.className = " form-control form-control-user " ;
        cp8.className = " form-control form-control-user " ;
        cp9.className = " form-control form-control-user " ;
        cp10.className = " form-control form-control-user " ;
    }

}
