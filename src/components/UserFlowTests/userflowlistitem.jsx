import { useCallback, useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import StatusBox from "../statusbox";

export default function UserFlowListItem(props) {
  const { expandCallback, result, api, body } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showData, setShowData] = useState(true);

  const expandContract = useCallback((isExpanded) => {
    isExpanded ? setShowMenu(false) : setShowMenu(true);
  }, []);

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
              <b>({result.config.method})</b> {api}
            </h2>
          </div>

          <div className="pass-fail-container">
            <StatusBox response={result} />
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
                <JSONPretty id="json-pretty" data={body}></JSONPretty>
              </div>
            ) : null}

            <p>
              <b>Data:</b>
            </p>

            {showData ? (
              <JSONPretty
                id="json-pretty"
                themeClassName="custom-json-pretty"
                data={result.data}
              ></JSONPretty>
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
