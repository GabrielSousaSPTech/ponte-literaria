var postModel = require("../models/postModel")

function getPost (req, res){
    var id = req.params.idUsuario

    postModel.getPost(id).then((resultado) =>{
        if (resultado.length > 0) {
            res.status(200).json(resultado);
          } else {
            res.status(403).send("Esse perfil não possui postagens");
          }
    })
}
function countPost (req, res) {
    var id = req.params.idUsuario

    postModel.getCount(id).then((resultado) => {
        if(resultado.length>0){
            res.status(200).json(resultado);
        }else {
            res.status(403).send("0")
        }
    })
}

function viewPost(req, res) {
    var id = req.params.idPostagem

    postModel.viewPost(id).then((resultado) => {
        if(resultado.length>0){
            res.status(200).json(resultado);
        }else {
            res.status(403).send("0")
        }
    })
}

function recarregarPost(req, res) {
    var id = req.params.idPostagem

    postModel.viewPost(id).then((resultado) => {
        if(resultado.length>0){
            res.status(200).json(resultado);
        }else {
            res.status(403).send("0")
        }
    })
}

function criarPost(req, res){
    var idUsuario = req.body.idUsuarioServer
    var titulo = req.body.tituloPublicacaoServer
    var conteudo = req.body.conteudoPublicacaoServer

    postModel.createPublicacao(idUsuario, titulo, conteudo).then(function(resultado) {
        res.status(201).json(resultado);       
    }).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao criar a publicação! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );    
}

function editarPost(req, res){
    var idUsuario = req.body.idUsuarioServer
    var idPostagem = req.body.idPostagemServer
    var titulo = req.body.tituloPublicacaoServer
    var conteudo = req.body.conteudoPublicacaoServer

    postModel.editarPublicacao(idUsuario, idPostagem, titulo, conteudo).then(function(resposta){
        res.status(201).json(resposta);
    }).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao editar a publicação! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );    
}

function deletarPost(req, res){
    var idPostagem = req.body.idPostagemServer

    postModel.deletarPublicacao(idPostagem).then(function(resposta){
        res.status(201).json(resposta);
    }).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao excluir a publicação! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );    
}

module.exports = {
    getPost,
    countPost,
    viewPost,
    recarregarPost,
    criarPost,
    editarPost,
    deletarPost
}