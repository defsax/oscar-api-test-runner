import { useCallback, useEffect, useState } from "react";
import JSONPretty from "react-json-pretty";
import Loader from "react-loader-spinner";
// import { AuthContext } from "../../App";
import axiosQueue from "../../helpers/axios";
import StatusBox from "../statusbox";

export default function UserFlowListItem(props) {
  const { expandCallback, result } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showData, setShowData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});

  // const [id, setId] = useState(0);

  // const { state } = useContext(AuthContext);
  // const stateRef = useRef(state);

  // useEffect(() => {
  //   stateRef.current = state;
  // }, [state]);

  // useEffect(() => {
  //   console.log("id changed", id);
  // }, [id]);

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

  // const queryAPI = useCallback(() => {
  //   // setResponse({});
  //   setLoading(true);
  //   // console.log(idNo);

  //   const url = server.endpointURL + api.url + server.suffix;
  //   if (api.id) {
  //     console.log(api.id);
  //   } else {
  //     console.log("no api id", api.url + server.suffix);
  //   }

  //   axiosQueue({
  //     method: api.method,
  //     url: url,
  //     data: api.body,
  //     headers: {
  //       Authorization: `Bearer ${stateRef.current.dev.token}`,
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       console.log(`Success calling ${api.url}`);
  //       console.log(res.data);

  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log(`Failed calling ${api.url}`);
  //       if (err.response) {
  //         console.log(err.response);
  //       } else if (err.request) {
  //         console.log(err.request);
  //       } else {
  //         console.log("Error", err.message);
  //       }
  //       console.log(err.config);

  //       return err.response;
  //     })
  //     .then((res) => {
  //       setResponse(res);
  //       setShowMenu(true);
  //       setShowData(true);
  //       setLoading(false);
  //       return new Promise((resolve) => {
  //         resolve();
  //       });
  //     });
  // }, [api, server]);

  useEffect(() => {
    // Always register callbacks
    expandCallback(expandContract);
    // testCallback(queryAPI);
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
              <b>({result.config.method})</b> {result.config.url}
              {/* {api.suffix} */}
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
              <StatusBox response={result} />
            </div>
          )}
        </div>
      </button>

      {showMenu ? (
        <div className="test-options">
          <div className="flex-results-left">
            <p>
              <b>URL: </b>
              {result.config.url}
            </p>
            {/* {api.body ? (
              <div>
                <p>
                  <b>Body:</b>
                </p>
                <JSONPretty id="json-pretty" data={api.body}></JSONPretty>
              </div>
            ) : null} */}

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
