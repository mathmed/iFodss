import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { listaConversasUsuarioFetch, excluirConversas } from '../actions/mensagemActions.js';
import b64 from 'base-64';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserAvatar from 'react-native-user-avatar';
import DropdownAlert from 'react-native-dropdownalert';

class TelaConversas extends Component {
	constructor(props) {
		super(props);
		const itens = 
			{ key: 1, backgroundColor: '#f6546a', type: 'success', title: 'Sucesso', message: 'Conversa apagada, mas ainda visível para o outro usuário.' };
		this.state = {
			itens:itens
		};
	}
	componentWillMount() {
		this.props.listaConversasUsuarioFetch();
		this.criaFonteDeDados(this.props.ultimas);
	}

	componentWillReceiveProps(nextProps) {
		this.criaFonteDeDados(nextProps.ultimas);
	}

	criaFonteDeDados(ultimas) {
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.fonteDeDados1 = ds.cloneWithRows(ultimas);
	}

	excluirConversas1(email) {
		excluirConversas(email);
		this.showAlert();
	}

	renderRow = (ultimas) => {
		return (
			<TouchableHighlight underlayColor= 'white' onPress = {() => Actions.conversa({ title: ultimas.nome, email: b64.encode(ultimas.email), nome: ultimas.nome, fotoPerfil: ultimas.foto }) }>
				<View style={{ flex: 1, padding: 10, borderBottomWidth: 1, borderColor: '#CCC', flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style = {{ marginLeft: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						<TouchableOpacity onPress = {() => Actions.telafoto({ title: 'Perfil de ' + ultimas.nome , email: b64.encode(ultimas.email)})}>

							<UserAvatar size="50" name="MM" src = {ultimas.foto} />
						</TouchableOpacity>
						<Text style={{ fontSize: 22 }}> {ultimas.nome} </Text>
					</View>
					<View style = {{ marginRight: 15 }}>
						<TouchableHighlight onPress = {() => this.excluirConversas1(ultimas.email)} underlayColor = 'transparent'>
							<Icon name = {'cancel'} size = {20} color = {'red'} />
						</TouchableHighlight>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
	render() {
		return (
			<View style = {{ flex: 8.5, backgroundColor: 'snow' }}>

				<ListView
					enableEmptySections
					dataSource = {this.fonteDeDados1}
					renderRow = {this.renderRow}
				/>
				<DropdownAlert
					ref={(ref) => this.dropdown = ref}
						containerStyle={{ backgroundColor: '#f6546a' }}
						updateStatusBar = {false}
						showCancel={true}
						onClose={(data) => this.onClose(data)}
						onCancel={(data) => this.onClose(data)}
				/>
			</View>
		);
	}
    showAlert() {
		if (this.state.itens.type === 'close') {
			this.closeAlert();
		} else {
			const title = this.state.itens.title;
			this.dropdown.alertWithType(this.state.itens.type, title, this.state.itens.message);
		}
	}

	closeAlert = () => {
		this.dropdown.close();
	}

	onClose(data) {
		console.log(data);
	}
}

const mapStateToProps = state => {
	const ultimas = _.map(state.ultimasConversasReducer, (val, uid) => {
		return { ...val, uid };
	});

	return { ultimas };
};


export default connect(mapStateToProps, { listaConversasUsuarioFetch, excluirConversas })(TelaConversas);
