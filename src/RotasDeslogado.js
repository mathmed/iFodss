import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Configuracoes from './components/Configuracoes.js'
import Login from './components/Login.js';
import Cadastro from './components/Cadastro.js';
import Conversa from './components/Conversa.js';
import Perfil from './components/Perfil.js';
import TelaFoto from './components/TelaFoto.js';
import Recuperacao from './components/Recuperacao.js';
import TabInferior from './components/headerTabMenu/TabInferior.js'

export default class RotasDeslogado extends Component {
	render() {
		return (
			<Router navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={{ color: '#ff5400' }}>
				<Scene key = 'root'>
					<Scene key = 'login' component = {Login} hideNavBar />
					<Scene key = 'perfil' component = {Perfil} title="Perfil" titleStyle = {{ color: 'snow', backgroundColor: '#f6546a' }} hideNavBar = {false} navigationBarStyle={{ backgroundColor: '#f6546a' }} /> 
					<Scene key = 'tabinferior' component = {TabInferior} hideNavBar  />
					<Scene key = 'configuracoes' component = {Configuracoes} title="Configurações" titleStyle = {{color: 'snow', backgroundColor: '#f6546a'}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a'}}/> 
                    <Scene key = 'conversa' component = {Conversa} title = '' hideNavBar = {false} navigationBarStyle = {{backgroundColor: '#f6546a'}} titleStyle= {{ color: 'white', fontWeight: 'bold', fontSize: 20, alignItems: 'center' }}/>
                    <Scene key = 'telafoto' component = {TelaFoto} title = '' hideNavBar = {false} navigationBarStyle = {{backgroundColor: '#f6546a'}} titleStyle= {{ color: 'white', fontWeight: 'bold', fontSize: 20, alignItems: 'center' }}/>
					<Scene key = 'cadastro' component = {Cadastro} title="Cadastro" titleStyle = {{color: 'snow', backgroundColor: '#f6546a'}} hideNavBar = {false} navigationBarStyle={{ backgroundColor: '#f6546a' }}/> 
					<Scene key = 'recuperacao' component = {Recuperacao} title="Recuperação de conta" titleStyle = {{color: 'snow', backgroundColor: '#f6546a'}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a'}}/> 

				</Scene>
			</Router>


			);
	}
}