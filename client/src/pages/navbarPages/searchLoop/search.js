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
      <ul>
        {cards.map((card, index) => {
          return (
            <li
              key={index}
              value={card}
              className="cardList"
              onClick={() => searchCard(card)}
            >
              <p>{card}</p>
            </li>
          );
        })}
      </ul>
      {/* trying something end*/}

      {/* here is the popup  */}
      <CardPopup trigger={buttonPopUp} setTrigger={setButtonPopUp}>
        <h3>{specificCard.name}</h3>
      </CardPopup>
    </section>
  );
}
