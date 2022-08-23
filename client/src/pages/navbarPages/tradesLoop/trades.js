import React, { useState, useEffect } from "react";
import TradePopUp from "./tradePopup";
import "../../../style/trade.css";
import MagPopUp from "./magnifyPop";

export default function Trade() {
  //Determiones wether selected card is going to tradse or receieve list
  const [tradeOrReceive, setTradeOrReceive] = useState(true);

  //List of cards being traded away
  const [tradeAwayList, setTradeAwayList] = useState([]);

  //List of cards being received
  const [receivingList, setReceivingList] = useState([]);

  //Determines wether the search popup is active or not
  const [buttonPopUpTrade, setButtonPopUpTrade] = useState(false);

  //Determines wether the magnify popup is active or not
  const [magnifyPopUpTrade, setMagnifyPopUpTrade] = useState(false);

  //This is the user input for the initial "fuzzy" search
  const [tradeUserInput, setTradeUserInput] = useState("");

  //this is the list that we get back from the fuzzy search
  const [fuzzyList, setFuzzyList] = useState([]);

  //This is the card being magnified. Info from api call gets pushed here when a new card gets clicked
  const [magnifiedCard, setMagnifiedCard] = useState({});

  const [isCard, setIsCard] = useState(false);

  //This is the total value of trades
  const [tradeValue, setTradeValue] = useState(0);
  //This is total of trade away
  const [tradeAwayValue, setTradeAwayValue] = useState(0);
  //This is the total of receiving value
  const [receivingValue, setReceivingValue] = useState(0);

  //makes sure that the user input is being updated when entered
  const handleUserChange = (e) => {
    setTradeUserInput(e.target.value);
  };

  useEffect(() => {
    console.log("useEffect triggered");
    handleTotalValue();
  }, [tradeAwayValue, receivingValue]);

  //this function will be ab2le to be called into trade and recive value totals with a switch ie... if false total for trade if true total for receiving
  const findValue = async (card) => {
    let value = await fetch(
      `https://api.scryfall.com/cards/named?exact=${card}`
    );
    if (value.status !== 200) {
      alert("somehting went wrong try again findValue()");
      return;
    }
    let response = await value.json();
    let cardV = 0;
    if (response.prices.usd === undefined || response.prices.usd === null) {
      cardV = 0;
    } else {
      cardV = parseFloat(response.prices.usd);
    }
    console.log(cardV + " " + response.name);
    let old = tradeAwayValue;
    setTradeAwayValue(cardV + old);
    console.log(tradeAwayValue + " TradeAwayValue");
    handleTotalValue();
  };

  const findValueR = async (card) => {
    let value = await fetch(
      `https://api.scryfall.com/cards/named?exact=${card}`
    );
    if (value.status !== 200) {
      alert("somehting went wrong try again findValueR()");
      return;
    }
    let response = await value.json();
    let cardV = 0;
    if (response.prices.usd === undefined || response.prices.usd === null) {
      cardV = 0;
    } else {
      cardV = parseFloat(response.prices.usd);
    }

    console.log(cardV + " " + response.name);
    let old = receivingValue;
    setReceivingValue(parseFloat(cardV) + parseFloat(old));
    handleTotalValue();
  };

  const handleTotalValue = () => {
    let value = Math.round((tradeAwayValue - receivingValue) * 100) / 100;
    setTradeValue(value);
    console.log(tradeValue);
  };

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

  const addFuzzyCard = (card) => {
    if (!card) {
      return alert("Fuzzy cards");
    }
    if (tradeOrReceive) {
      let list = tradeAwayList;
      list.push(card);
      setTradeAwayList(list);
    } else if (!tradeOrReceive) {
      let list = receivingList;
      list.push(card);
      setReceivingList(list);
      console.log(receivingList);
    }
  };

  async function magnifyCard(card) {
    await fetch(`https://api.scryfall.com/cards/named?exact=${card}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMagnifyPopUpTrade(true);
        setMagnifiedCard(data);
      });
  }

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
                        <h1
                          className="tradeItem"
                          value={card}
                          onClick={() => {
                            magnifyCard(card);
                            setIsCard(true);
                          }}
                        >
                          {card}
                        </h1>
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
              <section>
                <div>
                  <p className="magPopName">
                    Total trade value: {tradeAwayValue}{" "}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
        <section className="tradeHolder">
          <div className="spacer">
            <h1>Receiving</h1>
            <div>
              {receivingList.length >= 1 ? (
                <ol className="holdingSelected">
                  {receivingList.map((card, index) => {
                    return (
                      <li className="selectedTrades" key={index}>
                        <h1
                          className="tradeItem"
                          value={card}
                          onClick={() => {
                            magnifyCard(card);
                            setIsCard(true);
                          }}
                        >
                          {card}
                        </h1>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p></p>
              )}
              <button
                onClick={() => {
                  setTradeOrReceive(false);
                  setButtonPopUpTrade(true);
                }}
              >
                Add a card?
              </button>
              <section>
                <div>
                  <p className="magPopName">
                    Total trade value: {receivingValue}
                  </p>
                </div>
              </section>
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
                      addFuzzyCard(cardName);
                      setButtonPopUpTrade(false);
                      if (tradeOrReceive === true) {
                        findValue(cardName);
                      } else if (tradeOrReceive === false) {
                        findValueR(cardName);
                      } else {
                        alert("Error fuzzyList calling which list to update");
                      }
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
      <MagPopUp trigger={magnifyPopUpTrade} setTrigger={setMagnifyPopUpTrade}>
        {isCard ? (
          <section className="magPopBackground">
            <h1 className="magPopName">{magnifiedCard.name}</h1>
            <div className="magPopCardInfo">
              <section>
                {console.log(magnifiedCard.prices && magnifiedCard.prices.usd)}
                <h1>
                  USD: {magnifiedCard.prices && magnifiedCard.prices.usd}$
                </h1>
                <h1>
                  Foil: {magnifiedCard.prices && magnifiedCard.prices.usd_foil}$
                </h1>
                <h1>
                  Go Buy It!
                  {console.log(magnifiedCard.purchase_uris)}
                  {/* you stopped here working on magnified cards go buy it link */}
                  {magnifiedCard.purchase_uris &&
                    Object.keys(magnifiedCard.purchase_uris).map(
                      (key, index) => {
                        return (
                          <div key={index}>
                            <a
                              href={magnifiedCard.purchase_uris[key]}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {[key]}
                            </a>
                            {/* extra */}
                            <hr />
                          </div>
                        );
                      }
                    )}
                </h1>
              </section>
              <div>
                <h1></h1>
              </div>
            </div>
          </section>
        ) : (
          <h1>error with render</h1>
        )}
      </MagPopUp>

      <section>
        <div>
          {tradeValue > 0 ? (
            <p className="totalValueG">Total trade value: {tradeValue} </p>
          ) : (
            <p className="totalValueR">Total trade value: {tradeValue} </p>
          )}
        </div>
      </section>
    </section>
  );
}
