var database = require('../database/config')

function obterFeedSeguindo(idUsuario){
    var instrucaoSql = `
        SELECT 
        Postagem.idPostagem,
        Usuario.nome AS nomeUsuario,
        Usuario.username AS usernameUsuario,
        Usuario.idUsuario AS idUsuario,
        Usuario.fotoPerfilUsuario AS fotoUsuario,
        Postagem.tituloPostagem,
        Postagem.conteudoPostagem,
        Postagem.dataHoraPostagem,
        Categoria.tituloCategoria as categoria,
        COUNT(Curtida.fkPostagemCurtida) AS qtdCurtida
    FROM 
        Postagem
    RIGHT JOIN 
        Usuario ON Postagem.fkUsuario = Usuario.idUsuario
    LEFT JOIN 
        Curtida ON Postagem.idPostagem = Curtida.fkPostagemCurtida
    LEFT JOIN
        categoriaArtigo AS Categoria ON Postagem.fkCategoriaArtigo = Categoria.idCategoriaArtigo
    LEFT JOIN
        Seguidores AS seguindo ON fkusuario = seguindo.fkUsuarioSeguido
    WHERE 
        seguindo.fkUsuarioSeguidor = ${idUsuario} AND statusPostagem = 'ativo'
    GROUP BY 
 Postagem.idPostagem,
    Usuario.nome,
    Usuario.username,
    Usuario.idUsuario,
    Usuario.fotoPerfilUsuario,
    Postagem.tituloPostagem,
    Postagem.conteudoPostagem,
    Postagem.dataHoraPostagem,
    Categoria.tituloCategoria,
    seguindo.fkUsuarioSeguidor;
    `
    return database.executar(instrucaoSql)
}

function obterFeedCategoria(idCategoria){
    var instrucaoSql = `
        SELECT 
        Postagem.idPostagem,
        Usuario.nome AS nomeUsuario,
        Usuario.username AS usernameUsuario,
        Usuario.idUsuario AS idUsuario,
        Usuario.fotoPerfilUsuario AS fotoUsuario,
        Postagem.tituloPostagem,
        Postagem.conteudoPostagem,
        Postagem.dataHoraPostagem,
        Categoria.tituloCategoria as categoria,
        COUNT(Curtida.fkPostagemCurtida) AS qtdCurtida
    FROM 
        Postagem
    RIGHT JOIN 
        Usuario ON Postagem.fkUsuario = Usuario.idUsuario
    LEFT JOIN 
        Curtida ON Postagem.idPostagem = Curtida.fkPostagemCurtida
    LEFT JOIN
        categoriaArtigo AS Categoria ON Postagem.fkCategoriaArtigo = Categoria.idCategoriaArtigo

    WHERE 
        Categoria.idCategoriaArtigo = ${idCategoria} AND statusPostagem = 'ativo'
    GROUP BY 
 Postagem.idPostagem,
    Usuario.nome,
    Usuario.username,
    Usuario.idUsuario,
    Usuario.fotoPerfilUsuario,
    Postagem.tituloPostagem,
    Postagem.conteudoPostagem,
    Postagem.dataHoraPostagem,
    Categoria.tituloCategoria
    `
    return database.executar(instrucaoSql)
}

module.exports={
    obterFeedSeguindo,
    obterFeedCategoria
}