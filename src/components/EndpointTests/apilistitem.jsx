import {
  React,
  useCallback,
  useContext,
  useEffect,
  // useMemo,
  useRef,
  useState,
} from "react";
import Loader from "react-loader-spinner";

import { AuthContext } from "../../App";
import StatusBox from "../statusbox";
import axiosQueue from "../../helpers/axios";
import "./css/listitem.css";

export default function ApiListItem(props) {
  const { api, testCallBack, expandCallBack, server } = props;
  const { state } = useContext(AuthContext);
  const stateRef = useRef(state);
  // const dispatchRef = useRef(dispatch);
  // const apiRef = useRef(api);

  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showData, setShowData] = useState(false);

  // useEffect(() => {
  //   apiRef.current = api;
  // }, [api]);

  // useEffect(() => {
  //   dispatchRef.current = dispatch;
  // }, [dispatch]);

  // useEffect(() => {
  //   stateRef.current = state;

  //   const x = stateRef.current.apis.find(
  //     (stateAPI) => stateAPI.id === api.id
  //   ).result;

  //   if (x !== undefined) setResponse(x);
  // }, [state, api]);

  // const updateResults = useMemo(() => {
  //   // console.log("useMemo");
  //   // console.log("loading", loading);
  //   return loading;
  // }, [loading]);

  // use callback so that component doesn't re-render
  // when callback gets registered
  const queryAPI = useCallback(() => {
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

  const expandContract = useCallback((isExpanded) => {
    isExpanded ? setShowMenu(false) : setShowMenu(true);
  }, []);

  useEffect(() => {
    // Always register callbacks
    expandCallBack(expandContract);
    testCallBack(queryAPI);
  }, [expandCallBack, testCallBack, queryAPI, expandContract, server]);

  console.log("Api list item render");

  return (
    <div className="list-item">
      <button
        className="button-menu"
        onClick={() => {
          showMenu ? setShowMenu(false) : setShowMenu(true);
        }}
      >
        <div className="button-contents">
          <div className="flex-left">
            <h2>
              <b>({server.apitype})</b>
            </h2>
            <h2 style={{ wordBreak: "break-word", marginLeft: ".5rem" }}>
              {api.url}
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
            <p>Method: {api.method}</p>
            <p>URL: {server.endpointURL + api.url}</p>
            {api.body ? (
              <div>
                <p>Body:</p>

                <pre>{JSON.stringify(api.body, null, 2)}</pre>
              </div>
            ) : null}

            <p>Status: {JSON.stringify(response.status)}</p>

            <p>Data: </p>

            {showData ? (
              <pre>{JSON.stringify(response.data, null, 2)}</pre>
            ) : null}
          </div>
          <div className="flex-results-right">
            <button
              onClick={() => {
                setResponse([]);
                queryAPI();
              }}
              className={"button test-button"}
            >
              Test
            </button>

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
