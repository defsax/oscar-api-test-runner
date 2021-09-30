import LoginButton from "./loginbutton";
import LogoutButton from "./logoutbutton";

export default function LoginBox(props) {
  const { url, signIn, setSignIn, isAuthenticated } = props;
  let currentServer = "";

  if (url.server.search("dev") !== -1) {
    currentServer = "dev";
  } else {
    currentServer = "staging";
  }

  const clearInput = function () {
    setSignIn({});
  };

  if (isAuthenticated === false) {
    return (
      <div>
        <form>
          <h2>Login:</h2>
          <input
            type="text"
            onChange={(e) => {
              setSignIn({ ...signIn, name: e.target.value });
            }}
            value={signIn.name || ""}
            placeholder="Name"
          />
          <input
            type="password"
            onChange={(e) => {
              setSignIn({ ...signIn, pass: e.target.value });
            }}
            value={signIn.pass || ""}
            placeholder="Password"
          />
          <input
            type="password"
            onChange={(e) => {
              setSignIn({ ...signIn, pin: e.target.value });
            }}
            value={signIn.pin || ""}
            placeholder="PIN"
          />
          <input
            type="text"
            onChange={(e) => {
              setSignIn({ ...signIn, providerNo: e.target.value });
            }}
            value={signIn.providerNo || ""}
            placeholder="ProviderNo"
          />

          <LoginButton url={url} credentials={signIn} clearInput={clearInput} />
        </form>
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
