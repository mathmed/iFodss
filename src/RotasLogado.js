import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {connect} from 'react-redux'
import Login from './components/Login.js';
import Cadastro from './components/Cadastro.js';
import Conversa from './components/Conversa.js';
import Pesquisar from './components/Pesquisar.js';
import Perfil from './components/Perfil.js';
import TelaFoto from './components/TelaFoto.js';
import Configuracoes from './components/Configuracoes.js';
import Recuperacao from './components/Recuperacao.js';
import {autenticacaoDireta} from './actions/autenticacaoActions.js';
import {listaConversasUsuarioFetch} from './actions/mensagemActions.js';
import Inicial from './components/headerTabMenu/Inicial.js'

class RotasLogado extends Component{
	componentWillMount(){
		this.props.autenticacaoDireta()
	}
	render(){
		return(
			<Router navigationBarStyle={{ backgroundColor: '#fff' }} titleStyle={{ color: '#ff5400' }}>
				<Scene key = 'root'>
					<Scene key = 'login' component = {Login} hideNavBar  />
					<Scene key = 'perfil' component = {Perfil} title="Editar perfil" titleStyle = {{color: 'snow', backgroundColor: '#f6546a', fontSize: 16}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a', height: 40}}  headerTintColor="snow"/> 
					<Scene key = 'configuracoes' component = {Configuracoes} title="Alterar senha" titleStyle = {{color: 'snow', backgroundColor: '#f6546a', fontSize: 16}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a', height: 40}} headerTintColor="snow"/> 
					<Scene key = 'inicial' component = {Inicial} hideNavBar initial  />
                    <Scene key = 'pesquisar' component = {Pesquisar} title="Pessoas" titleStyle = {{color: 'snow', backgroundColor: '#f6546a', fontSize: 16}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a', height: 40}} headerTintColor="snow"/> 
                    <Scene key = 'conversa' component = {Conversa} title = '' hideNavBar = {false} navigationBarStyle = {{backgroundColor: '#f6546a', height: 40 }} titleStyle= {{color: 'white', fontWeight: 'bold', fontSize: 16, alignItems: 'center'}} onExit = {() => this.props.listaConversasUsuarioFetch()} headerTintColor="snow"/>
                    <Scene key = 'telafoto' component = {TelaFoto} title = '' hideNavBar = {false} navigationBarStyle = {{backgroundColor: '#f6546a', height: 40 }} titleStyle= {{color: 'white', fontWeight: 'bold', fontSize: 16, alignItems: 'center'}} headerTintColor="snow"/>
					<Scene key = 'cadastro' component = {Cadastro} title="Cadastro" titleStyle = {{color: 'snow', backgroundColor: '#f6546a', fontSize: 16}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a', height: 40}} headerTintColor="snow"/> 
					<Scene key = 'recuperacao' component = {Recuperacao} title="Recuperação de conta" titleStyle = {{color: 'snow', backgroundColor: '#f6546a', fontSize: 16}} hideNavBar = {false} navigationBarStyle={{backgroundColor: '#f6546a', height: 40}} headerTintColor="snow"/> 
				</Scene>
			</Router>


			)
	}
}
const mapStateToProps = state => ({})



export default connect (mapStateToProps, {autenticacaoDireta, listaConversasUsuarioFetch})(RotasLogado);	