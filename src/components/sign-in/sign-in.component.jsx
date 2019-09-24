import React, { useState } from "react";
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth } from "../../firebase/firebase.utils";
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

import "./sign-in.styles.scss";

const SignIn = ({googleSignInStart, emailSignInStart}) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  let { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart(email, password);
    
    // sign in with Email before using saga
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    // } catch (error) {
    //   console.log(error);
    // }

    setCredentials({ email: "", password: "" });
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          label="email"
          required
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          label="password"
          required
          handleChange={handleChange}
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton type='button' isGoogleSignIn onClick={googleSignInStart}>
            Sign In With Goole
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null,mapDispatchToProps)(SignIn);
