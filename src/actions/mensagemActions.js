import firebase from 'firebase'
import b64 from 'base-64'
import _ from 'lodash'
var moment = require('moment');
import {Alert} from 'react-native'

export const conversaUsuarioFetch = contatoEmail => {
	const {currentUser} = firebase.auth();
	const usuarioEmail = currentUser.email
	const usuarioEmailB64 = b64.encode(usuarioEmail)

	return dispatch => {
		firebase.database().ref('/mensagens/' + usuarioEmailB64 + '/' + contatoEmail )
			.on('value', snapshot => {
				dispatch({type: "LISTA_CONVERSA_USUARIO", payload: snapshot.val()})
			})
	}
}


export const modificaMensagem = texto => {
	return({
		type: "MODIFICA_MENSAGEM",
		payload: texto
	})
}


export const enviaMensagem = (mensagem, contatoNome, contatoEmail, fotoPerfil) => {
		const {currentUser} = firebase.auth();
		const usuarioEmail = currentUser.email
		const usuarioEmailB64 = b64.encode(usuarioEmail)
		const x = new Date()
		const d1 = moment().local().format('DD/MM/YYYY');
		const d2 = ' às ';
		const d3 = moment().local().format('h:mm a');
		const dataMSG = d1+d2+d3;
		return dispatch => {

		firebase.database().ref('/mensagens/'+usuarioEmailB64+'/'+contatoEmail)
			.push({mensagem, tipo : 'e', date: dataMSG})
			.then(() => {
				firebase.database().ref('/mensagens/'+contatoEmail+'/'+usuarioEmailB64)
					.push({mensagem, tipo : 'r', date: dataMSG})
					.then(() => dispatch({type: "LIMPAR_MENSAGEM"}))

			})
			.then(() => {
				firebase.database().ref('/usuario_conversas/' +usuarioEmailB64 +'/' + contatoEmail)
					.set({nome: contatoNome, email: b64.decode(contatoEmail), data: dataMSG, foto: fotoPerfil})


			})
			.then(() => {
				firebase.database().ref('/usuarios/' + usuarioEmailB64)
					.once('value')
					.then(snapshot => {
						const dadosUsuario =snapshot.val()
						firebase.database().ref('/usuario_conversas/' +contatoEmail +'/' + usuarioEmailB64)
							.set({nome: dadosUsuario.nome , email: usuarioEmail, data: dataMSG, foto:dadosUsuario.foto })
					})
			})

	}
}
export const listaConversasUsuarioFetch = email => {
	const {currentUser} = firebase.auth();
	return (dispatch) => {
		let emailUsuarioB64 = b64.encode(currentUser.email);
		firebase.database().ref('/usuario_conversas/' + emailUsuarioB64)
			.on('value', snapshot => {
				dispatch({type: "LISTAX", payload: snapshot.val()})
			})
	}
}

export const excluirConversas = email => {
	const emailUsuarioExcluirB64 = b64.encode(email)
	const {currentUser} = firebase.auth();
	const emailUsuario = currentUser.email
	let emailUsuarioB64 = b64.encode(currentUser.email);
	var adaRef = firebase.database().ref('/usuario_conversas/'+emailUsuarioB64+'/'+emailUsuarioExcluirB64);
	adaRef.remove()
		.catch(erro => (Alert.alert('Erro', erro)))



}