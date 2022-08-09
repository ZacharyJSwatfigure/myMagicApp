import React, { useState } from "react";

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
      <div>
        <section>
          <h1>Login</h1>
        </section>
        <form
          onSubmit={() => {
            handleFormSubmit();
          }}
        >
          <div>
            Username:{" "}
            <input
              value={signIn.username}
              type="text"
              placeholder="Username"
            ></input>
          </div>
          <br />
          <div>
            Password:{" "}
            <input
              value={signIn.password}
              type="password"
              placeholder="Password"
            ></input>
          </div>
          <input type="submit" />
        </form>
      </div>
    </section>
  );
}
