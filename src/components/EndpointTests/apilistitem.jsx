import {
  React,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Loader from "react-loader-spinner";

import { AuthContext } from "../../App";
import StatusBox from "../statusbox";
import axiosQueue from "../../helpers/axios";
// import axios from "axios";
import Method from "../general/method";
import "./css/listitem.css";

export default function ApiListItem(props) {
  const { api, testCallBack, expandCallBack, server } = props;
  const { state } = useContext(AuthContext);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showData, setShowData] = useState(false);

  // use callback so that component doesn't re-render
  // when callback gets registered
  const queryAPI = useCallback(async () => {
    setLoading(true);

    let userInfo = {};
    if (server.apitype === "dev") {
      userInfo = stateRef.current.dev;
    } else if (server.apitype === "staging") {
      userInfo = stateRef.current.staging;
    }

    // Run any setup if the api requires it
    if (api.setup) {
      await api.setup(server, userInfo);
    }

    return axiosQueue({
      method: api.method,
      url: api.getURL(server, userInfo),
      data: api.body,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        console.log(`Success calling ${api.api}`);
        return res;
      })
      .catch((err) => {
        console.log(`Failed calling ${api.api}`);
        return err.response;
      })
      .then((res) => {
        api.result = res;
        // setResponse(res);
        setShowMenu(true);
        setShowData(true);
        setLoading(false);
        return res;
      });
  }, [api, server]);

  const expandContract = useCallback((isExpanded) => {
    isExpanded ? setShowMenu(false) : setShowMenu(true);
  }, []);

  function truncate(str, n) {
    let tempObj = JSON.parse(str);
    if (tempObj.base64Content) {
      return JSON.stringify({
        base64Content: tempObj.base64Content.substr(0, n - 1) + "...",
        userID: tempObj.userID,
      });
    }
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    // Register test callback
    testCallBack(queryAPI);

    // Order of dependencies matters
  }, [testCallBack, queryAPI]);

  useEffect(() => {
    // Register expansion callback
    expandCallBack(expandContract);
  }, [expandCallBack, expandContract]);

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
              {api.api}
            </h2>
          </div>
          <div className="flex-right">
            <h2>
              <Method method={api.method} />
            </h2>
            {api.result.status !== undefined ? (
              <div className="pass-fail-container">
                <StatusBox status={api.result.status} />
              </div>
            ) : null}
            {loading ? (
              <Loader
                className="loading-endpoint-results"
                type="Bars"
                color="rgb(0, 0, 0)"
                height={15}
                width={15}
              />
            ) : null}
          </div>
        </div>
      </button>

      {showMenu ? (
        <div className="test-options">
          <div className="flex-results-left">
            <p>
              <b>Method:</b> {api.method}
            </p>
            <p>
              <b>URL: </b>
              {api.getURL(server, stateRef.current.dev)}
            </p>
            {api.body ? (
              <div>
                <p>Body:</p>

                <pre>{truncate(JSON.stringify(api.body, null, 2), 5000)}</pre>
              </div>
            ) : null}

            <p>
              <b>Status:</b> {JSON.stringify(api.result.status)}
              {/* <b>Status:</b> {JSON.stringify(response.status)} */}
            </p>

            <p>
              <b>Data:</b>{" "}
            </p>
            {showData ? (
              // <pre>{JSON.stringify(response.data, null, 2)}</pre>
              <pre>{JSON.stringify(api.result.data, null, 2)}</pre>
            ) : null}
          </div>
          <div className="flex-results-right">
            <button
              onClick={() => {
                // setResponse([]);
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
