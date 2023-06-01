import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { SendGet } from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({listingID}:{listingID:string}) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Uspešno plaćanje!");
          break;
        case "processing":
          setMessage("Plaćanje se procesuira");
          break;
        case "requires_payment_method":
          setMessage("Plaćanje nije uspelo... Probajte ponovo");
          break;
        default:
          setMessage("Nešto nije u redu...");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
      },
      redirect:"if_required"
    });

    if(!response.error){
        // Send get to see if payment successfull, if it is go to account page.
        SendGet("check-payment",{paymentID:response.paymentIntent.id,listingID:listingID}).then(data=>{
            if(data.status!=200) return alert("Greška sa plaćanjem...");

            if(document.location.href.includes("account")) return navigate("/listings");
            return navigate("/account");
        });
    }

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (response.error.type === "card_error" || response.error.type === "validation_error") {
      setMessage(response.error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="flex bg-listing-dark hover:bg-listing-light text-mint gap-3 items-center justify-center rounded-[10px] px-4 h-[44px] transition transform duration-700 ease-in-out hover:scale-105 w-full border-mint border mt-5">
          {isLoading ? <img src="loader.svg" className="animate-spin"/> : "Plati sada"}
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}