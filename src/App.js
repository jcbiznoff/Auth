import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        //initializtion of firebase
        firebase.initializeApp({
            apiKey: 'AIzaSyBQvjGj9kF1_wN0W97FOdLsx_Du8QJvVAw',
            authDomain: 'auth-eae87.firebaseapp.com',
            databaseURL: 'https://auth-eae87.firebaseio.com',
            storageBucket: 'auth-eae87.appspot.com',
            messagingSenderId: '133599990804'
        });

        //firebase can check if user is logged in
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }
    renderContent() {
        //different state
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button 
                            onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm/>;
            default:
                return (
                    <View style={{alignSelf:'center'}}>
                        <Spinner size="large"/> 
                    </View>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText = "Authentication"/>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
