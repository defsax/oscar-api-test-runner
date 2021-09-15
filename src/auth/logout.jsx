import { GoogleLogout } from "react-google-login";
import useSession from "react-session-hook";

export default function Logout(props) {
  const session = useSession();
  const { clientId, setToken } = props;
  const logout = function () {
    session.removeSession();
    setToken("");
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
          className="link-item login-button"
        >
          <h1>Logout</h1>
        </button>
      )}
      onLogoutSuccess={logout}
      onFailure={logoutFail}
    ></GoogleLogout>
  );
}
