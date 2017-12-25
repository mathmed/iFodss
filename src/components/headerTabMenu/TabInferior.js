import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/principalStyles.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { alteraCor, limpaNotificacoes } from '../../actions/coresENotificacoesActions.js'
import firebase from 'firebase';
import b64 from 'base-64';

class TabInferior extends Component {
	constructor(props) {
		super(props);
		this.state = { notificacaoMsg: '', notificacaoRelacao: '' }
	}

	componentWillMount() {
		const { currentUser } = firebase.auth();
		if(currentUser){
		firebase.database().ref('usuarios/' + b64.encode(currentUser.email)).once('value', snapshot => {
				const info = snapshot.val()
				this.setState({ notificacaoMsg: info.notificacaoMsg, notificacaoRelacao: info.notificacaoRelacao })
			})
		}
	}




	chamarTela(tipo) {
		switch(tipo) {
			case 1:
				Actions.inicial({ valor: 1});
				this.props.alteraCor(1)
				this.props.limpaNotificacoes(2)
				break;
			case 2:
				Actions.inicial({ valor: 2})
				this.props.alteraCor(2)
				break;
			case 3:
				Actions.inicial({ valor: 3});
				this.props.alteraCor(3)
				break;
			case 4:
				Actions.inicial({ valor: 4})
				this.props.alteraCor(4)
				this.props.limpaNotificacoes(1)
				break;

		}

	}
	render() {
		return (
			<View style = {styles.viewTabInferior}>
				<View style = {{ flexDirection: 'row' }}>
					<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(1)} >
						<Icon name = 'favorite' size = {25} color =  {this.props.coracao} />
					</TouchableHighlight>
					<View>
						<Text style = {{ fontWeight: 'bold', color: 'red' }}>{this.state.notificacaoRelacao}</Text>
					</View>
				</View>

				<View style = {{ flexDirection: 'row' }}>
					<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(2)} >
							<Icon name = 'home' size = {25} color = {this.props.home} />
					</TouchableHighlight>
				</View>

				<View style = {{ flexDirection: 'row' }}>
					<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(3)} >
						<Icon name = 'add-circle' size = {25} color = {this.props.mais} />
					</TouchableHighlight>
				</View>

				<View style = {{ flexDirection: 'row' }}>
					<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(4)} >
						<Icon name = 'chat' size = {25} color = {this.props.conversa} /> 
					</TouchableHighlight>
					<View>
						<Text style = {{ fontWeight: 'bold', color: 'red' }}>{this.state.notificacaoMsg}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => (
    {
    	coracao: state.coresENotificacoesReducers.coracao,
    	home: state.coresENotificacoesReducers.home,
    	mais: state.coresENotificacoesReducers.mais,
    	conversa: state.coresENotificacoesReducers.conversa
    }
);

export default connect(mapStateToProps, { alteraCor, limpaNotificacoes })(TabInferior);