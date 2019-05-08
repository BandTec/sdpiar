create database NovoPI;
use NovoPI;

create table usuario(
idusuario int primary key auto_increment not null,
PjPai int,
PF_PJ enum('pf','pj'),
nome varchar(45),
email varchar(50),
endereco varchar(45),
telefone varchar(15),
CPF_CNPJ varchar(11),
NomeEmpresa varchar(45),
usuario varchar(45),
senha varchar(45),
foreign key (PjPai) references usuario(idusuario)
);

create table area(
idarea int,
sensor1 int,
sensor2 int,
sensor3 int,
fkusuario int,
foreign key (fkusuario) references usuario(idusuario),
primary key (idarea,sensor1,sensor2,sensor3)
);

create table tempArea(
temperaturaMedia decimal(5,2),
umidadeMedia decimal(4,2),
DataHora datetime,
fkarea int,
foreign key (fkarea) references area(idarea)
);

create table sensor(
fksensor int,
temperatura decimal(5,2),
umidade decimal(3,1),
dataHora datetime
);

select * from usuario,area, temparea, sensor;

drop database novopi;