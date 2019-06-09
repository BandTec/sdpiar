var dados = [] ;  // Vetor principal, onde são colocados os valores de temperatura e umidade
var quartis_temp = [] ; // Vetor parcial, onde são colocados todos os valores de temperatura do vetor dados, ordenados do menor para o maior
var quartis_umid = [] ; // Vetor parcial, onde são colocados todos os valores de umidade do vetor dados, ordenados do menor para o maior

function gerar_dados () {
    
    var temp = parseFloat (( Math.random() * 50 ).toFixed(1)) ; // Gerando um valor aleatório de temperatura
    var umid = parseFloat (( Math.random() * 90 ).toFixed(1)) ; // Gerando um valor aleatório de umidade
    var soma_temp = 0 ; 
    var soma_umid = 0 ;
    var m_temp = 0 ;
    var m_umid = 0 ;
    var mediana_temp = 0 ;
    var mediana_umid = 0 ;
    var prim_quartil_temp = 0 ;
    var prim_quartil_umid = 0 ;
    var terc_quartil_temp = 0 ;
    var terc_quartil_umid = 0 ;

    while ( temp < 14.2 ) {
        temp = parseFloat (( Math.random() * 50 ).toFixed(1)) ;
    }
    
    // Aplicando manipulação (ajuste) de dados, devido limitações do hardware arduíno.
    if ( temp > 25.6 ) { 
        temp = parseFloat((temp * 5.7).toFixed(1)) ;
    }

    if ( umid > 80 ) {
        umid = parseFloat((umid * 1.11).toFixed(1)) ;
    }
    
    // Inserindo os valores gerados de temperatura e umidade dentro do vetor dados.
    dados.push(
        {
            temperatura : temp ,
            umidade : umid 
        }
    )

    // Pegando no vetor dados o último dado gerado de temperatura e umidade e inserindo na página de Dashboard.
    last_temp.innerHTML = `${dados[dados.length-1].temperatura}º` ;
    last_umid.innerHTML = `${dados[dados.length-1].umidade}%` ;

    // Somando todos os valores de temperatura e umidade para calcular a média
    for ( contador = 0 ; contador < dados.length ; contador++ ) {
        soma_temp += parseFloat(dados[contador].temperatura) ;
        soma_umid += parseFloat(dados[contador].umidade) ;
    } 

    // Calculando a média de temperatura e umidade
    m_temp = parseFloat(( soma_temp / dados.length ).toFixed(1)) ;
    m_umid = parseFloat(( soma_umid / dados.length ).toFixed(1)) ;

    // Inserindo a média na página de Dashboard
    avg_temp.innerHTML = `${m_temp}º` ;
    avg_umid.innerHTML = `${m_umid}%` ;

    // Inserindo cada novo dado gerado dentro do gráfico.
    if ( myLineChart.data.datasets[0].data.length < 7 ) {
        myLineChart.data.datasets[0].data.push(dados[dados.length-1].temperatura) ;
        myLineChart.data.datasets[1].data.push(dados[dados.length-1].umidade) ;
        
    } else {
        myLineChart.data.datasets[0].data.shift() ;
        myLineChart.data.datasets[1].data.shift() ;
        myLineChart.data.datasets[0].data.push(dados[dados.length-1].temperatura) ;
        myLineChart.data.datasets[1].data.push(dados[dados.length-1].umidade) ;
        
    }

    myLineChart.update() ;

    // Colocando os valores de temperatura e umidade em dois vetores distintos.
    for ( contador = 0 ; contador < dados.length ; contador++ ) {
        quartis_temp[contador] = dados[contador].temperatura ;
        quartis_umid[contador] = dados[contador].umidade ;
    }

    // Ordenando os vetores parciais.
    quartis_temp.sort(ordenar) ;
    quartis_umid.sort(ordenar) ;

    // Calculando a mediana de temperatura e inserindo no Dashboard
    if ( quartis_temp.length == 1 ) {
        mediana_temp = quartis_temp [0] ;
    } else if ( quartis_temp.length % 2 == 0 ) {
        mediana_temp = ( ( quartis_temp [ quartis_temp.length / 2 - 1 ] ) + ( quartis_temp [ quartis_temp.length / 2 ] ) ) / 2 ;
    } else { 
        var auxiliar = parseInt ( quartis_temp.length / 2 ) ;
        mediana_temp = quartis_temp [ auxiliar ] ;
    }

    temp_mediana.innerHTML = `${mediana_temp.toFixed(1)}º`;

    // Calculando a mediana de umidade e inserindo no Dashboard
    if ( quartis_umid.length == 1 ) {
        mediana_umid = quartis_umid [0] ;
    } else if ( quartis_umid.length % 2 == 0 ) {
        mediana_umid = ( ( quartis_umid [ quartis_umid.length / 2 - 1 ] ) + ( quartis_umid [ quartis_umid.length / 2 ] ) ) / 2 ;
    } else { 
        var auxiliar = parseInt ( quartis_umid.length / 2 ) ;
        mediana_umid = quartis_umid [ auxiliar ] ;
    }

    umid_mediana.innerHTML = `${mediana_umid.toFixed(1)}%` ;

    // Calculando o 1º Quartil de temperatura
    if ( quartis_temp.length == 1 || quartis_temp.length == 2 ) {
        prim_quartil_temp = quartis_temp[0] ;
    } else if ( quartis_temp.length % 4 == 0 ) {      
        var auxiliar = quartis_temp.length / 4 ;
        prim_quartil_temp = ( ( quartis_temp [ auxiliar - 1 ] ) + ( quartis_temp [ auxiliar ] ) ) / 2 ;
    } else if ( quartis_temp.length % 2 == 0 ) {
        var auxiliar = quartis_temp.length / 2 ;
        var auxiliar_dois = parseInt ( auxiliar / 2 ) ;
        prim_quartil_temp = quartis_temp [ auxiliar_dois ] ;
    } else if ( quartis_temp.length == 3 ) {
        var auxiliar = parseInt ( quartis_temp.length / 2 ) ;
        var mediana_temporaria = quartis_temp [ auxiliar ] ;
        var esquerda_da_mediana = quartis_temp [ auxiliar - 1 ] ; 
        prim_quartil_temp = ( mediana_temporaria + esquerda_da_mediana ) / 2 ; 
    } else {
        var auxiliar = parseInt ( quartis_temp.length / 2 ) ;
        if ( auxiliar % 2 == 0 ) {
            auxiliar = auxiliar / 2 ;
            prim_quartil_temp = ( quartis_temp [ auxiliar - 1 ] + quartis_temp [ auxiliar ] ) / 2 ;
        } else { 
            auxiliar = parseInt ( auxiliar / 2 ) ;
            prim_quartil_temp = quartis_temp [ auxiliar ] ; 
        }
    } 

    temp_quartil_um.innerHTML = `${prim_quartil_temp.toFixed(1)}º` ;
    
    // Calculando o 1º Quartil de umidade
    if ( quartis_umid.length == 1 || quartis_umid.length == 2 ) {
        prim_quartil_umid = quartis_umid[0] ;
    } else if ( quartis_umid.length % 4 == 0 ) {      
        var auxiliar = quartis_umid.length / 4 ;
        prim_quartil_umid = ( ( quartis_umid [ auxiliar - 1 ] ) + ( quartis_umid [ auxiliar ] ) ) / 2 ;
    } else if ( quartis_umid.length % 2 == 0 ) {
        var auxiliar = quartis_umid.length / 2 ;
        var auxiliar_dois = parseInt ( auxiliar / 2 ) ;
        prim_quartil_umid = quartis_umid [ auxiliar_dois ] ;
    } else if ( quartis_umid.length == 3 ) {
        var auxiliar = parseInt ( quartis_umid.length / 2 ) ;
        var mediana_temporaria = quartis_umid [ auxiliar ] ;
        var esquerda_da_mediana = quartis_umid [ auxiliar - 1 ] ; 
        prim_quartil_umid = ( mediana_temporaria + esquerda_da_mediana ) / 2 ; 
    } else {
        var auxiliar = parseInt ( quartis_umid.length / 2 ) ;
        if ( auxiliar % 2 == 0 ) {
            auxiliar = auxiliar / 2 ;
            prim_quartil_umid = ( quartis_umid [ auxiliar - 1 ] + quartis_umid [ auxiliar ] ) / 2 ;
        } else { 
            auxiliar = parseInt ( auxiliar / 2 ) ;
            prim_quartil_umid = quartis_umid [ auxiliar ] ; 
        }
    }

    umid_quartil_um.innerHTML = `${prim_quartil_umid.toFixed(1)}%` ;

    // Calculando o 3º Quartil de temperatura
    if ( quartis_temp.length == 1 || quartis_temp.length == 2 ) {
        terc_quartil_temp = quartis_temp[0] ;
    } else if ( quartis_temp.length % 4 == 0 ) {      temp
        var auxiliar = quartis_temp.length / 4 ;
        auxiliar = auxiliar * 3 ;
        terc_quartil_temp = ( ( quartis_temp [ auxiliar - 1 ] ) + ( quartis_temp [ auxiliar ] ) ) / 2 ;
    } else if ( quartis_temp.length % 2 == 0 ) {
        var auxiliar = quartis_temp.length / 2 ;
        auxiliar = auxiliar + parseInt ( auxiliar / 2 ) ;
        terc_quartil_temp = quartis_temp [ auxiliar ] ;
    } else if ( quartis_temp.length == 3 ) {
        var auxiliar = parseInt ( quartis_temp.length / 2 ) ;
        var mediana_temporaria = quartis_temp [ auxiliar ] ;
        var direita_da_mediana = quartis_temp [ auxiliar + 1 ] ; 
        terc_quartil_temp = ( mediana_temporaria + direita_da_mediana ) / 2 ; 
    } else {
        var auxiliar = parseInt ( quartis_temp.length / 2 ) ;
        if ( auxiliar % 2 == 0 ) {
            auxiliar = auxiliar + ( auxiliar / 2 ) ;
            terc_quartil_temp = ( quartis_temp [ auxiliar + 1 ] + quartis_temp [ auxiliar ] ) / 2 ;
        } else { 
            auxiliar = auxiliar + parseInt ( auxiliar / 2 ) + 1 ;
            terc_quartil_temp = quartis_temp [ auxiliar ] ; 
        }
    }

    temp_quartil_tres.innerHTML = `${terc_quartil_temp.toFixed(1)}º` ;

    // Calculando o 3º Quartil de umidade
    if ( quartis_umid.length == 1 || quartis_umid.length == 2 ) {
        terc_quartil_umid = quartis_umid[0] ;
    } else if ( quartis_umid.length % 4 == 0 ) {      
        var auxiliar = quartis_umid.length / 4 ;
        auxiliar = auxiliar * 3 ;
        terc_quartil_umid = ( ( quartis_umid [ auxiliar - 1 ] ) + ( quartis_umid [ auxiliar ] ) ) / 2 ;
    } else if ( quartis_umid.length % 2 == 0 ) {
        var auxiliar = quartis_umid.length / 2 ;
        auxiliar = auxiliar + parseInt ( auxiliar / 2 ) ;
        terc_quartil_umid = quartis_umid [ auxiliar ] ;
    } else if ( quartis_umid.length == 3 ) {
        var auxiliar = parseInt ( quartis_umid.length / 2 ) ;
        var mediana_temporaria = quartis_umid [ auxiliar ] ;
        var direita_da_mediana = quartis_umid [ auxiliar + 1 ] ; 
        terc_quartil_umid = ( mediana_temporaria + direita_da_mediana ) / 2 ; 
    } else {
        var auxiliar = parseInt ( quartis_umid.length / 2 ) ;
        if ( auxiliar % 2 == 0 ) {
            auxiliar = auxiliar + ( auxiliar / 2 ) ;
            terc_quartil_umid = ( quartis_umid [ auxiliar + 1 ] + quartis_umid [ auxiliar ] ) / 2 ;
        } else { 
            auxiliar = auxiliar + parseInt ( auxiliar / 2 ) + 1 ;
            terc_quartil_umid = quartis_umid [ auxiliar ] ; 
        }
    }

    umid_quartil_tres.innerHTML = `${terc_quartil_umid.toFixed(1)}%` ;

    if ( dados[dados.length-1].temperatura < mediana_temp ) {
        cor_temp.className = 'text-success' ;
    } else if ( dados[dados.length-1].temperatura >= mediana_temp && dados[dados.length-1].temperatura < terc_quartil_temp ) {
        cor_temp.className = 'text-warning' ;
    } else {
        cor_temp.className = 'text-danger' ;
    }

    if ( dados[dados.length-1].umidade < mediana_umid ) {
        cor_umid.className = 'text-danger' ;
    } else if ( dados[dados.length-1].umidade >= mediana_umid && dados[dados.length-1].umidade < terc_quartil_umid ) {
        cor_umid.className = 'text-warning' ;
    } else {
        cor_umid.className = 'text-primary' ;
    }

}

// Função auxiliar para ordenar os valores de um vetor
function ordenar ( a , b ) {
    return ( a - b ) ;
}