import firebase from 'firebase';
import b64 from 'base-64';

export const limpaNotificacoes = (tipo) => {
	const { currentUser } = firebase.auth();
	if(currentUser) {
		switch(tipo) {
			case 1:
				firebase.database().ref('usuarios/' + b64.encode(currentUser.email)).update({notificacaoMsg: ''});
				return{ type: '', payload: ''}
			case 2:
				firebase.database().ref('usuarios/' + b64.encode(currentUser.email)).update({notificacaoRelacao: ''});
				return{ type: '', payload: ''}

		}
	}

}