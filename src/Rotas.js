import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Login from './components/Login.js';
import Cadastro from './components/Cadastro.js';
import Inicial from './components/Inicial.js';
import Conversa from './components/Conversa.js';
import Perfil from './components/Perfil.js';
import TelaFoto from './components/TelaFoto.js'
export default class Rotas extends Component{
	render(){
		return(
			<Router navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={{ color: '#ff5400' }}>
				<Scene key = 'root'>
					<Scene key = 'login' component = {Login} hideNavBar  />
					<Scene key = 'perfil' component = {Perfil} title="Perfil" titleStyle = {{color: 'snow', backgroundColor: '#f6546a'}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a'}}/> 
					<Scene key = 'inicial' component = {Inicial} hideNavBar  />
                    <Scene key = 'conversa' component = {Conversa} title = '' hideNavBar = {false} navigationBarStyle = {{backgroundColor: '#f6546a'}} titleStyle= {{color: 'white', fontWeight: 'bold', fontSize: 20, alignItems: 'center'}}/>
                    <Scene key = 'telafoto' component = {TelaFoto} title = '' hideNavBar = {false} navigationBarStyle = {{backgroundColor: '#f6546a'}} titleStyle= {{color: 'white', fontWeight: 'bold', fontSize: 20, alignItems: 'center'}}/>
					<Scene key = 'cadastro' component = {Cadastro} title="Cadastro" titleStyle = {{color: 'snow', backgroundColor: '#f6546a'}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a'}}/> 
				</Scene>
			</Router>


			)
	}
}