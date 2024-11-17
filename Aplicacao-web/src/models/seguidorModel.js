var database = require("../database/config")

function obterSeguidores(fkUsuarioSeguido){
    var instrucaoSql = `SELECT count(fkUsuarioSeguido) AS Seguidor,
	(SELECT count(fkUsuarioSeguidor) FROM Seguidores WHERE fkUsuarioSeguidor = ${fkUsuarioSeguido}) AS Seguindo
 FROM Seguidores WHERE fkUsuarioSeguido = ${fkUsuarioSeguido}`
    return database.executar(instrucaoSql)
}


async function Seguir(fkUsuarioSeguido, fkUsuarioSeguidor){

    var seguindo = await verificarSeguidor(fkUsuarioSeguido, fkUsuarioSeguidor)

    if(seguindo.length>0){
        var deixarSeguir = `DELETE FROM Seguidores
                             WHERE fkUsuarioSeguido = ${fkUsuarioSeguido}
                             AND fkUsuarioSeguidor = ${fkUsuarioSeguidor}`;

        await database.executar(deixarSeguir);
        return {ok:true, acao: 'Delete'}
    }
    
    var seguir = `INSERT INTO Seguidores (fkUsuarioSeguido, fkUsuarioSeguidor) 
    VALUES (${fkUsuarioSeguido}, ${fkUsuarioSeguidor})`;

    await database.executar(seguir);

    return {ok:true, acao: 'Insert'}

}

async function verificarSeguidor (fkUsuarioSeguido, fkUsuarioSeguidor){
    var instrucaoSql = `SELECT fkUsuarioSeguido, fkUsuarioSeguidor FROM Seguidores
                          WHERE fkUsuarioSeguido = ${fkUsuarioSeguido}
                         AND fkUsuarioSeguidor = ${fkUsuarioSeguidor}  `
    return database.executar(instrucaoSql)
}

module.exports = {
    Seguir,
    verificarSeguidor,
    obterSeguidores
}