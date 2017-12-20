import firebase from 'firebase'
import b64 from 'base-64'


export const listarFeed = () => {
	const {currentUser} = firebase.auth();
	return (dispatch) => {
		let emailUsuarioB64 = b64.encode((currentUser.email).toLowerCase());
		firebase.database().ref('feed/').orderByChild("data")
			.on('value', snapshot => {
				dispatch({type: "LISTAS", payload: snapshot.val()})
			})
	}
}
