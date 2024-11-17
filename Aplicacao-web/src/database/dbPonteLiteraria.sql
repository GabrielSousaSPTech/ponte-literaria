CREATE DATABASE ponteLiteraria;

USE ponteLiteraria;

CREATE TABLE  Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    senha VARCHAR(80) NOT NULL,
    fotoPerfilUsuario VARCHAR(80) UNIQUE
);

CREATE TABLE Seguidores (
	fkUsuarioSeguido INT,
    fkUsuarioSeguidor INT,
    CONSTRAINT pkSeguidores PRIMARY KEY (fkUsuarioSeguido, fkUsuarioSeguidor),
    CONSTRAINT fkUsuarioSeguido FOREIGN KEY (fkUsuarioSeguido) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkUsuarioSeguidor FOREIGN KEY (fkUsuarioSeguidor) REFERENCES Usuario(idUsuario),
    dataFollow DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Seguidores (fkUsuarioSeguido, fkUsuarioSeguidor) VALUES (1,5);


INSERT INTO Postagem (fkusuario, tituloPostagem, conteudoPostagem) 
VALUES 
	(6, 'Meu Segundo Post', 'Este é o conteúdo da minha segundo postagem.'),
    (6, 'Meu Terceiro Post', 'Este é o conteúdo da minha terceiro postagem.'),
    (6, 'Meu Quarto Post', 'Este é o conteúdo da minha quarto postagem.');


 
 
 CREATE TABLE Postagem (
	idPostagem INT AUTO_INCREMENT,
    fkusuario INT NOT NULL,
    CONSTRAINT pkPostagem PRIMARY KEY (idPostagem, fkUsuario),
    CONSTRAINT fkUsuarioPostagem FOREIGN KEY (fkusuario) REFERENCES Usuario(idUsuario),
    tituloPostagem VARCHAR(45) NOT NULL,
    conteudoPostagem VARCHAR(1000) NOT NULL,
    statusPostagem VARCHAR(45),
    CONSTRAINT chk_status CHECK(statusPostagem IN('ativo', 'inativo')),
    dataHoraPostagem DATETIME DEFAULT CURRENT_TIMESTAMP
);

UPDATE Postagem SET statusPostagem = 'ativo' WHERE idPostagem >0;

ALTER TABLE Postagem 

ADD CONSTRAINT chk_status CHECK(statusPostagem IN('ativo', 'inativo'));
 
CREATE TABLE Curtida (
	FkUsuarioCurtiu INT,
    fkPostagemCurtida INT,
    CONSTRAINT pkCurtida PRIMARY KEY (fkUsuarioCurtiu, fkPostagemCurtida),
    CONSTRAINT  fkUsuarioCurtida FOREIGN KEY (fkUsuarioCurtiu) REFERENCES Usuario(idUsuario),
    CONSTRAINT fkPostagemCurtida FOREIGN KEY (fkPostagemCurtida) REFERENCES Postagem (idPostagem),
    dataHoraCurtida DATETIME DEFAULT CURRENT_TIMESTAMP
);


 
 INSERT INTO Curtida (fkUsuarioCurtiu, fkPostagemCurtida) VALUES(1, 5);

CREATE TABLE Comentario (
	idComentario INT AUTO_INCREMENT,
    fkPostagemComentada INT,
    fkUsuarioComentario INT,
    CONSTRAINT pkComentario PRIMARY KEY (idComentario,fkPostagemComentada, fkUsuarioComentario),
    ConteudoComentario VARCHAR (100),
    tipoComentario VARCHAR(10),
    statusComentario VARCHAR(45),
    fkComentarioRespondido INT,
    dataHoraComentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkComentarioResposta FOREIGN KEY (fkComentarioRespondido) REFERENCES Comentario(idComentario),
    CONSTRAINT chk_tipoComentario CHECK (tipoComentario IN('Geral', 'Resposta')),
    CONSTRAINT chk_statusComentario CHECK (statusComentario IN('ativo', 'inativo')),
    CONSTRAINT fkPostagemComentada FOREIGN KEY (fkPostagemComentada) REFERENCES Postagem (idPostagem),
    CONSTRAINT fkUsuarioComentario FOREIGN KEY (fkUsuarioComentario) REFERENCES Usuario(idUsuario)
);

ALTER TABLE Comentario ADD COLUMN dataHoraComentario DATETIME DEFAULT CURRENT_TIMESTAMP;





INSERT INTO Comentario (fkPostagemComentada, fkUsuarioComentario, ConteudoComentario, tipoComentario, fkComentarioRespondido) VALUES  (35, 8, 'artigo muito bom', 'Geral', null);
INSERT INTO Comentario (fkPostagemComentada, fkUsuarioComentario, ConteudoComentario, tipoComentario, fkComentarioRespondido) VALUES (35, 5, 'Valeu mano!', 'Resposta', 1);

SELECT * FROM Usuario;
SELECT * FROM Postagem;
SELECT * FROM Curtida;
SELECT * FROM Seguidores;
SELECT * FROM Comentario;

SELECT
ConteudoComentario AS comentario,
Usuario.nome AS Usuario
FROM Comentario
JOIN Usuario ON fkusuarioComentario = idUsuario
 WHERE fkPostagemComentada = 35 AND tipoComentario = 'Geral';

SELECT fkUsuarioSeguido, fkUsuarioSeguidor FROM Seguidores WHERE fkUsuarioSeguido = 6
                         AND fkUsuarioSeguidor = 5;
SELECT count(fkUsuarioSeguido) AS Seguidor,
	(SELECT count(fkUsuarioSeguidor) FROM Seguidores WHERE fkUsuarioSeguidor = 5) AS Seguindo
 FROM Seguidores WHERE fkUsuarioSeguido = 5;


 SELECT count(fkPostagemCurtida) FROM Curtida GROUP BY fkPostagemCurtida;
 
 SELECT idPostagem, Usuario.nome, tituloPostagem, conteudoPostagem, dataHoraPostagem, count(Curtida.fkPostagemCurtida) as qtdCurtida 
 FROM Postagem
 LEFT JOIN Usuario ON fkusuario = idUsuario
 LEFT JOIN Curtida ON idPostagem = fkPostagemCurtida
 WHERE fkUsuario = 5
 GROUP BY (Curtida.fkPostagemCurtida) ;
 
SELECT * FROM Usuario WHERE (email = 'GBSi' OR username = 'GBSi') AND senha = '1234';


SELECT Usuario.nome, tituloPostagem, conteudoPostagem, dataHoraPostagem FROM Postagem JOIN Usuario ON fkusuario = idUsuario WHERE fkUsuario = 5;
SELECT Usuario.nome, tituloPostagem, conteudoPostagem, dataHoraPostagem FROM Postagem JOIN Usuario ON fkusuario = idUsuario WHERE idPostagem = 5;
SELECT count(fkUsuario) FROM Postagem JOIN Usuario ON fkusuario = idUsuario WHERE fkUsuario = 5;
            SELECT 
    Postagem.idPostagem,
    Usuario.nome,
    Postagem.tituloPostagem,
    Postagem.conteudoPostagem,
    Postagem.dataHoraPostagem,
    COUNT(Curtida.fkPostagemCurtida) AS qtdCurtida
FROM 
    Postagem
LEFT JOIN 
    Usuario ON Postagem.fkUsuario = Usuario.idUsuario
LEFT JOIN 
    Curtida ON Postagem.idPostagem = Curtida.fkPostagemCurtida
WHERE 
    Postagem.idPostagem = 7
GROUP BY 
    Postagem.idPostagem;
SELECT * FROm Postagem;
SELECT 
    (SELECT COUNT(*) FROM Postagem WHERE fkUsuario = 5) AS contagemPublicacao,
    
    COUNT(Curtida.fkPostagemCurtida) AS qtdCurtida
FROM 
    Postagem
JOIN 
    Usuario ON Postagem.fkUsuario = Usuario.idUsuario
LEFT JOIN 
    Curtida ON Postagem.idPostagem = Curtida.fkPostagemCurtida
WHERE 
    Postagem.fkUsuario = 5;
SHOW TABLES;

SELECT * FROM Usuario
    JOIN Postagem as post ON idUsuario = fkusuario
    WHERE
      username LIKE '%Meu segundo Post%' OR  post.tituloPostagem LIKE '%Meu segundo Post%' OR  post.conteudoPostagem LIKE '%Meu segundo Post%';

       SELECT 
    Postagem.idPostagem,
    Usuario.nome AS nomeUsuario,
    Usuario.username AS usernameUsuario,
    Usuario.idUsuario AS idUsuario,
    Postagem.tituloPostagem,
    Postagem.conteudoPostagem,
    Postagem.dataHoraPostagem,
    COUNT(Curtida.fkPostagemCurtida) AS qtdCurtida
FROM 
    Postagem
RIGHT JOIN 
    Usuario ON Postagem.fkUsuario = Usuario.idUsuario
RIGHT JOIN 
    Curtida ON Postagem.idPostagem = Curtida.fkPostagemCurtida
WHERE 
    Postagem.fkUsuario = 7
GROUP BY 
    Postagem.idPostagem,
    Usuario.nome,
    Usuario.username,
    Usuario.idUsuario 
    ;
