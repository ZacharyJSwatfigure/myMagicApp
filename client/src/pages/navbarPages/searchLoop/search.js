import React, { useState } from "react";
import "../../../style/search.css";
import CardPopup from "../searchLoop/popUpCard.js";

export default function Search() {
  const [cards, setCards] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false, "");
  const [userInput, setUserInput] = useState("");
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const searchCard = async (cards) => {
    cards = [];

    let res = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${userInput}`
    );
    let response = await res.json();
    cards.push(response);
    console.log(cards);
    setCards(cards);
    return cards;
  };
  return (
    <section>
      <input
        type="text"
        id="userInput"
        placeholder="Card Name"
        onChange={handleInputChange}
        value={userInput}
        className="userInput"
        onSubmit={searchCard}
      ></input>
      <button className="userInput" type="submit" onClick={searchCard}>
        Search
      </button>
      <ul className="cardListUl">
        {cards.map((cards, index) => {
          return (
            <li className="cardList" key={index}>
              <a onClick={(e) => setButtonPopUp(true, e.target.value)}>
                {cards.data}
              </a>
            </li>
          );
        })}
      </ul>
      <CardPopup trigger={buttonPopUp} setTrigger={setButtonPopUp}>
        {cards.map((cards) => {
          return <p>{cards.name}</p>;
        })}
      </CardPopup>
    </section>
  );
}
