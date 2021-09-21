import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import useSession from "react-session-hook";

import Login from "../../auth/login";
import Logout from "../../auth/logout";

import "./css/nav.css";
import "./css/button.css";

const googleClientId =
  "76829730434-l9ujra2di0m69fppvpflfc5hfb3jpvn7.apps.googleusercontent.com";
// const googleClientId =
//   "333223101659-ckihbcqtk9p24bprljf4b3a8jm8gufu1.apps.googleusercontent.com";

export default function Nav(props) {
  const { setToken } = props;
  const session = useSession();

  useEffect(() => {
    // console.log("nav login", session.isAuthenticated);
    // console.log("token:", session.storage.get().token);
    // console.log("session:", session);
    setToken(session.storage.get().token);
  }, [session, setToken]);

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

      {session.storage.get().token !== undefined ? (
        <div className="float-right">
          <h1>{session.profile.email}</h1>
          <Logout setToken={setToken} clientId={googleClientId} />
        </div>
      ) : (
        <div className="float-right">
          <Login setToken={setToken} clientId={googleClientId} />
        </div>
      )}
    </nav>
  );
}
