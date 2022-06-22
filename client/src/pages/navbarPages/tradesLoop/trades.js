import React, { useState } from "react";
import TradePopUp from "./tradePopup";
import "../../../style/trade.css";

export default function Trade() {
  //if tradeOrReceive is true it's the user's trade
  //if tradeOrReceive is false it's the user's receive
  const [tradeOrReceive, setTradeOrReceive] = useState(true);
  const [trades, setTrades] = useState([]);
  const [receive, setReceive] = useState([]);
  const [newCard, setNewCard] = useState("");
  const [tradeUserInput, setTradeUserInput] = useState("");
  const [buttonPopUpTrade, setButtonPopUpTrade] = useState(false);

  const addACard = () => {
    setButtonPopUpTrade(true);
  };

  const handleUserChange = (e) => {
    setTradeUserInput(e.target.value);
    console.log(e.target.value);
  };

  const handleTradeSearch = async () => {
    let res = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${tradeUserInput}`
    );

    if (res.status !== 200) {
      console.error("Something went wrong! Try again later.");
      setTrades([]);
      return;
    }
    let response = await res.json();
    setTrades(response.data);
  };

  //trying to fgure out how to push to a list

  const tradeSearchCard = async () => {
    let card = newCard;
    let res = await fetch(`https://api.scryfall.com/cards/named?exact=${card}`);
    let response = await res.json();
    if (tradeOrReceive && response) {
      console.log("response from exact  " + response);
      setTrades(trades.push(response));
      console.log(trades);
      setButtonPopUpTrade(false);
    }
  };

  return (
    <section className="allHolderLRG">
      <section className="allHolder">
        <section className="tradeHolder">
          <div className="spacer">
            <h1>Trade Away</h1>
            <div>
              <button
                onClick={() => {
                  addACard();
                  setTradeOrReceive(true);
                }}
              >
                add card?
              </button>
            </div>
          </div>
        </section>
        <section className="tradeHolder">
          <div className="spacer">
            <h1>Receiving</h1>
            <div>
              <button>add card?</button>
            </div>
          </div>
        </section>
      </section>

      <TradePopUp trigger={buttonPopUpTrade} setTrigger={setButtonPopUpTrade}>
        <section className="tradeHolder">
          <input
            value={tradeUserInput}
            onChange={handleUserChange}
            placeholder="Card Name"
          ></input>
          <button onClick={handleTradeSearch}>search</button>
          {trades.length >= 0 ? (
            <ol className="cardListOl">
              {trades.map((trade, index) => {
                return (
                  <li
                    className="tradeListItem"
                    key={index}
                    value={trade}
                    onClick={() => {
                      setNewCard(trade);
                      tradeSearchCard();
                    }}
                  >
                    <section>
                      <p>{trade}</p>
                    </section>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p></p>
          )}
        </section>
      </TradePopUp>
    </section>
  );
}
