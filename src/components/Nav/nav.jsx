import { React, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
// import GoogleLogin from "react-google-login";

import Login from "../../auth/login";

import "./css/nav.css";
import "./css/button.css";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function Nav(props) {
  const [user, setUser] = useState();
  const { setToken } = props;

  // const gLoginSuccess = (response) => {
  //   /*
  //     if (auth2.isSignedIn.get()) {
  //       var profile = auth2.currentUser.get().getBasicProfile();
  //       console.log('ID: ' + profile.getId());
  //       console.log('Full Name: ' + profile.getName());
  //       console.log('Given Name: ' + profile.getGivenName());
  //       console.log('Family Name: ' + profile.getFamilyName());
  //       console.log('Image URL: ' + profile.getImageUrl());
  //       console.log('Email: ' + profile.getEmail());
  //     }
  //   */
  //   console.log("successful login", response.getBasicProfile().getGivenName());
  //   // console.log("token before ", token);
  //   // setToken(response.tokenId);
  //   // console.log("token after ", token);
  //   // const currentUser = "lerry";
  //   const currentUser = response.getBasicProfile().getGivenName();

  //   axios({
  //     method: "get",
  //     url: "https://kennedy-staging1.gojitech.systems/api/v1/oscarrest/providers",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       const data = res.data.result;
  //       try {
  //         // Extract providerNo for current user
  //         const providerNo = data.find((provider) => {
  //           return provider.firstName.toLowerCase() === currentUser;
  //         }).providerNo;

  //         axios({
  //           method: "post",
  //           url: "https://kennedy-staging1.gojitech.systems/api/v1/login",
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${response.tokenId}`,
  //           },
  //           data: { token: response.tokenId, providerNo: providerNo },
  //         })
  //           .then((response) => {
  //             console.log(response);
  //             setToken(response.data.profile.jwt);
  //           })
  //           .catch((err) => console.error(err));
  //       } catch (err) {
  //         console.log("Error loggin in: Provider not found", err);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching providers:", err);
  //     });
  // };

  // const gLoginFail = function (error) {
  //   console.log(error);
  // };

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
      {user ? (
        <div className="float-right">
          <h1>{user}</h1>
          <button
            className="link-item login-button"
            onClick={() => {
              const auth = getAuth();
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  setUser(null);
                  console.log("Sign out successful.");
                })
                .catch((error) => {
                  // An error happened.
                  console.log("Error signing out.", error);
                });
            }}
          >
            <h1>Logout</h1>
          </button>
        </div>
      ) : (
        <div>
          <Login setToken={setToken} clientId={googleClientId} />
        </div>
      )}
    </nav>
  );
}
