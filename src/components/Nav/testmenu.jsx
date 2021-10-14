import { Link } from "react-router-dom";

import "./css/nav.css";

export default function TestMenu() {
  return (
    <div className={"test-dropdown"}>
      <h4>Tests ▼</h4>
      <div className={"test-menu"}>
        <Link to="/" className="link-item">
          <h1>Endpoint</h1>
        </Link>
        <Link to="/scheduled" className="link-item">
          <h1>Schedule</h1>
        </Link>
        <Link to="/userflow" className="link-item">
          <h1>User Flow</h1>
        </Link>
        <Link to="/stress" className="link-item">
          <h1>Stress</h1>
        </Link>
      </div>
    </div>
  );
}
