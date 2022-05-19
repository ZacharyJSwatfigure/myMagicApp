import React, { useState } from "react";
import "../../../style/search.css";
import CardPopup from "../searchLoop/popUpCard.js";

export default function Search() {
  const [cards, setCards] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false, "");
  const [userInput, setUserInput] = useState("");
  // const [selected, setSelected] = useState("");

  // possible function starts
  // possible function ends

  const handleUserChange = (e) => {
    setUserInput(e.target.value);
  };

  const searchCard = async (cards) => {
    cards = [];

    let res = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${userInput}`
    );
    let response = await res.json();

    cards.push(response);

    setCards(cards);
    displaySearch();
    console.log(cards[0].data);

    return cards;
  };
  const displaySearch = () => {
    if (cards) {
      let cardsInSearch = cards[0].data;
      console.log("here ---> " + cardsInSearch);
      cardsInSearch.map((index) => {
        return (
          <li className="cardList" key={index}>
            hello
          </li>
        );
      });
    }
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
      <ul>{cards ? displaySearch() : null}</ul>
      {/* trying something end*/}

      {/* here is the popup  */}
      <CardPopup trigger={buttonPopUp} setTrigger={setButtonPopUp}></CardPopup>
    </section>
  );
}
