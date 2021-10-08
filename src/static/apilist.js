import { v4 as uuidv4 } from "uuid";

export const apis = [
  // OTHER
  { id: 0, method: "get", url: "/api/v1/oscar/providers/me" },
  { id: 1, method: "get", url: "/api/v1/status" },

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
      id: 2,
      method: "get",
      url: "/api/v1/oscar/patients/1/allergies",
      result: {},
    },
    {
      id: 3,
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
      result: {},
    },
  ],
  {
    id: 4,
    method: "get",
    url: "/api/v1/oscar/prescriptions",
    result: {},
  },

  // PATIENTS - Create, retrieve, get all
  [
    {
      /*
        /demographics
        Add a new patient demographic record to the system.
      */
      id: 5,
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
          postal: "M6H 2L9",
          city: "Toronto",
          address: "92 Auburn Ave",
        },
      },
      result: {},
    },
    {
      /*
        /demographics
        Retrieves 1 patient.
      */
      id: 6,
      method: "get",
      url: "/api/v1/oscar/patients/1",
      result: {},
    },
    {
      /*
        /demographics
        Retrieves all patient demographics. In case limit or offset parameters are set to null or zero, the entire result set is returned.
      */
      id: 7,
      method: "get",
      url: "/api/v1/oscar/patients/all",
      result: {},
    },
  ],
  {
    id: 8,
    method: "get",
    url: "/api/v1/oscar/patients/1/measurements",
    result: {},
  },
  {
    id: 9,
    method: "get",
    url: "/api/v1/oscar/patients/1/documents",
    result: {},
  },
  {
    id: 10,
    method: "get",
    url: "/api/v1/oscar/patients/1/forms",
    result: {},
  },
  {
    id: 11,
    method: "get",
    url: "/api/v1/oscar/patients/1/labResults",
    result: {},
  },

  // DEMOGRAPHICS
  // { method: "get", url: "/api/v1/oscar/patients/:demographicNo/allergies" },
];
