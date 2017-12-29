import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
	viewPrincipal:{
		flex:1,
		backgroundColor: 'snow'
	},

	viewLogo:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 30,
		flex: 0.2, marginBottom: 15
	},

	textoLogo:{
		fontSize:40,
		color: '#f6546a',
		fontWeight: 'bold',
		fontFamily: 'sans-serif-medium'
	},

	botao: {
		backgroundColor: '#a52a2a',
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		width: 170,
		borderRadius:15,
		flexDirection: 'row' 
	},

	botaoAux: {
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		width: 60,
		margin: 20,
		borderRadius: 10,
		flexDirection: 'row'
	}
})

export default styles;