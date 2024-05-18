import "../styles/offercard.css";
import "../App.css";
import createClient from "../client";
import { useState, useEffect } from "react";

function OfferCard() {
  const [offer, setOffer] = useState("Introductory offer: Avail 10% off with FIRSTORDER");

  useEffect(() => {
    const query = `*[_type == 'offerCard'][0].content`;

    createClient
      .fetch(query)
      .then((data) => {
        setOffer(data);
      })
      .catch((error) => {
        console.error("Error fetching offer data:", error);
      });
  }, []);

  return (
    <>
      <div className="card ft-primary">
        <p className="offer-text">{offer}</p>
      </div>
    </>
  );
}

export default OfferCard;
