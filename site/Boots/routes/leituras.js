// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 3;
    return banco.sql.query(`select top ${limite_linhas} 
                            idsensor as id_sensor, 
                            temperatura, 
                            umidade, 
                            FORMAT(dataHora,'HH:mm:ss') as hora 
                            from sensor order by hora desc`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.get('/estatisticas', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temp_maxima: 0,
    temp_minima: 0,
    temp_media: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select 
          max(temperatura) as temp_maxima, 
          min(temperatura) as temp_minima, 
          avg(temperatura) as temp_media 
        from leitura
        `);
  }).then(consulta => {
    estatisticas.temp_maxima = consulta.recordset[0].temp_maxima;
    estatisticas.temp_minima = consulta.recordset[0].temp_minima;
    estatisticas.temp_media = consulta.recordset[0].temp_media;
    console.log(`Estatísticas: ${estatisticas}`);
    res.send(estatisticas);
  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/pfs', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    return banco.sql.query(`select * 
                            from usuario where tipoPessoa = 'pf' `);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/pjs', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    return banco.sql.query(`select * 
                            from usuario where tipoPessoa = 'pj' `);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/areas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    return banco.sql.query(`select * 
                            from area `);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/area/:area/:s1/:s2/:s3/:dono', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(` EXEC p_last_temp_umid_area
    ${req.params.area},${req.params.s1},${req.params.s2},
    ${req.params.s3},${req.params.dono}
      `);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


router.get('/quartil1T/:dono/:area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`EXEC quartil1T 
    ${req.params.dono}, ${req.params.area}`);

    // return banco.sql.query(`Select ((
    //   Select Top 1 TEMPERATURAMEDIA
    //   From   (
    //       Select    Top 10 Percent TEMPERATURAMEDIA
    //       From	areabruto
    //       Where	TEMPERATURAMEDIA Is NOT NULL and fk_dono = ${req.params.dono} and fk_area = ${req.params.area}
    //       Order By TEMPERATURAMEDIA
    //       ) As A 
    //   Order By TEMPERATURAMEDIA DESC) + 
    //   (
    //   Select Top 1 TEMPERATURAMEDIA
    //   From   (
    //       Select	Top 10 Percent TEMPERATURAMEDIA
    //       From	areabruto
    //       Where	TEMPERATURAMEDIA Is NOT NULL and fk_dono = ${req.params.dono} and fk_area = ${req.params.area}
    //       Order By TEMPERATURAMEDIA DESC
    //       ) As A 
    //   Order By TEMPERATURAMEDIA Asc)) / 3 as quartil1T;`);

  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/quartil1U/:dono/:area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`EXEC quartil1U 
            ${req.params.dono}, ${req.params.area}`);

    // return banco.sql.query(`Select ((
    //   Select Top 1 UMIDADEMEDIA
    //   From   (
    //       Select	Top 50 Percent UMIDADEMEDIA
    //       From	areabruto
    //       Where	UMIDADEMEDIA Is NOT NULL and fk_dono = ${req.params.dono} and fk_area = ${req.params.area}
    //       Order By UMIDADEMEDIA
    //       ) As A
    //   Order By UMIDADEMEDIA DESC) + 
    //   (
    //   Select Top 1 UMIDADEMEDIA
    //   From   (
    //       Select	Top 50 Percent UMIDADEMEDIA
    //       From	areabruto
    //       Where	UMIDADEMEDIA Is NOT NULL and fk_dono = ${req.params.dono} and fk_area = ${req.params.area}
    //       Order By UMIDADEMEDIA DESC
    //       ) As A
    //   Order By UMIDADEMEDIA Asc)) / 2 as quartil1U;`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/quartil3T/:dono/:area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`EXEC quartil3T 
                    ${req.params.dono}, ${req.params.area}`);


    //               return banco.sql.query(`Select ((
    //                 Select Top 1 TEMPERATURAMEDIA
    //                 From   (
    //                   Select	Top 50 Percent TEMPERATURAMEDIA
    //                   From	areabruto
    //                   Where	TEMPERATURAMEDIA Is NOT NULL and fk_dono = ${req.params.dono} and fk_area = ${req.params.area}
    //                   Order By TEMPERATURAMEDIA
    //     ) As A
    // Order By TEMPERATURAMEDIA DESC) + 
    // (
    // Select Top 1 TEMPERATURAMEDIA
    // From   (
    //     Select	Top 50 Percent TEMPERATURAMEDIA
    //     From	areabruto
    //     Where	TEMPERATURAMEDIA Is NOT NULL and fk_dono = ${req.params.dono} and fk_area = ${req.params.area}
    //     Order By TEMPERATURAMEDIA DESC
    //     ) As A
    // Order By TEMPERATURAMEDIA Asc)) / 2 as quartil3T;`);


  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/quartil3U/:dono/:area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`EXEC quartil3U
                                            ${req.params.dono}, ${req.params.area}`);

    // return banco.sql.query(`
    // Select ((
    //   Select Top 1 UMIDADEMEDIA
    //   From   (
    //       Select    Top 15 Percent UMIDADEMEDIA
    //       From	areabruto
    //       Where	UMIDADEMEDIA Is NOT NULL and fk_dono = ${req.params.dono} and fk_area = ${req.params.area}
    //       Order By UMIDADEMEDIA
    //       ) As A 
    //   Order By UMIDADEMEDIA DESC) + 
    //   (
    //   Select Top 1 UMIDADEMEDIA
    //   From   (
    //       Select	Top 15 Percent UMIDADEMEDIA
    //       From	areabruto
    //       Where	UMIDADEMEDIA Is NOT NULL and fk_dono = ${req.params.dono} and fk_area = ${req.params.area}
    //       Order By UMIDADEMEDIA DESC
    //       ) As A 
    //   Order By UMIDADEMEDIA Asc)) / 2 as quartil3U;`);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/mediaT/:dono/:area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select Avg(TEMPERATURAMEDIA) as mediaT From areabruto where fk_dono = ${req.params.dono} and fk_area = ${req.params.area};`);
    // return banco.sql.query(`EXEC mediaT ${req.params.dono},${req.params.area}`);

  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/mediaU/:dono/:area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select Avg(UMIDADEMEDIA) as mediaU From areabruto where fk_dono = ${req.params.dono} and fk_area = ${req.params.area};`);
    // return banco.sql.query(`EXEC mediaU ${req.params.dono},${req.params.area}`);
    
  }).then(consulta => {
    
    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);
    
  }).catch(err => {
    
    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);
    
  }).finally(() => {
    banco.sql.close();
  });
  
});
router.get('/medianaT/:dono/:area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    
    return banco.sql.query(`EXEC medianaT ${req.params.dono},${req.params.area}`);
    
    
    // return banco.sql.query(`
    // select  max(TEMPERATURAMEDIA) as [medianaT], quartil
    // from    (select TEMPERATURAMEDIA, ntile(4) over (order by TEMPERATURAMEDIA) as [quartil]
    //          from   areabruto where fk_dono = ${req.params.dono} and fk_area = ${req.params.area}) i
    // where quartil = 2 
    // group by quartil; `);
    
  }).then(consulta => {
    
    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);
    
  }).catch(err => {
    
    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);
    
  }).finally(() => {
    banco.sql.close();
  });
  
});
router.get('/medianaU/:dono/:area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`EXEC medianaU ${req.params.dono},${req.params.area}`);


    // return banco.sql.query(`select  max(UMIDADEMEDIA) as [medianaU], quartil
    // from    (select UMIDADEMEDIA, ntile(4) over (order by UMIDADEMEDIA) as [quartil]
    //          from   areabruto where fk_dono = ${req.params.dono} and fk_area = ${req.params.area}) i
    // where quartil = 2 
    // group by quartil 
    // `);
  }).then(consulta => {

    console.log(`Resultado da consulta: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});


// Áreas do usuário logado

router.get('/teste/:usuario', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`EXEC user_areas ${req.params.usuario}
    `);

  }).then(consulta => {

    console.log(`Resultado da consulta do teste: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});

// Aquisição Node

router.get('/calc_areas/:area/:dono/:s1/:s2/:s3', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    return banco.sql.query(`insert into areabruto values (
      ${req.params.area}, ${req.params.dono},
      ${req.params.s1}, ${req.params.s2},
      ${req.params.s3},  
      
        ((select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and primeirosensor = idsensor and
        idarea = ${req.params.area} and fkdono = ${req.params.dono} 
        order by sensor.datahora desc ) + 
        (select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and segundosensor = idsensor and
        idarea = ${req.params.area} and fkdono = ${req.params.dono}  
        order by sensor.datahora desc ) +
        (select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and terceirosensor = idsensor and
        idarea = ${req.params.area} and fkdono = ${req.params.dono}  
        order by sensor.datahora desc ) ) / 3,

        ((select top 1 umidade from area,sensor 
        where fkdono = fk_usuario and primeirosensor = idsensor and
        idarea = ${req.params.area} and fkdono = ${req.params.dono} 
        order by sensor.datahora desc ) + 
        (select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and segundosensor = idsensor and
        idarea = ${req.params.area} and fkdono = ${req.params.dono}  
        order by sensor.datahora desc ) +
        (select top 1 temperatura from area,sensor 
        where fkdono = fk_usuario and terceirosensor = idsensor and
        idarea = ${req.params.area} and fkdono = ${req.params.dono}  
        order by sensor.datahora desc ) ) / 3
      
        , current_timestamp ) ;
     `);

  }).then(consulta => {

    console.log(`Resultado da consulta do teste: ${consulta.recordset}`);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});


// não mexa nesta linha!
module.exports = router;
