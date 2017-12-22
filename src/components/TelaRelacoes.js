import React, {Component} from 'react';
import {View, Text, TouchableHighlight, ListView, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64'
import UserAvatar from 'react-native-user-avatar'
import {listaRelacoesFetch, novoMete} from '../actions/relacoesActions.js'
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropdownAlert from 'react-native-dropdownalert';

class TelaRelacoes extends Component{
	constructor(props) {
    	super(props)
    	const itens = 
    	 {key: 1, backgroundColor: '#f6546a', type: 'custom', title: 'Opa!', message: 'Você deu um mete em '}
    	
    	this.state ={ itens: itens}
    }
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
	novoMete1(nome, emailB64, fotoPerfil, idade, cidade, sexo){
		novoMete(nome, emailB64, fotoPerfil, idade, cidade, sexo)
		this.showAlert(nome)
	}

	renderRow = (ultimas, hora) => {
		if(ultimas.tipo == "recebeu"){
			return(
					<View style={{ flex: 1, padding: 50, borderBottomWidth: 1, borderColor: "#CCC" , justifyContent: 'space-between', margin: 5}}>
						<View style = {{margin:10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
							<TouchableOpacity  underlayColor = 'transparent' onPress = {() => Actions.telafoto({imagem: ultimas.foto, nome: ultimas.nome, idade:ultimas.idade, cidade: ultimas.cidade, sexo: ultimas.sexo, title: 'Perfil de '+ultimas.nome})}>
								<UserAvatar size="45" name="MM" src = {ultimas.foto} />
							</TouchableOpacity >
							<Text style={{ fontSize: 18,marginLeft: 10}}> Você recebeu um mete de {ultimas.nome}, {ultimas.idade} </Text>
						</View>
						<View style = {{flexDirection: 'row'}}>
								<View style = {{marginLeft: 20, marginRight: 20}}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.novoMete1(ultimas.nome, b64.encode(ultimas.email), ultimas.foto, ultimas.idade, ultimas.cidade, ultimas.sexo)} >
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
								<UserAvatar size="45" name="MM" src = {ultimas.foto} />
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
				<DropdownAlert
			          ref={(ref) => this.dropdown = ref}
			          containerStyle={{
			            backgroundColor: '#f6546a',
			          }}
			          updateStatusBar = {false}
			          showCancel={true}
			          onClose={(data) => this.onClose(data)}
			          onCancel={(data) => this.onClose(data)}
	        	/>
			</View>

		)
	}
    showAlert(nome) {
    	if (this.state.itens.type == 'close') {
      		this.closeAlert()
	    } else {
		      const title = this.state.itens.title 
		      this.dropdown.alertWithType(this.state.itens.type, title, this.state.itens.message+nome)
	    }
  	}

  closeAlert = () => {
    this.dropdown.close()
  }
  
  onClose(data) {
    console.log(data);
  }
}


const mapStateToProps = state => {
	const ultimas= _.map(state.relacoesReducers, (val,uid) => {
		return{...val,uid}
	})

	return{ultimas}

}


export default connect(mapStateToProps, {listaRelacoesFetch})(TelaRelacoes)