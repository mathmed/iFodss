import firebase from 'firebase';

export const listarFeed = () => {
	const feed = [];
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		if (currentUser) {
			firebase.database().ref('/feed/').orderByChild('data')
				.on('value', snapshot => {
					snapshot.forEach((snap) => {
					const duck = snap.val();
					feed.push(duck);
					});
				dispatch({ type: 'LISTAS', payload: feed });
				});
		}
	};
};

