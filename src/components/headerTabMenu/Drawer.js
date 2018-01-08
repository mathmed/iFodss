import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList, StatusBar } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';
import b64 from 'base-64';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { signOut } from '../../actions/autenticacaoActions.js';
import { alteraDrawer } from '../../actions/perfilActions.js'

const avatar = require('../../imgs/avatar.png');


class DrawerTela extends Component {
	constructor(props){
		super(props);
		const lista = [
			{key: 0, title: 'Procurar pessoas', img: 'search', onPress:() => Actions.pesquisar() },
			{key: 1, title: 'Meu perfil', img: 'perm-identity', onPress: () => Actions.telafoto({ title: 'Meu perfil', email: b64.encode(this.state.email)})},
			{key: 2, title: 'Alterar senha', img: 'build', onPress:() => Actions.configuracoes() },
			{key: 3, title: 'Editar perfil', img: 'settings',onPress: () => Actions.perfil() },
			{key: 4, title: 'Deslogar', img: 'power-settings-new', onPress: () => this.props.signOut() },
			{key: 5, title: 'Voltar', img: 'arrow-back', onPress: () => this.props.alteraDrawer('saiu')}

		]
		this.state = {
			image: '',
			nome: '',
			email: '',
			lista: lista
		}
	}
	componentWillMount(){
		const { currentUser } = firebase.auth();
		if(currentUser){
			const email = currentUser.email;
			const emailB64 = b64.encode(email);
				firebase.database().ref('usuarios/' + emailB64).once('value', (snapshot) => {
					const info = snapshot.val();
					this.setState({ nome: info.nome, email: info.emailCriar });
					if (info.foto) {
						this.setState({ image: info.foto });
					}
			});
		}
	}
	renderRow = (item) => {
		return(
			<TouchableHighlight onPress = {item.onPress} underlayColor = 'transparent'>

				<View style = {{ flex: 1, borderBottomWidth: 0.5, borderColor: '#CCC', marginHorizontal: 7, marginVertical: 5, flexDirection: 'row', backgroundColor: 'snow' }}>
					<View style = {{ margin: 10, alignItems: 'center', justifyContent: 'center' }}>
						<Icon name = {item.img} size = {18} color = {'#008080'} />
					</View>

					<View style = {{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
						<Text style = {{ fontSize: 12, fontWeight: 'bold', color: 'grey' }}> {item.title} </Text>
					</View>
				</View>
			</TouchableHighlight>


		)
	}
	render() {
		return(
			<View style = {{ flex: 1, backgroundColor: 'snow'}}>
				<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'snow' }}>
					{this.state.image ? <UserAvatar size="70" name="AvishayBar" src = {this.state.image} /> : 
					<UserAvatar size="70" name="MM" component = {{ avatar }} /> }
					<Text style = {{ fontSize: 12, color: 'grey', fontWeight: 'bold', marginTop: 15 }}> {this.state.nome} </Text>
				</View>
				<View style = {{ marginBottom: 50, backgroundColor: 'snow' }}>
					<FlatList
						extraData = {this.state.lista}
						data = {this.state.lista}
						renderItem = {({item}) => this.renderRow(item)}
					/>
				</View>
			</View>




		)
	}
}
const mapStateToProps = state => (
    {
    	nome: state.perfilReducers.nome,
    	foto: state.perfilReducers.foto,
    	statusDrawer: state.perfilReducers.statusDrawer
    }
);

export default connect(mapStateToProps, { signOut, alteraDrawer })(DrawerTela);