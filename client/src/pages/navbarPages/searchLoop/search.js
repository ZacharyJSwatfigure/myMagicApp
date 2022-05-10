import React from "react";

export default function Search() {
  const searchCard = async () => {
    let res = await fetch("https://api.scryfall.com/cards/random");
    let response = await res.json();

    console.log(response);
  };

  return (
    <section>
      <h1>Search</h1>
      <input></input>
      <button onClick={searchCard}>Search</button>

      <h1>nopthing yet</h1>
    </section>
  );
}
