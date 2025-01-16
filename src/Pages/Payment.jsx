import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();
  const location = useLocation();
  const packageAmount = location.state;

  const handleSubmit = async () => {
    // e.preventDefault();

    console.log(packageAmount);

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("CardElement not found.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setError(error.message);
    } else {
      console.log("PaymentMethod created successfully:", paymentMethod);
      toast.success("Payment successful");
      setError("");
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-16">
      <div className="border border-gray-300 rounded-md p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        // type="submit"
        onClick={handleSubmit}
        disabled={!stripe}
        className="btn btn-sm text-white mt-4 bg-black w-32 hover:bg-gray-700"
      >
        Pay
      </button>
    </div>
  );
};

const Payment = () => {
  return (
    <div className="p-24">
      <h1 className="text-4xl font-bold text-center text-black">Payment</h1>
      <div>
        {/* Wrap the CheckoutForm inside the Elements provider */}
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
