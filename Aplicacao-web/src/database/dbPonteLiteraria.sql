CREATE DATABASE ponteLiteraria;

USE ponteLiteraria;

SET lc_time_names = 'pt_BR';
	

CREATE TABLE  Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    senha VARCHAR(80) NOT NULL,
    fotoPerfilUsuario VARCHAR(255) UNIQUE
);

INSERT INTO Usuario (nome, username, email, senha, fotoPerfilUsuario) VALUES
('João Silva', 'joao_silva', 'joao.silva@email.com', 'senha123', NULL),
('Maria Oliveira', 'maria_oliveira', 'maria.oliveira@email.com', 'senha456', NULL),
('Carlos Souza', 'carlos_souza', 'carlos.souza@email.com', 'senha789', NULL),
('Ana Costa', 'ana_costa', 'ana.costa@email.com', 'senha101', NULL),
('Lucas Pereira', 'lucas_pereira', 'lucas.pereira@email.com', 'senha112', NULL),
('Beatriz Santos', 'beatriz_santos', 'beatriz.santos@email.com', 'senha131', NULL);




CREATE TABLE Seguidores (
	fkUsuarioSeguido INT,
    fkUsuarioSeguidor INT,
    CONSTRAINT pkSeguidores PRIMARY KEY (fkUsuarioSeguido, fkUsuarioSeguidor),
    CONSTRAINT fkUsuarioSeguido FOREIGN KEY (fkUsuarioSeguido) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkUsuarioSeguidor FOREIGN KEY (fkUsuarioSeguidor) REFERENCES Usuario(idUsuario),
    dataFollow DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Seguidores (fkUsuarioSeguido, fkUsuarioSeguidor, dataFollow) VALUES
(5, 9, '2024-11-01 10:00:00'),
(5, 10, '2024-11-05 11:15:00'),
(5, 11, '2024-11-10 12:30:00'),
(5, 12, '2024-11-15 13:45:00');

INSERT INTO Seguidores (fkUsuarioSeguido, fkUsuarioSeguidor, dataFollow) VALUES
(5, 14, '2024-11-01 10:00:00');

UPDATE Seguidores SET dataFollow = '2024-1-06 10:00:00' WHERE fkUsuarioSeguidor = 8;

SELECT * FROM Seguidores;

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



INSERT INTO Postagem (fkusuario, tituloPostagem, conteudoPostagem) 
VALUES 
	(6, 'Meu Segundo Post', 'Este é o conteúdo da minha segundo postagem.'),
    (6, 'Meu Terceiro Post', 'Este é o conteúdo da minha terceiro postagem.'),
    (6, 'Meu Quarto Post', 'Este é o conteúdo da minha quarto postagem.');

CREATE TABLE categoriaArtigo(
    idCategoriaArtigo INT PRIMARY KEY AUTO_INCREMENT,
    tituloCategoria VARCHAR(45)
);
 
CREATE TABLE Curtida (
	FkUsuarioCurtiu INT,
    fkPostagemCurtida INT,
    CONSTRAINT pkCurtida PRIMARY KEY (fkUsuarioCurtiu, fkPostagemCurtida),
    CONSTRAINT  fkUsuarioCurtida FOREIGN KEY (fkUsuarioCurtiu) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkPostagemCurtida FOREIGN KEY (fkPostagemCurtida) REFERENCES Postagem (idPostagem),
    dataHoraCurtida DATETIME DEFAULT CURRENT_TIMESTAMP
);

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



        

