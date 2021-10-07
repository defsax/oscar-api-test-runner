import {
  React,
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { AuthContext } from "../../App";
import { v4 as uuidv4 } from "uuid";
import ApiList from "./apilist";
import shuffle from "../../helpers/shuffle";

import "./css/button.css";
import "./css/menu.css";

const apis = [
  // OTHER
  { method: "get", url: "/api/v1/oscar/providers/me" },
  { method: "get", url: "/api/v1/status" },

  // OSCAR REST APIS
  // { method: "get", url: "/api/v1/oscarrest/providers" },
  // { method: "get", url: "/api/v1/oscarrest/notes/1" },
  // { method: "get", url: "/api/v1/oscarrest/patients" },
  // { method: "get", url: "/api/v1/oscarrest/auth" },
  [
    {
      /* 
        /allergies/active 
      */
      method: "get",
      url: "/api/v1/oscar/patients/1/allergies",
    },
    {
      method: "post",
      url: "/api/v1/oscar/prescriptions",
      body: [
        {
          demographicNo: 9, // DEMING / WALTER
          drugs: [
            {
              drugId: 34419,
              brandName: "AMOXICILLIN CAPSULES BP 500MG",
              providerNo: 217,
              takeMin: 0,
              takeMax: 0,
              rxDate: "2021-10-07T00:00:00.000Z",
              frequency: "day",
              duration: 3,
              durationUnit: "weeks",
              route: "string",
              method: "string",
              prn: true,
              repeats: 0,
              quantity: 42,
              instructions: "Take 2 pills every day for 3 weeks",
              additionalInstructions: "",
              archived: true,
              archivedReason: "",
              archivedDate: null,
              strength: 0,
              strengthUnit: "string",
              externalProvider: "",
              longTerm: true,
              noSubstitutions: true,
              endDate: "2021-10-28T00:00:00.000Z",
            },
          ],
        },
      ],
    },
  ],
  {
    method: "get",
    url: "/api/v1/oscar/prescriptions",
  },

  // PATIENTS
  {
    /*
      /demographics
      Add a new patient demographic record to the system.
    */
    method: "post",
    url: "/api/v1/oscar/patients",
    body: {
      firstName: "Test",
      lastName: "Patient",
      email: "test.patient." + uuidv4() + "@gmail.com",
      // firstName: "JAMES",
      // lastName: "ALEX",
      // email: "james.ale1x@gmail.com",
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
  {
    /*
      /demographics
      Retrieves all patient demographics. In case limit or offset parameters are set to null or zero, the entire result set is returned.
    */
    method: "get",
    url: "/api/v1/oscar/patients/all",
  },

  {
    /*
      /demographics
      Retrieves 1 patient.
    */
    method: "get",
    url: "/api/v1/oscar/patients/1",
  },

  {
    method: "get",
    url: "/api/v1/oscar/patients/1/measurements",
  },
  {
    method: "get",
    url: "/api/v1/oscar/patients/1/documents",
  },
  {
    method: "get",
    url: "/api/v1/oscar/patients/1/forms",
  },
  {
    method: "get",
    url: "/api/v1/oscar/patients/1/labResults",
  },

  // DEMOGRAPHICS
  // { method: "get", url: "/api/v1/oscar/patients/:demographicNo/allergies" },
];

const apiVersion = [
  {
    apitype: "dev",
    // endpointURL: "http://localhost:5000",
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

export default function EndpointTestMenu() {
  const { state } = useContext(AuthContext);

  const testButtonRef = useRef();
  const expandButtonRef = useRef();

  // switch here to change from dev to staging
  const [server, setServer] = useState(apiVersion[0]);

  // Toggle between dev & staging
  const [toggle, setToggle] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [token, setToken] = useState(0);
  const [shuffledAPIs, setShuffleAPIs] = useState([]);

  useEffect(() => {
    setShuffleAPIs(shuffle(apis).flat());
  }, []);

  // If selected server is dev, set token to dev token
  // Otherwise, set to staging
  useEffect(() => {
    if (server.apitype === "dev") setToken(state.dev.token);
    else if (server.apitype === "staging") setToken(state.staging.token);
  }, [server, state]);

  const setTestCallback = useCallback((callback) => {
    testButtonRef.current = callback;
  }, []);

  const setExpandCallback = useCallback((callback) => {
    expandButtonRef.current = callback;
  }, []);

  return (
    <div className="menu">
      <h1>Oscar API Endpoint Testing</h1>

      <div className={"flex-row"}>
        <div className={"flex-left"}>
          <button
            className={"button server-button dev-button"}
            onClick={() => {
              setServer(apiVersion[0]);
              setToggle(!toggle);
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
              setExpanded(true);
              testButtonRef.current();
            }}
          >
            Test All
          </button>

          <button
            className={"arrow-button"}
            onClick={() => {
              expanded ? setExpanded(false) : setExpanded(true);
              expandButtonRef.current(expanded);
            }}
          >
            {expanded ? <p>▲</p> : <p>▼</p>}
          </button>
        </div>
      </div>
      <hr />

      {toggle ? (
        <ApiList
          key={0}
          apis={shuffledAPIs}
          token={token}
          server={server}
          expandCallback={setExpandCallback}
          testCallback={setTestCallback}
        />
      ) : (
        <ApiList
          key={1}
          apis={shuffledAPIs}
          token={token}
          server={server}
          expandCallback={setExpandCallback}
          testCallback={setTestCallback}
        />
      )}
    </div>
  );
}
