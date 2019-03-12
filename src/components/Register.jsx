import React, { Component } from "react";

import firebase from '../config/Firebase';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import './Register.css';

import FormError from './FormError';

export default class Register extends Component {

    constructor(){
        super();
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
        ).catch(error => {
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
            <h1>Register</h1>

            {/* If passOne does not equal to passTwo, trigger error message */}
            {this.state.errorMessage !== null ? (
                <FormError theMessage={this.state.errorMessage} />
            
            // if passOne = passTwo, set errorMessage to null (nothing);
            ) : null }

            {/* Display Name Form */}
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text"
                              name="displayName"
                              placeholder="Enter Display Name"
                              value={this.state.displayName}
                              onChange={this.handleChange} 
                    />
              </Form.Group>

              {/* Email Form */}
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email"
                              name="email"
                              placeholder="Enter email"
                              value={this.state.email}
                              onChange={this.handleChange}
                    />
              </Form.Group>

              {/* Password One Form */}
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password"
                              name="passOne"                               placeholder="Password"
                              value={this.state.passOne}
                              onChange={this.handleChange} 
                    />
              </Form.Group>

              {/* Password Two Form */}
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password"
                              name="passTwo"
                              placeholder="Confirm Password"
                              value={this.state.passTwo}
                              onChange={this.handleChange}
                 />
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
