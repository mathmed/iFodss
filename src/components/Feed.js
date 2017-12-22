import React, {Component} from 'react';
import {View, Text, TouchableHighlight, ListView, Image} from 'react-native'
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux'
import {listarFeed} from '../actions/feedActions.js';
import UserAvatar from 'react-native-user-avatar'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {novoMete} from '../actions/relacoesActions.js'
import DropdownAlert from 'react-native-dropdownalert';

class Feed extends Component{
	constructor(props) {
    	super(props)
    	const itens = 
    	 {key: 1, backgroundColor: '#f6546a', type: 'custom', title: 'Opa!', message: 'Você deu um mete em '}
    	
    	this.state ={ itens: itens}
    }
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
	novoMete1(nome, emailB64, fotoPerfil, idade, cidade, sexo){
		novoMete(nome, emailB64, fotoPerfil, idade, cidade, sexo)
		this.showAlert(nome)
	}


	renderRow = (ultimas, hora) => {
		if(ultimas.imagem){
			return(
					<View style={{ flex: 1 , borderBottomWidth: 1, borderColor: "#CCC", marginHorizontal: 10 }}>
						<View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
							<UserAvatar size="100" name="MM" src = {ultimas.fotoPerfil} />							
							<Text style = {{fontSize: 14, fontWeight: 'bold', color: 'black', marginTop: 5}}> {ultimas.nome}, {ultimas.idade} - {ultimas.cidade} </Text>
						</View>

						<View style = {{justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
							<View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 30, marginLeft: 7, marginRight: 7}}>
								<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'grey'}}> {ultimas.status} </Text>
								<Text style = {{fontSize: 14, color: 'grey'}}> {ultimas.dataPublicacao} </Text>
							</View>
							<View style = {{justifyContent: 'center', alignItems: 'center', marginBottom: 17, margin: 3}}>
								<Image source = {{uri: ultimas.imagem}} style={{padding: 160}} />
							</View>
							<View style = {{flexDirection: 'row', marginBottom: 20}}>
								<View style = {{marginLeft: 20, marginRight: 20}}>
									<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.novoMete1(ultimas.nome, ultimas.emailB64, ultimas.fotoPerfil, ultimas.idade, ultimas.cidade, ultimas.sexo)} >
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
		const myIcon = (<Icon name="favorite" size={30} color="#900" />)
		return(
			<View style = {{flex: 8.5, backgroundColor: 'snow'}}>
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
	const ultimas= _.map(state.feedReducers, (val,uid) => {
		return{...val,uid}
	})

	return{ultimas}

}



export default connect (mapStateToProps, {listarFeed})(Feed);	