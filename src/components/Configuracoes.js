import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { signOut, alterarSenha, modificaDadosCadastroElogin } from '../actions/autenticacaoActions.js';
import { connect } from 'react-redux';
import { modificaDadosPerfil, salvarDados, salvarFoto } from '../actions/perfilActions.js';


const SECTIONS = [
  { title: 'Alterar senha' }

];

class Configuracoes extends Component {


  _renderHeader(section) {
    return (
    <View style = {{ alignItems: 'center', marginTop: 15 }}>
			<View style = {{ marginTop: 15, backgroundColor: '#f6546a', borderRadius: 20, height: 30, width: 120, alignItems: 'center', justifyContent: 'center' }}>
	        	<Text style = {{ fontSize: 16, color: 'snow', fontWeight: 'bold' }}>{section.title}</Text>
	     	</View>
    </View>
    );
  }

  salvar() {
  	this.props.alterarSenha(this.props.senha);
  }
  _renderContent = (section) => {
    return (
		<View style = {{ margin: 20, alignItems: 'center' }}>


			<View>
				<TextInput
					secureTextEntry
					placeholder='Nova senha'
					placeholderTextColor = 'grey'
					style = {{  width: 150, height: 40, borderBottomWidth: 3, borderBottomColor: '#f6546a' }}
					value = {this.senha}
					onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 2)}
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
		render() {
			return (
				<View style = {{ backgroundColor: 'snow', flex: 1 }}>
					<Accordion
						sections={SECTIONS}
						renderHeader={this._renderHeader}
						renderContent={this._renderContent}
						underlayColor = {'transparent'}
					/>
					<View style = {{ alignItems: 'center', marginTop: 15 }}>
						<TouchableHighlight onPress = {() => this.props.signOut()} underlayColor = 'transparent' >
							<View style = {{ marginTop: 15, backgroundColor: '#f6546a', borderRadius: 20, height: 30, width: 120, alignItems: 'center', justifyContent: 'center' }}>
								<Text style = {{ fontSize: 16, color: 'snow', fontWeight: 'bold' }}>Deslogar</Text>
							</View>
						</TouchableHighlight>
					</View>

				</View>
		);
	}
}

const mapStateToProps = state => (
    {
    	senha: state.autenticacaoReducers.senha
    }
);


export default connect (mapStateToProps, { signOut, alterarSenha, modificaDadosCadastroElogin })(Configuracoes);