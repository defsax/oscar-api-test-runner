import LoginButton from "./loginbutton";

export default function Login(props) {
  const { setToken, clientId } = props;

  return (
    <div>
      <LoginButton buttonText={"dev"} clientId={clientId} setToken={setToken} />
      <LoginButton
        buttonText={"staging"}
        clientId={clientId}
        setToken={setToken}
      />
    </div>
  );
}
