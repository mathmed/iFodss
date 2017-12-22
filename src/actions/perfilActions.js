import firebase from 'firebase'
import b64 from 'base-64'
import {Alert} from 'react-native'

export const modificaDadosPerfil = (texto, dado) =>{
	switch(dado){
		case 1:
			return{
				type: "MODIFICA_NOME",
				payload: texto
			}
		case 2:
			return{
				type: "MODIFICA_CIDADE",
				payload: texto
			}
		case 3:
			return{
				type: "MODIFICA_BIO",
				payload: texto
			}
		case 4:
			return{
				type: "MODIFICA_IDADE",
				payload: texto
			}

	}
}

export const salvarDados = (nome, cidade, bio, idade) => {
	return dispatch => {
		dispatch({type: "ANDAMENTO"})
		const email = firebase.auth().currentUser.email
		const emailB64 = b64.encode(email)
		firebase.database().ref("usuarios/"+emailB64).once('value', (snapshot) => {
			const info =  snapshot.val();
			info.nome = nome
			info.cidade = cidade
			info.bio = bio
			info.idade = idade
			firebase.database().ref("usuarios/"+emailB64).set(info)
				.then(value => alteradoSucesso(dispatch))
					.catch(erro=>alteradoErro(erro,dispatch))
			})
				.catch(erro=>alteradoErro(erro,dispatch))
	}
}

export const salvarFoto =( foto ) => {
	return dispatch => {
		dispatch({type: "ANDAMENTO"})
		const email = firebase.auth().currentUser.email
		const emailB64 = b64.encode(email)
		firebase.database().ref("usuarios/"+emailB64).once('value', (snapshot) => {
		const info =  snapshot.val();
		info.foto = foto
		firebase.database().ref("usuarios/"+emailB64).set(info)
				.then(value => alteradoSucesso(dispatch))
					.catch(erro=>alteradoErro(erro,dispatch))
		})
				.catch(erro=>alteradoErro(erro,dispatch))
	}
}



const alteradoSucesso = (dispatch) => {
	dispatch({
		type: 'SUCESSO'
	})
}

const alteradoErro = (erro, dispatch) => {
	Alert.alert('Erro', erro);
	dispatch({
		type: 'ERRO'
	})
}