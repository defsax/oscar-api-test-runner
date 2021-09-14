// import { UseSessionProvider } from "react-session-hook";
import LoginButton from "./loginbutton";

export default function Login(props) {
  const { setToken, clientId, session } = props;
  const server = [
    "https://kennedy-dev1.gojitech.systems",
    "https://kennedy-staging1.gojitech.systems",
  ];

  return (
    <div>
      {/* <UseSessionProvider> */}
      {/* <LoginButton
        buttonText={"dev"}
        clientId={clientId}
        setToken={setToken}
        server={server[0]}
      /> */}
      <LoginButton
        clientId={clientId}
        setToken={setToken}
        session={session}
        server={server[1]}
      />
      {/* </UseSessionProvider> */}
    </div>
  );
}
