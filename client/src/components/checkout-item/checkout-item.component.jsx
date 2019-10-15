import React from "react";
import { connect } from "react-redux";

import { clearItemFromCart } from "../../redux/cart/cart.action";
import { addItem } from "../../redux/cart/cart.action";
import { removeItem } from "../../redux/cart/cart.action";

import "./checkout-item.styles.scss";

const CheckoutItem = ({cartItem, clearItemFromCart, addItem, removeItem}) => {
  const { name, imageUrl, quantity, price, id } = cartItem;
  return (
  <div className="checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="" />
    </div>
    <span className="name">{name}</span>
    <span className="quantity">
      <div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
      <span className="value">{quantity}</span>
      <div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
    </span>
    <span className="price">${price*quantity}</span>
    <div className="remove-button" onClick={() => clearItemFromCart(id)}>
      &#10005;
    </div>
  </div>
)};

const mapDispatchToProps = dispatch => ({
  clearItemFromCart: id => dispatch(clearItemFromCart(id)),
  addItem: cartItem => dispatch(addItem(cartItem)),
  removeItem: cartItem => dispatch(removeItem(cartItem))
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
