import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/principalStyles.js'
import {Actions} from 'react-native-router-flux';


export default class Header extends Component {
	render(){
		return(
			<View style = {styles.viewHeader}>
				<TouchableHighlight underlayColor = 'transparent' onPress = {() => alert('menu')} >
					<Icon name = 'menu' size = {25} color = 'snow' />
				</TouchableHighlight>

				<Text style = {styles.textoHeader}> iFods </Text>

				<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.perfil()} >
					<Icon name = 'perm-identity' size = {25} color = 'snow' /> 
				</TouchableHighlight>

			</View>


		)
	}
}