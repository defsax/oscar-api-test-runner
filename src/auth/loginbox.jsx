import LoginButton from "./loginbutton";
import LogoutButton from "./logoutbutton";

export default function LoginBox(props) {
  const { server, provNo, setProvNo, isAuthenticated } = props;
  let currentServer = "";

  if (server.search("dev") !== -1) {
    currentServer = "dev";
  } else {
    currentServer = "staging";
  }

  if (isAuthenticated === false) {
    return (
      <div>
        <form>
          <h2>Login:</h2>
          <input
            type="text"
            onChange={(e) => {
              setProvNo(e.target.value);
            }}
            value={provNo}
            placeholder="ProviderNo"
          />
        </form>

        <LoginButton server={server} providerNo={provNo} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Logged in to: </h2>
        <h4>{currentServer}</h4>
        <LogoutButton />
      </div>
    );
  }
}
