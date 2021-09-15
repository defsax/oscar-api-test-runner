import { React, useCallback, useEffect, useState } from "react";
import axios from "axios";
import StatusBox from "../statusbox";
import "./css/listitem.css";

const apiVersion = [
  {
    apitype: "dev",
    endpointURL: "https://kennedy-dev1.gojitech.systems",
  },
  {
    apitype: "staging",
    endpointURL: "https://kennedy-dev2.gojitech.systems",
  },
  {
    apitype: "staging",
    endpointURL: "https://kennedy-staging1.gojitech.systems",
  },
];
// switch here to change from dev to staging
const currentApi = apiVersion[2];

export default function ApiItem(props) {
  const { api, callBack, token, delay } = props;
  const [response, setResponse] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // use callback so that component doesn't re-render
  // when callback gets registered
  const queryAPI = useCallback(() => {
    const timer = setTimeout(() => {
      axios({
        method: api.method,
        url: currentApi.endpointURL + api.url,
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
        });
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [api, token, delay]);

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
          <div className="flex-row-left">
            <h2>
              <b>({currentApi.apitype})</b>
            </h2>
            <h2 style={{ marginLeft: ".5rem" }}>{api.url}</h2>
          </div>
          <div className="pass-fail-container">
            <StatusBox response={response} />
          </div>
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
            <p>URL: {currentApi.endpointURL + api.url}</p>
            <p>Status: {JSON.stringify(response.status)}</p>
            <p>Data: {JSON.stringify(response.data)}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
