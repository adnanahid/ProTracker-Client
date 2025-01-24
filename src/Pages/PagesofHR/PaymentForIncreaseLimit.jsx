import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import useCheckRole from "../../CustomHooks/useCheckRole";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key);

const CheckoutForm = () => {
  const { clientDetails, clientDetailsRefetch } = useCheckRole();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const membersLimit = location.state.pkg.membersLimit;
  const price = location.state.pkg.price;
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent-two", { price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log("Client secret:", res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe. js has not loaded yet");
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
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("  ");
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: clientDetails.email,
            name: clientDetails.fullname,
          },
        },
      });
    if (confirmError) {
      console.log("Error confirm Payment:", confirmError);
      setError(confirmError.message);
    } else {
      console.log("payment Successful:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        axiosSecure
          .patch("/increase-limit", {
            membersLimit,
            email: clientDetails.email,
          })
          .then((res) => {
            console.log(res.data);
            clientDetailsRefetch();
          })
          .catch((error) => {
            console.log(error);
          });
        toast.success(
          `Payment successful! Transaction ID: ${paymentIntent.id}`
        );
        navigate("/all-employees");
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

const PaymentForIncreaseLimit = () => {
  return (
    <div className="p-24">
      <Helmet>
        <title>Payment - ProTracker</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center text-black">Payment</h1>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentForIncreaseLimit;
