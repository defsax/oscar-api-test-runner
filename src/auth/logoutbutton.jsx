import { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { AuthContext } from "../App";

export default function LogoutButton(props) {
  const { state, dispatch } = useContext(AuthContext);

  const logout = function () {
    dispatch({ type: "LOGOUT" });
  };
  const logoutFail = function (err) {
    console.log(err);
  };

  return (
    <GoogleLogout
      clientId={state.clientId}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="link-item logout-button"
        >
          Logout
        </button>
      )}
      onLogoutSuccess={logout}
      onFailure={logoutFail}
    ></GoogleLogout>
  );
}
