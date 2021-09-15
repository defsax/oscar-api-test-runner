import { React, useCallback, useRef, useState, useEffect } from "react";
import ApiItem from "./apiitem";
import "./css/button.css";
import "./css/menu.css";

const apis = [
  // OTHER
  { method: "get", url: "/api/v1/status" },

  // OSCAR REST APIS
  { method: "get", url: "/api/v1/oscarrest/providers" },
  { method: "get", url: "/api/v1/oscarrest/notes/1" },
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
  { method: "get", url: "/api/v1/oscarrest/patients" },
  { method: "get", url: "/api/v1/oscarrest/auth" },

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

export default function IndependentResults(props) {
  const { token } = props;
  const [expanded, setExpanded] = useState(false);

  // Create arrays of useRefs
  const testRefs = useRef([]);
  const expandRefs = useRef([]);

  useEffect(() => {
    // Clear refs when user logs out
    if (!token) {
      testRefs.current = [];
      console.log("callbacks cleared.");
    }
  }, [token]);

  // useCallback so that component doesn't reload on setCallback updating
  const setCallback = useCallback(
    (callback) => {
      testRefs.current.push(callback.queryAPI);
      if (expandRefs.current.length < apis.length) {
        expandRefs.current.push(callback.expandContract);
      }
      console.log("callback registered.");
    },
    [testRefs, expandRefs]
  );

  return (
    <div className="menu">
      <h1>Oscar API Individual Test Routes</h1>

      <div className={"flex-row-right"}>
        {/* The Test All button calls each registered function:  */}
        <button
          className={"button"}
          onClick={() => {
            console.log("Test refs length:", testRefs.current.length);

            // Call each function in the useRef array (created in child component)
            testRefs.current.forEach((test) => {
              test();
            });
            setExpanded(true);
          }}
        >
          Test all
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

      {apis.map((api, i) => {
        return (
          <ApiItem
            key={i}
            delay={i}
            api={api}
            callBack={setCallback}
            token={token}
          />
        );
      })}
    </div>
  );
}
