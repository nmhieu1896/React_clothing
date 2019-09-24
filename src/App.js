import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { checkUserSession } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selector";

import { connect } from "react-redux";
// import userReducer from "./redux/user/user.reducer";

const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignInUpPage />)}
        />
      </Switch>
    </div>
  );
};

// const mapStateToProps = ({user}) => ({ //Phải là ({user}) thay vì user Do tham số truyền vào là object combineReducer
//   currentUser: user.currentUser  // Tạo this.props.currentUser cho Class
// })

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser // Tạo this.props.currentUser cho Class
});

const mapDispatchToProps = dispatch => ({
  // setCurrentUser: user => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);




  // signInWithGoogle before using Saga
  // let unsubscribeFromAuth = null;
  // useEffect(() => {
  //   unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot(snapShot => {
  //         console.log('snapshot----------:', snapShot.data());
  //         setCurrentUser({
  //           id: snapShot.id,
  //           ...snapShot.data()
  //         });
  //       });
  //       setCurrentUser(userAuth);
  //     } else {
  //       setCurrentUser(userAuth);  //userAuth không tồn tại thì set CurrentUser về null 
  //     }
  //   });

  //   return () => {unsubscribeFromAuth()};
  // }, [currentUser]);
