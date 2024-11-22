var database = require("../database/config");

function cadastrar (nome, username, email, senha) {
    var instrucaoSql = `
    INSERT INTO Usuario (nome, username, email, senha) 
        VALUES ('${nome}', '${username}', '${email}', '${senha}')`;
    return database.executar(instrucaoSql);
}

function checarCredenciais (email, senha) {
    var instrucaoSql = `
        SELECT * FROM Usuario WHERE (email = '${email}' OR username = '${email}') AND senha = '${senha}'`

    return database.executar(instrucaoSql);
}

function getUsuario (idUsuario) {
    var instrucaoSql = `SELECT nome, username, fotoPerfilUsuario, email, senha FROM Usuario WHERE idUsuario = ${idUsuario}`

    return database.executar (instrucaoSql)
}

function editarUsuario (idUsuario, nome, username, email, senha){
    var instrucaoSql = `
        UPDATE Usuario SET nome = ${nome}, username = ${username}, email = ${email}, senha = ${senha}
        WHERE idUsuario = ${idUsuario}

    `

    return database.executar(instrucaoSql)
}

function editarFotoPerfil(idUsuario, nomeImagem){
    var instrucaoSql = `
    UPDATE Usuario SET fotoPerfilUsuario = '${nomeImagem}' WHERE idUsuario = ${idUsuario}
    `

    return database.executar(instrucaoSql)

}



module.exports = {
    cadastrar,
    checarCredenciais,
    getUsuario,
    editarUsuario,
    editarFotoPerfil

}