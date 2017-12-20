import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
	viewPrincipal:{
		flex:1,
		padding:10
	},

	viewLogo:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 30,
		flex: 0.2
	},

	textoLogo:{
		fontSize:40,
		color: '#f6546a',
		fontWeight: 'bold',
		fontFamily: 'sans-serif-medium'
	},

	viewEntradas: {
		marginTop:40,
		padding:10,
		flex: 2
	},

	botao: {
		backgroundColor: '#a52a2a',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		width: 250,
		borderRadius:15,
		flexDirection: 'row' 
	},

	botaoAux: {
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		width: 150,
		borderRadius: 10,
		flexDirection: 'row'
	}
})

export default styles;