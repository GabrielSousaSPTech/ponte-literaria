function campoPreenchido(campoAverificar = []){
    for(var posicao = 0; posicao < campoAverificar.length; posicao++){
        if(campoAverificar[posicao] == ''){
            return false
        }
    }
    return true
}

