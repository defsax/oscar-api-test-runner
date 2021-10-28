import axios from "axios";
import { useContext } from "react";
import GoogleLogin from "react-google-login";
import { AuthContext } from "../App";

import "../components/Nav/css/nav.css";

const getAuthToken = async function (url, providerNo, tokenId, setError) {
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

    if (response.data.msg === "Wrong providerNo") {
      throw new Error("Wrong providerNo");
    }

    console.log("Token approved.");

    return response.data.profile;
  } catch (err) {
    console.error("Token failed approval.", err.message);
    setError("Token failed approval: " + err.message);
  }
};

const loginOscar = async function (url, token, credentials, setError) {
  try {
    await axios({
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
    return true;
  } catch (err) {
    console.error("Oscar login failed.", err.response);
    setError(err.response.data.msg);
    return false;
  }
};

export default function LoginButton(props) {
  const { url, credentials, clearInput, setLoading, setError } = props;
  const { state, dispatch } = useContext(AuthContext);

  const gLoginSuccess = async function (response) {
    const currentUser = response.getBasicProfile().getGivenName();
    console.log("Successful google login", currentUser);

    const profile = await getAuthToken(
      url,
      credentials.providerNo,
      response.tokenId,
      setError
    );
    if (profile) {
      console.log(profile);
      const success = await loginOscar(url, profile.jwt, credentials, setError);
      if (success) {
        clearInput();
        if (url.server.search("dev") !== -1)
          dispatch({
            type: "DEVLOGIN",
            payload: { profile },
          });
        else
          dispatch({
            type: "STAGINGLOGIN",
            payload: { profile },
          });
      }
    }
    setLoading(false);
  };

  const gLoginFail = function (error) {
    console.log("Login failed", error);
    setError(error.details);
  };

  return (
    <GoogleLogin
      clientId={state.clientId}
      render={(renderProps) => (
        <button
          onClick={() => {
            renderProps.onClick();
            setLoading(true);
            setError(null);
          }}
          disabled={renderProps.disabled}
          className="link-item login-button"
        >
          Submit
        </button>
      )}
      disabled={false}
      buttonText="Login"
      onSuccess={gLoginSuccess}
      onFailure={gLoginFail}
      cookiePolicy={"single_host_origin"}
    />
  );
}
