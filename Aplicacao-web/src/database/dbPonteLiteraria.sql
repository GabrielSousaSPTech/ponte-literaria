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

-- INSERT INTO Usuario (nome, username, email, senha, fotoPerfilUsuario) VALUES


CREATE TABLE Seguidores (
	fkUsuarioSeguido INT,
    fkUsuarioSeguidor INT,
    CONSTRAINT pkSeguidores PRIMARY KEY (fkUsuarioSeguido, fkUsuarioSeguidor),
    CONSTRAINT fkUsuarioSeguido FOREIGN KEY (fkUsuarioSeguido) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkUsuarioSeguidor FOREIGN KEY (fkUsuarioSeguidor) REFERENCES Usuario(idUsuario),
    dataFollow DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO Seguidores (fkUsuarioSeguido, fkUsuarioSeguidor, dataFollow) VALUES


SELECT * FROM Seguidores;

 CREATE TABLE Postagem (
	idPostagem INT AUTO_INCREMENT,
    fkusuario INT NOT NULL,
    fkCategoriaArtigo INT,
    CONSTRAINT fkCategoriaPostagem FOREIGN KEY (fkCategoriaArtigo) REFERENCES categoriaArtigo(idCategoriaArtigo),
    CONSTRAINT pkPostagem PRIMARY KEY (idPostagem, fkusuario),
    CONSTRAINT fkUsuarioPostagem FOREIGN KEY (fkusuario) REFERENCES Usuario(idUsuario),
    tituloPostagem VARCHAR(45) NOT NULL,
    conteudoPostagem VARCHAR(1000) NOT NULL,
    statusPostagem VARCHAR(45),
    CONSTRAINT chk_status CHECK(statusPostagem IN('ativo', 'inativo')),
    dataHoraPostagem DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO Postagem (fkusuario, tituloPostagem, conteudoPostagem) VALUES 
	
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





        

