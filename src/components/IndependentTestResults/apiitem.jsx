import { React, useCallback, useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import axios from "axios";
import StatusBox from "../statusbox";
import "./css/listitem.css";

export default function ApiItem(props) {
  const { api, callBack, token, delay, server } = props;
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // use callback so that component doesn't re-render
  // when callback gets registered
  const queryAPI = useCallback(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      axios({
        method: api.method,
        url: server.endpointURL + api.url,
        data: api.body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setResponse(res);
          console.log(res);
        })
        .catch((err) => {
          if (err.response) setResponse(err.response);
          else return null;
          console.log(err);
        })
        .then(() => {
          setShowMenu(true);
          setLoading(false);
        });
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [api, token, delay, server]);

  const expandContract = useCallback((isExpanded) => {
    isExpanded ? setShowMenu(false) : setShowMenu(true);
  }, []);

  useEffect(() => {
    // Only register callback if component has a token
    if (token) callBack({ queryAPI, expandContract });
  }, [callBack, queryAPI, expandContract, token]);

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
            <h2 style={{ marginLeft: ".5rem" }}>{api.url}</h2>
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
          <button
            onClick={() => {
              setResponse([]);
              queryAPI();
            }}
          >
            Test
          </button>
          <div>
            <p>Method: {api.method}</p>
            <p>URL: {server.endpointURL + api.url}</p>
            <p>Status: {JSON.stringify(response.status)}</p>
            <p>Data: {JSON.stringify(response.data)}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
