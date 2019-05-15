var dados = [] ;
var m_temp = 0 ;
var m_umid = 0 ;

function gerar_dados () {
    
    var temp = ( Math.random() * 50 ).toFixed(1) ;
    var umid = ( Math.random() * 90 ).toFixed(1) ;
    var soma_temp = 0 ;
    var soma_umid = 0 ;

    if ( temp > 25.6 ) {
        temp = (temp * 5.7).toFixed(1) ;
    }

    if ( umid > 80 ) {
        umid = (umid * 1.11).toFixed(1) ;
    }
    
    dados.push(
        {
            temperatura : temp ,
            umidade : umid 
        }
    )

    last_temp.innerHTML = `${dados[dados.length-1].temperatura}º` ;
    last_umid.innerHTML = `${dados[dados.length-1].umidade}%` ;

    for ( contador = 0 ; contador < dados.length ; contador++ ) {
        soma_temp += parseFloat(dados[contador].temperatura) ;
        soma_umid += parseFloat(dados[contador].umidade) ;
    } 

    m_temp = parseFloat(( soma_temp / dados.length ).toFixed(1)) ;
    m_umid = parseFloat(( soma_umid / dados.length ).toFixed(1)) ;

    avg_temp.innerHTML = `${m_temp}º` ;
    avg_umid.innerHTML = `${m_umid}%` ;

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
}