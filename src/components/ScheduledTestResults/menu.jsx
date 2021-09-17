import { React, useState } from "react";
import MenuItem from "./menuitem";
import Loader from "react-loader-spinner";

import "./css/menu.css";

export default function Menu(props) {
  const { devResults, stagingResults } = props;
  const [toggle, setToggle] = useState(false);

  return (
    <div className="menu">
      <h1>Oscar API Scheduled Test Results</h1>
      <div className={"flex-row"}>
        <div className={"flex-left"}>
          <button
            className={"button server-button dev-button"}
            onClick={() => {
              setToggle(!toggle);
            }}
            disabled={toggle}
          >
            dev
          </button>
          <button
            className={"button server-button staging-button"}
            onClick={() => {
              setToggle(!toggle);
            }}
            disabled={!toggle}
          >
            staging
          </button>
        </div>
      </div>
      <hr />

      {toggle ? (
        devResults.length ? (
          devResults.map((test) => {
            return <MenuItem key={test.id} test={test} server={"(dev) "} />;
          })
        ) : (
          <Loader
            className="loader"
            type="TailSpin"
            color="rgb(0, 0, 0)"
            height={90}
            width={90}
          />
        )
      ) : null}

      {!toggle ? (
        stagingResults.length ? (
          stagingResults.map((test) => {
            return <MenuItem key={test.id} test={test} server={"(staging) "} />;
          })
        ) : (
          <Loader
            className="loader"
            type="TailSpin"
            color="rgb(0, 0, 0)"
            height={90}
            width={90}
          />
        )
      ) : null}
    </div>
  );
}
