var database = require("../database/config")

function obterCurtidaPost(idPostagem){
    var instrucaoSql = `
        SELECT count(fkPostagemCurtida) as quantidadeCurtida FROM Curtida WHERE fkPostagemCurtida = ${idPostagem}
    `;

    return database.executar(instrucaoSql)
}

async function darLike(idPostagem, idUsuario) {
    
    var deulike = await verificarLike(idPostagem, idUsuario)
    if(deulike.length >0){
        var removerLike = `DELETE FROM Curtida WHERE FkUsuarioCurtiu =${idUsuario} AND fkPostagemCurtida=${idPostagem}`
         await database.executar(removerLike)
         return {ok: true, acao: 'Delete'}
        }
        var atribuirLike = `INSERT INTO Curtida (fkUsuarioCurtiu, fkPostagemCurtida) VALUES ('${idUsuario}', '${idPostagem}')`
        await database.executar(atribuirLike)
        return {ok: true, acao: 'Insert'}
}

async function verificarLike(idPostagem, idUsuario){
    var verificarSeJaDeuLike = `SELECT FkUsuarioCurtiu, fkPostagemCurtida FROM Curtida WHERE FkUsuarioCurtiu =${idUsuario} AND fkPostagemCurtida=${idPostagem}` 
    return database.executar(verificarSeJaDeuLike)
}

module.exports = {
    obterCurtidaPost,
    darLike,
    verificarLike
}

// SELECT 
//             (SELECT COUNT(fkPostagemCurtida) FROM Curtida WHERE fkPostagemCurtida = ${idPostagem}) as quantidadeCurtida
//             , FkUsuarioCurtiu FROM Curtida WHERE fkPostagemCurtida = ${idPostagem}
//         GROUP BY fkPostagemCurtida, fkUsuarioCurtiu