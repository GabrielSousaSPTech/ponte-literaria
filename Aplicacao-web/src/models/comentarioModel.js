var database = require('../database/config')

function obterComentarioGeral(idPostagem) {
    var instrucaoSql = `
        SELECT
            idComentario,
            ConteudoComentario AS comentario,
            Usuario.nome AS Usuario,
            Usuario.idUsuario AS idUsuario,
            Usuario.fotoPerfilUsuario AS fotoUsuario,
            Usuario.username as username,
            Postagem.idPostagem as idPostagem,
            comentarioEditado
        FROM Comentario
        JOIN Usuario ON fkusuarioComentario = idUsuario
        JOIN Postagem ON fkPostagemComentada = idPostagem
        WHERE fkPostagemComentada = ${idPostagem} AND tipoComentario = 'Geral' AND statusComentario = 'ativo';
    `

    return database.executar(instrucaoSql)
}

function criarComentarioGeral(idPostagem, idUsuario, comentario){
    var instrucaoSql = `
        INSERT INTO Comentario (fkPostagemComentada, fkUsuarioComentario, ConteudoComentario, tipoComentario, statusComentario,comentarioEditado, fkComentarioRespondido) 
            VALUES (${idPostagem}, ${idUsuario}, '${comentario}', 'Geral','ativo', false, null)
    `
    return database.executar(instrucaoSql)
    
}

function deletarComentarioGeral(idComentario) {
    var instrucaoSql = `
    UPDATE Comentario SET statusComentario = 'inativo' WHERE idComentario = ${idComentario}
    `

    return database.executar(instrucaoSql)
}

function editarComentarioGeral(idComentario, conteudo) {
    var instrucaoSql = `
        UPDATE Comentario SET ConteudoComentario = '${conteudo}' , comentarioEditado = true
        WHERE idComentario = ${idComentario}
    `

    return database.executar(instrucaoSql)
}

function getCountComentarioGeral(idPostagem){
    var instrucaoSql = `
        SELECT COUNT(idComentario) as qtdComentario FROM Comentario WHERE fkPostagemComentada = ${idPostagem} AND statusComentario = 'ativo' AND tipoComentario = 'Geral';

    `

    return database.executar(instrucaoSql)
}

module.exports = {
    obterComentarioGeral,
    criarComentarioGeral,
    deletarComentarioGeral,
    editarComentarioGeral,
    getCountComentarioGeral
}