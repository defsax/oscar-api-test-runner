import {
  React,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";

import {
  PatientFlow,
  PrescriptionFlow,
  NoteFlow,
  AppointmentFlow,
  TemplateFlow,
} from "../../static/apiflows";
import { apiVersion } from "../../static/serverlist";
import UserFlowListItem from "./userflowlistitem";
import ServerToggle from "../general/servertoggle";
import queryAPI from "./helpers/queryapi";
import { AuthContext } from "../../App";

import "./css/userflow.css";

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

  // useEffect(() => {
  //   console.log(results);
  // }, [results]);

  const expandRefs = useRef([]);
  const setExpandCallback = useCallback((callback) => {
    expandRefs.current.push(callback);
  }, []);

  const FlowOption = (props) => {
    const { option, choice } = props;
    if (flow.flow !== option) {
      return (
        <button
          onClick={() => {
            handleExpand();
            setFlow({
              flow: option,
              apis: choice,
            });
          }}
        >
          {option}
        </button>
      );
    }
    return null;
  };

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
        api={res.api}
        method={res.method}
        body={res.body}
        server={res.server}
        expandCallback={setExpandCallback}
      />
    );
  };

  const handleFlow = async (list) => {
    const token = stateRef.current.dev.token;
    const provNo = stateRef.current.dev.provNo;
    let currentAPI = list.post.api;

    if (list.post.refreshId) {
      list.post.refreshId();
    }
    // If the submission requires a specific providerNo
    if (list.post.setProviderNo) list.post.setProviderNo(provNo);

    try {
      const postReq = await axios({
        method: "POST",
        url: list.post.getURL(server),
        data: list.post.body,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      console.log(server);

      setResults((oldResults) => [
        ...oldResults,
        {
          result: postReq,
          api: list.post.api,
          body: list.post.body,
          method: "post",
          server: server.apitype,
        },
      ]);

      list.apiList.map(async (api) => {
        currentAPI = api.api;

        // If there's a setID function, set api with #
        if (api.setPatientId)
          api.setPatientId(postReq.data.result.demographicNo);
        if (api.setNoteId) api.setNoteId(postReq.data.result.noteId);
        if (api.setAppointmentId) api.setAppointmentId(postReq.data.result.id);
        if (api.setTemplateIdName)
          api.setTemplateIdName(
            postReq.data.result.id,
            postReq.data.result.templateName
          );

        return await queryAPI(api, server, token, provNo, setResults);
      });
    } catch (e) {
      // console.error(e);
      // console.log(e.response);
      console.log("error", e.response);

      setResults((oldResults) => [
        ...oldResults,
        {
          result: e.response,
          api: currentAPI,
          body: list.post.body,
          method: "post",
          server: server.apitype,
        },
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
              <FlowOption option={"prescription"} choice={PrescriptionFlow} />
              <FlowOption option={"patient"} choice={PatientFlow} />
              <FlowOption option={"notes"} choice={NoteFlow} />
              <FlowOption option={"appointments"} choice={AppointmentFlow} />
              <FlowOption option={"templates"} choice={TemplateFlow} />
              <button>transcriptions</button>
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

      {results ? results.slice(0).reverse().map(renderFlowItem) : null}
    </div>
  );
}
