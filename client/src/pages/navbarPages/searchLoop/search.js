import React, { useState } from "react";
import "../../../style/search.css";

export default function Search() {
  const [cards, setCards] = useState([]);
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
      <section>
        {cards.map((cards) => {
          return (
            <h1 className="allHolder" key={cards.id}>
              <section className="liContainer">
                <h1 className="cardName">{cards.name}</h1>
                <section>
                  <h1 className="ulContainer">
                    <li className="cardPrices">Normal: {cards.prices.usd}$</li>
                    <li className="cardPrices">
                      Foil: {cards.prices.usd_foil}$
                    </li>
                  </h1>
                </section>
                <h1>
                  <img
                    className="cardPicture"
                    src={cards.image_uris.small}
                  ></img>
                </h1>
              </section>
            </h1>
          );
        })}
      </section>
    </section>
  );
}
