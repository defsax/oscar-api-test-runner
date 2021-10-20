import { v4 as uuidv4 } from "uuid";

const formulateURL = function (server) {
  return server.endpointURL + this.api + server.suffix;
};

export const apis = [
  // OTHER
  {
    method: "get",
    api: "/api/v1/oscar/providers/me",
    getURL: formulateURL,
  },
  { method: "get", api: "/api/v1/status", getURL: formulateURL },

  [
    {
      /* 
          /allergies/active 
        */
      method: "get",
      api: "/api/v1/oscar/patients/1/allergies",
      getURL: formulateURL,
    },
    {
      method: "post",
      api: "/api/v1/oscar/prescriptions",
      body: [
        {
          demographicNo: 1,
          drugs: [
            {
              drugId: 3946,
              brandName: "EXTRA STRENGTH TYLENOL BACK PAIN 500MG/400MG",
              providerNo: 0,
              takeMin: 1,
              takeMax: 2,
              rxDate: "2021-10-13T00:00:00.000Z",
              frequency: "day",
              duration: 14,
              durationUnit: "days",
              route: "",
              method: "",
              prn: false,
              repeats: 0,
              quantity: 14,
              instructions:
                "EXTRA STRENGTH TYLENOL BACK PAIN 500MG/400MG Take 1 tablet every day for 14 days",
              additionalInstructions:
                "EXTRA STRENGTH TYLENOL BACK PAIN 500MG/400MG",
              archived: false,
              archivedReason: "",
              archivedDate: null,
              strength: 500,
              strengthUnit: "MG",
              externalProvider: "",
              longTerm: false,
              noSubstitutions: true,
              endDate: "2021-10-27T00:00:00.000Z",
            },
          ],
          patientName: {
            id: "d0d19870-7322-40a3-b36c-243d5b309a7a",
            demographicNo: 1,
            firstName: "GIRI",
            lastName: "AMARAKONE",
            email: "gamarakone@gmail.com",
            dateOfBirth: "1974-04-06",
            sex: "M",
            phone: "416-848-1781",
            alternativePhone: "647-625-3094",
            address: {
              city: "Toronto",
              postal: "M1C3R9",
              address: "60 Grantown Ave, Scarborough, ON, Canada",
              province: "ON",
            },
            officialLanguage: "English",
          },
        },
      ],
      getURL: formulateURL,
    },
  ],
  {
    method: "get",
    api: "/api/v1/oscar/prescriptions",
    getURL: function (server, providerNo) {
      console.log(server);
      if (server.endpointURL.search("dev") !== -1)
        return (
          server.endpointURL +
          this.api +
          server.suffix +
          "&demographicNo=1&providerNo=" +
          providerNo
        );
      else return server.endpointURL + this.api + server.suffix;
    },
  },

  // PATIENTS - Create, retrieve, get all
  [
    {
      /*
        /demographics
        Add a new patient demographic record to the system.
      */
      method: "post",
      api: "/api/v1/oscar/patients",
      body: {
        firstName: "Test",
        lastName: "Patient",
        email: "test.patient." + uuidv4() + "@gmail.com",
        sex: "M",
        dateOfBirth: "1978-12-31T00:00:00.000Z",
        address: {
          province: "ON",
          postal: "M6H 2L9",
          city: "Toronto",
          address: "92 Auburn Ave",
        },
      },
      func: function () {
        this.body.email = "test.patient." + uuidv4() + "@gmail.com";
      },
      getURL: formulateURL,
    },
    {
      /*
        /demographics
        Retrieves 1 patient.
      */
      method: "get",
      api: "/api/v1/oscar/patients/1",
      getURL: formulateURL,
    },
    {
      /*
        /demographics
        Retrieves all patient demographics. In case limit or offset parameters are set to null or zero, the entire result set is returned.
      */
      method: "get",
      api: "/api/v1/oscar/patients/all",
      getURL: formulateURL,
    },
  ],
  {
    method: "get",
    api: "/api/v1/oscar/patients/1/measurements",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/1/documents",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/1/forms",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/1/labResults",
    getURL: formulateURL,
  },
];

export const PatientFlow = {
  post: {
    api: "/api/v1/oscar/patients",
    body: {
      firstName: "Test",
      lastName: "Patient",
      email: "1234@gmail.com",
      sex: "M",
      dateOfBirth: "1978-12-31T00:00:00.000Z",
      address: {
        province: "ON",
        postal: "M6H 2L9",
        city: "Toronto",
        address: "92 Auburn Ave",
      },
    },
    refreshId: function () {
      this.body.email = "test.patient." + uuidv4() + "@gmail.com";
    },

    getURL: formulateURL,
  },
  apiList: [
    {
      api: "",
      setAPI: function (id) {
        this.api = "/api/v1/oscar/patients/" + id;
      },
      getURL: formulateURL,
    },
    // {
    //   method: "get",
    //   api: "/api/v1/oscar/patients/all",
    //   idRequired: false,
    //   suffix: "",
    // },
    {
      api: "",
      setAPI: function (id) {
        this.api = "/api/v1/oscar/patients/" + id + "/allergies";
      },
      getURL: formulateURL,
    },

    {
      api: "",
      setAPI: function (id) {
        this.api = "/api/v1/oscar/patients/" + id + "/measurements";
      },
      getURL: formulateURL,
    },
    {
      api: "",
      setAPI: function (id) {
        this.api = "/api/v1/oscar/patients/" + id + "/documents";
      },
      getURL: formulateURL,
    },
    {
      api: "",
      setAPI: function (id) {
        this.api = "/api/v1/oscar/patients/" + id + "/forms";
      },
      getURL: formulateURL,
    },
    {
      api: "",
      setAPI: function (id) {
        this.api = "/api/v1/oscar/patients/" + id + "/labResults";
      },
      getURL: formulateURL,
    },
  ],
};

export const PrescriptionFlow = {
  post: {
    api: "/api/v1/oscar/prescriptions",
    body: [
      {
        demographicNo: 1,
        drugs: [
          {
            drugId: 3946,
            brandName: "EXTRA STRENGTH TYLENOL BACK PAIN 500MG/400MG",
            providerNo: 0,
            takeMin: 1,
            takeMax: 2,
            rxDate: "2021-10-13T00:00:00.000Z",
            frequency: "day",
            duration: 14,
            durationUnit: "days",
            route: "",
            method: "",
            prn: false,
            repeats: 0,
            quantity: 14,
            instructions:
              "EXTRA STRENGTH TYLENOL BACK PAIN 500MG/400MG Take 1 tablet every day for 14 days",
            additionalInstructions:
              "EXTRA STRENGTH TYLENOL BACK PAIN 500MG/400MG",
            archived: false,
            archivedReason: "",
            archivedDate: null,
            strength: 500,
            strengthUnit: "MG",
            externalProvider: "",
            longTerm: false,
            noSubstitutions: true,
            endDate: "2021-10-27T00:00:00.000Z",
          },
        ],
        patientName: {
          id: "d0d19870-7322-40a3-b36c-243d5b309a7a",
          demographicNo: 1,
          firstName: "GIRI",
          lastName: "AMARAKONE",
          email: "gamarakone@gmail.com",
          dateOfBirth: "1974-04-06",
          sex: "M",
          phone: "416-848-1781",
          alternativePhone: "647-625-3094",
          address: {
            city: "Toronto",
            postal: "M1C3R9",
            address: "60 Grantown Ave, Scarborough, ON, Canada",
            province: "ON",
          },
          officialLanguage: "English",
        },
      },
    ],

    getURL: formulateURL,
    setProviderNo: function (providerNo) {
      this.body[0].drugs[0].providerNo = providerNo;
    },
  },
  apiList: [
    {
      api: "/api/v1/oscar/prescriptions",

      getURL: function (server, providerNo) {
        return (
          server.endpointURL +
          this.api +
          server.suffix +
          "&demographicNo=1&providerNo=" +
          providerNo
        );
      },
    },
  ],
};
