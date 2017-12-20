import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'
import b64 from 'base-64'
//import FBSDK, {LoginManager, AcessToken} from 'react-native-fbsdk'


export const alteraCheckBoxMasculino = (check) => {
		let aux = {
			feminino: check,
			masculino: !check

		}
		return{
			type: 'MODIFICA_MASCULINO',
			payload: aux
		}

}

export const alteraCheckBoxFeminino = (check) => {

		let aux = {
			masculino: check,
			feminino: !check

		}
		return{
			type: 'MODIFICA_FEMININO',
			payload: aux

		}

}

export const cadastraUsuario = ({nome, email, senha, sexo}) => {
	const cidade = ''
	const bio = 'Ola! Eu sou ' + nome
	const foto = ''
	const idade = ''
	const emailCriar = email.toLowerCase()
	return dispatch => {
		dispatch({type: "CADASTRO_EM_ANDAMENTO"})
			if(nome.length >= 4){
				firebase.auth().createUserWithEmailAndPassword(emailCriar,senha)
					.then(user =>{
						let emailB64 = b64.encode(emailCriar);
						firebase.database().ref('usuarios/'+emailB64).set({nome, sexo, cidade, bio, foto, emailCriar, idade})
							.then(value => cadastroUsuarioSucesso(dispatch))
					})
					.catch(erro=>cadastroUsuarioErro(erro,dispatch))
			}else{
				alert("Informe um nome válido.")
				cadastroUsuarioErro(1, dispatch)
			}
		}
}
export const cadastroUsuarioSucesso =(dispatch) => {
	dispatch( { type: "CADASTRO_USUARIO_SUCESSO"});
	Actions.inicial();

}

export const cadastroUsuarioErro =(erro,dispatch) => {

	dispatch( { type: "CADASTRO_USUARIO_ERRO", payload : erro.message});

}

export const modificaDadosCadastroElogin = (texto, dado) =>{
	switch(dado){
		case 1:
			return{
				type: "MODIFICA_EMAIL",
				payload: texto
			}
		case 2:
			return{
				type: "MODIFICA_SENHA",
				payload: texto
			}
		case 3:
			return{
				type: "MODIFICA_NOME",
				payload: texto
			}

	}
}

export const autenticar = ({email, senha}) =>{
	const emailCriar = email.toLowerCase()
	return dispatch=> {
		dispatch({type: "LOGIN_EM_ANDAMENTO"})
		firebase.auth().signInWithEmailAndPassword(emailCriar,senha)
			.then(value => aposAutenticar(dispatch))
		.catch(erro => loginUsuarioErro(erro,dispatch))
	}
}

const aposAutenticar = (dispatch) => {
		const email = firebase.auth().currentUser.email
		const emailB64 = b64.encode(email.toLowerCase())
			firebase.database().ref("usuarios/"+emailB64).once('value', (snapshot) => {
				const info =  snapshot.val();
				Actions.inicial();
				dispatch({type: "LOGIN_USUARIO_SUCESSO", payload: info})


			

		})
}



const loginUsuarioErro = (erro,dispatch) => {
	alert(erro)
	dispatch( {type : "LOGIN_USUARIO_ERRO", payload : erro.message})
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

