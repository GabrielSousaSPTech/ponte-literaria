    var comentarioModel = require('../models/comentarioModel')

    function obterComentarioGeral(req, res){
        var id = req.params.idPostagem

        comentarioModel.obterComentarioGeral(id).then(function (resposta){
            if(resposta.length >0){
                res.status(201).send(resposta)
           } else {
            res.status(403).send('Não há comentários nesse post')
           }
        })
    }

    function criarComentario(req, res){
        var idPostagem = req.body.idPostagemServer;
        var idUsuario = req.body.idUsuarioServer;
        var comentario = req.body.comentarioServer;

        comentarioModel.criarComentarioGeral(idPostagem, idUsuario, comentario).then(function (resposta){
            res.status(201).json(resposta);
        }).catch(function (erro){
            console.log(erro);
            console.log(
                "\nHouve um erro ao criar o Comentario! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
    }

    function deletarComentario(req, res){
        var idComentario = req.params.idComentario

        comentarioModel.deletarComentarioGeral(idComentario).then(function (resposta){
            res.status(201).json(resposta);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao excluir o comentario! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );   
    }

    function editarComentarioGeral(req, res){
        var idComentario = req.body.idComentarioServer
        var comentario = req.body.comentarioServer

        comentarioModel.editarComentarioGeral(idComentario, comentario).then(function (resposta){
            res.status(201).json(resposta);
        }).catch(function (erro){
            console.log(erro);
                console.log(
                    "\nHouve um erro ao editar o comentario! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
        })
    }

module.exports = {
    obterComentarioGeral,
    criarComentario,
    deletarComentario,
    editarComentarioGeral
}