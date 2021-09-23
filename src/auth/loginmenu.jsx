// import { UseSessionProvider } from "react-session-hook";
import { useContext, useState } from "react";
import LoginBox from "./loginbox";
import { AuthContext } from "../App";
import "./css/button.css";
import "./css/menu.css";

export default function LoginMenu(props) {
  const loginURL = [
    "https://kennedy-dev1.gojitech.systems/api/v1/login?siteURL=" +
      encodeURIComponent("https://goji-oscar1.gojitech.systems") +
      "&appVersion=dev",
    "https://kennedy-staging1.gojitech.systems/api/v1/login",
  ];
  const { state } = useContext(AuthContext);

  const [selected, setSelected] = useState({
    dev: true,
    staging: false,
    server: loginURL[0],
  });
  const [devProvNo, setDevProvNo] = useState("");
  const [stagingProvNo, setStagingProvNo] = useState("");

  let devButtonClass = selected.dev
    ? ".bottom-bar button button-selected"
    : ".bottom-bar button button-unselected";
  let stagingButtonClass = selected.staging
    ? ".bottom-bar button button-selected"
    : ".bottom-bar button button-unselected";

  return (
    <div className={"dropdown"}>
      <h1>☰</h1>

      <div className={"login-menu"}>
        {selected.dev === true ? (
          <LoginBox
            key={"dev"}
            provNo={devProvNo}
            setProvNo={setDevProvNo}
            setToken={props.setToken}
            clientId={props.clientId}
            server={selected.server}
            isAuthenticated={state.dev.isAuthenticated}
          />
        ) : (
          <LoginBox
            key={"staging"}
            provNo={stagingProvNo}
            setProvNo={setStagingProvNo}
            setToken={props.setToken}
            clientId={props.clientId}
            server={selected.server}
            isAuthenticated={state.staging.isAuthenticated}
          />
        )}
        <div className={"bottom-bar"}>
          <button
            className={devButtonClass}
            onClick={() => {
              setSelected({ dev: true, staging: false, server: loginURL[0] });
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
                server: loginURL[1],
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
