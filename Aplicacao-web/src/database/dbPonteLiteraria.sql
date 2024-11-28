CREATE DATABASE ponteLiteraria;

USE ponteLiteraria;


CREATE TABLE  Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    senha VARCHAR(80) NOT NULL,
    fotoPerfilUsuario VARCHAR(255) UNIQUE
);



INSERT INTO Usuario(nome, username, email, senha, fotoPerfilUsuario) VALUES
	('Gabriel da Silva Sousa', '@GabSouz__', 'gabriel.sousa@sptech.school', '123', 'myPerfil.jpg'),
    ('Annabeth Chase', '@annaChase', 'annabeth.chase@gmail.com', '123', 'annabeth.jpg'),
    ('Jason Grace', '@JasonZeus', 'jason,grace@gmail.com', '123', 'jason.jpg'),
    ('Percy Jackson', '@percy__', 'percy.jackson@gmail.com', '123', 'percy.webp');


CREATE TABLE Seguidores (
	fkUsuarioSeguido INT,
    fkUsuarioSeguidor INT,
    CONSTRAINT pkSeguidores PRIMARY KEY (fkUsuarioSeguido, fkUsuarioSeguidor),
    CONSTRAINT fkUsuarioSeguido FOREIGN KEY (fkUsuarioSeguido) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkUsuarioSeguidor FOREIGN KEY (fkUsuarioSeguidor) REFERENCES Usuario(idUsuario),
    dataFollow DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Seguidores(fkUsuarioSeguido, fkUsuarioSeguidor) VALUES 
	(3,1),
    (4,1),
    (2,1),
    (4,2),
    (3,2),
    (2,3),
    (4,3),
    (3,4),
    (2,4);




CREATE TABLE categoriaArtigo(
    idCategoriaArtigo INT PRIMARY KEY AUTO_INCREMENT,
    tituloCategoria VARCHAR(45)
);

INSERT INTO categoriaArtigo (tituloCategoria) VALUES
    ('Autobiografia'),
    ('Tecnologia'),
    ('Fantasia'),
    ('Aventura'),
    ('Ficção Científica'),
    ('Romance'),
    ('Mistério'),
    ('História'),
    ('Histórias do Acampamento'),
    ('Drama'),
    ('Terror'),
    ('Suspense'),
    ('Comédia'),
    ('Biografia'),
    ('Autoajuda'),
    ('Poesia'),
    ('Filosofia'),
    ('Ciência'),
    ('Infantil'),
    ('Jovem Adulto'),
    ('Clássicos');
    

 CREATE TABLE Postagem (
	idPostagem INT AUTO_INCREMENT,
    fkusuario INT NOT NULL,
    fkCategoriaArtigo INT,
    CONSTRAINT fkCategoriaPostagem FOREIGN KEY (fkCategoriaArtigo) REFERENCES categoriaArtigo(idCategoriaArtigo),
    CONSTRAINT pkPostagem PRIMARY KEY (idPostagem, fkUsuario),
    CONSTRAINT fkUsuarioPostagem FOREIGN KEY (fkusuario) REFERENCES Usuario(idUsuario),
    tituloPostagem VARCHAR(45) NOT NULL,
    conteudoPostagem VARCHAR(1000) NOT NULL,
    statusPostagem VARCHAR(45),
    CONSTRAINT chk_status CHECK(statusPostagem IN('ativo', 'inativo')),
    dataHoraPostagem DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Postagem ( fkusuario, fkCategoriaArtigo, tituloPostagem, conteudoPostagem, statusPostagem, dataHoraPostagem) VALUES
(1,1,'A minha ligação com Heróis do Olimpo', 'Olá. Eu sou o Gabriel! tenho 20 anos. E a minha primeira saga de livros, a saga que mudou a minha vida. Foi,
 Heróis do Olimpo de Rick Riordan. Em um período onde eu não tinha contato com a leitura, essa saga caiu em minhas mãos por um acaso, e mudou a minha vida,
 eu me apaixonei pelo RiordanVerso, ter esse contato com a leitura, contribuiu muito para a minha evoluao como ser humano, principalmente na vida acadêmica.
 Pois ler me trouxe uma maior facilidade para escrita, me ajudou na interpretaçao de texto e melhorou a minha forma de falar. E tudo isso por conta de um livro de aventura e fantasia. Para vocês verem,
 o começo da leitura tem que ser por algo que você se apaixona, que você mergulha no universo.', 'ativo', DEFAULT),
( 2, 9, 'A Sabedoria e a Estratégia', 
'Olá, sou Annabeth Chase, filha de Atena. Sempre me perguntam como é ser a filha da deusa da sabedoria e da estratégia. É uma honra, mas também um desafio. Cada dia é uma oportunidade de aprender algo novo e de ajudar os outros com planos e soluções. Mas não é só sobre lógica e táticas, é sobre cuidar das pessoas que amo, como Percy e nossos amigos do Acampamento Meio-Sangue. A missão nunca é fácil, mas sempre há algo pelo que lutar.', 
'ativo', DEFAULT),
( 3, 9, 'Liderança Entre os Céus', 
'Eu sou Jason Grace, filho de Júpiter. Muitos pensam que liderança significa apenas dar ordens, mas não é bem assim. Ser líder é proteger os outros, mesmo quando isso significa sacrificar algo. No Acampamento Júpiter, aprendi que coragem e responsabilidade caminham juntas. Agora, como parte dessa grande missão, percebo que a força vem da união e da confiança nos meus amigos. O céu pode ser vasto e assustador, mas com eles, nunca estou sozinho.', 
'ativo', DEFAULT),
( 4, 9, 'A Maré Nunca Para', 
'Meu nome é Percy Jackson, filho de Poseidon. Minha vida tem sido uma aventura constante, entre monstros, missões e… matemática (essa última é um monstro também). O que aprendi é que, como o oceano, a vida sempre se move. Às vezes, é tranquilo, outras vezes, vem um tsunami. Mas nunca enfrento isso sozinho. Minha força vem dos meus amigos, da minha família e do que me conecta ao mar. Nunca subestime o poder de se levantar após uma tempestade.', 
'ativo', DEFAULT);


CREATE TABLE Curtida (
	FkUsuarioCurtiu INT,
    fkPostagemCurtida INT,
    CONSTRAINT pkCurtida PRIMARY KEY (fkUsuarioCurtiu, fkPostagemCurtida),
    CONSTRAINT  fkUsuarioCurtida FOREIGN KEY (fkUsuarioCurtiu) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkPostagemCurtida FOREIGN KEY (fkPostagemCurtida) REFERENCES Postagem (idPostagem),
    dataHoraCurtida DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Curtida (fkUsuarioCurtiu, fkPostagemCurtida) VALUES
	(1,1),
    (3,1),
    (4,1),
    (1,2),
    (2,2),
    (4,2),
    (1,3),
    (3,3),
    (2,3);



CREATE TABLE Comentario (
	idComentario INT AUTO_INCREMENT,
    fkPostagemComentada INT,
    fkUsuarioComentario INT,
    CONSTRAINT pkComentario PRIMARY KEY (idComentario,fkPostagemComentada, fkUsuarioComentario),
    ConteudoComentario VARCHAR (100),
    tipoComentario VARCHAR(10),
    statusComentario VARCHAR(45),
    fkComentarioRespondido INT,
    comentarioEditado BOOLEAN,
    dataHoraComentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkComentarioResposta FOREIGN KEY (fkComentarioRespondido) REFERENCES Comentario(idComentario),
    CONSTRAINT chk_tipoComentario CHECK (tipoComentario IN('Geral', 'Resposta')),
    CONSTRAINT chk_statusComentario CHECK (statusComentario IN('ativo', 'inativo')),
    CONSTRAINT fkPostagemComentada FOREIGN KEY (fkPostagemComentada) REFERENCES Postagem (idPostagem),
    CONSTRAINT fkUsuarioComentario FOREIGN KEY (fkUsuarioComentario) REFERENCES Usuario(idUsuario)
);

INSERT INTO Comentario (fkPostagemComentada, fkUsuarioComentario, ConteudoComentario, tipoComentario, statusComentario, fkComentarioRespondido, comentarioEditado, dataHoraComentario) VALUES
(2, 2, 'Ótima reflexão sobre liderança, Jason. Concordo plenamente que a união faz a força!', 'Geral', 'ativo', NULL, FALSE, DEFAULT),
(3, 3, 'Percy, adorei sua comparação entre o oceano e a vida. Inspira muito!', 'Geral', 'ativo', NULL, FALSE, DEFAULT),
(1, 4, 'Annabeth, sua sabedoria e táticas sempre me impressionam. Grande inspiração!', 'Geral', 'ativo', NULL, FALSE, DEFAULT),
(3, 2, 'Percy, você sempre tem uma visão única das coisas. Grande exemplo de resiliência!', 'Geral', 'ativo', NULL, FALSE, DEFAULT),
(1, 3, 'Annabeth, sua maneira de lidar com os desafios é incrível. Admiro sua coragem!', 'Geral', 'ativo', NULL, FALSE, DEFAULT),
(2, 2, 'Jason, suas palavras sobre liderança são poderosas. Continuo aprendendo muito com você.', 'Geral', 'ativo', NULL, FALSE, DEFAULT);



SELECT * FROM Usuario;
SELECT * FROM Postagem;
SELECT * FROM categoriaArtigo;
SELECT seguido.nome AS 'Quem foi seguido', seguidor.nome AS 'Quem Seguiu' FROM Seguidores
JOIN Usuario AS seguido ON fkUsuarioSeguido = seguido.idUsuario
JOIN Usuario AS seguidor ON fkUsuarioSeguidor = seguidor.idUsuario;


        

