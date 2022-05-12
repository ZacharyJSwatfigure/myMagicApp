import React, { useState } from "react";
import "../../../style/search.css";
import CardPopup from "../searchLoop/popUpCard.js";

export default function Search() {
  const [cards, setCards] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false);
  const searchCard = async (cards) => {
    cards = [];

    let res = await fetch("https://api.scryfall.com/cards/random");
    let response = await res.json();
    cards.push(response);
    console.log(cards);
    setCards(cards);
    return cards;
  };
  return (
    <section>
      <input className="userInput"></input>
      <button className="userInput" type="button" onClick={searchCard}>
        Search
      </button>
      <ul>
        {cards.map((cards) => {
          return (
            <li className="cardList" key={cards.id}>
              <a onClick={() => setButtonPopUp(true)}>{cards.name}</a>
            </li>
          );
        })}
      </ul>
      <CardPopup trigger={buttonPopUp} setTrigger={setButtonPopUp}></CardPopup>
    </section>
  );
}
