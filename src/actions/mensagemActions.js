import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { Alert } from 'react-native';
const moment = require('moment');

export const conversaUsuarioFetch = contatoEmail => {
	const { currentUser } = firebase.auth();
	const usuarioEmail = currentUser.email;
	const usuarioEmailB64 = b64.encode(usuarioEmail);

	return dispatch => {
		firebase.database().ref('/mensagens/' + usuarioEmailB64 + '/' + contatoEmail)
			.on('value', snapshot => {
				dispatch({ type: 'LISTA_CONVERSA_USUARIO', payload: snapshot.val() });
			});
	};
};


export const modificaMensagem = (texto) => { 
	return ({
		type: 'MODIFICA_MENSAGEM',
		payload: texto
	});
};


export const enviaMensagem = (mensagem, contatoNome, contatoEmail, fotoPerfil) => {
		const { currentUser } = firebase.auth();
		const usuarioEmail = currentUser.email;
		const usuarioEmailB64 = b64.encode(usuarioEmail);
		const data = -1 * new Date().getTime();
		const d1 = moment().local().format('DD/MM/YYYY');
		const d2 = ' às ';
		const d3 = moment().local().format('h:mm a');
		const dataMSG = d1 + d2 + d3;
		return dispatch => {
		firebase.database().ref('/mensagens/' + usuarioEmailB64 + '/' + contatoEmail)
			.push({ mensagem, tipo: 'e', date: dataMSG })
			.then(() => {
				firebase.database().ref('/mensagens/' + contatoEmail + '/' + usuarioEmailB64)
					.push({ mensagem, tipo: 'r', date: dataMSG })
					.then(() => dispatch({ type: 'LIMPAR_MENSAGEM' }));
			})
			.then(() => {
				firebase.database().ref('/usuario_conversas/' + usuarioEmailB64 + '/' + contatoEmail)
					.set({ nome: contatoNome, email: b64.decode(contatoEmail), data: data, foto: fotoPerfil })
						.then(() => {
							firebase.database().ref('usuarios/' + contatoEmail).once('value', snapshot => {
								const geral = snapshot.val();
								var notificacaoMsg = geral.notificacaoMsg;
								notificacaoMsg++;
								firebase.database().ref('usuarios/' + contatoEmail).update({ notificacaoMsg: notificacaoMsg})
							})
						})
			})
			.then(() => {
				firebase.database().ref('/usuarios/' + usuarioEmailB64)
					.once('value')
					.then(snapshot => {
						const dadosUsuario = snapshot.val();
						firebase.database().ref('/usuario_conversas/' + contatoEmail + '/' + usuarioEmailB64)
							.set({ nome: dadosUsuario.nome, email: usuarioEmail, data: data, foto: dadosUsuario.foto });
					});
			});
	};
};

export const listaConversasUsuarioFetch = () => {
	const conversas = [];
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		if (currentUser) {
			const emailUsuarioB64 = b64.encode(currentUser.email);
			firebase.database().ref('/usuario_conversas/' + emailUsuarioB64).orderByChild('data')
				.once('value', snapshot => {
					snapshot.forEach((snap) => {
						const duck = snap.val();

						conversas.push(duck);
					})
					dispatch({ type: 'LISTAX', payload: conversas });
				});
		}
	};
};

export const excluirConversas = email => {
	const emailUsuarioExcluirB64 = b64.encode(email);
	const { currentUser } = firebase.auth();
	const emailUsuarioB64 = b64.encode(currentUser.email);
	var adaRef = firebase.database().ref('/usuario_conversas/' + emailUsuarioB64 + '/' + emailUsuarioExcluirB64);
	adaRef.remove()
	listaConversasUsuarioFetch()
};
