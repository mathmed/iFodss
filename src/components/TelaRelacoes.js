import React, { Component } from 'react';
import { View, Text, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import UserAvatar from 'react-native-user-avatar';
import { listaRelacoesFetch, novoMete } from '../actions/relacoesActions.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropdownAlert from 'react-native-dropdownalert';

class TelaRelacoes extends Component {
	constructor(props) {
		super(props);
		const itens = 
			{ key: 1, backgroundColor: '#f6546a', type: 'custom', title: 'Opa!', message: 'Você deu um mete em ' };
		this.state = { itens: itens };
    }
	componentWillMount() {
		this.props.listaRelacoesFetch();
	}


	novoMete1(nome, emailB64, fotoPerfil, idade, cidade, sexo) {
		novoMete(nome, emailB64, fotoPerfil, idade, cidade, sexo);
		this.showAlert(nome);
	}

	renderRow = (ultimas) => {
		if (ultimas.tipo === 'recebeu') {
			return (
					<View style={{ flex: 1, padding: 50, borderBottomWidth: 1, borderColor: '#CCC', justifyContent: 'space-between', margin: 5 }}>
						<View style = {{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
							<TouchableOpacity  underlayColor = 'transparent' onPress = {() => Actions.telafoto({ email: b64.encode(ultimas.email), title: 'Perfil de ' + ultimas.nome })}>
								<UserAvatar size="55" name="MM" src = {ultimas.foto} />
							</TouchableOpacity >
							<Text style={{ fontSize: 14, marginLeft: 10 }}> Você recebeu um mete de {ultimas.nome}, {ultimas.idade} </Text>
						</View>
						<View style = {{ alignItems: 'center', justifyContent: 'center' }}>
							<Text style = {{fontSize: 12}}> {ultimas.dataRelacao} </Text>
						</View>
						<View style = {{ flexDirection: 'row', margin: 10, alignItems: 'space-around', justifyContent: 'center' }}>
								<View style = {{ margin: 5 }}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.novoMete1(ultimas.nome, b64.encode(ultimas.email), ultimas.foto, ultimas.idade, ultimas.cidade, ultimas.sexo)} >
										<Icon name = 'favorite' size = {40} color = '#f6546a' />
									</TouchableHighlight>
								</View>
								<View style = {{ margin: 5 }}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.conversa({ title: ultimas.nome, email: b64.encode(ultimas.email), nome: ultimas.nome, fotoPerfil: ultimas.foto })} >
										<Icon name = 'chat' size = {40} color = '#f6546a' />
									</TouchableHighlight>
								</View>
						</View>

					</View>
			);
		} else {
			return (
					<View style={{ flex: 1, padding: 50, borderBottomWidth: 1, borderColor: '#CCC', justifyContent: 'space-between', margin: 5 }}>
						<View style = {{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
							
							<TouchableOpacity  underlayColor = 'transparent' onPress = {() => Actions.telafoto({ email: b64.encode(ultimas.email), title: 'Perfil de ' + ultimas.nome })}>
								<UserAvatar size="55" name="MM" src = {ultimas.foto} />
							</TouchableOpacity >
							<Text style={{ fontSize: 14, marginLeft: 10}}> Você enviou um mete para {ultimas.nome}, {ultimas.idade} </Text>
						</View>
						<View style = {{ alignItems: 'center', justifyContent: 'center' }}>
							<Text style = {{fontSize: 12}}>{ultimas.dataRelacao}</Text>
						</View>
						<View style = {{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
								<View style = {{ alignItems: 'center', justifyContent: 'center' }}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.conversa({ title: ultimas.nome, email: b64.encode(ultimas.email), nome: ultimas.nome, fotoPerfil: ultimas.foto })} >
										<Icon name = 'chat' size = {40} color = '#f6546a' />
									</TouchableHighlight>
								</View>
						</View>
					</View>
				);
		}
	}

	render() {
		return (
			<View style = {{ backgroundColor: 'snow', flex:8.5 }}>
				<FlatList
					data = {this.props.ultimas}
					renderItem = {({item}) => this.renderRow(item)}
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
    showAlert(nome) {
		if (this.state.itens.type === 'close') {
			this.closeAlert();
		} else {
			const title = this.state.itens.title;
			this.dropdown.alertWithType(this.state.itens.type, title, this.state.itens.message + nome);
		}
	}

  closeAlert = () => {
    this.dropdown.close();
  }
  
  onClose(data) {
  }
}


const mapStateToProps = state => {
	const ultimas = _.map(state.relacoesReducers, (val, uid) => {
		return { ...val, uid };
	});

	return { ultimas };
};


export default connect(mapStateToProps, { listaRelacoesFetch })(TelaRelacoes);
