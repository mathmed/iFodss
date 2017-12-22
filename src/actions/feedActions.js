import firebase from 'firebase'
import b64 from 'base-64'


export const listarFeed = () => {
	var feed = []
	const {currentUser} = firebase.auth();
	return (dispatch) => {
		let emailUsuarioB64 = b64.encode((currentUser.email).toLowerCase());
		firebase.database().ref('/feed/').orderByChild("data")
			.on("value", snapshot => {
				snapshot.forEach((snap) => {
		        const duck = snap.val()
		        feed.push(duck);
    			});
			dispatch({type: "LISTAS", payload: feed})
			})

	}
}


