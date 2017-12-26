import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import { Alert } from 'react-native';
//import FBSDK, {LoginManager, AcessToken} from 'react-native-fbsdk'

export const alteraCheckBoxMasculino = (check) => {
		const aux = {
			feminino: check,
			masculino: !check

		};
		return {
			type: 'MODIFICA_MASCULINO',
			payload: aux
		};
};

export const alteraCheckBoxFeminino = (check) => {
		const aux = {
			masculino: check,
			feminino: !check
		};
		return {
			type: 'MODIFICA_FEMININO',
			payload: aux

		};
};

export const cadastraUsuario = ({ nome, email, senha, sexo }) => {
	const cidade = '';
	const bio = "Ola! Eu sou " + nome;
	const foto = '';
	const idade = '';
	const emailCriar = email.toLowerCase();
	return dispatch => {
		dispatch({ type: 'CADASTRO_EM_ANDAMENTO' });
			if (nome.length >= 4) {
				firebase.auth().createUserWithEmailAndPassword(emailCriar, senha)
					.then(user => {
						const emailB64 = b64.encode(emailCriar);
						firebase.database().ref('usuarios/' + emailB64).set({ nome, sexo, cidade, bio, foto, emailCriar, idade, notificacaoMsg: '', notificacaoRelacao: '' })
							.then(value => cadastroUsuarioSucesso(dispatch));
					})
					.catch(erro => cadastroUsuarioErro(erro, dispatch));
			} else {
				Alert.alert('Erro', 'Não foi possível realizar o cadastro');

				cadastroUsuarioErro(1, dispatch);
			}
		};
};

export const cadastroUsuarioSucesso = (dispatch) => {
	dispatch({ type: 'CADASTRO_USUARIO_SUCESSO' });
	Actions.tabinferior();
};

export const cadastroUsuarioErro = (erro, dispatch) => {
	if (erro !== 1) {
		Alert.alert('Erro', 'Não foi possível realizar o cadastro');
	}
	dispatch({ type: 'CADASTRO_USUARIO_ERRO', payload: erro.message });
};

export const modificaDadosCadastroElogin = (texto, dado) => {
	switch (dado) {
		case 1:
			return {
				type: 'MODIFICA_EMAIL',
				payload: texto
			};
		case 2:
			return {
				type: 'MODIFICA_SENHA',
				payload: texto
			};
		case 3:
			return {
				type: 'MODIFICA_NOME',
				payload: texto
			};
		default:
			return 0;
	}
};

export const autenticar = ({ email, senha }) => {
	const emailCriar = email.toLowerCase();
	return dispatch => {
		dispatch({ type: 'LOGIN_EM_ANDAMENTO' });
		firebase.auth().signInWithEmailAndPassword(emailCriar, senha)
			.then(value => aposAutenticar(dispatch))
		.catch(erro => loginUsuarioErro(erro, dispatch));
	};
};

const aposAutenticar = (dispatch) => {
		const email = firebase.auth().currentUser.email;
		const emailB64 = b64.encode(email.toLowerCase());
			firebase.database().ref('usuarios/' + emailB64).once('value', (snapshot) => {
				const info = snapshot.val();
				Actions.tabinferior();
				dispatch({ type: 'LOGIN_USUARIO_SUCESSO', payload: info });
		});
};

const loginUsuarioErro = (erro, dispatch) => {
	Alert.alert('Erro', 'Não foi possível realizar o login');
	dispatch({ type: 'LOGIN_USUARIO_ERRO', payload: erro.message });
};

export const validateToken = () => { 
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: 'SET_USUARIO_FIREBASE', payload: user });
                dispatch({ type: 'TOKEN_VALIDATED', payload: true });
            } else {
                dispatch({ type: 'TOKEN_VALIDATED', payload: false });
            }
        });
    };
};

export const signOut = () => {
    return dispatch => {
		Actions.login();
        firebase.auth().signOut().then(result => {
            dispatch({ type: 'LOGIN_USUARIO_ERRO', payload: '' });
        }, e => {});
    };
};

export const autenticacaoDireta = () => {
		return dispatch => {
			const email = firebase.auth().currentUser.email;
			const emailB64 = b64.encode(email.toLowerCase());
			firebase.database().ref('usuarios/' + emailB64).once('value', (snapshot) => {
			const info = snapshot.val();
			dispatch({ type: 'LOGIN_USUARIO_SUCESSO', payload: info });
			});
		};
};

export const alterarSenha = (senha) => {
	if(senha.length >= 6){
		const {currentUser} = firebase.auth();
		try{
			currentUser.updatePassword(senha).then(() => Alert.alert('Êxito', 'Senha alterada com sucesso!'))
			return{type: 'ALTERA_SENHA_CONCLUIDO', payload: ''}

		}catch(erro){
			Alert.alert('Erro', 'Você deve ter feito login recentemente para alterar sua senha.')
			return{type: 'ALTERA_SENHA_CONCLUIDO', payload: ''}

		}
	}else{
		Alert.alert('Erro', 'Senha muito curta');
		return{type: 'ALTERA_SENHA_CONCLUIDO', payload: ''}

	}
}

export const enviaConfirmacao = (email) =>{
	var auth = firebase.auth();
	auth.sendPasswordResetEmail(email).then(function() {
	  // Email sent.
	}).catch(function(error) {
	  // An error happened.
	});
	return{type: 'EMAIL_VERIFICACAO', payload: ''}
}
/*export const loginFacebook = () =>{
	LoginManager.logInWithReadPermissions(['public_profile', 'email']).then
		(function(result) {
	    if (result.isCancelled) {
	      alert("Login Cancelled");
	    } else {
	      AcessToken.getCurrentAcessToken().then((acessTokenData) =>{
	      	const credential = firebase.auth.FacebookAuthProvider.credential(acessTokenData.acessToken)
	      	firebase.auth().signInWithCredential(credential).then((result) =>{
	      	}, (error) => {
	      		alert(error)
	      	})
	      }, (error => {
	      	alert('erro')
	      }))
	    }
	  }, function(error) {
	     alert("some error occurred!!");
	  })
	} */

