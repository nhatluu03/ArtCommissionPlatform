import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import axios from 'axios'

const stripePromise = loadStripe(
  "pk_test_51OHnCqK4yoev3WakSIDfXSd4kIqg5S7MCmt6xGx3TaGA5YubPDWByEvj3WDTFRuFzdL8T83Z5lCdXWO95g8nVGr700r42ysvhu"
);
const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  useEffect(() => {
    const orderData = {
      type:'artwork',
      items:['655e0f77b34510ad57a479fb','655e1035b34510ad57a479fe','657715a965c22552910f8117'],
      isCompleted: false
    }
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/orders/create-payment-intent/`, orderData,{
            withCredentials: true
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
