import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Configuracoes from './components/Configuracoes.js'
import Login from './components/Login.js';
import Cadastro from './components/Cadastro.js';
import Conversa from './components/Conversa.js';
import Perfil from './components/Perfil.js';
import TelaFoto from './components/TelaFoto.js';
import Recuperacao from './components/Recuperacao.js';
import Inicial from './components/headerTabMenu/Inicial.js'

export default class RotasDeslogado extends Component {
	render() {
		return (
			<Router navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={{ color: '#ff5400' }}>
				<Scene key = 'root'>
					<Scene key = 'login' component = {Login} hideNavBar />
					<Scene key = 'perfil' component = {Perfil} title="Editar perfil" titleStyle = {{ color: 'snow', backgroundColor: '#f6546a', fontSize: 16 }} hideNavBar = {false} navigationBarStyle={{ backgroundColor: '#f6546a', height: 40 }} headerTintColor="snow" /> 
					<Scene key = 'inicial' component = {Inicial} hideNavBar  />
					<Scene key = 'configuracoes' component = {Configuracoes} title="Alterar senha" titleStyle = {{color: 'snow', backgroundColor: '#f6546a', fontSize: 16}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a', height: 40}} headerTintColor="snow"/> 
                    <Scene key = 'conversa' component = {Conversa} title = '' hideNavBar = {false} navigationBarStyle = {{backgroundColor: '#f6546a', height: 40}} titleStyle= {{ color: 'white', fontWeight: 'bold', fontSize: 20, alignItems: 'center', fontSize: 16 }} headerTintColor="snow"/>
                    <Scene key = 'telafoto' component = {TelaFoto} title = '' hideNavBar = {false} navigationBarStyle = {{backgroundColor: '#f6546a', height: 40}} titleStyle= {{ color: 'white', fontWeight: 'bold', fontSize: 20, alignItems: 'center', fontSize: 16 }}/>
					<Scene key = 'cadastro' component = {Cadastro} title="Cadastro" titleStyle = {{color: 'snow', backgroundColor: '#f6546a', fontSize: 16}} hideNavBar = {false} navigationBarStyle={{ backgroundColor: '#f6546a', height: 40 }} headerTintColor="snow"/> 
					<Scene key = 'recuperacao' component = {Recuperacao} title="Recuperação de conta" titleStyle = {{color: 'snow', backgroundColor: '#f6546a', fontSize: 16}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a', height: 40}} headerTintColor="snow"/> 

				</Scene>
			</Router>


			);
	}
}