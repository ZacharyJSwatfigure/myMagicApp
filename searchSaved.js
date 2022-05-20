import React, { useState } from "react";
import "../../../style/search.css";
import CardPopup from "../searchLoop/popUpCard.js";

export default function Search() {
  const [cards, setCards] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false, "");
  const [userInput, setUserInput] = useState("");
  const [userAutofill, setUserAutofill] = useState([]);

  //this is where I am trying to make the second api CALL for auto complete
  const handleInputChange = async (userAutofill) => {
    userAutofill = [];
    let autofill = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${userInput}`
    );
    let autofillRes = await autofill.json();
    userAutofill.push(autofillRes);
    console.log(userAutofill);
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
      <section>
        <input
          type="text"
          id="userInput"
          placeholder="Card Name"
          defaultValue={userInput}
          className="userInput"
        ></input>
        <ul>
          {userAutofill.forEach(() => {
            return <li>hello</li>;
          })}
        </ul>
      </section>

      <button className="userInput" type="submit" onClick={handleInputChange}>
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
