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

insert into usuario ( nome, email, endereco, telefone, CPF_CNPJ, NomeEmpresa, usuario, senha) values 
( 'José', 'josetn@gmail.com','Área Verde', '1125613317','4824082897', 'Terra Nova','jose_tn','123456' ),
( 'Maria', 'Maria@gmail.com','Horto Florestal', '1125612312','76765435123', 'TurboTel','maria_tt','987654' ),
( 'Irineu', 'irineu@gmail.com','Água Branca', '11987656789','1234082897', 'Green run','irineu_gr','098765' ),
( 'Priscila', 'priscila@gmail.com','Ibirapuera', '11987678658','4824082098', 'Ibi','priscila_ibi','987640' ),
( 'Eduardo', 'eduardo@gmail.com','Piqueri', '11987600658','4824080098', 'Terra Verde','Edu_tv', '067832' );

