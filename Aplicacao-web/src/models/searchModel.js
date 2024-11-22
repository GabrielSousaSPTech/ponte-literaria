var database = require('../database/config')

function getSearch (pesquisa) {
    var instrucaoSql = `SELECT idUsuario, nome, username, fotoPerfilUsuario as fotoUsuario FROM Usuario
    WHERE
      username LIKE '%${pesquisa}%' OR nome LIKE '%${pesquisa}%';`

    return database.executar(instrucaoSql)
}

module.exports = {
    getSearch 
}

// var instrucaoSql = `SELECT idUsuario FROM Usuario
// JOIN Postagem as post ON idUsuario = fkusuario
// WHERE
//   username LIKE '%${pesquisa}%' OR  post.tituloPostagem LIKE '%${pesquisa}%' OR  post.conteudoPostagem LIKE '%${pesquisa}%';`