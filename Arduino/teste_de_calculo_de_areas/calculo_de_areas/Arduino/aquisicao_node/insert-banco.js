// executar os comandos (pelo git bash ou powershell):
// npm i
// npm start

// qual o nome da pasta onde está o node do site?
var pasta_projeto_site = '../site/Boots';

// leitura dos dados do Arduino
var banco = require(`../${pasta_projeto_site}/app-banco`);

var todas_areas ;
var contador = 0 ;

ver_areas() ;

function ver_areas() {

    banco.conectar().then(() => {

        
        return banco.sql.query(`select * from area;
         
         `);

    }).then(consulta => {

        todas_areas = consulta.recordset;
        console.log(`Todas as áreas cadastradas: ${JSON.stringify(todas_areas)}`);
        

    }).catch(err => {

        var erro = `Erro ao tentar registrar aquisição na base: ${err}`;
        console.error(erro);

    }).finally( () => {
        banco.sql.close();
    });

}

setInterval(function() {
    calcular_areas()
}, 30000)

function calcular_areas () {
    if (contador < todas_areas.length) {

        banco.conectar().then(() => {

        
            return banco.sql.query(`
                
                EXEC calc_areas 1,4,1,2,3

             `);
            
    
        }).catch(err => {
    
            var erro = `Erro ao tentar registrar aquisição na base: ${err}`;
            console.error(erro);
    
        }).finally( () => {
            banco.sql.close();
        });

        contador++ ;

    } else {

        contador = 0 ;
        ver_areas() ;

    }
} 

/*
EXEC calc_areas ${parseInt(todas_areas[contador].idarea)},
${parseInt(todas_areas[contador].fkdono)},
${parseInt(todas_areas[contador].primeirosensor)},
${parseInt(todas_areas[contador].segundosensor)},
${parseInt(todas_areas[contador].terceirosensor)}   
*/