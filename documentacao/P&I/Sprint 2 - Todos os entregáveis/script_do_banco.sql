create table usuario(
idusuario int primary key identity,
tipo_pessoa char check (tipo_pessoa IN('PF', 'PJ')),
PjPai int,
nome varchar(50),
cpf_cnpj varchar(50),
email varchar(50),
telefone varchar(15),
endereco varchar(50),
usuario varchar(50),
senha varchar(50),
foreign key (PjPai) references usuario(idusuario)
);

create table sensor(
idsensor int primary key,
temperatura float,
umidade float,
dataHora datetime
);

insert into sensor values (1,30,20,'2019-02-02 10:29:02'),(2,20,50,'2019-02-02 10:29:02'),(3,10,50,'2019-02-02 20:29:02');

create table area(
idarea int,
fkusuario int,
fksensor int,
mediaT float,
mediaU float,
hora time,
foreign key (fkusuario) references usuario(idusuario),
foreign key (fksensor) references sensor(idsensor),
primary key (idarea,fksensor)
);

INSERT INTO AREA VALUES (1,2,3,30,50,'22:02:02'),(2,2,2,30,50,'22:02:02'),(3,2,1,30,50,'22:02:02');

INSERT INTO usuario (usuario, senha, cpf_cnpj, nome, email, telefone, endereco) VALUES ('reggilbert5869', '143.31.120.111', '2001:7bda:c7bc:e69b:b31d:a35d:0e3d:386d', 'regina gilbert', 'Regi.GILBER2824@mailinator.com', '(25) 92776-0591', '7006 Village');

select * from usuario;
truncate table usuario;
drop table usuario;
drop table area;
drop table sensor;
select u.*, a.idarea,s.temperatura, s.datahora from usuario as u, area as a, sensor as s where fksensor = idsensor and fkusuario = idusuario;