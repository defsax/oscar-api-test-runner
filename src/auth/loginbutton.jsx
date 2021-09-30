import axios from "axios";
import { useContext } from "react";
import GoogleLogin from "react-google-login";
import { AuthContext } from "../App";

import "../components/Nav/css/nav.css";

const getAuthToken = async function (url, providerNo, tokenId) {
  try {
    const response = await axios({
      method: "post",
      url: url.server + "/api/v1/login" + url.suffix,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenId}`,
      },
      data: { token: tokenId, providerNo },
    });

    console.log("Token approved.");
    console.log(response);

    // if (url.server.search("dev") !== -1)
    //   dispatch({ type: "DEVLOGIN", payload: response.data.profile });
    // else dispatch({ type: "STAGINGLOGIN", payload: response.data.profile });

    return response.data.profile;
    // return response;
  } catch (err) {
    console.error("Token failed approval.", err);
    return err;
  }
};

const loginOscar = async function (url, token, credentials) {
  try {
    const response = await axios({
      method: "post",
      url: url.server + "/api/v1/oscar/login" + url.suffix,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        userName: credentials.name,
        password: credentials.pass,
        pin: credentials.pin,
      },
    });

    console.log("Successful oscar login.");
    console.log(response);
    return true;
  } catch (err) {
    console.error("Oscar login failed.", err);
    return false;
  }
};

export default function LoginButton(props) {
  const { url, credentials, clearInput } = props;
  const { state, dispatch } = useContext(AuthContext);

  const gLoginSuccess = async function (response) {
    // 'ID: ' + profile.getId()
    // 'Full Name: ' + profile.getName()
    // 'Given Name: ' + profile.getGivenName()
    // 'Family Name: ' + profile.getFamilyName()
    // 'Image URL: ' + profile.getImageUrl()
    // 'Email: ' + profile.getEmail()

    const currentUser = response.getBasicProfile().getGivenName();
    console.log("Successful google login", currentUser);

    const profile = await getAuthToken(
      url,
      credentials.providerNo,
      response.tokenId
    );
    if (profile) {
      const success = await loginOscar(url, profile.jwt, credentials);
      if (success) {
        clearInput();
        if (url.server.search("dev") !== -1)
          dispatch({ type: "DEVLOGIN", payload: profile });
        else dispatch({ type: "STAGINGLOGIN", payload: profile });
      }
    }
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
