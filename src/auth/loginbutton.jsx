import axios from "axios";
import { useContext } from "react";
import GoogleLogin from "react-google-login";
import useSession from "react-session-hook";
import { AuthContext } from "../App";

import "../components/Nav/css/nav.css";

export default function LoginButton(props) {
  const { clientId, setToken, server, providerNo } = props;

  const { dispatch } = useContext(AuthContext);
  const session = useSession();

  const gLoginSuccess = function (response) {
    // 'ID: ' + profile.getId()
    // 'Full Name: ' + profile.getName()
    // 'Given Name: ' + profile.getGivenName()
    // 'Family Name: ' + profile.getFamilyName()
    // 'Image URL: ' + profile.getImageUrl()
    // 'Email: ' + profile.getEmail()

    session.removeSession();
    setToken("");

    const currentUser = response.getBasicProfile().getGivenName();
    console.log("successful login", currentUser);
    // console.log(response.tokenId);

    axios({
      method: "post",
      url: server,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${response.tokenId}`,
      },
      data: { token: response.tokenId, providerNo },
    })
      .then((response) => {
        console.log("Token approved.");
        console.log(response);
        // setToken(response.data.profile.jwt);
        // session.setSession({ token: response.data.profile.jwt });
        console.log(server.search("dev"));
        if (server.search("dev") !== -1)
          dispatch({ type: "DEVLOGIN", payload: response.data.profile });
        else dispatch({ type: "STAGINGLOGIN", payload: response.data.profile });
      })
      .catch((err) => {
        console.error("token failed approval.", err);
        return;
      });
  };

  const gLoginFail = function (error) {
    console.log("Login failed", error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="link-item login-button"
        >
          Submit
        </button>
      )}
      buttonText="Login"
      onSuccess={gLoginSuccess}
      onFailure={gLoginFail}
      cookiePolicy={"single_host_origin"}
    />
  );
}
