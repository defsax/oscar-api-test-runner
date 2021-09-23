import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import LoginMenu from "../../auth/loginmenu";

import "./css/nav.css";
import "./css/button.css";

export default function Nav() {
  const { state } = useContext(AuthContext);

  return (
    <nav>
      <div className="float-left">
        <Link to="/" className="link-item">
          <h1>Endpoint Tests</h1>
        </Link>
        <Link to="/scheduled" className="link-item">
          <h1>Scheduled Tests</h1>
        </Link>
      </div>

      <div className="float-right">
        {state.user ? (
          <h4>
            {state.user} ({state.dev.isAuthenticated ? "dev" : null}
            {state.dev.isAuthenticated && state.staging.isAuthenticated
              ? " / "
              : null}
            {state.staging.isAuthenticated ? "staging" : null})
          </h4>
        ) : null}
        <LoginMenu />
      </div>
    </nav>
  );
}
