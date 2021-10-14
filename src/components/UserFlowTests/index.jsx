import {
  React,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PatientFlow, PrescriptionFlow } from "../../static/apis";
import { apiVersion } from "../../static/serverlist";
import axiosQueue from "../../helpers/axios";

import UserFlowListItem from "./userflowlistitem";

import "./css/userflow.css";
import axios from "axios";
import { AuthContext } from "../../App";

export default function UserFlowMenu() {
  // Toggle between dev & staging
  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const [styles, setStyles] = useState({});
  const [server, setServer] = useState(apiVersion[0]);
  const [results, setResults] = useState([]);

  const { state } = useContext(AuthContext);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const [flow, setFlow] = useState({
    flow: "prescription",
    apis: PrescriptionFlow,
  });

  const expandRefs = useRef([]);
  const setExpandCallback = useCallback((callback) => {
    expandRefs.current.push(callback);
  }, []);

  const handleExpand = () => {
    if (expanded) {
      setExpanded(false);
      setStyles({ display: "none" });
    } else {
      setExpanded(true);
      setStyles({ display: "flex" });
    }
  };

  const renderFlowItem = (res, i) => {
    return (
      <UserFlowListItem
        key={i}
        result={res.result}
        api={res.url}
        body={res.body}
        expandCallback={setExpandCallback}
      />
    );
  };

  const sendReq = async (api, url, displayURL) => {
    console.log(api);
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
        console.log(`Success calling ${url}`);
        // console.log(res.data);

        return res;
      })
      .catch((err) => {
        console.log(`Failed calling ${url}`);
        // if (err.response) {
        //   console.log(err.response);
        // } else if (err.request) {
        //   console.log(err.request);
        // } else {
        //   console.log("Error", err.message);
        // }
        // console.log(err.config);

        return err.response;
      })
      .then((res) => {
        // console.log(res);

        setResults((oldResults) => [
          ...oldResults,
          { result: res, url: displayURL },
        ]);
        // setShowMenu(true);
        // setShowData(true);
        // setLoading(false);
        return new Promise((resolve) => {
          resolve();
        });
      });
  };

  const handleFlow = async (list) => {
    try {
      const postReq = await axios({
        method: "POST",
        url: server.endpointURL + list.post.url + server.suffix,
        data: list.post.body,
        headers: {
          Authorization: `Bearer ${stateRef.current.dev.token}`,
          Accept: "application/json",
        },
      });
      console.log({ postReq, url: list.post.url });
      setResults((oldResults) => [
        ...oldResults,
        { result: postReq, url: list.post.url, body: list.post.body },
      ]);

      // If testing, for example, patients
      if (postReq.data.result.demographicNo) {
        list.apiList.map(async (api) => {
          // console.log(api);
          if (api.idRequired) {
            const url =
              server.endpointURL +
              api.url +
              postReq.data.result.demographicNo +
              api.suffix +
              server.suffix;

            const displayURL =
              api.url + postReq.data.result.demographicNo + api.suffix;
            console.log(url);
            return await sendReq(api, url, displayURL);
          } else {
            const url = server.endpointURL + api.url + server.suffix;
            console.log(url);
            const displayURL = api.url;
            return await sendReq(api, url, displayURL);
          }
        });
      } else {
        list.apiList.map(async (api) => {
          return await sendReq(
            api,
            server.endpointURL + api.url + server.suffix,
            api.url
          );
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="menu">
      <h1>Oscar API User Flow Testing</h1>

      <div className={"flex-row"}>
        <div className={"flex-left"}>
          <button
            className={"button server-button dev-button"}
            onClick={() => {
              setServer(apiVersion[0]);
              setToggle(!toggle);
              // testRefs.current = [];
            }}
            disabled={toggle}
          >
            dev
          </button>

          <button
            className={"button server-button staging-button"}
            onClick={() => {
              setServer(apiVersion[1]);
              setToggle(!toggle);
              // testRefs.current = [];
            }}
            disabled={!toggle}
          >
            staging
          </button>
        </div>

        <div className={"flex-right"}>
          {/* The Test All button calls each registered function:  */}
          <button
            className={"button test-all-button"}
            onClick={() => {
              setExpandAll(true);
              setExpanded(false);
              setStyles({ display: "none" });
              handleFlow(flow.apis);
            }}
          >
            Test
          </button>

          <div className={"flow-select"}>
            <button
              className={"flow-arrow-button"}
              onClick={() => {
                handleExpand();
              }}
            >
              <div className={"option-menu"}>
                <p>{flow.flow}</p>
                {expanded ? <p>▲</p> : <p>▼</p>}
              </div>
            </button>

            <div style={styles} className={"flow-options"}>
              {flow.flow !== "prescription" ? (
                <button
                  onClick={() => {
                    // testRefs.current = [];

                    handleExpand();
                    setFlow({
                      flow: "prescription",
                      apis: PrescriptionFlow,
                    });
                  }}
                >
                  prescription
                </button>
              ) : null}

              {flow.flow !== "patient" ? (
                <button
                  onClick={() => {
                    // testRefs.current = [];

                    handleExpand();
                    setFlow({
                      flow: "patient",
                      apis: PatientFlow,
                    });
                  }}
                >
                  patient
                </button>
              ) : null}
            </div>
          </div>
          <button
            className={"expand-all-button"}
            onClick={() => {
              expandAll ? setExpandAll(false) : setExpandAll(true);
              expandRefs.current.forEach((expand) => {
                expand(expandAll);
              });
            }}
          >
            {expandAll ? <p>▲</p> : <p>▼</p>}
          </button>
        </div>
      </div>
      <hr />

      {results ? results.map(renderFlowItem) : null}
    </div>
  );
}
