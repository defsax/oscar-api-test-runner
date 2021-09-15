// import { UseSessionProvider } from "react-session-hook";
import LoginButton from "./loginbutton";

export default function Login(props) {
  const { setToken, clientId } = props;
  const server = [
    "https://kennedy-dev1.gojitech.systems",
    "https://kennedy-staging1.gojitech.systems",
  ];

  return (
    <div>
      <LoginButton clientId={clientId} setToken={setToken} server={server[1]} />
    </div>
  );
}
