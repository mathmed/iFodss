const INITIAL_STATE = {
	foto: '',
	status: '',
	carregando: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'MODIFICA_STATUS':
			return { ...state, status: action.payload };
		case 'PUBLICADO_COM_SUCESSO':
			return { ...state, status: '', foto: '', carregando: false };
		case 'PUBLICAR_ANDAMENTO':
			return { ...state, status: '', foto: '', carregando: true };
		default:
			return state;
	}
};
