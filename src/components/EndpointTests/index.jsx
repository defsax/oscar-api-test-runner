import { React, useRef, useState, useCallback, useEffect } from "react";
import { apiVersion } from "../../static/serverlist";
import ApiList from "./apilist";
import shuffle from "../../helpers/shuffle";
import { apis } from "../../static/apis";
import ServerToggle from "../general/servertoggle";

import "./css/button.css";
import "./css/menu.css";

export default function EndpointTestMenu() {
  // const { state } = useContext(AuthContext);

  const testButtonRef = useRef();
  const expandButtonRef = useRef();

  // switch here to change from dev to staging
  const [server, setServer] = useState(apiVersion[0]);

  // Toggle between dev & staging
  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [results, setResults] = useState([]);
  const [shuffledAPIs, setShuffleAPIs] = useState([]);

  useEffect(() => {
    // setShuffleAPIs(apis.flat());
    setShuffleAPIs(shuffle(apis).flat());
  }, []);

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

  const calcPasses = function () {
    let passes = 0;

    results.forEach((result) => {
      if (result.status < 400) passes++;
    });

    return passes;
  };
  return (
    <div className="menu">
      <h1>Oscar API Endpoint Testing</h1>

      <div className={"flex-row"}>
        <ServerToggle
          setServer={setServer}
          setToggle={setToggle}
          toggle={toggle}
        />

        <div className={"flex-right"}>
          {/* The Test All button calls each registered function:  */}
          {results.length > 0 ? (
            <div className={"stat-box"}>
              <h3>{((calcPasses() / results.length) * 100).toFixed(2)}%</h3>

              <h3>
                {calcPasses()} / {results.length}
              </h3>
            </div>
          ) : null}
          <button
            className={"button test-all-button"}
            onClick={() => {
              setExpanded(true);
              setResults([]);
              testButtonRef.current(setResults);
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
          apis={shuffledAPIs}
          server={server}
          expandCallback={setExpandCallback}
          testCallback={setTestCallback}
        />
      ) : (
        <ApiList
          key={1}
          apis={shuffledAPIs}
          server={server}
          expandCallback={setExpandCallback}
          testCallback={setTestCallback}
        />
      )}
    </div>
  );
}
