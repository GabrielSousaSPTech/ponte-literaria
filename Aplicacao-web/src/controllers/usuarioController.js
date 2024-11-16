var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var username = req.body.usernameServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    usuarioModel.cadastrar(nome, username, email, senha).then((resultado) =>{
        res.status(201).json(resultado);
    }).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );                 
}

function checarCredenciais(req, res) {
    var email = req.body.loginServer;
    var senha = req.body.senhaServer;

    usuarioModel.checarCredenciais(email, senha).then((resultado) => {
        if(resultado.length>0){
            res.json({
                id: resultado[0].idUsuario,
                nome: resultado[0].nome,
                username: resultado[0].username,
                email: resultado[0].email,
                senha: resultado[0].senha
            });
        }else {
            res.status(403).send("E-mail ou Senha inválido(s)");
        }
    });
}

module.exports = {
    cadastrar,
    checarCredenciais
}

















// usuarioModel.verificacaoEmail(email).then((resultado) =>{
//     if(resultado.length>0) {
//         res
//             .status(401)
//             .json({ mensagem: 'Email ja está em uso'});
//     }else {
//         usuarioModel.cadastrar(nome, username, email, senha).then((resultado) =>{
//             res.status(201).json(resultado);
//         });
//     }
// });                     
// }