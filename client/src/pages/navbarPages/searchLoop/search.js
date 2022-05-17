import React, { useState } from "react";
import "../../../style/search.css";
import CardPopup from "../searchLoop/popUpCard.js";

export default function Search() {
  const [cards, setCards] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false, "");
  const [userInput, setUserInput] = useState("");
  const [userAutofill, setUserAutofill] = useState([]);

  //this is where I am trying to make the second api CALL
  const handleInputChange = async (userInput) => {
    setUserInput(userInput);
    userAutofill = [];
    let autofill = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${userInput}`
    );
    //after api call await the response and push it to userAutofill
    let autofillRes = await autofill.json();
    userAutofill.push(autofillRes);
    // console logs
    console.log(userAutofill);
    console.log(userInput);
    //console.logs
    //userAutofill is constant error
    setUserAutofill(userAutofill);
    return userAutofill;
  };

  const searchCard = async (cards) => {
    cards = [];

    let res = await fetch(
      `https://api.scryfall.com/cards/named?exact=${userInput}`
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
      ></input>

      <button className="userInput" type="submit" onClick={searchCard}>
        Search
      </button>
      <ul className="cardListUl">
        {cards.map((cards) => {
          return (
            <li className="cardList" key={cards.id}>
              <a onClick={() => setButtonPopUp(true)}>{cards.name}</a>
            </li>
          );
        })}
      </ul>
      <CardPopup trigger={buttonPopUp} setTrigger={setButtonPopUp}>
        {cards.map((cards) => {
          return (
            <section className="popUpContainer">
              <div>
                <h1 className="popUpText">{cards.name}</h1>
              </div>
              <div>
                <h1 className="popUpText">USD: {cards.prices.usd}$</h1>
                <h1 className="popUpText">
                  USD Foil: {cards.prices.usd_foil}$
                </h1>
              </div>
            </section>
          );
        })}
      </CardPopup>
    </section>
  );
}
