import axios from "axios";
// import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import useSession from "react-session-hook";

import "../components/Nav/css/nav.css";

export default function LoginButton(props) {
  const { clientId, setToken, server } = props;

  const session = useSession();

  const loginSuccess = function (response) {
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

    const createSession = new Promise((resolve, reject) => {
      axios
        .get(server + "/api/v1/oscarrest/providers")
        .then((res) => {
          const data = res.data.result;
          console.log("Success fetching providers.");

          // Extract providerNo for current user
          const providerNo = data.find((provider) => {
            return provider.firstName.toLowerCase() === currentUser;
          }).providerNo;

          resolve(providerNo);
        })
        .catch((err) => {
          console.log("Error fetching providers:", err);
          reject(err);
        });
    });

    createSession
      .then((providerNo) => {
        axios({
          method: "post",
          url: server + "/api/v1/login",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${response.tokenId}`,
          },
          data: { token: response.tokenId, providerNo },
        })
          .then((response) => {
            console.log("Token approved.");
            setToken(response.data.profile.jwt);
            console.log(response);
            session.setSession({ token: response.data.profile.jwt });
          })
          .catch((err) => {
            console.error("token failed approval.", err);
            return;
          });
      })
      .catch((err) => {
        console.log("error verifying token", err);
        return;
      });
  };

  const loginFail = function (error) {
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
          <h1>Login</h1>
        </button>
      )}
      buttonText="Login"
      onSuccess={loginSuccess}
      onFailure={loginFail}
      cookiePolicy={"single_host_origin"}
    />
  );
}
