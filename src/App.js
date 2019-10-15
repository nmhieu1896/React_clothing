import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

// import HomePage from "./pages/homepage/homepage.component";
// import ShopPage from "./pages/shop/shop.component";
// import SignInUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import CheckoutPage from "./pages/checkout/checkout.component";
import ContactPage from "./pages/contact/contact.component";
import Header from "./components/header/header.component";
// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { checkUserSession } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selector";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import { GlobalStyle } from './global.styles';

// import userReducer from "./redux/user/user.reducer";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
// const ContactPage = lazy(() => import('./pages/contact/contact.component'));

const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
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
