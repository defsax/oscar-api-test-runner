import { Link, useLocation } from "react-router-dom";

import "./css/nav.css";

export default function TestMenu() {
  const location = useLocation().pathname;
  return (
    <div className={"test-dropdown"}>
      <h4>Tests ▼</h4>
      <div className={"test-menu"}>
        {location !== "/" ? (
          <Link to="/" className="link-item">
            <h1>Endpoint</h1>
          </Link>
        ) : null}

        {location !== "/scheduled" ? (
          <Link to="/scheduled" className="link-item">
            <h1>Schedule</h1>
          </Link>
        ) : null}

        {location !== "/userflow" ? (
          <Link to="/userflow" className="link-item">
            <h1>User Flow</h1>
          </Link>
        ) : null}
        {location !== "/stress" ? (
          <Link to="/stress" className="link-item">
            <h1>Stress</h1>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
