import React, { useState } from "react";
import "../../../style/search.css";
import CardPopup from "../searchLoop/popUpCard.js";

export default function Search() {
  const [cards, setCards] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [specificCard, setSpecificCard] = useState(null);

  // possible function starts
  // possible function ends

  const handleUserChange = (e) => {
    setUserInput(e.target.value);
  };

  const bestMatchingNames = async () => {
    let res = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${userInput}`
    );

    if (res.status !== 200) {
      console.error("Something went wrong! Try again later.");
      setCards([]);
      return;
    }
    let response = await res.json();
    setCards(response.data);
  };

  const searchCard = async (cardName) => {
    let res = await fetch(
      `https://api.scryfall.com/cards/named?exact=${cardName}`
    );

    if (res.status !== 200) {
      console.error("Something went wrong! Try again later.");
      setSpecificCard(null);
      return;
    }

    let response = await res.json();
    setSpecificCard(response);
    console.log(response);
    console.log(specificCard.image_uris.small);
    setButtonPopUp(true);
  };

  return (
    <section>
      <section>
        <input
          type="text"
          id="userInput"
          placeholder="Card Name"
          value={userInput}
          className="userInput"
          onChange={handleUserChange}
        ></input>
      </section>

      <button className="userInput" type="submit" onClick={bestMatchingNames}>
        Search
      </button>

      {/* trying something start*/}
      {cards.length >= 1 ? (
        <ul className="cardListUl">
          {cards.map((card, index) => {
            return (
              <li
                key={index}
                value={card}
                className="cardList"
                onClick={() => searchCard(card)}
              >
                <section>
                  <p>{card}</p>
                </section>
              </li>
            );
          })}
        </ul>
      ) : (
        <h1></h1>
      )}

      {/* trying something end*/}

      {/* here is the popup  */}
      <CardPopup trigger={buttonPopUp} setTrigger={setButtonPopUp}>
        {specificCard ? (
          <section className="popUpContainer">
            <section className="popUpText">
              <div>
                <h3>{specificCard.name}</h3>
                <div>
                  <img
                    className="cardImage"
                    src={specificCard.image_uris.normal}
                  />
                </div>
                <div>USD: {specificCard.prices.usd}$</div>
                <div>Foil: {specificCard.prices.usd_foil}$</div>
              </div>
              <h1>
                Go Buy It!
                {console.log(specificCard.purchase_uris)}
                {specificCard.purchase_uris &&
                  Object.keys(specificCard.purchase_uris).map((key, index) => {
                    return (
                      <div key={index}>
                        <a
                          className="buyLinks"
                          href={specificCard.purchase_uris[key]}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {[key]}
                        </a>
                        {/* extra */}
                        <hr />
                      </div>
                    );
                  })}
              </h1>
            </section>
          </section>
        ) : (
          <h1></h1>
        )}
      </CardPopup>
    </section>
  );
}
