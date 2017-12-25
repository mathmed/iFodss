import React, { Component } from 'react';
import firebase from 'firebase';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';

import AutenticarOuInicial from './src/AutenticarOuInicial.js';



export default class App extends Component<{}> {
componentWillMount() {
  var config = {
    apiKey: "AIzaSyBCT-1T6vjctOv61sT3MYEC6FAumYBaLks",
    authDomain: "ifoda-1b50b.firebaseapp.com",
    databaseURL: "https://ifoda-1b50b.firebaseio.com",
    projectId: "ifoda-1b50b",
    storageBucket: "ifoda-1b50b.appspot.com",
    messagingSenderId: "419526190429"
  };
  if(!firebase.apps.lenght){
    firebase.initializeApp(config);
  }

}
  render() {
    return (
        <Provider store = {createStore(reducers, {}, applyMiddleware(ReduxThunk))}>

          <AutenticarOuInicial />
        </Provider>

    )
  }
}


