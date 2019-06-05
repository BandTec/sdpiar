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
    return banco.sql.query(` select top 15 ia.temperaturamedia as mt, umidademedia as mu,
    FORMAT(ia.datahora,'HH:mm:ss') as hora from areabruto as ia 
    where fk_area = ${req.params.area} and fk_primeirosensor = ${req.params.s1} and
    fk_segundosensor = ${req.params.s2} and fk_terceirosensor = ${req.params.s3} 
    and fk_dono = ${req.params.dono} ; 
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


router.get('/quartil1T', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select ((
      Select Top 1 TEMPERATURAMEDIA
      From   (
          Select    Top 15 Percent TEMPERATURAMEDIA
          From	areabruto
          Where	TEMPERATURAMEDIA Is NOT NULL
          Order By TEMPERATURAMEDIA
          ) As A 
      Order By TEMPERATURAMEDIA DESC) + 
      (
      Select Top 1 TEMPERATURAMEDIA
      From   (
          Select	Top 15 Percent TEMPERATURAMEDIA
          From	areabruto
          Where	TEMPERATURAMEDIA Is NOT NULL
          Order By TEMPERATURAMEDIA DESC
          ) As A 
      Order By TEMPERATURAMEDIA Asc)) / 2;`);

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

router.get('/quartil1U', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select ((
      Select Top 1 UMIDADEMEDIA
      From   (
          Select    Top 15 Percent UMIDADEMEDIA
          From	areabruto
          Where	UMIDADEMEDIA Is NOT NULL
          Order By UMIDADEMEDIA
          ) As A 
      Order By UMIDADEMEDIA DESC) + 
      (
      Select Top 1 UMIDADEMEDIA
      From   (
          Select	Top 15 Percent UMIDADEMEDIA
          From	areabruto
          Where	UMIDADEMEDIA Is NOT NULL
          Order By UMIDADEMEDIA DESC
          ) As A 
      Order By UMIDADEMEDIA Asc)) / 2;
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

router.get('/quartil3T', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select ((
      Select Top 1 TEMPERATURAMEDIA
      From   (
          Select	Top 50 Percent TEMPERATURAMEDIA
          From	areabruto
          Where	TEMPERATURAMEDIA Is NOT NULL
          Order By TEMPERATURAMEDIA
          ) As A
      Order By TEMPERATURAMEDIA DESC) + 
      (
      Select Top 1 TEMPERATURAMEDIA
      From   (
          Select	Top 50 Percent TEMPERATURAMEDIA
          From	areabruto
          Where	TEMPERATURAMEDIA Is NOT NULL 
          Order By TEMPERATURAMEDIA DESC
          ) As A
      Order By TEMPERATURAMEDIA Asc)) / 2;
  
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

router.get('/quartil3U', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select ((
      Select Top 1 UMIDADEMEDIA
      From   (
          Select	Top 50 Percent UMIDADEMEDIA
          From	areabruto
          Where	UMIDADEMEDIA Is NOT NULL 
          Order By UMIDADEMEDIA
          ) As A
      Order By UMIDADEMEDIA DESC) + 
      (
      Select Top 1 UMIDADEMEDIA
      From   (
          Select	Top 50 Percent UMIDADEMEDIA
          From	areabruto
          Where	UMIDADEMEDIA Is NOT NULL
          Order By UMIDADEMEDIA DESC
          ) As A
      Order By UMIDADEMEDIA Asc)) / 2;
  
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

router.get('/mediaT', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select Avg(TEMPERATURAMEDIA) From   areabruto;
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

router.get('/mediaU', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select Avg(UMIDADEMEDIA) From   areabruto;
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


// Teste

router.get('/teste/:usuario', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select a.idarea,a.primeirosensor,a.segundosensor,a.terceirosensor
    from usuario, area as a where idusuario = a.fkdono 
    and idusuario = '${req.params.usuario}'`);
    
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

router.get('/teste2/:area/:dono/:s1/:s2/:s3', function (req, res, next) {
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
