const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) { 
		case 'LISTAX':
			return action.payload;
		default:
			return state;

	}
};
