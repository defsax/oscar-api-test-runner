import { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import useSession from "react-session-hook";

import { AuthContext } from "../App";

export default function LogoutButton(props) {
  const { dispatch } = useContext(AuthContext);

  const session = useSession();
  const { clientId, setToken } = props;
  const logout = function () {
    session.removeSession();
    setToken("");
    dispatch({ type: "LOGOUT" });
  };
  const logoutFail = function (err) {
    console.log(err);
  };

  return (
    <GoogleLogout
      clientId={clientId}
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
