import React, { useState, useEffect } from "react";
import TradePopUp from "./tradePopup";
import "../../../style/trade.css";

export default function Trade() {
  //Determiones wether selected card is going to tradse or receieve list
  const [tradeOrReceive, setTradeOrReceive] = useState(true);

  //List of cards being traded away
  const [tradeAwayList, setTradeAwayList] = useState([]);

  //List of cards being received
  const [receivingList, setReceivingList] = useState([]);

  //Determines wether the search popup is active or not
  const [buttonPopUpTrade, setButtonPopUpTrade] = useState(false);

  //This is the user input for the initial "fuzzy" search
  const [tradeUserInput, setTradeUserInput] = useState("");

  //this is the list that we get back from the fuzzy search
  const [fuzzyList, setFuzzyList] = useState([]);

  //This is the cards name taken from the initial "fuzzy" search
  const [exactCard, setExactCard] = useState("");

  //makes sure that the user input is being updated when entered
  const handleUserChange = (e) => {
    setTradeUserInput(e.target.value);
  };

  useEffect(() => {
    console.log("use effect ran");
    console.log(exactCard);
    setExactCard(exactCard);
  }, [exactCard]);

  //Searches the api for the user input. "fuzzy"
  const handleFuzzySearch = async () => {
    let fuzzy = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${tradeUserInput}`
    );
    if (fuzzy.status !== 200) {
      alert("Something went wrong! Try again later. --fuzzySearch--");
      setTradeUserInput("");
    }
    let response = await fuzzy.json();
    setFuzzyList(response.data);
    console.log(fuzzyList);
  };

  // When the user finds the exact card that they want they click it and it adds to the list
  const addExactCard = async () => {
    let exactCardSearch = await fetch(
      `https://api.scryfall.com/cards/named?exact=${exactCard}`
    );
    if (exactCardSearch.status !== 200) {
      alert(
        "Something went wrong! Try again later. Error with API --exactCardSearch--"
      );
      return;
    }
    let newCard = await exactCardSearch.json();
    if (tradeOrReceive) {
      let list = tradeAwayList;
      list.push(newCard);
      setTradeAwayList(list);
      console.log(tradeAwayList);
    }
    setButtonPopUpTrade(false);
  };

  return (
    <section className="allHolderLRG">
      <section className="allHolder">
        <section className="tradeHolder">
          <div className="spacer">
            <h1>Trade Away</h1>
            <div>
              {tradeAwayList.length >= 1 ? (
                <ol className="holdingSelected">
                  {tradeAwayList.map((card, index) => {
                    return (
                      <li className="selectedTrades" key={index}>
                        <h1 className="tradeItem">{card.name} -- </h1>
                        <h1 className="tradeItem">{card.prices.usd}</h1>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p></p>
              )}
              <button
                onClick={() => {
                  setTradeOrReceive(true);
                  setButtonPopUpTrade(true);
                }}
              >
                Add a card?
              </button>
            </div>
          </div>
        </section>
        <section className="tradeHolder">
          <div className="spacer">
            <h1>Receiving</h1>
            <div>
              <button
                onClick={() => {
                  setTradeOrReceive(false);
                  setButtonPopUpTrade(true);
                }}
              >
                Add a card?
              </button>
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
          <button
            onClick={() => {
              handleFuzzySearch();
            }}
          >
            search
          </button>
          {fuzzyList.length >= 0 ? (
            <ol className="cardListOl">
              {fuzzyList.map((cardName, index) => {
                return (
                  <li
                    key={index}
                    value={cardName}
                    onClick={() => {
                      setExactCard(cardName);
                      addExactCard();
                    }}
                  >
                    <section className="fuzzyListItem">
                      <p>{cardName}</p>
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
