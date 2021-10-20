import { useLocation } from "react-router-dom";
import "./css/404.css";

export default function NoMatch() {
  let location = useLocation();

  return (
    <div className={"no-match-box"}>
      <h1>404 {location.pathname}</h1>
    </div>
  );
}
