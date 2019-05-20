function inserir() {


// var inserir_umidade = banco.sql.query('select umidade from sensor where idsensor = 1 ');

banco.conectar().then(() => { 

    return myLineChart.data.datasets[0].data.push(banco.sql.query('select temperatura from sensor where idsensor = 1 '))

}) ;

// myLineChart.data.datasets[1].data.push(inserir_umidade) ;

}