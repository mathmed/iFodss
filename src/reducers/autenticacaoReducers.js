import {Actions} from 'react-native-router-flux'

const INITIAL_STATE ={
	nome:'',
	email: '',
	senha: '',
	erroCadastro: '',
	erroLogin : '',
	loadingLogin : false,
	loadingCadastro: false,
	valid_token: false,
	erroRedefinir: '',
	checkMasculino: true,
	checkFeminino: false
}

export default (state = INITIAL_STATE, action) =>{
	switch(action.type){
		case 'MODIFICA_MASCULINO':
			return{...state, checkMasculino: action.payload.masculino, checkFeminino: action.payload.feminino}
		case 'MODIFICA_FEMININO':
			return{...state, checkFeminino: action.payload.feminino, checkMasculino: action.payload.masculino}
		case "CADASTRO_EM_ANDAMENTO":
			return{...state, loadingCadastro: true, email: '', senha: '', nome: ''}
		case "CADASTRO_USUARIO_SUCESSO":
			return{...state, loadingCadastro: false}
		case "CADASTRO_USUARIO_ERRO":
			return{...state, loadingCadastro: false}
		case "MODIFICA_EMAIL":
			return{...state, email: action.payload}
		case "MODIFICA_SENHA":
			return{...state, senha: action.payload}
		case "MODIFICA_NOME":
			return{...state, nome: action.payload}
		case "LOGIN_EM_ANDAMENTO":
			return{...state, loadingLogin: true, email: '', senha: ''}

		case "LOGIN_USUARIO_ERRO":
			return{...state, loadingLogin: false}

		default:
			return state;
	}
}