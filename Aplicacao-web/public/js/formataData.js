function formatarData(data){
    const agora = new Date();
    const diferença = agora - new Date(data); // Calcula a diferença em milissegundos
    const segundos = Math.floor(diferença / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7)

    if (segundos < 60) {
        return `${segundos} s`;
    } else if (minutos < 60) {
        return `${minutos} Min`;
    } else if (horas < 24) {
        return `${horas} h`;
    } else if (dias < 7) {
        return `${dias} d`;
    } else if (semanas <= 2) {
        return `${semanas} semana${semanas > 1 ? 's' : ''} `;
    } else {
        
        return new Date(data).toLocaleDateString('pt-BR');
    }




    
}