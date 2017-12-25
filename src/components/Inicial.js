import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Header from './headerTabMenu/Header.js';
import TabInferior from './headerTabMenu/TabInferior.js';
import Feed from './Feed.js';
import NovoPostTela from './NovoPostTela.js';
import TelaRelacoes from './TelaRelacoes.js';   // POSSÍVEIS TELAS
import TelaConversas from './TelaConversas.js';


export default class Inicial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tela: this.props.valor
		};
	}
	_tela(tela) {
		switch (tela) {
			case 1:
				return (
					<TelaRelacoes />
				);

			case 2:
				return (
					<Feed />
				);
			case 3:
				return (
					<NovoPostTela />
				);
			case 4:
				return (
					<TelaConversas />
				);
			default:
				return (
					<Feed />
				);
		}
	}
	render() {
		return (
			<View style = {{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
				<StatusBar backgroundColor = '#f6546a' />
				<Header />
				{this._tela(this.state.tela)}
				<TabInferior />
			</View>

		);
	}
}

