import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import firebase from 'firebase';

export default class TelaFoto extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foto: '',
			cidade: '',
			idade: '',
			sexo: '',
			bio: '',
			nome: ''
		}
	}

	componentWillMount() {
		firebase.database().ref('usuarios/' + this.props.email).once('value', snapshot => {
			const info = snapshot.val();
			this.setState({
				foto: info.foto,
				cidade: info.cidade,
				idade: info.idade,
				sexo: info.sexo,
				bio: info.bio,
				nome: info.nome
			})
		})
	}
	render() {
		return (
			<View style = {{ flex: 1, backgroundColor: 'snow' }}>
				<ScrollView>
					<Image source = {{ uri: this.state.foto }} style={{ padding: '50%', margin: 3 }} />
					<View style = {{ alignItems: 'center', justifyContent: 'center', marginBottom: 20, marginTop: 15 }}>
						<Text style = {{ fontSize: 16, fontWeight: 'bold', color: 'black'}}> {this.state.nome}, {this.state.idade} anos </Text>
						<Text style = {{ fontSize: 14 }}> Mora em {this.state.cidade} </Text>
						<Text style = {{ fontSize: 14 }}> Sexo {this.state.sexo} </Text>
						<Text style = {{ fontSize: 14 }}> Interesses: {this.state.bio} </Text>


					</View>
				</ScrollView>
			</View>
		);
	}
}
