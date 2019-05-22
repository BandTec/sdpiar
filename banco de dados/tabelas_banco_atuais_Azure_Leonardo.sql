create table usuario(
idusuario int primary key identity,
PjPai int,
PF_PJ char(2),
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

create table sensor(
idsensor int,
temperatura float,
umidade float,
dataHora TIMESTAMP 
);

insert into usuario ( PF_PJ, nome, email, endereco, telefone, CPF_CNPJ, NomeEmpresa, usuario, senha) values 
( 'PJ', 'José', 'josetn@gmail.com','Área Verde', '1125613317','4824082897', 'Terra Nova','jose_tn','123456' ),
( 'PJ', 'Maria', 'Maria@gmail.com','Horto Florestal', '1125612312','76765435123', 'TurboTel','maria_tt','987654' ),
( 'PJ', 'Irineu', 'irineu@gmail.com','Água Branca', '11987656789','1234082897', 'Green run','irineu_gr','098765' ),
( 'PJ', 'Priscila', 'priscila@gmail.com','Ibirapuera', '11987678658','4824082098', 'Ibi','priscila_ibi','987640' ),
( 'PJ', 'Eduardo', 'eduardo@gmail.com','Piqueri', '11987600658','4824080098', 'Terra Verde','Edu_tv', '067832' );

