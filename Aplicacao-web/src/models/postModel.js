var database = require("../database/config")

function getPost(id){
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
    Postagem.fkUsuario = ${id}
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
    viewPost
}