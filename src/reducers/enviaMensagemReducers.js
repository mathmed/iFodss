const INITIAL_STATE ={
	mensagem: ''
}
export default (state = INITIAL_STATE, action) =>{
		switch(action.type){

			case 'MODIFICA_MENSAGEM':
				return{...state, mensagem: action.payload}

			case 'LIMPAR_MENSAGEM':
				return{...state, mensagem: ''}
			default:
				return state;

		}
}