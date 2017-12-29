import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableHighlight, ActivityIndicator, TextInput } from 'react-native';
import CheckBox from 'react-native-checkbox';
import styles from '../styles/loginCadastro.js';
import { connect } from 'react-redux';
import { alteraCheckBoxFeminino, alteraCheckBoxMasculino, cadastraUsuario, modificaDadosCadastroElogin } from '../actions/autenticacaoActions.js';


class Cadastro extends Component {
	_renderizarBotao() {
        if (this.props.loadingCadastro) {
			return (<ActivityIndicator size = 'large' color = '#f6546a' />);
	}

		return (
			<View style = {{ marginTop: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<TouchableHighlight onPress = {() => this._cadastrar()} underlayColor = 'transparent'>
					<View style = {styles.botao}>
							<Text style = {[styles.textoLogo, { fontSize: 20, color: 'snow' }]}> Cadastrar </Text>
					</View>
				</TouchableHighlight>	

			</View>

		);
	}


	_cadastrar() {
		let sexo = '';
		const nome = this.props.nome;
		const email = this.props.email;
		const senha = this.props.senha;
		if (this.props.checkMasculino) {
			sexo = 'Masculino';
		} else {
			sexo = 'Feminino';
		}

		this.props.cadastraUsuario({ nome, email, senha, sexo });
	}
	render() {
		return (
				<View style = {styles.viewPrincipal}>
						<View style = {{  padding: 20, margin: 10 }}>
							<TextInput
								placeholder = 'E-Mail'
								underlineColorAndroid = '#f6546a'
								value = {this.props.email}
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 1)}
							/>

							<TextInput
								placeholder = 'Senha'
								underlineColorAndroid = '#f6546a'
								secureTextEntry = {true}
								value = {this.props.senha}
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 2)}
							/>

							<TextInput
								placeholder = 'Nome'
								underlineColorAndroid = '#f6546a'
								value = {this.props.nome}
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 3)}
							/>
						</View>

						<View style = {{ margin: 7, justifyContent: 'center', alignItems: 'center' }}>
							<View style = {{ justifyContent: 'space-between', padding: 10, flexDirection: 'row' }}>
								<CheckBox
									label='Masculino'
									labelStyle = {{ color: 'grey' }}
									checked={this.props.checkMasculino}
									onChange={checked => this.props.alteraCheckBoxMasculino(checked)}
								/>
								<CheckBox
									label='Feminino'
									labelStyle = {{ color: 'grey' }}
									checked={this.props.checkFeminino}
									onChange={checked => this.props.alteraCheckBoxFeminino(checked)}
								/>
							</View>
						</View>

						{this._renderizarBotao()}


					</View>


		);
	}
}

const mapStateToProps = state => (
    {
        email: state.autenticacaoReducers.email,
        senha: state.autenticacaoReducers.senha,
        erroCadastro: state.autenticacaoReducers.erroCadastro,
        loadingCadastro: state.autenticacaoReducers.loadingCadastro,
        nome: state.autenticacaoReducers.nome,
        checkMasculino: state.autenticacaoReducers.checkMasculino,
        checkFeminino: state.autenticacaoReducers.checkFeminino

    }
);


export default connect (mapStateToProps, { alteraCheckBoxMasculino, alteraCheckBoxFeminino, cadastraUsuario, modificaDadosCadastroElogin })(Cadastro);