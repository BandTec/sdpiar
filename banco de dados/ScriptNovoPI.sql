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
DataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
fkarea int,
foreign key (fkarea) references area(idarea)
);

create table sensor(
fksensor int,
temperatura decimal(5,2),
umidade decimal(3,1),
dataHora  TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

select * from usuario,area, temparea, sensor;

select * from sensor;

-- Inserindo dados na tabela usuário
insert into usuario (idusuario, PF_PJ, nome, email, endereco, telefone, CPF_CNPJ, NomeEmpresa, usuario, senha) values 
(null, 'PJ', 'José', 'josetn@gmail.com','Área Verde', '1125613317','4824082897', 'Terra Nova','jose_tn','123456' ),
(null, 'PJ', 'Maria', 'Maria@gmail.com','Horto Florestal', '1125612312','76765435123', 'TurboTel','maria_tt','987654' ),
(null, 'PJ', 'Irineu', 'irineu@gmail.com','Água Branca', '11987656789','1234082897', 'Green run','irineu_gr','098765' ),
(null, 'PJ', 'Priscila', 'priscila@gmail.com','Ibirapuera', '11987678658','4824082098', 'Ibi','priscila_ibi','987640' ),
(null, 'PJ', 'Eduardo', 'eduardo@gmail.com','Piqueri', '11987600658','4824080098', 'Terra Verde','Edu_tv', '067832' );

-- Inserindo dados na tabela sensor
insert into sensor (fksensor,temperatura,umidade) values
(01,'25','60'),
(02,'25','65'),
(03,'24','67'),
(01,'22','50'),
(02,'29','45'),
(03,'24','60'),
(01,'21','70'),
(02,'23','55'),
(03,'19','70'),
(01,'22','60'),
(02,'23','65'),
(03,'21','70');

insert into area values 
(1000,1,2,3,1),
(1001,2,3,1,2),
(1003,3,2,1,3),
(1004,2,3,1,4),
(1005,3,1,2,5);
insert into area values 
(1001,3,2,1,2);
insert into area values 
(1002,2,3,1,1),
(1003,1,2,3,3),
(1004,3,2,1,4),
(1005,1,2,3,5),
(1002,1,2,3,1);

select * from sensor;
select * from area;
select avg(temperatura)from sensor ;
select avg(umidade) from sensor;
 
 -- Inserindo dados na tabela TempArea
insert into tempArea(fkarea) values (1000);
update tempArea set umidademedia = ( select avg(umidade) from sensor ) where fkarea = 1000;
update tempArea set temperaturamedia = ( select avg(temperatura) from sensor) where fkarea = 1000;
update tempArea set fkarea = 100 where fkarea = 100;
insert into tempArea(fkarea) values (1001);
update tempArea set umidademedia = ( select avg(umidade) from sensor) where fkarea = 1001;
update tempArea set temperaturamedia = ( select avg(temperatura) from sensor) where fkarea = 1001;
update tempArea set fkarea = 101 where fkarea = 101;
insert into tempArea(fkarea) values (1002);
update tempArea set umidademedia = ( select avg(umidade) from sensor) where fkarea = 1002;
update tempArea set temperaturamedia = ( select avg(temperatura) from sensor) where fkarea = 1002;
update tempArea set fkarea = 102 where fkarea = 102;
insert into tempArea(fkarea) values (1003);
update tempArea set umidademedia = ( select avg(umidade) from sensor) where fkarea = 1003;
update tempArea set temperaturamedia = ( select avg(temperatura) from sensor) where fkarea = 1003;
update tempArea set fkarea = 103 where fkarea = 103;
insert into tempArea(fkarea) values (1004);
update tempArea set umidademedia = ( select avg(umidade) from sensor) where fkarea = 1004;
update tempArea set temperaturamedia = ( select avg(temperatura) from sensor) where fkarea = 1004;
update tempArea set fkarea = 104 where fkarea = 104;
insert into tempArea(fkarea) values (1005);
update tempArea set umidademedia = ( select avg(umidade) from sensor) where fkarea = 1005;
update tempArea set temperaturamedia = ( select avg(temperatura) from sensor) where fkarea = 1005;
update tempArea set fkarea = 105 where fkarea = 105;


select * from temparea;



