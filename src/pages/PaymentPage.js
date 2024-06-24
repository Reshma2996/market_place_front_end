import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentPage.css';

// Load your publishable key from the Stripe dashboard
const stripePromise = loadStripe('pk_test_51Hq0aTAA7ICp8j21uTPgj08tWVNCEYB24pT3BqKfLtA3B2E92yF6As4Bh6moxfNAEiz2Sw5TOgHEOq4BBQ5V61Ce00bkXtneI0');

const CheckoutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Calculate the total amount from the cart
    const amount = cart.reduce((total, item) => total + item.rentalRate * item.quantity, 0) * 100; // convert to cents

    // Assuming you have a backend endpoint to handle the payment
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, paymentMethodId: cardElement }),
    });

    const { clientSecret } = await response.json();

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      setPaymentProcessing(false);
      return;
    }

    setPaymentSucceeded(true);
    setPaymentProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button type="submit" disabled={paymentProcessing || !stripe}>
        {paymentProcessing ? 'Processing...' : 'Pay'}
      </button>
      {paymentSucceeded && <div>Payment succeeded!</div>}
    </form>
  );
};

const PaymentPage = ({ cart }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cart={cart} />
    </Elements>
  );
};

export default PaymentPage;
