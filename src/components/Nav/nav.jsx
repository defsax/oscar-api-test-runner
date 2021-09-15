import { React, useEffect } from "react";
import { Link } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";
// import GoogleLogin from "react-google-login";
import useSession from "react-session-hook";

import Login from "../../auth/login";
import Logout from "../../auth/logout";

import "./css/nav.css";
import "./css/button.css";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
          <h1>Test APIs</h1>
        </Link>
        <Link to="/scheduled" className="link-item">
          <h1>Scheduled Results</h1>
        </Link>
      </div>
      {session.isAuthenticated ? (
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
