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
module.exports = {
    getPost,
    countPost,
    viewPost,
    recarregarPost
}