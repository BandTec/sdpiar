// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/entrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    }
    return banco.sql.query(`select * from usuario where usuario='${login}' and senha='${senha}'`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length==1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.post('/cadastrarpf', function (req, res, next) {

  var nome;
  var login;
  var senha;
  var email;
  var telefone;
  var cpf;
  var cep;
  var endereco;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
	  nome = req.body.nomepf; // depois de .body, use o nome (name) do campo em seu formulário de login
    login = req.body.usuariopf; // depois de .body, use o nome (name) do campo em seu formulário de login
    senha = req.body.senhapf; // depois de .body, use o nome (name) do campo em seu formulário de login
    email = req.body.emailpf; 
    telefone = req.body.telefonepf; 
    cpf = req.body.cpf; 
    endereco = req.body.enderecopf;
    cep = req.body.ceppf;
    if (login == undefined || senha == undefined || nome == undefined) {
	  // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados de cadastro não chegaram completos: ${login} / ${senha} / ${nome}`);
    }
    return banco.sql.query(`select count(*) as contagem from usuario where usuario = '${login}'`);
  }).then(consulta => {

	if (consulta.recordset[0].contagem >= 1) {
		res.status(400).send(`Já existe usuário com o login "${login}"`);
		return;
    } else {
		console.log('válido!');
		cadastro_valido = true;
	}

  }).catch(err => {

    var erro = `Erro no cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
	  if (cadastro_valido) {		  
			  
		banco.sql.query(`insert into usuario (nome,usuario,senha,tipoPessoa,email,endereco,telefone,cpf_cnpj,cep) values ('${nome}','${login}','${senha}','pf','${email}','${endereco}','${telefone}','${cpf}','${cep}')`).then(function() {
			console.log(`Cadastro criado com sucesso!`);
			res.sendStatus(201); 
			// status 201 significa que algo foi criado no back-end, 
				// no caso, um registro de usuário ;)		
		}).catch(err => {

			var erro = `Erro no cadastro: ${err}`;
			console.error(erro);
			res.status(500).send(erro);

		}).finally(() => {
			banco.sql.close();
		});
	  }
  });
  

});

router.post('/cadastrarpj', function (req, res, next) {

  var empresa;
  var nome;
  var login;
  var senha;
  var email;
  var telefone;
  var cnpj;
  var cep;
  var endereco;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
	  nome = req.body.nomepj; // depois de .body, use o nome (name) do campo em seu formulário de login
    login = req.body.usuariopj; // depois de .body, use o nome (name) do campo em seu formulário de login
    senha = req.body.senhapj; // depois de .body, use o nome (name) do campo em seu formulário de login
    email = req.body.emailpj; 
    telefone = req.body.telefonepj; 
    cnpj = req.body.cnpj; 
    endereco = req.body.enderecopj;
    cep = req.body.ceppj;
    empresa = req.body.empresa;
    if (login == undefined || senha == undefined || nome == undefined) {
	  // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados de cadastro não chegaram completos: ${login} / ${senha} / ${nome}`);
    }
    return banco.sql.query(`select count(*) as contagem from usuario where usuario = '${login}'`);
  }).then(consulta => {

	if (consulta.recordset[0].contagem >= 1) {
		res.status(400).send(`Já existe usuário com o login "${login}"`);
		return;
    } else {
		console.log('válido!');
		cadastro_valido = true;
	}

  }).catch(err => {

    var erro = `Erro no cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
	  if (cadastro_valido) {		  
			  
		banco.sql.query(`insert into usuario (nome,usuario,senha,tipoPessoa,email,endereco,telefone,cpf_cnpj,cep,nomeempresa) values ('${nome}','${login}','${senha}','pj','${email}','${endereco}','${telefone}','${cnpj}','${cep}','${empresa}')`).then(function() {
			console.log(`Cadastro criado com sucesso!`);
			res.sendStatus(201); 
			// status 201 significa que algo foi criado no back-end, 
				// no caso, um registro de usuário ;)		
		}).catch(err => {

			var erro = `Erro no cadastro: ${err}`;
			console.error(erro);
			res.status(500).send(erro);

		}).finally(() => {
			banco.sql.close();
		});
	  }
  });
  

});

router.post('/careas', function (req, res, next) {

    var area ;
    var sensor1 ;
    var sensor2 ;
    var sensor3 ;
    var usuario ;
    var cadastro_valido = false;

    banco.conectar().then(() => {
      console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
      area = req.body.a // depois de .body, use o nome (name) do campo em seu formulário de login
      usuario = req.body.u; 
      sensor1 = req.body.s1; 
      sensor2 = req.body.s2;
      sensor3 = req.body.s3;
      if (sensor1 < 0 || sensor3 < 0 || sensor2 < 0) {
      // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
        throw new Error(`Dados de cadastro não chegaram completos: ${sensor1} / ${sensor1} / ${sensor1}`);
      }
      return banco.sql.query(`select count(*) as contagem from usuario where usuario = '${usuario}'`);
    }).then(consulta => {
  
    if (consulta.recordset[0].contagem >= 1) {
      res.status(400).send(`Já existe usuário com o login "${usuario}"`);
      return;
      } else {
      console.log('válido!');
      cadastro_valido = true;
    }

    }).catch(err => {

      var erro = `Erro no cadastro: ${err}`;
      console.error(erro);
      res.status(500).send(erro);

    }).finally(() => {
      if (cadastro_valido) {		  
          
      banco.sql.query(`insert into area (idarea,primeirosensor,segundosensor,terceirosensor,fkdono) 
                      values ('${area}','${sensor1}','${sensor2}','${sensor3}','${usuario}')`).then(function() {
        console.log(`Cadastro criado com sucesso!`);
        res.sendStatus(201); 
        // status 201 significa que algo foi criado no back-end, 
          // no caso, um registro de usuário ;)		
      }).catch(err => {

        var erro = `Erro no cadastro: ${err}`;
        console.error(erro);
        res.status(500).send(erro);

      }).finally(() => {
        banco.sql.close();
      });
      }
    });
  
});

// router.post('/testando', function (req, res, next) {

//   var area ;
//   var dono ;
//   var sensor ;
//   var cadastro_valido = false;

//   banco.conectar().then(() => {
//     console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
//     // depois de .body, use o nome (name) do campo em seu formulário de login
    
//     area = req.body.ida; 
//     dono = req.body.donofk;
//     sensor = req.body.sens1;
//     if (sensor < 0) {
//     // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
//       throw new Error(`Dados de cadastro não chegaram completos: ${area} / ${dono} / ${sensor}`);
//     }
//     return banco.sql.query(`select count(*) as contagem from usuario where usuario = '${dono}'`);
//   }).then(consulta => {

//   if (consulta.recordset[0].contagem >= 1) {
//     res.status(400).send(`Já existe usuário com o login "${dono}"`);
//     return;
//     } else {
//     console.log('válido!');
//     cadastro_valido = true;
//   }

//   }).catch(err => {

//     var erro = `Erro no cadastro: ${err}`;
//     console.error(erro);
//     res.status(500).send(erro);

//   }).finally(() => {
//     if (cadastro_valido) {		  
        
//     banco.sql.query(`insert into area (idarea,primeirosensor,fkdono) 
//                     values ('${area}','${sensor}','${dono}')`).then(function() {
//       console.log(`Cadastro criado com sucesso!`);
//       res.sendStatus(201); 
//       // status 201 significa que algo foi criado no back-end, 
//         // no caso, um registro de usuário ;)		
//     }).catch(err => {

//       var erro = `Erro no cadastro: ${err}`;
//       console.error(erro);
//       res.status(500).send(erro);

//     }).finally(() => {
//       banco.sql.close();
//     });
//     }
//   });

// });

// não mexa nesta linha!
module.exports = router;