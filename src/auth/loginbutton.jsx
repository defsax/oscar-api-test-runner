import axios from "axios";
import GoogleLogin from "react-google-login";

export default function LoginButton(props) {
  const { buttonText, clientId, setToken } = props;

  const loginSuccess = function (response) {
    /*
      if (auth2.isSignedIn.get()) {
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      }
    */
    console.log(response);
    const currentUser = "lerry";
    // const currentUser = response.getBasicProfile().getGivenName();
    console.log("successful login", currentUser);

    const createSession = new Promise((resolve, reject) => {
      axios
        .get(
          "https://kennedy-staging1.gojitech.systems/api/v1/oscarrest/providers"
        )
        .then((res) => {
          const data = res.data.result;

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
          url: "https://kennedy-staging1.gojitech.systems/api/v1/login",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${response.tokenId}`,
          },
          data: { token: response.tokenId, providerNo },
        })
          .then((response) => {
            console.log("token approved:", response);
            setToken(response.data.profile.jwt);
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
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="link-item login-button"
        >
          <h1>{buttonText}</h1>
        </button>
      )}
      buttonText="Login"
      onSuccess={loginSuccess}
      onFailure={loginFail}
      cookiePolicy={"single_host_origin"}
    />
  );
}
