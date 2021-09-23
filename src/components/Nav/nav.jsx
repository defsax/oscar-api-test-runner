import { React, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useSession from "react-session-hook";

import LoginMenu from "../../auth/loginmenu";
import { AuthContext } from "../../App";

import "./css/nav.css";
import "./css/button.css";

const googleClientId =
  "76829730434-l9ujra2di0m69fppvpflfc5hfb3jpvn7.apps.googleusercontent.com";
// const googleClientId =
//   "333223101659-ckihbcqtk9p24bprljf4b3a8jm8gufu1.apps.googleusercontent.com";

export default function Nav(props) {
  const { setToken } = props;
  const session = useSession();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    // console.log("nav login", session.isAuthenticated);
    // console.log("token:", session.storage.get().token);
    // console.log("session:", session);
    setToken(session.storage.get().token);
  }, [session, setToken]);

  useEffect(() => {
    console.log(state);
  }, [state]);

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
        <LoginMenu setToken={setToken} clientId={googleClientId} />
      </div>
    </nav>
  );
}
