import React, { Component } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils'

import "./sign-in.styles.scss";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    let { email, password } = this.state;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type='email'
            value={email}
            label='email'
            required
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            type='password'
            value={password}
            label='password'
            required
            handleChange={this.handleChange}
          />

          <div className="buttons">
            <CustomButton type="submit" >Sign In</CustomButton>
            <CustomButton isGoogleSignIn onClick={signInWithGoogle} >Sign In With Goole</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
