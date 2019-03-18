import React, { Component } from "react";

import firebase from '../config/Firebase';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import './Register.css';
import { navigate } from '@reach/router';

import FormError from './FormError';

import "./Login.css";


export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
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
        this.setState({[itemName]: itemValue});

    }

    handleSubmit(e){
        // Prevent default so page doesnt reload which will lose state
        e.preventDefault();
        var registrationInfo = {
            email: this.state.email,
            password: this.state.password
        } 
        // Call firebase function to create new user with provided email and password
        firebase.auth().signInWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password,
        ).then(() => {
            console.log(registrationInfo.email + ' has logged in!');
            navigate('/movies');
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
      <Container className="justify-content-center login-container">
        <Row>
          <Col className="mx-auto" sm={12} lg={8}>
            <Form className="form" onSubmit={this.handleSubmit}>
            <h1 className="login-title">Login</h1>
              
              {/* If passOne does not equal to passTwo, trigger error message */}
            {this.state.errorMessage !== null ? (
                <FormError theMessage={this.state.errorMessage} />
            
            // if passOne = passTwo, set errorMessage to null (nothing);
            ) : null }
            
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
              <Button className="cta-btn" type="submit">
                Login
              </Button>
              <div className="new-user">
                <p>New? Register <a href="/register" className="reg-link">here</a></p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
