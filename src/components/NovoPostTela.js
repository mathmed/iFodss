import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, Platform, ActivityIndicator } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Kaede } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { modificaStatusNovoPost, publicarStatus } from '../actions/publicacaoActions.js';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import DropdownAlert from 'react-native-dropdownalert';

const ImagePicker = require('react-native-image-picker');

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
	return new Promise((resolve, reject) => {
		const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
		let uploadBlob = null;
		const imageRef = firebase.storage().ref('images').child(imageName);
		fs.readFile(uploadUri, 'base64')
			.then((data) => {
				return Blob.build(data, { type: `${mime};BASE64` });
			})
			.then((blob) => {
				uploadBlob = blob;
				return imageRef.put(blob, { contentType: mime });
			})
			.then(() => {
				uploadBlob.close();
				return imageRef.getDownloadURL();
			})
			.then((url) => {
				resolve(url);
			})
			.catch((error) => {
				reject(error);
			});
	});
};


class NovoPostTela extends Component {
	constructor(props) {
		super(props);
		const erro = 
			{ key: 1, backgroundColor: '#f6546a', type: 'error', title: 'Erro', message: 'Carregue uma foto para publicar seu post. ' };
		const enviando = 
			{ key: 2, backgroundColor: '#f6546a', type: 'custom', title: 'Aguarde', message: 'Seu post está sendo enviado.' };


		this.state = {
			imagePath: '',
			imageHeight: '',
			imageWidth: '',
			status: '',
			erro: erro,
			enviando: enviando
		};
	}

	_publicar() {
		if(this.state.imagePath) {
			this.props.foto = uploadImage(this.state.imagePath, `${this.state.imagePath}.jpg`).then((responseData) =>
					this.props.publicarStatus(responseData, this.props.status));
					this.showAlert(2);
			} else {
				this.showAlert(1);
			}
	}
	_renderBotao() {
		if (this.props.carregando) {
			return (<ActivityIndicator size = 'large' />);
		}

		return (
			<TouchableHighlight underlayColor = 'transparent' onPress = {() => this._publicar()} >
				<Text style = {{fontSize: 26, color: 'grey', fontWeight: 'bold'}}> Publicar </Text>
			</TouchableHighlight>
		);
	}


	render() {
		return (
			<View style = {{ backgroundColor: 'snow', flex: 8.5, marginTop: 1, padding: 10 }}>
				<View style = {{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'snow', borderRadius: 20 }}>
					{this.state.imagePath ? <Image style = {{ width: 399, height: 300 }} source = {{ uri: this.state.imagePath }} /> : null}
				</View>

				<View style = {{ flex: 0.5, backgroundColor: 'snow', borderRadius: 30, marginTop: 10 }}>
							<Kaede
								style={{ backgroundColor: '#f9f5ed' }}
								label={'Status'}
								labelStyle={{ color: 'snow', backgroundColor: '#f6546a' }}
								inputStyle={{ color: 'black', backgroundColor: 'snow', borderWidth: 3, borderColor: '#f6546a' }}
								secureTextEntry = {false}
								value = {this.props.status}
								onChangeText = {texto => this.props.modificaStatusNovoPost(texto)}
							/>

						<View style = {{ backgroundColor: 'snow', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
							<TouchableHighlight underlayColor = 'transparent' onPress = {() => this.show()} >
								<Icon name = 'add-a-photo' size = {40} color = 'grey' />
							</TouchableHighlight>

							{this._renderBotao()}

						</View>

				</View>
					<DropdownAlert
						ref={(ref) => this.dropdown = ref}
						containerStyle={{ backgroundColor: '#f6546a' }}
						updateStatusBar = {false}
						showCancel={true}
						onClose={(data) => this.onClose(data)}
						onCancel={(data) => this.onClose(data)}
					/>
			</View>
		);
	}

	showAlert(tipo) {
		if (this.state.erro.type === 'close') {
			this.closeAlert();
		} else {
			if (tipo === 1) {
				const title = this.state.erro.title;
				this.dropdown.alertWithType(this.state.erro.type, title, this.state.erro.message);
			} else {
				const title = this.state.enviando.title;
				this.dropdown.alertWithType(this.state.enviando.type, title, this.state.enviando.message);
		}
	}
}

	closeAlert = () => {
		this.dropdown.close();
	}

	onClose(data) {
	}

	show() {
		const options = {
			title: 'Select Avatar',
			customButtons: [
			{ name: 'fb', title: 'Choose Photo from Facebook' },
			],
			storageOptions: {
			skipBackup: true,
			path: 'images'
			}
			};
			ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
			}
			else if (response.error) {
			}
			else if (response.customButton) {
			}
			else {

				this.setState({
					imagePath: response.uri,
					imageHeight: response.height,
					imageWidth: response.width
				});
			}
		});
	}
}

const mapStateToProps = state => (
    {
		status: state.publicacaoReducers.status,
		foto: state.publicacaoReducers.foto,
		carregando: state.publicacaoReducers.carregando
    }
);


export default connect (mapStateToProps, { modificaStatusNovoPost, publicarStatus })(NovoPostTela);
