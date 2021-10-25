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
import Method from "../general/method";
import "./css/listitem.css";

export default function ApiListItem(props) {
  const { api, testCallBack, expandCallBack, server } = props;
  const { state } = useContext(AuthContext);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showData, setShowData] = useState(false);
  const [token, setToken] = useState(stateRef.current.dev.token);

  useEffect(() => {
    if (server.apitype === "dev") {
      setToken(stateRef.current.dev.token);
    } else if (server.apitype === "staging") {
      setToken(stateRef.current.staging.token);
    }
  }, [server, stateRef]);

  // use callback so that component doesn't re-render
  // when callback gets registered
  const queryAPI = useCallback(
    (t) => {
      setLoading(true);
      // setToken(t);

      if (api.setup) {
        api.setup(stateRef.current.dev);
      }

      return axiosQueue({
        method: api.method,
        url: api.getURL(server, stateRef.current.dev),
        data: api.body,
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer ${stateRef.current.dev.token}`,
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
          setResponse(res);
          setShowMenu(true);
          setShowData(true);
          setLoading(false);
          return res;
        });
    },
    [api, server, token]
  );

  const expandContract = useCallback((isExpanded) => {
    isExpanded ? setShowMenu(false) : setShowMenu(true);
  }, []);

  useEffect(() => {
    // Always register callbacks
    expandCallBack(expandContract);
    testCallBack(queryAPI);
  }, [expandCallBack, testCallBack, queryAPI, expandContract, server]);

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
            {response.status !== undefined ? (
              <div className="pass-fail-container">
                <StatusBox response={response} />
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

                <pre>{JSON.stringify(api.body, null, 2)}</pre>
              </div>
            ) : null}

            <p>
              <b>Status:</b> {JSON.stringify(response.status)}
            </p>

            <p>
              <b>Data:</b>{" "}
            </p>
            {showData ? (
              <pre>{JSON.stringify(response.data, null, 2)}</pre>
            ) : null}
          </div>
          <div className="flex-results-right">
            <button
              onClick={() => {
                setResponse([]);
                // console.log(token);
                queryAPI(token);
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
