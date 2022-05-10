import React, { useState } from "react";
import Header from "../mainComponents/header.js";
import Login from "../pages/signInUp/login";
import Search from "../pages/navbarPages/searchLoop/search";
import Saved from "../pages/navbarPages/searchLoop/saved";
import Trends from "../pages/navbarPages/trendsLoop/trends";
import Trades from "../pages/navbarPages/tradesLoop/trades";

import { MenuItems } from "../mainComponents/navbar/navbarItems";
import "../style/navbar.css";

function MainPage() {
  const [currentPage, setCurrentPage] = useState("Login");
  const renderPage = () => {
    if (currentPage === "Search") {
      return <Search />;
    }
    if (currentPage === "Saved") {
      return <Saved />;
    }
    if (currentPage === "Trends") {
      return <Trends />;
    }
    if (currentPage === "Trades") {
      return <Trades />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <section>
      <Header />
      <div className="NavBarContainer">
        <div>
          <ul className="NavBarList">
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    className={item.cName}
                    onClick={() => handlePageChange(item.title)}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <section className="currentPageCenter">
        <section currentPage={currentPage} handlePageChange={handlePageChange}>
          {renderPage()}
        </section>
      </section>
    </section>
  );
}

export default MainPage;
