import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import { auth } from "../../firebase/firebase.utils";

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectcartHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.action';
// import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => ( // Truyền props từ hàm mapStateToProps
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink to="/contact">
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionLink as='div' onClick={signOutStart}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">
          SIGN IN
        </OptionLink>
      )}
      <CartIcon/>
    </OptionsContainer>
    {
      hidden ? null : <CartDropdown/>
    }
  </HeaderContainer>
);

// const mapStateToProps = ({ user: {currentUser}, cart: {hidden} }) => ({
//   currentUser,
//   hidden
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectcartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
