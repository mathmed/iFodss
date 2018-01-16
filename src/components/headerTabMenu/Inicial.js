import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/principalStyles.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { limpaNotificacoes } from '../../actions/coresENotificacoesActions.js'
import { alteraDrawer } from '../../actions/perfilActions.js'
import firebase from 'firebase';
import b64 from 'base-64';
import Feed from '../Feed.js';
import NovoPostTela from '../NovoPostTela.js';
import TelaRelacoes from '../TelaRelacoes.js';   				// POSSÍVEIS TELAS
import TelaConversas from '../TelaConversas.js';
import Drawer from 'react-native-drawer';
import DrawerTela from './Drawer.js'

class Inicial extends Component {
	constructor(props) {
		super(props);
		this.state = { notificacaoMsg: '', notificacaoRelacao: '', tela: (<Feed/>), corFeed: 'grey',
		corRelacao: '#f6546a', corMsg: '#f6546a', corNovoPost: '#f6546a' }
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
				return( this.setState({ tela: (<TelaRelacoes /> ), corRelacao: 'grey', corFeed: '#f6546a', corMsg: '#f6546a', corNovoPost: '#f6546a', notificacaoRelacao: ''}))
			case 2:
				this.props.limpaNotificacoes(1)
				return(this.setState({ tela: (<TelaConversas /> ), corRelacao: '#f6546a', corFeed: '#f6546a', corMsg: 'grey', corNovoPost: '#f6546a', notificacaoMsg: ''}))


		}

	}
	render() {
		return (
			<Drawer ref = {(ref) => this._drawer = ref}
			open = {this.props.statusDrawer}
       		content={<DrawerTela />}
       		openDrawerOffset={0.2}
       		onClose = {() => this.props.alteraDrawer('saiu')}>


       		  	<StatusBar backgroundColor = '#f6546a' />

				<View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
					<View style={styles.viewHeader}>
						<TouchableHighlight underlayColor='transparent' onPress={() => {this.props.alteraDrawer('abriu')}} >
							<Icon name='menu' size={30} color='snow' />
						</TouchableHighlight>

						<Text style={{ 	fontSize: 18, fontWeight: 'bold', fontFamily: 'sans-serif-medium', color: 'snow', marginLeft: '35%'}}> iFods </Text>



					</View>				
				{this.state.tela}
					<View style = {{backgroundColor: 'snow', borderWidth: 2, borderColor: 'snow', borderTopColor: '#f6546a', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', padding: 5, flex: 0.6}}>
						<View style = {{ alignItems: 'center', justifyContent: 'center' }}>
							<View style = {{ flexDirection: 'row' }}>
								<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(1)} >
									<Icon name = 'favorite' size = {22} color =  {this.state.corRelacao} />
								</TouchableHighlight>
								<View>
									<Text style = {{ fontWeight: 'bold', color: 'red', fontSize: 10 }}>{this.state.notificacaoRelacao}</Text>
								</View>
							</View>
							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(1)} >

								<Text style = {{ fontSize: 10 }}> Relações </Text>
							</TouchableHighlight>


						</View>

						<View style = {{ alignItems: 'center', justifyContent: 'center' }}>
							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.setState({ tela: (<Feed /> ), corRelacao: '#f6546a', corFeed: 'grey', corMsg: '#f6546a', corNovoPost: '#f6546a'})} >
									<Icon name = 'home' size = {22} color = {this.state.corFeed} />
							</TouchableHighlight>

							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.setState({ tela: (<Feed /> ), corRelacao: '#f6546a', corFeed: 'grey', corMsg: '#f6546a', corNovoPost: '#f6546a'})} >
								<Text style = {{ fontSize: 10 }}> Feed </Text>
							</TouchableHighlight>

						</View>

						<View style = {{ alignItems: 'center', justifyContent: 'center' }}>
							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.setState({ tela: (<NovoPostTela /> ), corRelacao: '#f6546a', corFeed: '#f6546a', corMsg: '#f6546a', corNovoPost: 'grey'})} >
								<Icon name = 'file-upload' size = {22} color = {this.state.corNovoPost} />
							</TouchableHighlight>

							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.setState({ tela: (<NovoPostTela /> ), corRelacao: '#f6546a', corFeed: '#f6546a', corMsg: '#f6546a', corNovoPost: 'grey'})} >
								<Text style = {{ fontSize: 10 }}> Novo Post </Text>
							</TouchableHighlight>

						</View>

						<View style = {{ alignItems: 'center', justifyContent: 'center' }}>
							<View style = {{ flexDirection: 'row' }}>
								<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(2)} >
									<Icon name = 'forum' size = {22} color = {this.state.corMsg} /> 
								</TouchableHighlight>
								<View>
									<Text style = {{ fontWeight: 'bold', color: 'red', fontSize: 10  }}>{this.state.notificacaoMsg}</Text>
								</View>
							</View>

							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.chamarTela(2)} >

								<Text style = {{ fontSize: 10 }}> Conversas </Text>
							</TouchableHighlight>

						</View>
					</View>
				</View>
			</Drawer>
		);
	}
}

const mapStateToProps = state => (
    {
    	statusDrawer: state.perfilReducers.statusDrawer
    }
);

export default connect(mapStateToProps, { limpaNotificacoes, alteraDrawer })(Inicial);