// import { useContext, useEffect } from "react";

// import { AuthContext } from "../App";
import LoginButton from "./loginbutton";
// import useSession from "react-session-hook";
import LogoutButton from "./logoutbutton";

export default function LoginBox(props) {
  const { setToken, clientId, server, provNo, setProvNo, isAuthenticated } =
    props;
  let currentServer = "";

  //   const [provNo, setProvNo] = useState(0);
  //   const session = useSession();
  //   const { state } = useContext(AuthContext);

  //   useEffect(() => {
  //     console.log(state);
  //     if (state.isDevAuthenticated) console.log(state.devToken);
  //     if (state.isStagingAuthenticated) console.log(state.stagingToken);
  //   }, [state]);

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

        <LoginButton
          clientId={clientId}
          setToken={setToken}
          server={server}
          providerNo={provNo}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Logged in to: </h2>
        <h4>{currentServer}</h4>
        <LogoutButton setToken={setToken} clientId={clientId} />
      </div>
    );
  }
}
