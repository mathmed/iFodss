import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/principalStyles.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { limpaNotificacoes } from '../../actions/coresENotificacoesActions.js'
import firebase from 'firebase';
import b64 from 'base-64';
import Header from './Header.js';
import Feed from '../Feed.js';
import NovoPostTela from '../NovoPostTela.js';
import TelaRelacoes from '../TelaRelacoes.js';   				// POSSÍVEIS TELAS
import TelaConversas from '../TelaConversas.js';

class TabInferior extends Component {
	constructor(props) {
		super(props);
		this.state = { notificacaoMsg: '', notificacaoRelacao: '', tela: (<Feed/>), corFeed: 'grey',
		corRelacao: 'snow', corMsg: 'snow', corNovoPost: 'snow' }
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
	componentWillReceiveProps() {
		const { currentUser } = firebase.auth();
		if(currentUser){
		firebase.database().ref('usuarios/' + b64.encode(currentUser.email)).on('value', snapshot => {
				const info = snapshot.val()
				this.setState({ notificacaoMsg: info.notificacaoMsg, notificacaoRelacao: info.notificacaoRelacao })
			})
		}
	}	
	




	chamarTela(tipo) {
		switch(tipo) {
			case 1:
				this.props.limpaNotificacoes(2)
				return( this.setState({ tela: (<TelaRelacoes /> ), corRelacao: 'grey', corFeed: 'snow', corMsg: 'snow', corNovoPost: 'snow', notificacaoRelacao: ''}))
			case 2:
				this.props.limpaNotificacoes(1)
				return(this.setState({ tela: (<TelaConversas /> ), corRelacao: 'snow', corFeed: 'snow', corMsg: 'grey', corNovoPost: 'snow', notificacaoMsg: ''}))


		}

	}
	render() {
		return (
			<View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
				<StatusBar backgroundColor = '#f6546a' />
				<Header />
				{this.state.tela}
				<View style = {styles.viewTabInferior}>
					<View style = {{ flexDirection: 'row' }}>
						<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(1)} >
							<Icon name = 'favorite' size = {25} color =  {this.state.corRelacao} />
						</TouchableHighlight>
						<View>
							<Text style = {{ fontWeight: 'bold', color: 'red' }}>{this.state.notificacaoRelacao}</Text>
						</View>
					</View>

					<View style = {{ flexDirection: 'row' }}>
						<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.setState({ tela: (<Feed /> ), corRelacao: 'snow', corFeed: 'grey', corMsg: 'snow', corNovoPost: 'snow'})} >
								<Icon name = 'home' size = {25} color = {this.state.corFeed} />
						</TouchableHighlight>
					</View>

					<View style = {{ flexDirection: 'row' }}>
						<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.setState({ tela: (<NovoPostTela /> ), corRelacao: 'snow', corFeed: 'snow', corMsg: 'snow', corNovoPost: 'grey'})} >
							<Icon name = 'add-circle' size = {25} color = {this.state.corNovoPost} />
						</TouchableHighlight>
					</View>

					<View style = {{ flexDirection: 'row' }}>
						<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(2)} >
							<Icon name = 'chat' size = {25} color = {this.state.corMsg} /> 
						</TouchableHighlight>
						<View>
							<Text style = {{ fontWeight: 'bold', color: 'red' }}>{this.state.notificacaoMsg}</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => (
    {}
);

export default connect(mapStateToProps, { limpaNotificacoes })(TabInferior);