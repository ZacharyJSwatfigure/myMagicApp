import React, { useState } from "react";
import "../../style/login.css";

export default function Login() {
  //determines whether popup is enabled
  const [signUp, setSignUp] = useState(false);
  //Holds all users information for sign In
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  // this function handles the users input for the form
  const handleFormSubmit = () => {
    console.log("sign in");
    console.log(signIn.username);
    console.log(signIn.password);
  };
  return (
    <section>
      <div className="loginHolder">
        <h1 className="loginHeader">Login</h1>
        <section className="loginHolderInner">
          <section></section>
          <form
            onSubmit={() => {
              handleFormSubmit();
            }}
          >
            <div>
              <div className="inputPromptLogin">Username: </div>
              <input
                value={signIn.username}
                type="text"
                placeholder="Username"
              ></input>
            </div>
            <br />
            <div>
              <div className="inputPromptLogin">Password: </div>
              <input
                value={signIn.password}
                type="password"
                placeholder="Password"
              ></input>
            </div>
            <input className="submitBtn" type="submit" />
          </form>
        </section>
      </div>
    </section>
  );
}
