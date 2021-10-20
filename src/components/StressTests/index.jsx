import { React, useState } from "react";
import ServerToggle from "../general/servertoggle";

export default function StressMenu() {
  // const testButtonRef = useRef();
  // const expandButtonRef = useRef();

  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="menu">
      <h1>Oscar API Stress Testing</h1>

      <div className={"flex-row"}>
        <ServerToggle setToggle={setToggle} toggle={toggle} />

        <div className={"flex-right"}>
          {/* The Test All button calls each registered function:  */}
          <button
            className={"button test-all-button"}
            onClick={() => {
              // setExpanded(true);
              // testButtonRef.current();
            }}
          >
            Test All
          </button>

          <button
            className={"arrow-button"}
            onClick={() => {
              expanded ? setExpanded(false) : setExpanded(true);
              // expandButtonRef.current(expanded);
            }}
          >
            {expanded ? <p>▲</p> : <p>▼</p>}
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}
