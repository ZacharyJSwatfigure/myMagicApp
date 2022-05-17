import React, { useState } from "react";
import "../../../style/search.css";
import CardPopup from "../searchLoop/popUpCard.js";

export default function Search() {
  const [cards, setCards] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false, "");
  const [userInput, setUserInput] = useState("");
  const [selected, setSelected] = useState("");

  const handleUserChange = (e) => {
    setUserInput(e.target.value);
  };

  // const userSelect = (event) => {
  //   console.log(event.target.value);
  //   setSelected(event.target.value);
  // };

  const searchCard = async (cards) => {
    cards = [];

    let res = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${userInput}`
    );
    let response = await res.json();

    cards.push(response);

    setCards(cards);
    return cards;
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

      <button className="userInput" type="submit" onClick={searchCard}>
        Search
      </button>

      {/* trying something start*/}

      {/* trying something end*/}
      <ul className="cardListUl">
        {cards.map((cards, index) => {
          return (
            <li className="cardList" key={index}>
              <a onClick={() => setButtonPopUp(true)}>{cards.data}</a>
            </li>
          );
        })}
      </ul>
      {/* here is the popup  */}
      <CardPopup trigger={buttonPopUp} setTrigger={setButtonPopUp}></CardPopup>
    </section>
  );
}
