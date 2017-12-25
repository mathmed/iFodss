import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableHighlight, Image, ActivityIndicator } from 'react-native';
import { Kaede } from 'react-native-textinput-effects';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/loginCadastro.js';
import { connect } from 'react-redux';

import { modificaDadosCadastroElogin, autenticar } from '../actions/autenticacaoActions.js';

class Login extends Component {
	_renderizarBotao() {
        if (this.props.loadingLogin) {
			return (<ActivityIndicator size = 'large' />);
	}

		return (
			<View style = {{ marginTop: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
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
			<ImageBackground style = {{ flex: 1, width: null }} source = {require('../imgs/fundo.jpg')}>

				<View style = {styles.viewPrincipal}>
					<View style = {styles.viewLogo}>
						<Text style = {[styles.textoLogo, { color: '#f6546a' }]}>iFods</Text>
					</View>

					<View style = {styles.viewEntradas}>
						<View style = {{ margin: 10 }}>
							<Kaede
								label={'E-Mail'}
								style={{ backgroundColor: '#f9f5ed' }}
								labelStyle={{ color: 'grey', backgroundColor: 'snow' }}
								inputStyle={{ color: 'black', backgroundColor: 'snow' }}
								value = {this.props.email}
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 1)}
							/>
						</View>

						<View style = {{ margin: 10 }}>
							<Kaede
								style={{ backgroundColor: '#f9f5ed' }}
								label={'Senha'}
								labelStyle={{ color: 'grey', backgroundColor: 'snow' }}
								inputStyle={{ color: 'black', backgroundColor: 'snow' }}
								secureTextEntry = {true}
								value = {this.props.senha}
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 2)}

							/>
						</View>

						{this._renderizarBotao()}




						<View style = {{ marginTop: 10, alignItems: 'center', justifyContent: 'center', flex: 1}}>
							<TouchableHighlight onPress = {() => Actions.cadastro()} underlayColor = 'transparent'>
								<Text style = {[styles.textoLogo, { fontSize: 18, color: 'snow' }]}> Cadastre-se! </Text>
							</TouchableHighlight>
						</View>

						<View style = {{ marginTop: 10, alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 5 }}>
							<TouchableHighlight onPress = {() => Actions.recuperacao()} underlayColor = 'transparent'>
								<Text style = {[styles.textoLogo, { fontSize: 18, color: 'snow' }]}> Esqueci minha senha </Text>
							</TouchableHighlight>
						</View>
			
					</View>

				</View>
			</ImageBackground>

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