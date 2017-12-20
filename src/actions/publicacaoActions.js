import firebase from 'firebase'
import b64 from 'base-64'


export const modificaStatusNovoPost = (texto) => {
	return{
		type: "MODIFICA_STATUS",
		payload: texto
	}


}

export const publicarStatus = (imagem, status) => {
	return dispatch => {
		dispatch({type: 'PUBLICAR_ANDAMENTO'})
		const email = firebase.auth().currentUser.email
		const emailB64 = b64.encode(email)
		const data = -1 * new Date().getTime()
				firebase.database().ref('usuarios/'+emailB64).once('value', snapshot => {
					const info = snapshot.val();
					const fotoPerfil = info.foto
					const nome = info.nome
					const idade = info.idade
					const cidade = info.cidade
					const sexo = info.sexo
					firebase.database().ref("feed/").push({imagem, status, emailB64, data, fotoPerfil, nome, idade, cidade, sexo })
						.then(value => publicaSucesso(dispatch))
						.catch(erro => publicaErro(erro, dispatch))
				})

				.catch(erro => publicaErro(erro, dispatch))
			
	}
}

const publicaSucesso = (dispatch) => {
	alert("Publicado com sucesso!");
	dispatch({
		type: "PUBLICADO_COM_SUCESSO"})

}

const publicaErro = (erro, dispatch) => {
	alert(erro);
	dispatch({
		type: "PUBLICADO_COM_SUCESSO"})

}
