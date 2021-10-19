import {
  React,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";

import { PatientFlow, PrescriptionFlow } from "../../static/apis";
import { apiVersion } from "../../static/serverlist";
import UserFlowListItem from "./userflowlistitem";
import ServerToggle from "../general/servertoggle";
import queryAPI from "./helpers/queryapi";

import "./css/userflow.css";
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
      setStyles({
        ...styles,
        flowOptions: { display: "none" },
        flowArrowButton: {
          borderRadius: "0px 8px 8px 0px",
        },
      });
    } else {
      setExpanded(true);
      setStyles({
        ...styles,
        flowOptions: { display: "flex" },
        flowArrowButton: {
          borderRadius: "0px 8px 0px 0px",
        },
      });
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

  const handleFlow = async (list) => {
    const token = stateRef.current.dev.token;

    if (list.post.func) {
      list.post.func();
    }

    try {
      const postReq = await axios({
        method: "POST",
        url: server.endpointURL + list.post.url + server.suffix,
        data: list.post.body,
        headers: {
          Authorization: `Bearer ${token}`,
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
            return await queryAPI(api, url, displayURL, token, setResults);
          } else {
            const url = server.endpointURL + api.url + server.suffix;
            console.log(url);
            const displayURL = api.url;
            return await queryAPI(api, url, displayURL, token, setResults);
          }
        });
      } else {
        list.apiList.map(async (api) => {
          return await queryAPI(
            api,
            server.endpointURL + api.url + server.suffix,
            api.url,
            token,
            setResults
          );
        });
      }
    } catch (e) {
      console.error(e);
      console.log(e.response);
      setResults((oldResults) => [
        ...oldResults,
        { result: e.response, url: "/url" },
      ]);
    }
  };

  return (
    <div className="menu">
      <h1>Oscar API User Flow Testing</h1>

      <div className={"flex-row"}>
        <ServerToggle
          setServer={setServer}
          setToggle={setToggle}
          toggle={toggle}
        />

        <div className={"flex-right"}>
          <button
            className={"button test-all-button"}
            onClick={() => {
              setExpandAll(true);
              setExpanded(false);
              setStyles({
                ...styles,
                flowOptions: { display: "none" },
                flowArrowButton: {
                  borderRadius: "0px 8px 8px 0px",
                },
              });
              handleFlow(flow.apis);
            }}
          >
            Test
          </button>

          <div className={"flow-select"}>
            <button
              style={styles.flowArrowButton}
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

            <div style={styles.flowOptions} className={"flow-options"}>
              {flow.flow !== "prescription" ? (
                <button
                  onClick={() => {
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
              <button>notes</button>
              <button>transcriptions</button>
              <button>appointments</button>
              <button>templates</button>
              <button>soapnotes</button>
              <button>consults</button>
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
