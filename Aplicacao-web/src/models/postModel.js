var database = require("../database/config")

function createPublicacao (idUsuario, tituloPublicacao, conteudoPublicacao){
    var  instrucaoSql = `
        INSERT INTO Postagem (fkusuario, tituloPostagem, conteudoPostagem, statusPostagem) 
VALUES 
	(${idUsuario}, '${tituloPublicacao}', '${conteudoPublicacao}', 'ativo')
    `

    return database.executar(instrucaoSql)
}

function editarPublicacao (idUsuario, idPostagem, titulo, conteudo) {
    var instrucaoSql = `
        UPDATE Postagem SET tituloPostagem = '${titulo}', conteudoPostagem = '${conteudo}'
        WHERE fkusuario = ${idUsuario} AND idPostagem = ${idPostagem};
    `

    return database.executar(instrucaoSql)

}

function deletarPublicacao (idPostagem) {
    var instrucaoSql = `
        UPDATE Postagem SET statusPostagem = 'inativo' WHERE idPostagem = ${idPostagem}
    `

    return database.executar(instrucaoSql)
}


function getPost(id){
    var instrucaoSql = `
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
LEFT JOIN 
    Curtida ON Postagem.idPostagem = Curtida.fkPostagemCurtida
WHERE 
    Postagem.fkUsuario = ${id} AND statusPostagem = 'ativo'
GROUP BY 
    Postagem.idPostagem;
 
    `

    return database.executar(instrucaoSql)
}

function getCount (id){
    var instrucaoSql = `
        SELECT 
    (SELECT COUNT(*) FROM Postagem WHERE fkUsuario = ${id}) AS contagemPublicacao,
    
    COUNT(Curtida.fkPostagemCurtida) AS qtdCurtida
FROM 
    Postagem
JOIN 
    Usuario ON Postagem.fkUsuario = Usuario.idUsuario
LEFT JOIN 
    Curtida ON Postagem.idPostagem = Curtida.fkPostagemCurtida
WHERE 
    Postagem.fkUsuario = ${id}
    AND statusPostagem = 'ativo'
    `
    return database.executar(instrucaoSql)
}

function viewPost (idPostagem) {
    var instrucaoSql = `
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
    Postagem.idPostagem = ${idPostagem}
    AND statusPostagem = 'ativo'
GROUP BY 
    Postagem.idPostagem, 
    Usuario.nome, 
    Postagem.tituloPostagem, 
    Postagem.conteudoPostagem, 
    Postagem.dataHoraPostagem;
    `
    return database.executar(instrucaoSql)
}



module.exports = {
    getPost,
    getCount,
    viewPost,
    createPublicacao,
    editarPublicacao,
    deletarPublicacao
}