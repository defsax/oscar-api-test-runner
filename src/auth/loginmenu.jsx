import { useContext, useState } from "react";
import LoginBox from "./loginbox";
import { AuthContext } from "../App";
import "./css/button.css";
import "./css/menu.css";

export default function LoginMenu() {
  const server = [
    "https://kennedy-dev1.gojitech.systems",
    "https://kennedy-staging1.gojitech.systems",
  ];
  const suffix = [
    "?siteURL=" +
      encodeURIComponent("https://goji-oscar1.gojitech.systems") +
      "&appVersion=dev",
    "",
  ];
  const { state } = useContext(AuthContext);

  const [selected, setSelected] = useState({
    dev: true,
    staging: false,
    server: server[0],
    suffix: suffix[0],
  });
  const [devSignIn, setDevSignIn] = useState({
    providerNo: "",
    name: "",
    pass: "",
    pin: "",
  });
  const [stagingSignIn, setStagingSignIn] = useState({
    providerNo: "",
    name: "",
    pass: "",
    pin: "",
  });

  let devButtonClass = selected.dev
    ? ".bottom-bar button button-selected"
    : ".bottom-bar button button-unselected";
  let stagingButtonClass = selected.staging
    ? ".bottom-bar button button-selected"
    : ".bottom-bar button button-unselected";

  return (
    <div className={"menu-dropdown"}>
      <h1>☰</h1>

      <div className={"login-menu"}>
        {selected.dev === true ? (
          <LoginBox
            key={"dev"}
            signIn={devSignIn}
            setSignIn={setDevSignIn}
            url={{ server: selected.server, suffix: selected.suffix }}
            isAuthenticated={state.dev.isAuthenticated}
          />
        ) : (
          <LoginBox
            key={"staging"}
            signIn={stagingSignIn}
            setSignIn={setStagingSignIn}
            url={{ server: selected.server, suffix: selected.suffix }}
            isAuthenticated={state.staging.isAuthenticated}
          />
        )}
        <div className={"bottom-bar"}>
          <button
            className={devButtonClass}
            onClick={() => {
              setSelected({
                dev: true,
                staging: false,
                server: server[0],
                suffix: suffix[0],
              });
            }}
          >
            dev
          </button>
          <button
            className={stagingButtonClass}
            onClick={() => {
              setSelected({
                dev: false,
                staging: true,
                server: server[1],
                suffix: suffix[1],
              });
            }}
          >
            staging
          </button>
        </div>
      </div>
    </div>
  );
}
