import { useState } from "react";
import LoginButton from "./loginbutton";
import LogoutButton from "./logoutbutton";
import Loader from "react-loader-spinner";

export default function LoginBox(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { url, signIn, setSignIn, isAuthenticated } = props;
  let currentServer = "";

  if (url.server.search("dev") !== -1) {
    currentServer = "dev";
  } else {
    currentServer = "staging";
  }

  const clearInput = function () {
    setSignIn({});
  };

  if (isAuthenticated === false) {
    return (
      <div>
        <form>
          <h2>Login:</h2>
          <input
            type="text"
            onChange={(e) => {
              setSignIn({ ...signIn, name: e.target.value });
            }}
            value={signIn.name || ""}
            placeholder="Name"
          />
          <input
            type="password"
            onChange={(e) => {
              setSignIn({ ...signIn, pass: e.target.value });
            }}
            value={signIn.pass || ""}
            placeholder="Password"
            autoComplete="password"
          />
          <input
            type="password"
            onChange={(e) => {
              setSignIn({ ...signIn, pin: e.target.value });
            }}
            value={signIn.pin || ""}
            placeholder="PIN"
            autoComplete="password"
          />
          <input
            type="text"
            onChange={(e) => {
              setSignIn({ ...signIn, providerNo: e.target.value });
            }}
            value={signIn.providerNo || ""}
            placeholder="ProviderNo"
          />
          {error ? <div className={"login-error"}>{error}</div> : null}
          {loading ? (
            <div>
              <Loader
                type="TailSpin"
                color="rgb(0, 0, 0)"
                height={30}
                width={30}
              />
            </div>
          ) : (
            <LoginButton
              url={url}
              credentials={signIn}
              clearInput={clearInput}
              setLoading={setLoading}
              setError={setError}
            />
          )}
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Logged in to: </h2>
        <h4>{currentServer}</h4>
        <LogoutButton />
      </div>
    );
  }
}
