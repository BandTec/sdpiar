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

router.get('/area', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    var limite_linhas = 15;
    var escolhido = 4;
    return banco.sql.query(`select top ${limite_linhas} 
          temperatura, 
          umidade, 
          FORMAT(s.dataHora,'HH:mm:ss') as hora from sensor as s, area as a where fk_usuario = ${escolhido}`);
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
      Select Top 1 temperatura
      From   (
          Select	Top 75 Percent temperatura
          From	sensor
          Where	temperatura Is NOT NULL
          Order By temperatura
          ) As A
      Order By temperatura DESC) + 
      (
      Select Top 1 temperatura
      From   (
          Select	Top 75 Percent temperatura
          From	sensor
          Where	temperatura Is NOT NULL
          Order By temperatura DESC
          ) As A
      Order By temperatura Asc)) / 3;
  
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

router.get('/quartil1U', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select ((
      Select Top 1 umidade
      From   (
          Select	Top 75 Percent umidade
          From	sensor
          Where	umidade Is NOT NULL
          Order By umidade
          ) As A
      Order By umidade DESC) + 
      (
      Select Top 1 umidade
      From   (
          Select	Top 75 Percent umidade
          From	sensor
          Where	umidade Is NOT NULL
          Order By umidade DESC
          ) As A
      Order By umidade Asc)) / 3;
  
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
      Select Top 1 temperatura
      From   (
          Select	Top 25 Percent temperatura
          From	sensor
          Where	temperatura Is NOT NULL
          Order By temperatura
          ) As A
      Order By temperatura DESC) + 
      (
      Select Top 1 temperatura
      From   (
          Select	Top 25 Percent temperatura
          From	sensor
          Where	temperatura Is NOT NULL
          Order By temperatura DESC
          ) As A
      Order By temperatura Asc)) / 2;
  
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
      Select Top 1 umidade
      From   (
          Select	Top 25 Percent umidade
          From	sensor
          Where	umidade Is NOT NULL
          Order By umidade
          ) As A
      Order By umidade DESC) + 
      (
      Select Top 1 umidade
      From   (
          Select	Top 25 Percent umidade
          From	sensor
          Where	umidade Is NOT NULL
          Order By umidade DESC
          ) As A
      Order By umidade Asc)) / 2;
  
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
    return banco.sql.query(`Select Avg(temperatura) From   sensor;
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
    return banco.sql.query(`Select Avg(umidade) From   sensor;
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

router.get('/medianaT', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select ((
      Select Top 1 temperatura
      From   (
          Select	Top 50 Percent temperatura
          From	sensor
          Where	temperatura Is NOT NULL
          Order By temperatura
          ) As A
      Order By temperatura DESC) + 
      (
      Select Top 1 temperatura
      From   (
          Select	Top 50 Percent temperatura
          From	sensor
          Where	temperatura Is NOT NULL
          Order By temperatura DESC
          ) As A
      Order By temperatura Asc)) / 2`);
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

router.get('/medianaU', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select ((
      Select Top 1 umidade
      From   (
          Select	Top 50 Percent umidade
          From	sensor
          Where	umidade Is NOT NULL
          Order By umidade
          ) As A
      Order By umidade DESC) + 
      (
      Select Top 1 umidade
      From   (
          Select	Top 50 Percent umidade
          From	sensor
          Where	umidade Is NOT NULL
          Order By umidade DESC
          ) As A
      Order By umidade Asc)) / 2`);
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


router.get('/teste/:usuario', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
    // var limite_linhas = 15;
    return banco.sql.query(`Select u.idusuario, a.* from usuario as u, area as a where idusuario = fkdono 
    and idusuario = ${req.params.usuario}`);
    
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
