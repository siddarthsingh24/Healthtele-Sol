// src/components/Payment.js

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { functions } from '../Firebase';

const stripePromise = loadStripe('pk_test_51Pl1os098yxd1NopDnzHG6HtbN2aOzc9IKKSvAOfbTOTxtBv3Czu0wydzYNXanPTKx7Nq6GVvJrcKgSySldDbktS00sOlYcmLv'); // Replace with your Stripe publishable key

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message);
    } else {
      setError(null);
      const { id } = paymentMethod;

      const createPaymentIntent = functions.httpsCallable('createPaymentIntent');
      try {
        const result = await createPaymentIntent({ payment_method_id: id, amount: 5000 }); // Amount in cents

        if (result.data.success) {
          setSuccess(true);
        } else {
          setError(result.data.error);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
      {error && <div>Error: {error}</div>}
      {success && <div>Payment Successful!</div>}
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default Payment;
