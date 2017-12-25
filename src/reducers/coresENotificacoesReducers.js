const INITIAL_STATE = {
	coracao: 'snow',
	home: 'grey',
	mais: 'snow',
	conversa: 'snow'
};

export default (state = INITIAL_STATE, action) => {
		switch (action.type) {
			case 'ALTERA_COR':
				return{ ...state, coracao: action.payload.coracao, home: action.payload.home, mais: action.payload.mais, conversa: action.payload.conversa }

			default:
				return state;
	}
}