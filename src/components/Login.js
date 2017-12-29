import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableHighlight, Image, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/loginCadastro.js';
import { connect } from 'react-redux';

import { modificaDadosCadastroElogin, autenticar } from '../actions/autenticacaoActions.js';

class Login extends Component {
	_renderizarBotao() {
        if (this.props.loadingLogin) {
			return (<ActivityIndicator size = 'large' color = '#f6546a' />);
	}

		return (
			<View style = {{ alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 40 }}>
				<TouchableHighlight onPress = {() => this._login()} underlayColor = 'transparent'>
					<View style = {styles.botao}>
							<Text style = {[styles.textoLogo, { fontSize: 20, color: 'snow' }]}> Login </Text>
					</View>
				</TouchableHighlight>	

			</View>

		);
	}

	_login() {
		const email = this.props.email;
		const senha = this.props.senha;
		this.props.autenticar({ email, senha });
	}

	render() {
		return (

				<View style = {styles.viewPrincipal}>
					<StatusBar backgroundColor = '#f6546a' />

					<View style = {styles.viewLogo}>
						<Text style = {[styles.textoLogo, { color: '#f6546a' }]}>iFods</Text>
					</View>

					<View style = {{ flex: 2, padding: 20, margin: 10 }}>
							<TextInput
								placeholder = 'E-Mail'
								underlineColorAndroid = '#f6546a'
								value = {this.props.email}
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 1)}
							/>

							<TextInput
								underlineColorAndroid = '#f6546a'
								placeholder = 'Senha'
								secureTextEntry = {true}
								value = {this.props.senha}
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 2)}

							/>
						</View>

						{this._renderizarBotao()}



					<View style = {{ backgroundColor: '#f6546a', flex: 0.8, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>

						<View style = {{ marginTop: 10, alignItems: 'center', justifyContent: 'center', flex: 1}}>
							<TouchableHighlight onPress = {() => Actions.cadastro()} underlayColor = 'transparent'>
								<Text style = {[styles.textoLogo, { fontSize: 14, color: 'snow' }]}> Cadastre-se! </Text>
							</TouchableHighlight>
						</View>

						<View style = {{ marginTop: 10, alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 5 }}>
							<TouchableHighlight onPress = {() => Actions.recuperacao()} underlayColor = 'transparent'>
								<Text style = {[styles.textoLogo, { fontSize: 14, color: 'snow' }]}> Esqueci minha senha </Text>
							</TouchableHighlight>
						</View>
				</View>

				</View>

		);
	}
}


const mapStateToProps = state => (
    {
        email: state.autenticacaoReducers.email,
        senha: state.autenticacaoReducers.senha,
        erroLogin: state.autenticacaoReducers.erroLogin,
        loadingLogin: state.autenticacaoReducers.loadingLogin

    }
);


export default connect (mapStateToProps, { modificaDadosCadastroElogin, autenticar })(Login);
						/*<View style = {{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 }}>
							<TouchableHighlight onPress = {() => alert('a')} underlayColor= 'transparent'>
								<View style = {styles.botaoAux}>
								        <Image style = {{ height: 25, width: 25 }} source = {require('../imgs/f.jpg')} />
								</View>
							</TouchableHighlight>

							<TouchableHighlight onPress = {() => alert('oi')} underlayColor = 'transparent'>
								<View style = {styles.botaoAux}>
								        <Image style = {{ height: 25, width: 25 }} source = {require('../imgs/g.jpg')} />
								</View>
							</TouchableHighlight>		

						</View>*/