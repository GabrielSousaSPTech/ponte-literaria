document.getElementById("input_foto").addEventListener("change", readImage, false);
		function readImage() {
			if (this.files && this.files[0]) {
				//FileReader é usado para ler arquivos selecionados pelo usuário.
				var file = new FileReader();
				//Esta linha define um evento que será acionado quando o processo de leitura do arquivo estiver concluído
				file.onload = function(imagemLida) {
				//Nesta linha, estamos atribuindo o resultado da leitura do arquivo à propriedade src de um elemento HTML com o ID "preview
					document.getElementById("fotoPreview").src = imagemLida.target.result;
				};
				file.readAsDataURL(this.files[0]);
                closeModal();
				editarFotoPerfil(sessionStorage.ID_USUARIO)
				window.location.reload()
			}
		}

function editarFotoPerfil(idUsuario){

	const formData = new FormData();

	formData.append('input_foto', input_foto.files[0])
	formData.append('idUsuarioServer', idUsuario)

		fetch('/usuario/editImage', {
			method: "POST",
			body: formData
		}).then(res => {
			getUsuario(idUsuario)
		}).catch(err => {
			console.log(err);
		})
	}
