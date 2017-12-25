import firebase from 'firebase';
import b64 from 'base-64';
const moment = require('moment');



export const novoMete = (nome, email, foto, idade, cidade, sexo) => {
	const { currentUser } = firebase.auth();
	const usuarioEmail = currentUser.email;
	const usuarioEmailB64 = b64.encode(usuarioEmail);
	const data = -1 * new Date().getTime();
	const d1 = moment().local().format('DD/MM/YYYY');
	const d2 = ' às ';
	const d3 = moment().local().format('h:mm a');
	const dataRelacao = d1 + d2 + d3;
	firebase.database().ref('usuarios/' + usuarioEmailB64).once('value', snapshot => {
			const info = snapshot.val();
			const foto1 = info.foto;
			const nome1 = info.nome;
			const email1 = info.emailCriar;
			const idade1 = info.idade;
			const cidade1 = info.cidade;
			const sexo1 = info.sexo;
			firebase.database().ref('/relacoes/' + usuarioEmailB64 + '/' + email)
				.set({ nome, foto, email: b64.decode(email), idade, tipo: 'enviou', cidade, sexo, data: data, dataRelacao: dataRelacao })
					.then(() => {
						firebase.database().ref('/relacoes/' + email + '/' + usuarioEmailB64)
							.set({ nome: nome1, foto: foto1, idade: idade1, email: email1, tipo: 'recebeu', cidade: cidade1, sexo: sexo1, data: data, dataRelacao: dataRelacao })
					})
						.then(() => {
							firebase.database().ref('usuarios/' + email).once('value', snapshot => {
								const geral = snapshot.val();
								var notificacaoRelacao = geral.notificacaoRelacao;
								notificacaoRelacao++;
								firebase.database().ref('usuarios/' + email).update({ notificacaoRelacao: notificacaoRelacao})
							})
						})
		});
};

export const listaRelacoesFetch = () => {
	const relacoes = [];
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		if (currentUser) {
			const emailUsuarioB64 = b64.encode(currentUser.email);
			firebase.database().ref('/relacoes/' + emailUsuarioB64).orderByChild('data')
				.on('value', snapshot => {
					snapshot.forEach((snap) => {
						const duck = snap.val()
						relacoes.push(duck)
					})
					dispatch({ type: 'LISTAXX', payload: relacoes});
				});
		}
	};
};
