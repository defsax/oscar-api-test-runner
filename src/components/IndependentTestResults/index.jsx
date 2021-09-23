import {
  React,
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { AuthContext } from "../../App";
import ApiItem from "./apiitem";
import "./css/button.css";
import "./css/menu.css";

const apis = [
  // OTHER
  { method: "get", url: "/api/v1/status" },

  // OSCAR REST APIS
  // { method: "get", url: "/api/v1/oscarrest/providers" },
  // { method: "get", url: "/api/v1/oscarrest/notes/1" },
  // { method: "get", url: "/api/v1/oscarrest/patients" },
  // { method: "get", url: "/api/v1/oscarrest/auth" },
  {
    method: "post",
    url: "/api/v1/oscar/prescriptions",
    body: [
      {
        demographicNo: 0,
        drugs: [
          {
            drugId: 0,
            providerNo: 0,
            brandName: "string",
            takeMin: 0,
            takeMax: 0,
            rxDate: "2021-07-08T16:05:49.404Z",
            endDate: "2021-07-08T16:05:49.404Z",
            frequency: "",
            duration: 0,
            durationUnit: "",
            route: "",
            method: "",
            prn: false,
            repeats: 0,
            quantity: 0,
            instructions: "string",
            additionalInstructions: "",
            archived: false,
            archivedReason: "",
            archivedDate: null,
            strength: 0,
            strengthUnit: "",
            externalProvider: "",
            longTerm: true,
            noSubstitutions: true,
          },
        ],
      },
    ],
  },

  // PATIENTS
  { method: "get", url: "/api/v1/oscar/patients" },
  {
    method: "post",
    url: "/api/v1/oscar/patients",
    body: {
      firstName: "James",
      lastName: "Alex",
      email: "james.alex@gmail.com",
      sex: "M",
      dateOfBirth: "1978-12-31T00:00:00.000Z",
      address: {
        province: "ON",
        method: "post",
        al: "M6H 2L9",
        city: "Toronto",
        address: "92 Auburn Ave",
      },
    },
  },
  { method: "get", url: "/api/v1/oscar/patients/all" },
  { method: "get", url: "/api/v1/oscar/patients/1" },
  {
    method: "get",
    url: "/api/v1/oscar/patients/14/allergies",
  },
  {
    method: "get",
    url: "/api/v1/oscar/patients/14/measurements",
  },
  {
    method: "get",
    url: "/api/v1/oscar/patients/14/documents",
  },
  {
    method: "get",
    url: "/api/v1/oscar/patients/14/forms",
  },
  {
    method: "get",
    url: "/api/v1/oscar/patients/14/labResults",
  },
];

const apiVersion = [
  {
    apitype: "dev",
    endpointURL: "https://kennedy-dev1.gojitech.systems",
    suffix:
      "?siteURL=" +
      encodeURIComponent("https://goji-oscar1.gojitech.systems") +
      "&appVersion=dev",
  },
  {
    apitype: "staging",
    endpointURL: "https://kennedy-staging1.gojitech.systems",
    suffix: "",
  },
];

export default function IndependentResults(props) {
  const { state } = useContext(AuthContext);

  // const { token } = props;
  // switch here to change from dev to staging
  const [server, setServer] = useState(apiVersion[0]);
  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(state.dev.token);

  // Create arrays of useRefs
  const testRefs = useRef([]);
  const expandRefs = useRef([]);

  // useEffect(() => {
  //   // Clear refs when user logs out
  //   if (!token) {
  //     testRefs.current = [];
  //     console.log("callbacks cleared.");
  //   }
  //   setError(false);
  // }, [token]);

  useEffect(() => {
    // console.log(state.dev.token);
    // console.log(state.staging.token);
    // apiVersion[0].jwt = state.dev.token;
    // apiVersion[1].jwt = state.staging.token;
    // console.log(apiVersion[0]);
    // console.log(apiVersion[1]);
    if (toggle) setToken(state.dev.token);
    else setToken(state.staging.token);
  }, [state, toggle]);

  useEffect(() => {
    console.log(token);
    // Clear refs when user logs out
    if (!token) {
      testRefs.current = [];
      console.log("callbacks cleared.");
    }
    setError(false);
  }, [token]);

  // useCallback so that component doesn't reload on setCallback updating
  const setCallback = useCallback(
    (callback) => {
      testRefs.current.push(callback.queryAPI);
      if (expandRefs.current.length < apis.length) {
        expandRefs.current.push(callback.expandContract);
      }
      // console.log("callback registered.");
      // console.log("testRefs length:", testRefs.current.length);
    },
    [testRefs, expandRefs]
  );

  return (
    <div className="menu">
      <h1>Oscar API Endpoint Testing</h1>
      {error ? (
        <h3 className={"error"}>{"Please log in to test all."}</h3>
      ) : null}
      <div className={"flex-row"}>
        <div className={"flex-left"}>
          <button
            className={"button server-button dev-button"}
            onClick={() => {
              setServer(apiVersion[0]);
              // setToken(state.dev.token);
              setToggle(!toggle);
              testRefs.current = [];
            }}
            disabled={toggle}
          >
            dev
          </button>

          <button
            className={"button server-button staging-button"}
            onClick={() => {
              setServer(apiVersion[1]);
              // setToken(state.staging.token);
              setToggle(!toggle);
              testRefs.current = [];
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
              console.log("Test refs length:", testRefs.current.length);

              if (testRefs.current.length) {
                // Call each function in the useRef array (created in child component)
                testRefs.current.forEach((test) => {
                  test();
                });
                setExpanded(true);
                setError(false);
              } else {
                setError(true);
              }
            }}
          >
            Test All
          </button>

          <button
            className={"arrow-button"}
            onClick={() => {
              console.log("Expand refs length:", expandRefs.current.length);

              expanded ? setExpanded(false) : setExpanded(true);
              expandRefs.current.forEach((expand) => {
                expand(expanded);
              });
            }}
          >
            {expanded ? <p>▲</p> : <p>▼</p>}
          </button>
        </div>
      </div>
      <hr />

      {apis.map((api, i) => {
        return (
          <ApiItem
            key={i}
            delay={i}
            api={api}
            callBack={setCallback}
            token={token}
            server={server}
          />
        );
      })}
    </div>
  );
}
