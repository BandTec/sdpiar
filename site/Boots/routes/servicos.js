// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

var todas_areas ;
var contador = 0 ;

// Ative esta linha para calcular as medias das areas
//ver_areas();

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
        calcular_areas();
    });

}

function calcular_areas () {

        if (contador < todas_areas.length) {
    
            banco.conectar().then(() => {
                
                console.log(`${contador},${todas_areas.length}`)

                return banco.sql.query(`
    
                EXEC calc_areas ${parseInt(todas_areas[contador].idarea)},
                    ${parseInt(todas_areas[contador].fkdono)},
                    ${parseInt(todas_areas[contador].primeiroSensor)},
                    ${parseInt(todas_areas[contador].segundoSensor)},
                    ${parseInt(todas_areas[contador].terceiroSensor)} 
    
                 `);
                
        
            }).catch(err => {
        
                var erro = `Erro ao tentar registrar aquisição na base: ${err}`;
                console.error(erro);
        
            }).finally( () => {
                banco.sql.close();
                contador++
            });
    
            
            setTimeout(calcular_areas, 2000) ;
    
        } else {
    
            contador = 0 ;
            ver_areas() ;
    
        }
}

module.exports = router;