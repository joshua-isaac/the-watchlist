import React, { Component } from "react";

import firebase from '../config/Firebase';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import './Register.css';
import navigate from '@reach/router';

import FormError from './FormError';


export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            displayName: '',
            email: '',
            passOne: '',
            passTwo: '',
            errorMessage: null
        }

        // Bind handleChange to "this" so that the value inside the handleChange method is the same as in the constructor 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Capture events
    handleChange(e){
        const itemName = e.target.name;
        const itemValue = e.target.value;

        // setting the state upon input, item name is name of form, value is value of form
        this.setState({[itemName]: itemValue}, () => {
            if(this.state.passOne !== this.state.passTwo){
                this.setState({
                    errorMessage: 'Passwords do not match.'
                })
            } else {
                this.setState({
                    errorMessage: null
                })
            }
        });
    }

    handleSubmit(e){
        // Prevent default so page doesnt reload which will lose state
        e.preventDefault();
        var registrationInfo = {
            displayName: this.state.displayName,
            email: this.state.email,
            password: this.state.passOne
        } 
        // Call firebase function to create new user with provided email and password
        firebase.auth().createUserWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password,
        ).then(() => {
            this.props.registerUser(registrationInfo.displayName);
            console.log(registrationInfo.displayName + ' has created an account!');
        }).catch(error => {
            // If we get an error message, set the errorMessage state to the error.message we get back from firebase
            if (error.message !== null){
                this.setState({errorMessage: error.message});
            } else {
                // If no errors set errorMessage state to null
                this.setState({errorMessage: null})
            }
        });
    }

  render() {
    return (
      <Container className="justify-content-center">
        <Row>
          <Col sm={12}>
            <Form className="form" onSubmit={this.handleSubmit}>
            <h1>Login</h1>
              <Form.Group>
                <Form.Control type="text"
                              name="email"
                              placeholder="Enter Email"
                              value={this.state.email}
                              onChange={this.handleChange} 
                    />
              </Form.Group>

              {/* Email Form */}
              <Form.Group>
                <Form.Control type="password"
                              name="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handleChange}
                    />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
