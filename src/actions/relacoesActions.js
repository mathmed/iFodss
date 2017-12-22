import firebase from 'firebase'
import b64 from 'base-64'



export const novoMete = (nome, email, foto, idade, cidade, sexo) => {
	const {currentUser} = firebase.auth();
	const usuarioEmail = currentUser.email;
	const usuarioEmailB64 = b64.encode(usuarioEmail);
	firebase.database().ref('usuarios/'+usuarioEmailB64).once('value', snapshot => {
			const info = snapshot.val()
			const foto1 = info.foto
			const nome1 = info.nome
			const email1 = info.emailCriar
			const idade1 = info.idade
			const cidade1 = info.cidade
			const sexo1 = info.sexo
			firebase.database().ref('/relacoes/'+usuarioEmailB64+'/'+email)
				.set({nome, foto, email: b64.decode(email), idade, tipo: 'enviou', cidade, sexo})
					.then(
						firebase.database().ref('/relacoes/'+email+'/'+usuarioEmailB64)
							.set({nome: nome1, foto: foto1, idade: idade1, email: email1, tipo: 'recebeu', cidade: cidade1, sexo: sexo1})
					)
		})
}

export const listaRelacoesFetch = () => {
	const {currentUser} = firebase.auth();
	return (dispatch) => {
		let emailUsuarioB64 = b64.encode(currentUser.email);
		firebase.database().ref('/relacoes/' + emailUsuarioB64)
			.on('value', snapshot => {
				dispatch({type: "LISTAXX", payload: snapshot.val()})
			})
	}
}