import { React, useCallback, useRef, useState } from "react";
import { PatientFlow, PrescriptionFlow } from "../../static/apis";
import { apiVersion } from "../../static/serverlist";
import UserFlowListItem from "./userflowlistitem";

import "./css/userflow.css";

export default function UserFlowMenu() {
  // Toggle between dev & staging
  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const [styles, setStyles] = useState({});
  const [server, setServer] = useState(apiVersion[0]);

  const [flow, setFlow] = useState({
    flow: "prescription",
    apis: PrescriptionFlow.flat(),
  });

  const expandRefs = useRef([]);
  const setExpandCallback = useCallback((callback) => {
    expandRefs.current.push(callback);
  }, []);

  const testRefs = useRef([]);
  const setTestCallback = useCallback((callback) => {
    testRefs.current.push(callback);
  }, []);

  const handleExpand = () => {
    if (expanded) {
      setExpanded(false);
      setStyles({ display: "none" });
    } else {
      setExpanded(true);
      setStyles({ display: "flex" });
    }
  };

  const renderFlowItem = (api, i) => {
    return (
      <UserFlowListItem
        key={i}
        api={api}
        expandCallback={setExpandCallback}
        testCallback={setTestCallback}
        server={server}
      />
    );
  };

  return (
    <div className="menu">
      <h1>Oscar API User Flow Testing</h1>

      <div className={"flex-row"}>
        <div className={"flex-left"}>
          <button
            className={"button server-button dev-button"}
            onClick={() => {
              setServer(apiVersion[0]);
              setToggle(!toggle);
              testRefs.current = [];
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
              testRefs.current = [];
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
              setExpandAll(true);
              setExpanded(false);
              setStyles({ display: "none" });

              testRefs.current.forEach(async (test) => {
                await test();
              });
            }}
          >
            Test
          </button>

          <div className={"flow-select"}>
            <button
              className={"flow-arrow-button"}
              onClick={() => {
                handleExpand();
              }}
            >
              <div className={"option-menu"}>
                <p>{flow.flow}</p>
                {expanded ? <p>▲</p> : <p>▼</p>}
              </div>
            </button>

            <div style={styles} className={"flow-options"}>
              {flow.flow !== "prescription" ? (
                <button
                  onClick={() => {
                    testRefs.current = [];

                    handleExpand();
                    setFlow({
                      flow: "prescription",
                      apis: PrescriptionFlow,
                    });
                  }}
                >
                  prescription
                </button>
              ) : null}

              {flow.flow !== "patient" ? (
                <button
                  onClick={() => {
                    testRefs.current = [];

                    handleExpand();
                    setFlow({
                      flow: "patient",
                      apis: PatientFlow,
                    });
                  }}
                >
                  patient
                </button>
              ) : null}
              {/* <button>other</button> */}
            </div>
          </div>
          <button
            className={"expand-all-button"}
            onClick={() => {
              expandAll ? setExpandAll(false) : setExpandAll(true);
              expandRefs.current.forEach((expand) => {
                expand(expandAll);
              });
            }}
          >
            {expandAll ? <p>▲</p> : <p>▼</p>}
          </button>
        </div>
      </div>
      <hr />

      {flow.flow === "prescription" ? flow.apis.map(renderFlowItem) : null}
      {flow.flow === "patient" ? flow.apis.map(renderFlowItem) : null}
    </div>
  );
}
