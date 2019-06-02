create table usuario(
idusuario int primary key IDENTITY(1,1),
empresaPai int,
tipoPessoa varchar(2),
nome varchar(45),
email varchar(50),
endereco varchar(50),
cep varchar(9),
telefone varchar(15),
CPF_CNPJ varchar(18) unique,
NomeEmpresa varchar(50),
usuario varchar(45) unique,
senha varchar(45),
check(tipoPessoa in ('pf','pj')),
foreign key (empresaPai) references usuario(idusuario)
);

create table area(
idarea int primary key,
primeiroSensor int unique,
segundoSensor int unique,
terceiroSensor int unique,
fkdono int,
foreign key (fkdono) references usuario(idusuario),
);

create table tempArea(
temperaturaMedia decimal(5,2),
umidadeMedia decimal(4,2),
DataHora timestamp,
fkarea int,
foreign key (fkarea) references area(idarea)
);

create table sensor(
idsensor int,
temperatura float,
umidade float,
dataHora TIMESTAMP 
);

insert into usuario(tipopessoa,nome,usuario,senha) values ('pj','wilma','wilma','grupo10');
