import React from "react";
import Logo from "./logo/logo.js";
import CurrentUser from "./currentUserDisplay/navbar/currentUserDisplay.js";
import "../style/header.css";

export default function Header() {
  return (
    <section>
      <div>
        <ul className="noDots">
          <li>
            <Logo />
          </li>
          <li className="currentUser">
            <div className="currentUserBox">
              <CurrentUser />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
