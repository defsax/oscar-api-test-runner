import axios from "axios";
import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import useSession from "react-session-hook";

import "../components/Nav/css/nav.css";

export default function LoginButton(props) {
  const { clientId, setToken, server } = props;

  const session = useSession();
  useEffect(() => {
    console.log("session updated", session);
  }, [session]);

  const loginSuccess = function (response) {
    // if (auth2.isSignedIn.get()) {
    //   var profile = auth2.currentUser.get().getBasicProfile();
    //   console.log('ID: ' + profile.getId());
    //   console.log('Full Name: ' + profile.getName());
    //   console.log('Given Name: ' + profile.getGivenName());
    //   console.log('Family Name: ' + profile.getFamilyName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail());
    // }

    console.log(response);
    // const currentUser = "lerry";
    const currentUser = response.getBasicProfile().getGivenName();
    // session.removeSession(() => {
    //   console.log("remove");
    // });
    // session.setSession({ token: response });
    console.log(session);
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
            setToken(response.data.profile.jwt);
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
    console.log(error);
  };
  return (
    // <UseSessionProvider>
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
    // </UseSessionProvider>
  );
}
