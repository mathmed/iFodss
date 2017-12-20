const INITIAL_STATE ={
	nome: '',
	cidade: '',
	bio: '',
	idade: '',
	foto: '',

	carregando: false
}

export default (state = INITIAL_STATE, action) =>{
		switch(action.type){
		case 'MODIFICA_NOME':
			return{...state, nome: action.payload}
		case "MODIFICA_CIDADE":
			return{...state, cidade: action.payload}
		case "MODIFICA_BIO":
			return{...state, bio: action.payload}
		case "MODIFICA_IDADE":
			return{...state, idade: action.payload}
		case "ANDAMENTO":
			return{...state, carregando: true}
		case "SUCESSO":
			return{...state, carregando: false}
		case 'ERRO':
			return{...state, carregando: false}
		case "LOGIN_USUARIO_SUCESSO":
			return{...state, cidade: action.payload.cidade, bio:action.payload.bio, nome: action.payload.nome, idade: action.payload.idade, foto: action.payload}


			default:
				return state;
	}
}