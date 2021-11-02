import { useCallback, useEffect, useState } from "react";
import Method from "../general/method";
import StatusBox from "../statusbox";

export default function UserFlowListItem(props) {
  const { expandCallback, result, api, body, method, server } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showData, setShowData] = useState(true);

  const expandContract = useCallback((isExpanded) => {
    isExpanded ? setShowMenu(false) : setShowMenu(true);
  }, []);

  console.log(result);

  useEffect(() => {
    // Register expand callback
    expandCallback(expandContract);
  }, [expandCallback, expandContract]);

  return (
    <div className={"flow-item"}>
      <button
        className={"button-menu"}
        onClick={() => {
          showMenu ? setShowMenu(false) : setShowMenu(true);
        }}
      >
        <div className={"button-contents"}>
          <div className={"flex-left"}>
            <h2>
              <b>({server})</b>
            </h2>
            <h2 style={{ wordBreak: "break-word", marginLeft: ".5rem" }}>
              {api}
            </h2>
          </div>
          <div className={"flex-right"}>
            <h2>
              <Method method={method} />
            </h2>
            {result.status !== undefined ? (
              <div className="pass-fail-container">
                <StatusBox status={result.status} />
              </div>
            ) : null}
          </div>
        </div>
      </button>

      {showMenu ? (
        <div className="test-options">
          <div className="flex-results-left">
            <p>
              <b>URL: </b>
              {result.config.url}
            </p>
            {body ? (
              <div>
                <p>
                  <b>Body:</b>
                </p>

                <pre>{JSON.stringify(body, null, 2)}</pre>
              </div>
            ) : null}

            <p>
              <b>Data:</b>
            </p>

            {showData ? (
              <pre>{JSON.stringify(result.data, null, 2)}</pre>
            ) : null}
          </div>
          <div className="flex-results-right">
            <button
              className={"flow-collapse-data-button"}
              onClick={() => {
                showData ? setShowData(false) : setShowData(true);
              }}
            >
              {showData ? <p>▲</p> : <p>▼</p>}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
