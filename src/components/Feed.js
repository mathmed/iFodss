import React, {Component} from 'react';
import {View, Text, TouchableHighlight, ListView, Image} from 'react-native'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux'
import {listarFeed} from '../actions/feedActions.js';
import UserAvatar from 'react-native-user-avatar'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {novoMete} from '../actions/relacoesActions.js'

class Feed extends Component{
	componentWillMount(){
		this.props.listarFeed();
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
		if(ultimas.imagem){
			return(
					<View style={{ flex: 1 , borderBottomWidth: 1, borderColor: "#CCC" }}>
						<View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
							<UserAvatar size="100" name="MM" src = {ultimas.fotoPerfil} />							
							<Text style = {{fontSize: 14, fontWeight: 'bold', color: 'grey', marginTop: 5}}> {ultimas.nome}, {ultimas.idade} - {ultimas.cidade} </Text>
						</View>

						<View style = {{justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
							<View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 30, marginLeft: 7, marginRight: 7}}>
								<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'grey'}}> {ultimas.status} </Text>
							</View>
							<View style = {{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
								<Image source = {{uri: ultimas.imagem}} style={{padding: 160}} />
							</View>
							<View style = {{flexDirection: 'row', marginBottom: 20}}>
								<View style = {{marginLeft: 20, marginRight: 20}}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => novoMete(ultimas.nome, ultimas.emailB64, ultimas.fotoPerfil, ultimas.idade, ultimas.cidade, ultimas.sexo)} >
										<Icon name = 'favorite' size = {40} color = '#f6546a' />
									</TouchableHighlight>
								</View>
								<View style = {{marginLeft: 20, marginRight: 20}}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.conversa({title: ultimas.nome, email:ultimas.emailB64, nome: ultimas.nome, fotoPerfil: ultimas.fotoPerfil})} >
										<Icon name = 'chat' size = {40} color = '#f6546a' />
									</TouchableHighlight>
								</View>
							</View>
						</View>


					</View>
			)
		}else{
			return null;
		}
	}
	render(){
		return(
			<View style = {{flex: 8.5, backgroundColor: 'snow'}}>
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
	const ultimas= _.map(state.feedReducers, (val,uid) => {
		return{...val,uid}
	})

	return{ultimas}

}



export default connect (mapStateToProps, {listarFeed})(Feed);	