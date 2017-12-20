import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Image, ActivityIndicator, Platform} from 'react-native';
import UserAvatar from 'react-native-user-avatar'
import { Kaede } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';
var ImagePicker = require('react-native-image-picker');
var avatar = require('../imgs/avatar.png');
import {connect} from 'react-redux'
import firebase from 'firebase'
import b64 from 'base-64'
import RNFetchBlob from 'react-native-fetch-blob'
import {modificaDadosPerfil, salvarDados, salvarFoto} from '../actions/perfilActions.js'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
	return new Promise((resolve, reject) => {
		const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
		let uploadBlob = null
		const imageRef = firebase.storage().ref('images').child(imageName)
		fs.readFile(uploadUri, 'base64')
			.then((data) => {
				return Blob.build(data, {type: `${mime};BASE64`})
			})
			.then((blob) => {
				uploadBlob = blob
				return imageRef.put(blob, {contentType: mime})
			})
			.then(() => {
				uploadBlob.close()
				return imageRef.getDownloadURL()
			})
			.then((url) => {
				resolve(url)
			})
			.catch((error) => {
				reject(error)
			})
	})
}


class Perfil extends Component{
	constructor(props){
		super(props)
		this.state = {
			imagePath: '',
			imageHeight: '',
			imageWidth: ''
		}
	}

	componentWillMount(){
		const email = firebase.auth().currentUser.email
		const emailB64 = b64.encode(email)
			firebase.database().ref("usuarios/"+emailB64).once('value', (snapshot) => {
				const info =  snapshot.val();
				if(info.foto){
					this.setState({imagePath: info.foto})
				}
	})
}

	_salvar(){
		const nome = this.props.nome
		const cidade = this.props.cidade
		const bio = this.props.bio
		const idade = this.props.idade
		this.props.salvarDados(nome,cidade,bio, idade)


	}
	_renderBotao(){
		if(this.props.carregando){
			return (<ActivityIndicator size = 'large' />)
		}



		return(
			<TouchableHighlight onPress = {() => this._salvar()} underlayColor = 'transparent'>
					<View style = {{marginTop: 15, backgroundColor: 'snow', borderWidth: 3, borderRadius: 20, borderColor: '#f6546a', height: 50,width: 150, alignItems: 'center', justifyContent: 'center'}}>
						<Text style = {{fontSize: 20, fontWeight: 'bold', color: 'grey'}}> Salvar </Text>
					</View>
			</TouchableHighlight>

		)
	}
	render(){
		return(
			<View style = {{flex: 6, backgroundColor: 'snow'}}>
				<View style = {{justifyContent: 'space-between', alignItems: 'center', marginTop: 10, flex: 1, flexDirection: 'row', marginLeft: 70, marginRight: 70}}>
					{this.state.imagePath ? <UserAvatar size="100" name="AvishayBar" src = {this.state.imagePath} /> : 
					  <UserAvatar size="100" name="MM" component = {{avatar}} /> }

						<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.show()} >
							<Icon name = 'add-a-photo' size = {40} color = 'grey' />
						</TouchableHighlight>
				</View>

				<View style = {{margin:10, padding: 5, flex: 4}}>
					<Kaede
						style={{ backgroundColor: '#f9f5ed' }}
						label={'Nome'}
						labelStyle={{ color: 'snow', backgroundColor: '#f6546a' }}
						inputStyle={{ color: 'black', backgroundColor: 'snow', borderWidth: 3, borderColor: '#f6546a'  }}
						value = {this.props.nome}
						onChangeText = {texto => this.props.modificaDadosPerfil(texto, 1)}




					/>
					<Kaede
						style={{ backgroundColor: '#f9f5ed' }}
						label={'Cidade'}
						labelStyle={{ color: 'snow', backgroundColor: '#f6546a' }}
						inputStyle={{ color: 'black', backgroundColor: 'snow', borderWidth: 3, borderColor: '#f6546a'  }}
						value = {this.props.cidade}
						onChangeText = {texto => this.props.modificaDadosPerfil(texto, 2)}




					/>
					<Kaede
						style={{ backgroundColor: '#f9f5ed' }}
						label={'Bio'}
						labelStyle={{ color: 'snow', backgroundColor: '#f6546a' }}
						inputStyle={{ color: 'black', backgroundColor: 'snow', borderWidth: 3, borderColor: '#f6546a'  }}
						value = {this.props.bio}
						onChangeText = {texto => this.props.modificaDadosPerfil(texto, 3)}




					/>
					<Kaede
						style={{ backgroundColor: '#f9f5ed' }}
						label={'Idade'}
						labelStyle={{ color: 'snow', backgroundColor: '#f6546a' }}
						inputStyle={{ color: 'black', backgroundColor: 'snow', borderWidth: 3, borderColor: '#f6546a'  }}
						keyboardType= 'numeric'
						value = {this.props.idade}
						onChangeText = {texto => this.props.modificaDadosPerfil(texto, 4)}



					/>
					<View style = {{marginTop: 20, alignItems: 'center', justifyContent: 'center', flex: 0.2}}>
						{this._renderBotao()}
					</View>


				</View>

			</View>

		)

	}
	show(){
		var options = {
			  title: 'Seleciones sua foto',
			  customButtons: [
			    {name: 'fb', title: 'Escolher a partir do facebook'},
			  ],
			  storageOptions: {
			    skipBackup: true,
			    path: 'images'
			  }
			};
		ImagePicker.showImagePicker(options, (response) => {
		  	console.log('Response = ', response);

		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {

		    this.setState({
		      	imagePath: response.uri,
				imageHeight: response.height,
				imageWidth: response.width
		    });
		    	const emailaux = firebase.auth().currentUser.email
				const emailB64 = b64.encode(emailaux)
				this.props.foto = uploadImage(this.state.imagePath, `${this.props.nome}.jpg`).then((responseData) =>
					this.props.salvarFoto(responseData))
				}
			})
		}
	}

const mapStateToProps = state =>(
    {
        nome: state.perfilReducers.nome,
        cidade: state.perfilReducers.cidade,
        bio: state.perfilReducers.bio,
        carregando: state.perfilReducers.carregando,
        idade: state.perfilReducers.idade,
        foto: state.perfilReducers.foto

    }
)

export default connect (mapStateToProps, {modificaDadosPerfil, salvarDados, salvarFoto})(Perfil);