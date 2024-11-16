var curtidaModel = require('../models/curtidaModel')

function obterCurtidaPost (req, res) {
  console.log("TO SENDO CHAMADO")   
   var id = req.params.idPostagem

    curtidaModel.obterCurtidaPost(id).then((resposta) =>{
        if (resposta.length > 0) {
            res.status(200).send(resposta);
          } else {
            res.status(403).send(0);
          }
    })
}

function darLike (req, res) {
  var idUsuario = req.body.idUsuarioServer
  var idPostagem = req.body.idPostagemServer

  curtidaModel.darLike(idPostagem, idUsuario).then((resposta) =>{
    res.status(201).json(resposta);
  }).catch(
    function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao dar Like! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    }
);
}

function verificarLike (req, res) {
  var idUsuario = req.body.idUsuarioServer
  var idPostagem = req.body.idPostagemServer

  curtidaModel.verificarLike(idPostagem, idUsuario).then((resposta) =>{
    res.status(201).json(resposta);
  }).catch(
    function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao verificar Like! Erro: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    }
);
}

module.exports = {
    obterCurtidaPost,
    darLike,
    verificarLike
}