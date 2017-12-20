import React, {Component} from 'react';
import {View, Text, TouchableHighlight, ListView, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64'
import UserAvatar from 'react-native-user-avatar'
import {listaRelacoesFetch, novoMete} from '../actions/relacoesActions.js'
import Icon from 'react-native-vector-icons/MaterialIcons';

class TelaRelacoes extends Component{
	componentWillMount() {
		this.props.listaRelacoesFetch();
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
		if(ultimas.tipo == "recebeu"){
			return(
					<View style={{ flex: 1, padding: 50, borderBottomWidth: 1, borderColor: "#CCC" , justifyContent: 'space-between', margin: 5}}>
						<View style = {{margin:10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity  underlayColor = 'transparent' onPress = {() => Actions.telafoto({imagem: ultimas.foto, nome: ultimas.nome, idade:ultimas.idade, cidade: ultimas.cidade, sexo: ultimas.sexo, title: 'Perfil de '+ultimas.nome})}>
								<UserAvatar size="30" name="MM" src = {ultimas.foto} />
							</TouchableOpacity >
							<Text style={{ fontSize: 18,marginLeft: 10}}> Você recebeu um mete de {ultimas.nome}, {ultimas.idade} </Text>
						</View>
						<View style = {{flexDirection: 'row'}}>
								<View style = {{marginLeft: 20, marginRight: 20}}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => novoMete(ultimas.nome, b64.encode(ultimas.email), ultimas.foto, ultimas.idade, ultimas.cidade, ultimas.sexo)} >
										<Icon name = 'favorite' size = {40} color = '#f6546a' />
									</TouchableHighlight>
								</View>
								<View style = {{alignItems: 'center', justifyContent: 'center'}}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.conversa({title: ultimas.nome, email:b64.encode(ultimas.email), nome: ultimas.nome, fotoPerfil: ultimas.foto})} >
										<Icon name = 'chat' size = {40} color = '#f6546a' />
									</TouchableHighlight>
								</View>
						</View>

					</View>
			)
		}else{
			return(
					<View style={{ flex: 1, padding: 50, borderBottomWidth: 1, borderColor: "#CCC" , justifyContent: 'space-between', margin: 5}}>
						<View style = {{margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
							
							<TouchableOpacity  underlayColor = 'transparent' onPress = {() => Actions.telafoto({imagem: ultimas.foto, nome: ultimas.nome, idade:ultimas.idade, cidade: ultimas.cidade, sexo: ultimas.sexo, title: 'Perfil de '+ultimas.nome})}>
								<UserAvatar size="30" name="MM" src = {ultimas.foto} />
							</TouchableOpacity >
							<Text style={{ fontSize: 18, marginLeft: 10}}> Você enviou um mete para {ultimas.nome}, {ultimas.idade} </Text>
						</View>
						<View style = {{flexDirection: 'row'}}>
								<View style = {{alignItems: 'center', justifyContent: 'center'}}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.conversa({title: ultimas.nome, email:b64.encode(ultimas.email), nome: ultimas.nome, fotoPerfil: ultimas.foto})} >
										<Icon name = 'chat' size = {40} color = '#f6546a' />
									</TouchableHighlight>
								</View>
						</View>
					</View>
				)
		}
	}

	render(){
		return(
			<View style = {{backgroundColor: 'snow', flex:8.5}}>
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
	const ultimas= _.map(state.relacoesReducers, (val,uid) => {
		return{...val,uid}
	})

	return{ultimas}

}


export default connect(mapStateToProps, {listaRelacoesFetch})(TelaRelacoes)