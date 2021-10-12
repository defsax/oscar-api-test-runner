import { React, useEffect, useState } from "react";

import "./css/userflow.css";

export default function UserFlowMenu() {
  // Toggle between dev & staging
  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [styles, setStyles] = useState({});

  useEffect(() => {
    console.log(expanded);
    // setStyles({ display: "none" });
  }, [expanded]);

  console.log("user flow render");
  return (
    <div className="menu">
      <h1>Oscar API User Flow Testing</h1>

      <div className={"flex-row"}>
        <div className={"flex-left"}>
          <button
            className={"button server-button dev-button"}
            onClick={() => {
              //   setServer(apiVersion[0]);
              setToggle(!toggle);
            }}
            disabled={toggle}
          >
            dev
          </button>

          <button
            className={"button server-button staging-button"}
            onClick={() => {
              //   setServer(apiVersion[1]);
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
              //   setExpanded(true);
              //   testButtonRef.current();
            }}
          >
            Test
          </button>

          <div>
            <button
              className={"arrow-button"}
              onClick={() => {
                expanded ? setExpanded(false) : setExpanded(true);
                expanded
                  ? setStyles({ display: "none" })
                  : setStyles({ display: "block" });
              }}
            >
              <div className={"option-menu"}>
                <p>prescription</p>
                {expanded ? <p>▲</p> : <p>▼</p>}
              </div>
            </button>
            <div style={styles} className={"flow-options"}>
              <p>prescription</p>
              <p>patient</p>
              <p>other</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
