create table empresa(
	id SERIAL NOT NULL,
	razaoSocial varchar(64) NOT NULL,
	cnpj varchar(32) NOT NULL UNIQUE,
	logradouro varchar(64),
	municipio varchar(64),
	numero varchar(10),
	complemento varchar(64),
	bairro varchar(64),
	cep varchar(16),
	telefone varchar(32),
	email varchar(254) NOT NULL,
	site varchar(254),
	usuario varchar(20) NOT NULL UNIQUE,
	senha varchar(128),
	createdAt timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updateAt timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL

);
alter table empresa add constraint empresa_pk primary key (id);


create table leilao(
	id SERIAL NOT NULL,
	codigo integer,
	descricao varchar(60) NOT NULL,
	vendedor integer NOT NULL,
	inicioPrevisto timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	createdAt timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updateAt timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
alter table leilao add constraint leilao_pk primary key (id);

create table lote(
	id SERIAL NOT NULL,
	numeroLote integer,
	descricao varchar(60) NOT NULL,
	quantidade numeric NOT NULL,
	valorInicial numeric,
	unidade varchar(128) NOT NULL,
	leilao integer NOT NULL,
	createdAt timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updateAt timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
alter table lote add constraint lote_pk primary key (id);
alter table lote add foreign key (leilao) references leilao(id);

create table comprador(
	empresa integer,
	leilao integer
);
alter table comprador add foreign key (empresa) references empresa(id);
alter table comprador add foreign key (leilao) references leilao(id);
alter table comprador add constraint comprador_pk primary key (empresa, leilao);

create table unidade(
	id SERIAL,
	nome varchar(128) NOT NULL,
	createdAt timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updateAt timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
alter table unidade add constraint unidade_pk primary key (id);

--INSERTS
--INSERTS NA TABELA UNIDADE
insert into unidade (nome) values ('Unidade Um');
insert into unidade (nome) values ('Unidade Dois');
insert into unidade (nome) values ('Unidade Trẽs');
insert into unidade (nome) values ('Unidade Quatro');
insert into unidade (nome) values ('Unidade Cinco');
insert into unidade (nome) values ('Unidade Seis');
insert into unidade (nome) values ('Unidade Sete');
insert into unidade (nome) values ('Unidade Oito');
insert into unidade (nome) values ('Unidade Nove');
insert into unidade (nome) values ('Unidade Dez');

--INSERTS NA TABELA EMPRESA
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('AEROVERDE AVIAÇÃO AGRÍCOLA LTDA','07405725000109','RODOVIA BR 101, KM 176, S/Nº','ARACRUZ - ES','0','','JACUPEMBA','29.196.990','3575-1113','aeroverde.ltda@hotmail.com','','aeroverde','aero123');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Dois','1233123213123','Rua Palmeiras','Coxim - MS','155','Apt. 2','Centro','9879789-000','3323-1211','dois@hotmail.com','www.dois.com.br','empresadois','empresa2');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Três','2215654564564','Travessa dos Silvas','São Paulo - SP','1212','Apt. 22','Lapa','3213213-213','99995555','tres@gmail.com','www.empresasp.com.br','empresatres','empresa3');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Quatro','1897616875642','Rua Siriema','Rio de Janeiro - RJ','45','','Leblon','213132132','88889999','contatotres@hotmail.com','www.empresarj.com.br','empresaquatro','12345');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Cinco','01234567891011','Rua Aparicio','Teresina - PI','22','','Centro','2123221564','39984568','contato@cinco.com.br','www.empresate.com.br','empresacinco','12345');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Seis','11109876543210','Rua Munhoz do Tereré','Rio Branco - AC','999','','Bela Vista','997879897','99873564','sac@seis.com.br','www.acreleilao.com.br','empresaseis','acre123');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Sete','11254987423698','Av 2a','Rio Claro - SP','2','Bloco 3 Apt. 222','Centro','1231464','999966422','empresasac@gmail.com','www.rcempresas.com.br','empresasete','12345');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Oito','55544499988812','Rodovia BR163','Coxim - MS','787','','Piracema','45645654','32914545','sac@oito.com.br','www.oitoll.com.br','empresaoito','02123');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Nove','99988865511132','Rua Turiassú','São Paulo - SP','1111','','Palestra Italia','5564654','81811914','leiloessac@nove.com.br','www.empresadeleiloessp.com','empresanove','a1231');
insert into empresa (razaoSocial, cnpj, logradouro, municipio, numero, complemento, bairro, cep, telefone, email, site, usuario, senha)
	values ('Empresa Dez','11122223333452','Avenida dos Velocistas','Bauru - SP','11223','Edificio Run','Centro','999889879','99663636','contato@gmail.com','www.flashgood.com','empresadez','a1231');

--INSERTS NA TABELA LEILAO
insert into leilao (codigo, descricao, vendedor) values ('1','Artigos de 1678','1');
insert into leilao (codigo, descricao, vendedor) values ('2','Artigos de 1950','1');
insert into leilao (codigo, descricao, vendedor) values ('3','Bens pessoais do falecido','2');
insert into leilao (codigo, descricao, vendedor) values ('4','Carros de luxo','10');
insert into leilao (codigo, descricao, vendedor) values ('5','Artigos apreendidos','4');
insert into leilao (codigo, descricao, vendedor) values ('6','Objetos pessoais','2');
insert into leilao (codigo, descricao, vendedor) values ('7','Artigos de 1333','3');
insert into leilao (codigo, descricao, vendedor) values ('8','Imoveis','7');
insert into leilao (codigo, descricao, vendedor) values ('9','Moveis Coloniais','9');
insert into leilao (codigo, descricao, vendedor) values ('10','Artes','2');

--INSERTS NA TABELA LOTE
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('1', 'Quadro Brasil', 1.0, 1500.00, 'Unidade Um', '1');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('2', 'Lote 32 - Liquido Inflamavel', 3.5, 35.00, 'Unidade Dois', '5');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('3', 'Lote 2123 - Chocolates', 10.0, 5.00, 'Unidade Tres', '2');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('4', 'Lote 1 - Pincel', 2.0, 13.00, 'Unidade Quatro', '3');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('5', 'Lote 098 - Sofa', 3.0, 750.00, 'Unidade Cinco', '1');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('6', 'Lote 992', 1.0, 1500.00, 'Unidade Seis', '6');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('7', 'Lote 54', 1.0, 1500.00, 'Unidade Sete', '7');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('8', 'Lote 332', 550.0, 100.00, 'Unidade Oito', '9');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('9', 'Lote 12', 33.0, 1500.00, 'Unidade Nove', '10');
insert into lote (numeroLote, descricao, quantidade, valorInicial, unidade, leilao) values ('10', 'Lote 453', 350.0, 1500.00, 'Unidade Dez', '4');

--INSERTS COMPRADOR
insert into comprador (empresa, leilao) values ('1','1');
insert into comprador (empresa, leilao) values ('2','3');
insert into comprador (empresa, leilao) values ('3','2');
insert into comprador (empresa, leilao) values ('4','5');
insert into comprador (empresa, leilao) values ('5','4');
insert into comprador (empresa, leilao) values ('6','6');
insert into comprador (empresa, leilao) values ('7','9');
insert into comprador (empresa, leilao) values ('8','8');
insert into comprador (empresa, leilao) values ('9','10');
insert into comprador (empresa, leilao) values ('10','7');
