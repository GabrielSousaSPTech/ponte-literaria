var database = require('../database/config')

function obterComentarioGeral(idPostagem) {
    var instrucaoSql = `
        SELECT
            idComentario,
            ConteudoComentario AS comentario,
            Usuario.nome AS Usuario,
            Usuario.idUsuario AS idUsuario,
            Usuario.username as username,
            Postagem.idPostagem as idPostagem
        FROM Comentario
        JOIN Usuario ON fkusuarioComentario = idUsuario
        JOIN Postagem ON fkPostagemComentada = idPostagem
        WHERE fkPostagemComentada = ${idPostagem} AND tipoComentario = 'Geral' AND statusComentario = 'ativo';
    `

    return database.executar(instrucaoSql)
}

function criarComentarioGeral(idPostagem, idUsuario, comentario){
    var instrucaoSql = `
        INSERT INTO Comentario (fkPostagemComentada, fkUsuarioComentario, ConteudoComentario, tipoComentario, statusComentario, fkComentarioRespondido) 
            VALUES (${idPostagem}, ${idUsuario}, '${comentario}', 'Geral','ativo', null)
    `
    return database.executar(instrucaoSql)
    
}

function deletarComentarioGeral(idComentario) {
    var instrucaoSql = `
    UPDATE Comentario SET statusComentario = 'inativo' WHERE idComentario = ${idComentario}
    `

    return database.executar(instrucaoSql)
}

module.exports = {
    obterComentarioGeral,
    criarComentarioGeral,
    deletarComentarioGeral
}