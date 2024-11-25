var database = require ('../database/config')

function getCategoria(){
    var instrucaoSql = `
        SELECT * FROM categoriaArtigo;
    `

    return database.executar(instrucaoSql)
}

module.exports = {
    getCategoria
}