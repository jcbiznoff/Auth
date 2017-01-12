import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import firebase from 'firebase';

class LoginForm extends Component {
    //states!!
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;
        this.setState({
            error: '',
            loading: true,
        }); //clear out the error state!

        //handle login logic: if no user id just create an account for now
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication Failed.',
            loading: false
        });
    }

    onLoginSuccess() {
        //1. update state
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    //common pattern to use helper function
    rednerButton() {
        if (this.state.loading) {
            return <Spinner size="small"/>
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
				Login
			</Button>
        );
    }

    render() {
        return (
            <Card> 
				<CardSection>
					<Input 
						placeholder = "user@email.com"
						label="Email"
						value = {this.state.email}
						onChangeText = {text => this.setState({email: text})}
						/>
				</CardSection>
				<CardSection>
					<Input
						secureTextEntry
						placeholder = "password"
						label="Password"
						value = {this.state.password}
						onChangeText = {text => this.setState({password: text})}
					 />
				</CardSection>
				
				<Text style={styles.errorTextStyle}> 
					{this.state.error} 
				</Text>

				<CardSection>
					{this.rednerButton()}
				</CardSection>
			</Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
