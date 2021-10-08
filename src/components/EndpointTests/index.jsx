import { React, useRef, useState, useCallback, useContext } from "react";
import { AuthContext } from "../../App";
import { apiVersion } from "../../static/serverlist";
import ApiList from "./apilist";

import "./css/button.css";
import "./css/menu.css";

export default function EndpointTestMenu() {
  const { state } = useContext(AuthContext);

  const testButtonRef = useRef();
  const expandButtonRef = useRef();

  // switch here to change from dev to staging
  const [server, setServer] = useState(apiVersion[0]);

  // Toggle between dev & staging
  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);
  // const [token, setToken] = useState(0);
  // const [shuffledAPIs, setShuffleAPIs] = useState([]);

  // If selected server is dev, set token to dev token
  // Otherwise, set to staging
  // useEffect(() => {
  //   if (server.apitype === "dev") setToken(state.dev.token);
  //   else if (server.apitype === "staging") setToken(state.staging.token);
  // }, [server, state]);

  const setTestCallback = useCallback((callback) => {
    testButtonRef.current = callback;
  }, []);

  const setExpandCallback = useCallback((callback) => {
    expandButtonRef.current = callback;
  }, []);
  console.log("index render");
  return (
    <div className="menu">
      <h1>Oscar API Endpoint Testing</h1>

      <div className={"flex-row"}>
        <div className={"flex-left"}>
          <button
            className={"button server-button dev-button"}
            onClick={() => {
              setServer(apiVersion[0]);
              setToggle(!toggle);
            }}
            disabled={toggle}
          >
            dev
          </button>

          <button
            className={"button server-button staging-button"}
            onClick={() => {
              setServer(apiVersion[1]);
              setToggle(!toggle);
            }}
            disabled={!toggle}
          >
            staging
          </button>
        </div>

        <div className={"flex-right"}>
          {/* The Test All button calls each registered function:  */}
          <button
            className={"button test-all-button"}
            onClick={() => {
              setExpanded(true);
              testButtonRef.current();
            }}
          >
            Test All
          </button>

          <button
            className={"arrow-button"}
            onClick={() => {
              expanded ? setExpanded(false) : setExpanded(true);
              expandButtonRef.current(expanded);
            }}
          >
            {expanded ? <p>▲</p> : <p>▼</p>}
          </button>
        </div>
      </div>
      <hr />

      {toggle ? (
        <ApiList
          key={0}
          apis={state.apis}
          server={server}
          expandCallback={setExpandCallback}
          testCallback={setTestCallback}
        />
      ) : (
        <ApiList
          key={1}
          apis={state.apis}
          server={server}
          expandCallback={setExpandCallback}
          testCallback={setTestCallback}
        />
      )}
    </div>
  );
}
