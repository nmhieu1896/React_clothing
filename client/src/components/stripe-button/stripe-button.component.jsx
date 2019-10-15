import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_SkRSBETmsJIRvF6oxJ83TfGc00knfJMCDI";

  const onToken = token => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(res => {
        alert("Payment Successful");
      })
      .catch(error => {
        console.log("Payment failed", error);
        alert(
          "Something's wrong happened! Make sure you used correct credit card"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Clothing Hieu Nguyen"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
