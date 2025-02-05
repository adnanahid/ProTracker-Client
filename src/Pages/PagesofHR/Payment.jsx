import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../CustomHooks/UseAxiosPublic";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key);

const CheckoutForm = ({ PayInfo }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", {
        amount: parseInt(PayInfo.packageAmount),
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        console.log("Client secret:", res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, [axiosPublic, PayInfo.packageAmount]);

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
            email: PayInfo.email,
            name: PayInfo.fullName,
          },
        },
      });

    if (confirmError) {
      console.error("Error confirming payment:", confirmError);
      setError(confirmError.message);
    } else {
      console.log("Payment successful:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const updatedPayInfo = {
          ...PayInfo,
          transactionId: paymentIntent.id,
          paymentStatus: paymentIntent.status,
        };
        axiosPublic
          .post("/add-hr", updatedPayInfo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        toast.success(
          `${PayInfo.packageAmount}USD Payment successful! Transaction ID: ${paymentIntent.id}`
        );
        navigate("/");
      }
      setError("");
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-16">
      <div className="border border-gray-300 rounded-md p-3">
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
        disabled={!stripe || !clientSecret}
        className="btn btn-sm text-white mt-4 bg-black w-32 hover:bg-gray-700"
        onClick={handleSubmit}
      >
        Pay
      </button>
    </div>
  );
};

const CheckoutFormSSL = ({ PayInfo }) => {
  const axiosPublic = useAxiosPublic();

  const payment = {
    email: PayInfo.email,
    price: PayInfo.packageAmount,
    trxId: "",
    data: new Date(),
    status: "pending",
  };

  const handlePay = async () => {
    const response = await axiosPublic.post("/create-ssl-payment", payment);
    if (response.data?.gatewayUrl) {
      window.location.replace(response.data.gatewayUrl);
    }
  };
  return (
    <div className="max-w-screen-sm mx-auto mt-16">
      <input
        type="text"
        placeholder={`${PayInfo.email}`}
        readOnly
        className="input input-bordered w-full py-4"
      />
      <br />
      <button
        className="w-32 btn mt-3 btn-sm bg-black text-white"
        onClick={handlePay}
      >
        Pay
      </button>
    </div>
  );
};

const Payment = () => {
  const [method, setMethod] = useState("stripe");
  const location = useLocation();
  const PayInfo = location.state;

  return (
    <div className="p-24">
      <Helmet>
        <title>Payment - ProTracker</title>
      </Helmet>
      <div className="my-4 flex justify-center gap-5">
        <h1 className="text-4xl font-bold text-center text-black">
          Payment With
        </h1>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="select select-bordered max-w-xs"
        >
          <option value="stripe">Stripe</option>
          <option value="sslcommerz">SSL Commerz</option>
        </select>
      </div>
      {method === "stripe" && (
        <Elements stripe={stripePromise}>
          <CheckoutForm PayInfo={PayInfo} />
        </Elements>
      )}
      {method === "sslcommerz" && (
        <p className="mt-4">
          <CheckoutFormSSL PayInfo={PayInfo}></CheckoutFormSSL>
        </p>
      )}
    </div>
  );
};

export default Payment;
