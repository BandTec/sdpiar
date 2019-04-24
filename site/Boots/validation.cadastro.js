function validacao_cadastro ( cp1 , cp2 , cp3 , cp4 , cp5 , cp6 , cp7 , cp8 , cp9 , cp10 ) {
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
    if ( c1 == "" || c2 == "" || c3 == "" || c4 == "" || c5 == "" || c6 == "" || c7 == "" || c8 == "" || c9 == "" || c10 == "" || p_fisica.checked == true ) {
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
        
    } else {
        location.href = "login.html" ;
    }

}