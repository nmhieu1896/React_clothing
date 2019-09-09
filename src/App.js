import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.action';

import { connect } from 'react-redux';
// import userReducer from "./redux/user/user.reducer";


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props; 

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    
    return (
      <div>
        {/* <Route path="/" component={Header} /> */}
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          {/* <Route path="/signin" component={SignInUpPage} /> */}
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInUpPage/>)} />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = ({user}) => ({ //Phải là ({user}) thay vì user Do tham số truyền vào là object combineReducer 
  currentUser: user.currentUser  // Tạo this.props.currentUser cho Class
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
