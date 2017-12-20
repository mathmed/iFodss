import React, {Component} from 'react'
import {View,Text, TouchableHighlight, ListView, Image} from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import {listaConversasUsuarioFetch, excluirConversas} from '../actions/mensagemActions.js'
import b64 from 'base-64'
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserAvatar from 'react-native-user-avatar'

class TelaConversas extends Component{
	
	componentWillMount() {
		this.props.listaConversasUsuarioFetch();
		this.criaFonteDeDados(this.props.ultimas);
		
	}

	componentWillReceiveProps(nextProps) {
		this.criaFonteDeDados(nextProps.ultimas)
	}

	criaFonteDeDados(ultimas){
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1!== r2});
		this.fonteDeDados1= ds.cloneWithRows(ultimas);


	}


	

	renderRow(ultimas, hora){
		return(
			<TouchableHighlight underlayColor= 'white' onPress = {() => Actions.conversa({title: ultimas.nome, email:b64.encode(ultimas.email), nome: ultimas.nome, fotoPerfil: ultimas.foto}) }>
				<View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: "#CCC" , flexDirection: 'row', justifyContent: 'space-between'}}>
					<View style = {{marginLeft: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
						<UserAvatar size="80" name="MM" src = {ultimas.foto} />
						<Text style={{ fontSize: 25}}> {ultimas.nome} </Text>
					</View>
					<View style = {{marginRight: 5}}>
						<TouchableHighlight onPress = {() => excluirConversas(ultimas.email)} underlayColor = 'transparent'>
							<Icon name = {'cancel'} size = {30} color = {'red'} />
						</TouchableHighlight>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
	render(){
		return(
			<View style = {{flex: 8.5}}>

				<ListView
					enableEmptySections
					dataSource = {this.fonteDeDados1}
					renderRow = {this.renderRow }
				/>
			</View>
		)
	}
}

const mapStateToProps = state => {
	const ultimas= _.map(state.ultimasConversasReducer, (val,uid) => {
		return{...val,uid}
	})

	return{ultimas}

}


export default connect(mapStateToProps, {listaConversasUsuarioFetch, excluirConversas})(TelaConversas)