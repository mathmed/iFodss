import firebase from 'firebase'
import b64 from 'base-64'
var moment = require('moment');
import {Alert} from 'react-native'

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
		const d1 = moment().local().format('DD/MM/YYYY');
		const d2 = ' às ';
		const d3 = moment().local().format('h:mm a');
		const dataPublicacao = d1+d2+d3;
				firebase.database().ref('usuarios/'+emailB64).once('value', snapshot => {
					const info = snapshot.val();
					const fotoPerfil = info.foto
					const nome = info.nome
					const idade = info.idade
					const cidade = info.cidade
					const sexo = info.sexo
					firebase.database().ref("feed/").push({imagem, status, emailB64, data, fotoPerfil, nome, idade, cidade, sexo, dataPublicacao })
						.then(value => publicaSucesso(dispatch))
						.catch(erro => publicaErro(erro, dispatch))
				})

				.catch(erro => publicaErro(erro, dispatch))
			
	}
}

const publicaSucesso = (dispatch) => {
	Alert.alert("Êxito", "Status publicado");
	dispatch({
		type: "PUBLICADO_COM_SUCESSO"})

}

const publicaErro = (erro, dispatch) => {
	Alert.alert('Erro', erro);
	dispatch({
		type: "PUBLICADO_COM_SUCESSO"})

}
