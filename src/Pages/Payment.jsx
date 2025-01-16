import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../CustomHooks/UseAxiosPublic";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key);

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const HRInfo = location.state;
  const packageAmount = parseInt(HRInfo.package);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", { amount: packageAmount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log("Client secret:", res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, [axiosPublic, packageAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("CardElement not found.");
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: HRInfo.email,
            name: HRInfo.fullName,
          },
        },
      });

    if (confirmError) {
      console.error("Error confirming payment:", confirmError);
      setError(confirmError.message);
    } else {
      console.log("Payment successful:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const updatedHRInfo = {
          ...HRInfo,
          transactionId: paymentIntent.id,
          paymentStatus: paymentIntent.status,
        };
        axiosPublic
          .post("/add-hr", updatedHRInfo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        toast.success(
          `Payment successful! Transaction ID: ${paymentIntent.id}`
        );
        navigate("/");
      }
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-screen-sm mx-auto mt-16">
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
        type="submit"
        disabled={!stripe || !clientSecret}
        className="btn btn-sm text-white mt-4 bg-black w-32 hover:bg-gray-700"
      >
        Pay
      </button>
    </form>
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
