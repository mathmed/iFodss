import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import { alterarSenha, modificaDadosCadastroElogin } from '../actions/autenticacaoActions.js';
import { connect } from 'react-redux';


const SECTIONS = [
  { title: 'Alterar senha' }

];

class Configuracoes extends Component {


  salvar() {
  	this.props.alterarSenha(this.props.senha, this.props.confirmaSenha);
  }



		render() {
			return (
				<View style = {{ backgroundColor: 'snow', flex: 1 }}>
						<View style = {{ padding: 20, margin: 10 }}>
							<TextInput
								secureTextEntry
								placeholder='Nova senha'
								value = {this.senha}
								underlineColorAndroid = '#f6546a'
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 2)}
							/>
							<TextInput
								secureTextEntry
								placeholder='Confirme a nova senha'
								value = {this.senha}
								underlineColorAndroid = '#f6546a'
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 4)}
							/>
						</View>
						<View style = {{ alignItems: 'center', marginTop: 15 }}>
							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.salvar()}>
								<View style = {{ marginTop: 15, backgroundColor: '#f6546a', borderRadius: 20, height: 30, width: 120, alignItems: 'center', justifyContent: 'center' }}>
									<Text style = {{ fontSize: 16, color: 'snow', fontWeight: 'bold' }}>Salvar</Text>
								</View>
							</TouchableHighlight>
						</View>

      			</View>
	
		);
	}
}

const mapStateToProps = state => (
    {
    	senha: state.autenticacaoReducers.senha,
    	confirmaSenha: state.autenticacaoReducers.confirmaSenha
    }
);


export default connect (mapStateToProps, { alterarSenha, modificaDadosCadastroElogin })(Configuracoes);