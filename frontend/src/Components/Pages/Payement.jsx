import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { NavLink, useNavigate } from 'react-router-dom';

const stripePromise = loadStripe("pk_test_51QyOTRHTKOo3fhnxmpo87BIulB9Gn9TC4ysIvtrlK5bQY6Ppcb056C5x7XTKga2fr4LKawPVKPpdqIgWq832vXtF00orD6uCqP");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await fetch("http://localhost:5000/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency: "eur" }),
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      setMessage("Erreur: " + result.error.message);
    } else {
      setMessage("Paiement réussi !");
      setTimeout(()=>{
        navigate('/protected/profil')
      }, 2000)
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Paiement en ligne</h2>
      <div style={inputWrapperStyle}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Montant (€)"
          required
          style={inputStyle}
        />
      </div>
      <div style={cardElementWrapperStyle}>
        <CardElement options={cardElementOptions} />
      </div>
      <button type="submit" disabled={!stripe || loading} style={buttonStyle}>
        {loading ? "Paiement en cours..." : "Payer"}
      </button>
      {message && <p style={messageStyle}>{message}</p>}
    </form>
  );
};

const Payement = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

const formStyle = {
  width: "50%",
  maxWidth: "500px",
  minWidth: "350px",
  padding: "2rem",
  backgroundColor: "rgba(200, 200, 200, 0.2)",
  borderRadius: "5%",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const inputWrapperStyle = {
  width: "80%",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  margin: "0.5rem 0",
  borderRadius: "25px",
  border: "1px solid #357ABD",
  fontSize: "1rem",
  outline: "none",
};

const cardElementWrapperStyle = {
  width: "80%",
  marginBottom: "20px",
  padding: "10px",
  borderRadius: "25px",
  border: "1px solid #357ABD",
  backgroundColor: "white",
};

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      letterSpacing: "0.025em",
      placeholder: {
        color: "#aab7c4",
      },
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
    // Styles spécifiques pour chaque partie du formulaire
    cardNumber: {
      fontSize: "16px",
      padding: "0.8rem",
      borderRadius: "5px",
      border: "1px solid #357ABD",
      marginBottom: "10px",
      backgroundColor: "#f7f7f7",
    },
    expirationDate: {
      fontSize: "16px",
      padding: "0.8rem",
      borderRadius: "5px",
      border: "1px solid #357ABD",
      marginBottom: "10px",
      backgroundColor: "#f7f7f7",
    },
    cvc: {
      fontSize: "16px",
      padding: "0.8rem",
      borderRadius: "5px",
      border: "1px solid #357ABD",
      marginBottom: "10px",
      backgroundColor: "#f7f7f7",
    },
  },
};

const buttonStyle = {
  width: "80%",
  padding: "0.8rem",
  marginTop: "1rem",
  borderRadius: "25px",
  border: "none",
  backgroundColor: "#357ABD",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

const messageStyle = {
  marginTop: "10px",
  fontSize: "14px",
  color: "#ff4d4f",
};

export default Payement;
