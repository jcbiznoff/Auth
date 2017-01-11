import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
    //initializtion of firebase
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBQvjGj9kF1_wN0W97FOdLsx_Du8QJvVAw',
            authDomain: 'auth-eae87.firebaseapp.com',
            databaseURL: 'https://auth-eae87.firebaseio.com',
            storageBucket: 'auth-eae87.appspot.com',
            messagingSenderId: '133599990804'
        });
    }

    render() {
        return (
            <View>
				<Header headerText = "Authentication"/>
				<LoginForm/>
			</View>
        );
    }
}

export default App;
