var database = require('../database/config')

function obterDadosKpi(idUsuario){
    var instrucaoSql = `
        SELECT 
	COUNT(idPostagem) as qtdPostagem,
    (SELECT COUNT(idPostagem) FROM Curtida JOIN Postagem ON fkPostagemCurtida = idPostagem WHERE Postagem.statusPostagem = 'ativo' AND fkusuario = ${idUsuario}) AS qtdCurtida,
    (SELECT COUNT(fkUsuarioSeguido) FROM Seguidores JOIN Usuario on fkUsuarioSeguido = idUsuario WHERE idUsuario = ${idUsuario}) AS qtdSeguidores,
    (SELECT COUNT(idComentario) FROM Comentario JOIN Postagem ON fkPostagemComentada = idPostagem WHERE fkusuario = ${idUsuario} AND statusComentario = 'ativo' AND tipoComentario = 'Geral'  AND statusPostagem = 'ativo') AS qtdComentario
FROM Postagem WHERE fkusuario = ${idUsuario} AND statusPostagem = 'ativo';
    `
    return database.executar(instrucaoSql)
}

function obterPublicacaoMaisCurtida(idUsuario){
    var instrucaoSql = `
    
        SELECT tituloPostagem, COUNT(Curtida.fkpostagemCurtida) as qtdCurtida 
        FROM Postagem 
        JOIN Curtida ON fkPostagemCurtida = idPostagem
        WHERE fkusuario = ${idUsuario} AND statusPostagem = 'ativo'
        GROUP BY
        tituloPostagem
        ORDER BY 
			COUNT(Curtida.fkpostagemCurtida) DESC
            LIMIT 4
    `

    return database.executar(instrucaoSql)
}

function obterSeguidoresMes(idUsuario){
    var instrucaoSql = `
    
            SELECT count(fkUsuarioSeguido) AS qtdSeguidor, DATE_FORMAT(dataFollow, '%M') as parametro 
            FROM Usuario 
            JOIN Seguidores ON idUsuario = fkUsuarioSeguido
            WHERE fkUsuarioSeguido = ${idUsuario} AND month(dataFollow)
            GROUP BY  DATE_FORMAT(dataFollow, '%M')
            ORDER BY  DATE_FORMAT(dataFollow, '%M') DESC;
    `

    return database.executar(instrucaoSql)
}
function obterSeguidoresDia(idUsuario, mes){
    var instrucaoSql = `
    
SELECT count(fkUsuarioSeguido) AS qtdSeguidor, DATE_FORMAT(dataFollow, '%W') as parametro,
        month(dataFollow) = ${mes}
            FROM Usuario 
            JOIN Seguidores ON idUsuario = fkUsuarioSeguido
            WHERE fkUsuarioSeguido = ${idUsuario} AND week(dataFollow) AND month(dataFollow) = ${mes}
            GROUP BY  DATE_FORMAT(dataFollow, '%W'),
            month(dataFollow) = ${mes};
    `

    return database.executar(instrucaoSql)
}

function obterCategoriasQueMaisPosta(idUsuario){
    var instrucaoSql = `
        SELECT 
            categoria.tituloCategoria,
            COUNT(Postagem.idPostagem) AS quantidade
        FROM Postagem
        JOIN categoriaArtigo AS categoria ON Postagem.fkCategoriaArtigo = categoria.idCategoriaArtigo
        WHERE Postagem.fkusuario = ${idUsuario} AND statusPostagem = 'ativo'
        GROUP BY categoria.tituloCategoria; 
    `

    return database.executar(instrucaoSql )
}

module.exports = {
    obterDadosKpi,
    obterPublicacaoMaisCurtida,
    obterSeguidoresMes,
    obterSeguidoresDia,
    obterCategoriasQueMaisPosta
}