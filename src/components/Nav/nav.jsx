import { React, useContext } from "react";
import { AuthContext } from "../../App";
import LoginMenu from "../../auth/loginmenu";
import TestMenu from "./testmenu";

import "./css/nav.css";
import "./css/button.css";
import "./css/testmenu.css";

export default function Nav() {
  const { state } = useContext(AuthContext);

  return (
    <nav>
      <div className="float-left">
        <h1>Kennedy Backend Testing</h1>
      </div>

      <div className="float-right">
        {state.user ? (
          <h4 className={"user-id"}>
            {state.user} ({state.dev.isAuthenticated ? "dev" : null}
            {state.dev.isAuthenticated && state.staging.isAuthenticated
              ? " / "
              : null}
            {state.staging.isAuthenticated ? "staging" : null})
          </h4>
        ) : null}
        <TestMenu />
        <LoginMenu />
      </div>
    </nav>
  );
}
