import axios from "axios";
import { useContext } from "react";
import GoogleLogin from "react-google-login";
import { AuthContext } from "../App";

import "../components/Nav/css/nav.css";

export default function LoginButton(props) {
  const { server, providerNo } = props;

  const { state, dispatch } = useContext(AuthContext);

  const gLoginSuccess = function (response) {
    // 'ID: ' + profile.getId()
    // 'Full Name: ' + profile.getName()
    // 'Given Name: ' + profile.getGivenName()
    // 'Family Name: ' + profile.getFamilyName()
    // 'Image URL: ' + profile.getImageUrl()
    // 'Email: ' + profile.getEmail()

    const currentUser = response.getBasicProfile().getGivenName();
    console.log("successful login", currentUser);

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
      clientId={state.clientId}
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
