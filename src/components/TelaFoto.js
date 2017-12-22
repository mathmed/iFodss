import React, {Component} from 'react';
import {View, Image, Text} from 'react-native'


export default class TelaFoto extends Component{
	render(){
		return(
			<View style = {{flex: 1, backgroundColor: 'snow'}}>
				<Image source = {{uri: this.props.imagem}} style={{padding: '50%', margin: 3}} />
				<View style = {{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
					<Text style = {{fontSize: 20, fontWeight: 'bold'}}> {this.props.nome}, {this.props.idade} anos </Text>
					<Text style = {{fontSize: 18}}> Mora em {this.props.cidade} </Text>
					<Text style = {{fontSize: 18}}> Sexo {this.props.sexo} </Text>

				</View>
			</View>



		)
	}
}