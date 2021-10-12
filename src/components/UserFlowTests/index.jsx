import { React, useEffect, useState } from "react";
import { PatientFlow, PrescriptionFlow } from "../../static/apis";

import "./css/userflow.css";
import UserFlowList from "./userflowlist";

export default function UserFlowMenu() {
  // Toggle between dev & staging
  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [styles, setStyles] = useState({});
  const [flow, setFlow] = useState({
    flow: "prescription",
    apis: PrescriptionFlow.flat(),
  });

  useEffect(() => {
    console.log(expanded);
    // setStyles({ display: "none" });
  }, [expanded]);

  // console.log(PrescriptionFlow);

  // console.log("user flow render");
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

          <div className={"flow-select"}>
            <button
              className={"flow-arrow-button"}
              onClick={() => {
                expanded ? setExpanded(false) : setExpanded(true);
                expanded
                  ? setStyles({ display: "none" })
                  : setStyles({ display: "flex" });
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
                    setFlow({
                      flow: "prescription",
                      apis: PrescriptionFlow,
                    });
                    expanded ? setExpanded(false) : setExpanded(true);
                    expanded
                      ? setStyles({ display: "none" })
                      : setStyles({ display: "flex" });
                  }}
                >
                  prescription
                </button>
              ) : null}

              {flow.flow !== "patient" ? (
                <button
                  onClick={() => {
                    setFlow({
                      flow: "patient",
                      apis: PatientFlow,
                    });
                    expanded ? setExpanded(false) : setExpanded(true);
                    expanded
                      ? setStyles({ display: "none" })
                      : setStyles({ display: "flex" });
                  }}
                >
                  patient
                </button>
              ) : null}
              <button>other</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <UserFlowList apis={flow.apis} />
    </div>
  );
}
