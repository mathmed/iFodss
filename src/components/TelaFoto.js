import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TouchableHighlight } from 'react-native';
import firebase from 'firebase';
import { novoMete } from '../actions/relacoesActions.js';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropdownAlert from 'react-native-dropdownalert';


class TelaFoto extends Component {

	constructor(props) {
		super(props);
		const itens = 
		{ key: 1, backgroundColor: '#f6546a', type: 'custom', title: 'Opa!', message: 'Você deu um mete em ' };
		this.state = {
			foto: '',
			cidade: '',
			idade: '',
			sexo: '',
			bio: '',
			nome: '',
			itens: itens
		}
	}

	componentWillMount() {
		firebase.database().ref('usuarios/' + this.props.email).once('value', snapshot => {
			const info = snapshot.val();
			this.setState({
				foto: info.foto,
				cidade: info.cidade,
				idade: info.idade,
				sexo: info.sexo,
				bio: info.bio,
				nome: info.nome
			})
		})
	}

 	novoMete1(nome, emailB64, fotoPerfil, idade, cidade, sexo) {
		novoMete(nome, emailB64, fotoPerfil, idade, cidade, sexo);
		this.showAlert(nome);


	}
	render() {
		return (
			<View style = {{ flex: 1, backgroundColor: 'snow' }}>
				<ScrollView>
					<Image source = {{ uri: this.state.foto }} style={{ padding: '50%', margin: 3 }} />
					<View style = {{ alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 15 }}>
						<Text style = {{ fontSize: 16, fontWeight: 'bold', color: 'black'}}> {this.state.nome}, {this.state.idade} anos </Text>
						<Text style = {{ fontSize: 14 }}> Mora em {this.state.cidade} </Text>
						<Text style = {{ fontSize: 14 }}> Sexo {this.state.sexo} </Text>
						<Text style = {{ fontSize: 14 }}> Interesses: {this.state.bio} </Text>
					</View>

					<View style = {{ flexDirection: 'row', marginBottom: 20, justifyContent: 'center' }}>
						<View style = {{}}>
							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.novoMete1(this.state.nome, this.props.email, this.state.foto, this.state.idade, this.state.cidade, this.state.sexo)} >
								<Icon name = 'favorite' size = {30} color = '#f6546a' />
							</TouchableHighlight>
						</View>

						<View style = {{ }}>
							<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.conversa({ title: this.state.nome, email: this.props.email, nome: this.state.nome, fotoPerfil: this.state.foto })} >
								<Icon name = 'chat' size = {30} color = '#f6546a' />
							</TouchableHighlight>
						</View>
					</View>
				</ScrollView>
				<DropdownAlert
					ref={(ref) => this.dropdown = ref}
					containerStyle={{ backgroundColor: '#f6546a' }}
					updateStatusBar = {false}
					showCancel = {true}
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

const mapStateToProps = state => (
	{}
)




export default connect (mapStateToProps, { novoMete })(TelaFoto);