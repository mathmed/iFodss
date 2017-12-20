import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	viewHeader:{
		backgroundColor: '#f6546a',
		height:70,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding:5,
		flex:0.8
	},

	textoHeader: {
		fontSize: 26,
		fontWeight: 'bold',
		fontFamily: 'sans-serif-medium',
		color: 'snow'
	},

	viewTabInferior:{
		backgroundColor: '#f6546a',
		height:50,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding:5,
		flex: 0.8

	}

})

export default styles;