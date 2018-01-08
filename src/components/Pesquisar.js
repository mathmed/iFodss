import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, ListView, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';
import _ from 'lodash';
import UserAvatar from 'react-native-user-avatar';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';



class Pesquisar extends Component {
  constructor(props) {
 
    super(props);
 
    this.state = {
 
      isLoading: true,
      text: '',
    
    }
 
    this.arrayholder = [] ;
  }
 
  componentWillMount() {
  	var info = [];
  	const {currentUser} = firebase.auth();
  	firebase.database().ref('usuarios/').orderByChild('nome').once('value', snapshot => {
  		snapshot.forEach((snap) => {
			const duck = snap.val()
				info.push(duck)
			})
			let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  			this.setState({
  				isLoading: false,
  				dataSource: ds.cloneWithRows(info)
  			}, function(){
  				this.arrayholder = info ;
  			})
  		})
  }



  entrarPerfil(perfil, emailEnviar) {
  	Actions.telafoto({ title: perfil, email: emailEnviar})
  }


 


   SearchFilterFunction(text){

     const newData = this.arrayholder.filter(function(item){
         const itemData = item.nome.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         dataSource: this.state.dataSource.cloneWithRows(newData),
         text: text
     })
 	}



 
 
 	renderRow = (item) => {
 		if(this.arrayholder){
	 		return(
	 			<TouchableHighlight onPress = {() => this.entrarPerfil('Perfil de ' + item.nome, b64.encode(item.emailCriar))} underlayColor = 'transparent' >
	 				<View style = {{ flexDirection: 'row', margin: 5, marginHorizontal: '5%',  padding: 10, backgroundColor: 'snow', borderRadius: 15,  alignItems: 'center', borderWidth: 2, borderColor: 'grey' }}>
	 					<UserAvatar size = '60' src = {item.foto} name = '?' />
	 					<Text style = {{ marginLeft: '10%' }}> {item.nome} </Text>
	 				</View>
	 			</TouchableHighlight>
	 		)
	 	}
	 	return(
	        <View style = {{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
	        	<Text> Nenhuma pessoa encontrada </Text>
	        </View>

	 	)
 	}


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size = 'large' color = '#f6546a' />
        </View>
      );
    }
    if(this.state.text){
		    return (
		 
		      <View style={styles.MainContainer}>
		 
		      <TextInput 
			       style={styles.TextInputStyleClass}
			       onChangeText={(text) => this.SearchFilterFunction(text)}
			       value={this.state.text}
			       underlineColorAndroid='transparent'
			       placeholder="Procure pessoas"
		        />

		        <ListView
		 
		          dataSource={this.state.dataSource}
		 
		 
		          renderRow={this.renderRow} 
		 
		 
		          enableEmptySections
		 
		          style={{marginTop: 10}}
		 
		        />
		 
		      </View>
		    );
		}

		return(
		      <View style={styles.MainContainer}>
		 
			      <TextInput 
				       style={styles.TextInputStyleClass}
				       onChangeText={(text) => this.SearchFilterFunction(text)}
				       value={this.state.text}
				       underlineColorAndroid='transparent'
				       placeholder="Procure pessoas"
			        />
			       	<View style = {{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
	        			<Text> Nenhuma pessoa encontrada </Text>
	        		</View>
			   </View>



		)
	}


}
 
const styles = StyleSheet.create({
 
 MainContainer :{
 
  flex:1,
  margin: 7,

 
  },
 
 
  TextInputStyleClass:{
        
   textAlign: 'center',
   height: 40,
   borderWidth: 2,
   borderColor: '#f6546a',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
        
   }
 
});

const mapStateToProps = state => (
	{}
)




export default connect (mapStateToProps, {})(Pesquisar);