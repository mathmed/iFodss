import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Text, TextInput, TouchableHighlight, FlatList } from 'react-native';
import { conversaUsuarioFetch, modificaMensagem, enviaMensagem } from '../actions/mensagemActions.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Conversa extends Component {
	componentWillMount() {
		this.props.conversaUsuarioFetch(this.props.email);
	}

	_enviaMensagem() {
		const { mensagem, nome, email, fotoPerfil } = this.props;
		this.props.enviaMensagem(mensagem, nome, email, fotoPerfil) 
	}

	renderRow(texto) {
		if (texto.tipo === 'e') {
			return (
				<View style = {{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}>
					<View style = {{ backgroundColor: '#dbf5b4', borderRadius: 20 }}>
						<Text style = {{ fontSize: 18, color: 'black', padding: 10, elevation:1 }}> {texto.mensagem} </Text>
						<Text style = {{ fontSize: 12, color: 'black', padding: 10, elevation:1 }}> {texto.date} </Text>
					</View>
				</View>


			);
		} else {
			return (
				<View style = {{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
					<View style = {{ backgroundColor: '#98c1c0', borderRadius: 20 }}>
						<Text style = {{ fontSize: 18, color: 'black', padding: 10, elevation: 1 }}>{texto.mensagem}</Text>
						<Text style = {{ fontSize: 12, color: 'black', padding: 10, backgroundColor: '#98c1c0', elevation: 1 }}> {texto.date} </Text>
					</View>
				</View>
			);
		}
	}


	render() {
		return (
			<View style = {{ flex: 1, backgroundColor: 'snow', padding: 10 }}>
				<View style = {{ flex: 1, paddingBottom: 20 }}>
					<FlatList
						ref = { ( ref ) => this.scrollView = ref }
						data = {this.props.conversa}
						renderItem = {({item}) => this.renderRow(item)}
						extraData = {this.props.conversa}
						onContentSizeChange={ () => { this.scrollView.scrollToEnd( { animated: false } )} }


					/>
				</View>

				<View style = {{ flexDirection: 'row', borderWidth: 3, borderColor: 'grey' }} >
					<TextInput
						value = {this.props.mensagem}
						style = {{ flex: 4, fontSize: 18 }}
						onChangeText = {texto => this.props.modificaMensagem(texto)}
					/>


					<TouchableHighlight onPress = {this._enviaMensagem.bind(this)} underlayColor = 'transparent'>
						<Icon name = {'send'} size = {40} color = {'#f6546a'} />
					</TouchableHighlight>


				</View>
			</View>
		);
	}
}
mapStateToProps = state => {
	const conversa = _.map(state.mensagemReducers, (val, uid) => {
		return { ...val, uid };
	});
	return {
		conversa,
		mensagem: state.enviaMensagemReducers.mensagem

	};
};

export default connect(mapStateToProps, { conversaUsuarioFetch, modificaMensagem, enviaMensagem })(Conversa)