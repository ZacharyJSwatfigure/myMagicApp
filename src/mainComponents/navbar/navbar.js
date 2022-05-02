import React, { Component } from "react";
import { MenuItems } from "./navbarItems";
import "../../style/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="NavBarContainer">
        <div>
          <ul className="NavBarList">
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
