import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/principalStyles.js'
import {Actions} from 'react-native-router-flux';

export default class TabInferior extends Component {
	render(){
		return(
			<View style = {styles.viewTabInferior}>
				<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.inicial({valor: 1})} >
					<Icon name = 'favorite' size = {25} color = 'snow' />
				</TouchableHighlight>


				<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.inicial({valor: 2})} >
					<Icon name = 'home' size = {25} color = 'snow' />
				</TouchableHighlight>

				<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.inicial({valor: 3})} >
					<Icon name = 'add-circle' size = {25} color = 'snow' />
				</TouchableHighlight>

				<TouchableHighlight underlayColor = 'transparent' onPress = {() => Actions.inicial({valor: 4})} >
					<Icon name = 'chat' size = {25} color = 'snow' /> 
				</TouchableHighlight>
			</View>
		)
	}
}