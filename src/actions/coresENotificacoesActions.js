import firebase from 'firebase';
import b64 from 'base-64';

export const alteraCor = (tipo) => {
	const {currentUser} = firebase.auth()
	if(currentUser) {
		var obj = {coracao: '', home: '', mais: '', conversa: ''}
		switch(tipo) {
			case 1:
				obj = { coracao: 'grey', home: 'snow', mais: 'snow', conversa: 'snow'}
				return{ type: 'ALTERA_COR', payload: obj}
			case 2:
				obj = { coracao: 'snow', home: 'grey', mais: 'snow', conversa: 'snow'}
				return{ type: 'ALTERA_COR', payload: obj}
			case 3:
				obj = { coracao: 'snow', home: 'snow', mais: 'grey', conversa: 'snow'}
				return{ type: 'ALTERA_COR', payload: obj}
			case 4:
				obj = { coracao: 'snow', home: 'snow', mais: 'snow', conversa: 'grey'}
				return{ type: 'ALTERA_COR', payload: obj}
		}
	}
}

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