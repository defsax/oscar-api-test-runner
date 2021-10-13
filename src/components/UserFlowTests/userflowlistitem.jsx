import { useCallback, useContext, useEffect, useRef, useState } from "react";
import JSONPretty from "react-json-pretty";
import Loader from "react-loader-spinner";
import { AuthContext } from "../../App";
import axiosQueue from "../../helpers/axios";
import StatusBox from "../statusbox";

export default function UserFlowListItem(props) {
  const { api, server, expandCallback, testCallback } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  const { state } = useContext(AuthContext);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // useEffect(() => {
  //   return () => {
  //     console.log("flowlistitem unmount");
  //     // setResponse({});
  //   };
  // });
  // useEffect(() => {
  //   console.log("test callback");
  //   setResponse({});
  // }, [testCallback]);

  const expandContract = useCallback((isExpanded) => {
    isExpanded ? setShowMenu(false) : setShowMenu(true);
  }, []);

  const queryAPI = useCallback(() => {
    setResponse({});
    setLoading(true);

    const url = server.endpointURL + api.url + server.suffix;

    axiosQueue({
      method: api.method,
      url: url,
      data: api.body,
      headers: {
        Authorization: `Bearer ${stateRef.current.dev.token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(`Success calling ${api.url}`);
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        console.log(`Failed calling ${api.url}`);
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
        console.log(err.config);

        return err.response;
      })
      .then((res) => {
        setResponse(res);
        setShowMenu(true);
        setShowData(true);
        setLoading(false);
        return new Promise((resolve) => {
          resolve();
        });
      });
  }, [api, server]);

  useEffect(() => {
    // Always register callbacks
    expandCallback(expandContract);
    testCallback(queryAPI);
  }, [expandCallback, expandContract, testCallback, queryAPI]);

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
              <b>({api.method})</b> {api.url}
              {api.suffix}
            </h2>
          </div>

          {loading ? (
            <Loader
              className="loading-results"
              type="Bars"
              color="rgb(0, 0, 0)"
              height={15}
              width={15}
            />
          ) : (
            <div className="pass-fail-container">
              <StatusBox response={response} />
            </div>
          )}
        </div>
      </button>

      {showMenu ? (
        <div className="test-options">
          <div className="flex-results-left">
            <p>
              <b>URL:</b> {server.endpointURL + api.url}
            </p>
            {api.body ? (
              <div>
                <p>
                  <b>Body:</b>
                </p>
                <JSONPretty id="json-pretty" data={api.body}></JSONPretty>
              </div>
            ) : null}

            {/* <p>
              <b>Status: </b>
              {JSON.stringify(response.status)}
            </p> */}

            <p>
              <b>Data:</b>
            </p>

            {showData ? (
              <JSONPretty id="json-pretty" data={response.data}></JSONPretty>
            ) : null}
          </div>
          <div className="flex-results-right">
            <button
              className={"collapse-data-button"}
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
