import React from "react";

export default function Search() {
  const searchCard = async () => {
    let res = await fetch("https://api.scryfall.com/cards/random", {
      method: "GET",
    });
    let response = JSON.stringify(res);
    console.log(response.name);
    return await res.json();
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
