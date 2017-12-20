import React, {Component} from 'react';
import {connect} from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import {View, Text, TextInput, Image, TouchableHighlight, ListView} from 'react-native'
import {conversaUsuarioFetch , modificaMensagem, enviaMensagem} from '../actions/mensagemActions.js'
import Icon from 'react-native-vector-icons/MaterialIcons';

class Conversa extends Component {
	componentWillMount() {
		this.props.conversaUsuarioFetch(this.props.email)
		this.criaFonteDeDados(this.props.conversa)
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.email != nextProps.email){
			this.props.conversaUsuarioFetch(nextProps.email)
		}
		this.criaFonteDeDados(nextProps.conversa)
	}
	_enviaMensagem(){
		const {mensagem, nome , email, fotoPerfil} = this.props
		this.props.enviaMensagem(mensagem,nome,email,fotoPerfil)
	}
	criaFonteDeDados(conversa){
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1!== r2})
		this.dataSource = ds.cloneWithRows(conversa)
	}
	renderRow(texto){
		if(texto.tipo === 'e'){
			return(
				<View style = {{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}}>
					<Text style ={{fontSize: 18, color: 'black', padding: 10, backgroundColor: '#dbf5b4', elevation:1}}> {texto.mensagem} </Text>
					<Text style ={{fontSize: 12, color: 'black', padding: 10, backgroundColor: '#dbf5b4', elevation:1}}> {texto.date} </Text>

				</View>


			)
		}else{
			return(
				<View style = {{alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40}}>
					<Text style ={{fontSize: 18, color: 'black', padding: 10, backgroundColor: 'white', elevation:1}}>{texto.mensagem}</Text>
					<Text style ={{fontSize: 12, color: 'black', padding: 10, backgroundColor: 'white', elevation:1}}> {texto.date} </Text>
				</View>
			)
		}
	}


	render(){
		return(
			<View style ={{flex: 1, marginTop: 50, backgroundColor: '#e6e6ff', padding: 10}}>
				<View style = {{flex: 1, paddingBottom: 20}}>
					<ListView
						enableEmptySections
						dataSource = {this.dataSource}
						renderRow = {this.renderRow}
					>
					</ListView>
				</View>

				<View style = {{flexDirection: 'row', borderWidth:3, borderColor: 'grey'}} >
					<TextInput
						value = {this.props.mensagem}
						style = {{flex: 4, fontSize: 18}}
						onChangeText = {texto => this.props.modificaMensagem(texto)}
					/>


					<TouchableHighlight onPress = {this._enviaMensagem.bind(this)} underlayColor = 'transparent'>
						<Icon name = {'send'} size = {40} color = {'#f6546a'} />
					</TouchableHighlight>



				</View>
			</View>
		)
	}
}
mapStateToProps = state => {
	const conversa = _.map(state.mensagemReducers, (val,uid) => {
		return{...val,uid}
	})
	return{
		conversa,
		mensagem: state.enviaMensagemReducers.mensagem

	}

}



export default connect(mapStateToProps, {conversaUsuarioFetch, modificaMensagem, enviaMensagem})(Conversa)