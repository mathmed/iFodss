import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

const INITIAL_STATE = {
	nome: '',
	email: '',
	senha: '',
	erroCadastro: '',
	erroLogin: '',
	loadingLogin: false,
	loadingCadastro: false,
	valid_token: false,
	erroRedefinir: '',
	usuario_firebase: [],
	checkMasculino: true,
	checkFeminino: false,
	senha_alterar: '',
	confirmaSenha: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'MODIFICA_MASCULINO':
			return { ...state, checkMasculino: action.payload.masculino, checkFeminino: action.payload.feminino };
		case 'MODIFICA_FEMININO':
			return { ...state, checkFeminino: action.payload.feminino, checkMasculino: action.payload.masculino };
		case 'CADASTRO_EM_ANDAMENTO':
			return { ...state, loadingCadastro: true, email: '', senha: '', nome: '' };
		case 'CADASTRO_USUARIO_SUCESSO':
			return { ...state, loadingCadastro: false };
		case 'CADASTRO_USUARIO_ERRO':
			return { ...state, loadingCadastro: false };
		case 'MODIFICA_EMAIL':
			return { ...state, email: action.payload };
		case 'MODIFICA_SENHA':
			return { ...state, senha: action.payload };
		case 'MODIFICA_NOME':
			return { ...state, nome: action.payload };
		case 'MODIFICA_CONFIRMA_SENHA':
			return { ...state, confirmaSenha: action.payload };
		case 'LOGIN_EM_ANDAMENTO':
			return { ...state, loadingLogin: true, email: '', senha: '' };
		case 'LOGIN_USUARIO_ERRO':
			return { ...state, loadingLogin: false };
        case 'SET_USUARIO_FIREBASE':
            return { ...state, usuario_firebase: action.payload };
        case 'ALTERA_SENHA_CONCLUIDO':
        	return { ...state, senha: action.payload, confirmaSenha: action.payload}
        case 'ALTERA_SENHA_ERRO':
        	return { ...state, senha: action.payload, confirmaSenha: action.payload}
        case 'EMAIL_VERIFICACAO':
        	return { ...state, email: ''}
        case 'TOKEN_VALIDATED':
            if (action.payload) {
                return { ...state, valid_token: true };
            } else {
                return { ...state, valid_token: false, usuario_firebase: null };
            }

		default:
			return state;
	}
};
