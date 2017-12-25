import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Kaede } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import { modificaDadosCadastroElogin, enviaConfirmacao } from '../actions/autenticacaoActions.js';
import DropdownAlert from 'react-native-dropdownalert';



class Recuperacao extends Component {
	constructor(props) {
		super(props);
		const itens = 
		{ key: 1, backgroundColor: '#f6546a', type: 'custom', title: 'Tudo certo!', message: 'Foi enviado um e-mail de redefinição de senha para ' };
		this.state = { itens: itens };
    }

    enviarEmail(){
    	this.props.enviaConfirmacao(this.props.email)
    	this.showAlert()
    }

	render() {
		return (
			<View style = {{ flex: 1, backgroundColor: 'snow' }}>
				<View style = {{ marginTop: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
					<Text style = {{ fontSize: 16, fontWeight: 'bold' }}> Informe seu e-mail </Text>
				</View>

				<View style = {{ margin: 7 }}>
							<Kaede
								label={'E-Mail'}
								style={{ backgroundColor: '#f9f5ed' }}
								labelStyle={{ color: 'snow', backgroundColor: '#f6546a' }}
								inputStyle={{ color: 'grey', backgroundColor: 'snow' }}
								value = {this.props.email}
								onChangeText = {texto => this.props.modificaDadosCadastroElogin(texto, 1)}
							/>
				</View>


				<View style = {{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
					<TouchableHighlight onPress = {() => this.enviarEmail()} underlayColor = 'transparent'>
						<View style = {{ backgroundColor: '#a52a2a',
										alignItems: 'center',
										justifyContent: 'center',
										height: 35,
										width: 170,
										borderRadius:15,
										flexDirection: 'row'}}>
								<Text style = {{ fontSize: 20, color: 'snow' }}> Enviar </Text>
						</View>
					</TouchableHighlight>
				</View>	
				<DropdownAlert
					ref={(ref) => this.dropdown = ref}
					containerStyle={{ backgroundColor: '#f6546a' }}
					updateStatusBar = {false}
					showCancel = {true}
					onClose={(data) => this.onClose(data)}
					onCancel={(data) => this.onClose(data)}
				/>

			</View>


		)
	}
    showAlert(nome) {
		if (this.state.itens.type === 'close') {
			this.closeAlert();
		} else {
			const title = this.state.itens.title;
			this.dropdown.alertWithType(this.state.itens.type, title, this.state.itens.message + this.props.email);
		}
	}

	closeAlert = () => {
		this.dropdown.close();
  }
  
	onClose(data) {
		console.log(data);
  }
}

const mapStateToProps = state => (
    {
        email: state.autenticacaoReducers.email

    }
);


export default connect (mapStateToProps, { modificaDadosCadastroElogin, enviaConfirmacao })(Recuperacao);