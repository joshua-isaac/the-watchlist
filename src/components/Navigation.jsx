import React, { Component } from "react";

import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import {
  FaFilm,
  FaTv,
  FaVideoSlash,
  FaFileVideo,
  FaViadeo,
  FaVideo
} from "react-icons/fa";

import "./Navigation.css";

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {};

    const navColor = {};
  }
  render() {
    const { user, logOutUser } = this.props;
    return (
      <div>
        <Navbar className="nav-bg fixed-top" expand="lg">
          <Navbar.Brand className="logo" href="/">
            <FaVideo className="film" /> The Watchlist
          </Navbar.Brand>
          <Navbar.Toggle bg="light" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {user && <Nav.Link href="/">Home</Nav.Link>}
              {user && <Nav.Link href="/movies">Movies</Nav.Link>}
              {user && <Nav.Link href="/watchlist">My Watchlist</Nav.Link>}
              {user && <Nav.Link onClick={e => logOutUser(e)}>Logout</Nav.Link>}
              {user && <Nav.Link href="/faq">FAQ</Nav.Link>}
              {!user && <Nav.Link href="/">Home</Nav.Link>}
              {!user && <Nav.Link href="/login">Login</Nav.Link>}
              {!user && <Nav.Link href="/register">Register</Nav.Link>}
              {!user && <Nav.Link href="/faq">FAQ</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
