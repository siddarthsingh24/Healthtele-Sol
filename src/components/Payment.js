// src/components/Payment.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Checkout';

const stripePromise = loadStripe('pk_test_51Pl1os098yxd1NopDnzHG6HtbN2aOzc9IKKSvAOfbTOTxtBv3Czu0wydzYNXanPTKx7Nq6GVvJrcKgSySldDbktS00sOlYcmLv');

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
