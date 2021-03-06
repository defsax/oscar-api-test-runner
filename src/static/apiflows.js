import { v4 as uuidv4 } from "uuid";

const formulateURL = function (server) {
  return server.endpointURL + this.api + server.suffix;
};

export const PrescriptionFlow = {
  post: {
    api: "/api/v1/oscar/prescriptions",
    body: [
      {
        demographicNo: 121,
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
          id: "97efee8a-eea0-47f5-9de1-3fdfc67d4c97",
          demographicNo: 121,
          firstName: "STARDUST",
          lastName: "BLUE",
          email: "stardust@yandex.com",
          dateOfBirth: "1994-10-18",
          sex: "M",
          address: {
            city: "Toronto",
            postal: "M6B 4M4",
            address: "1001 Roselawn Ave York",
            province: "ON",
          },

          phone: "416-848-1781",
          alternativePhone: "647-625-3094",
          officialLanguage: "English",
        },
      },
    ],

    getURL: formulateURL,
    setup: function (server, userInfo) {
      this.body[0].demographicNo = server.testDemoNo;
    },
  },
  apiList: [
    {
      api: "/api/v1/oscar/prescriptions",
      method: "get",
      getURL: function (server, providerNo) {
        return (
          server.endpointURL +
          this.api +
          server.suffix +
          "&demographicNo=121&providerNo=" +
          providerNo
        );
      },
    },
  ],
};

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
    // refreshId: function () {
    //   this.body.email = "test.patient." + uuidv4() + "@gmail.com";
    // },
    setup: function () {
      this.body.email = "test.patient." + uuidv4() + "@gmail.com";
    },

    getURL: formulateURL,
  },
  apiList: [
    {
      api: "",
      method: "get",
      setup: function (result) {
        this.api = "/api/v1/oscar/patients/" + result.demographicNo;
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
      method: "get",
      setup: function (result) {
        this.api =
          "/api/v1/oscar/patients/" + result.demographicNo + "/allergies";
      },
      getURL: formulateURL,
    },

    {
      api: "",
      method: "get",
      setup: function (result) {
        this.api =
          "/api/v1/oscar/patients/" + result.demographicNo + "/measurements";
      },
      getURL: formulateURL,
    },
    {
      api: "",
      method: "get",
      setup: function (result) {
        this.api =
          "/api/v1/oscar/patients/" + result.demographicNo + "/documents";
      },
      getURL: formulateURL,
    },
    {
      api: "",
      method: "get",
      setup: function (result) {
        this.api = "/api/v1/oscar/patients/" + result.demographicNo + "/forms";
      },
      getURL: formulateURL,
    },
    {
      api: "",
      method: "get",
      setup: function (result) {
        this.api =
          "/api/v1/oscar/patients/" + result.demographicNo + "/labResults";
      },
      getURL: formulateURL,
    },
  ],
};

export const NoteFlow = {
  post: {
    api: "/api/v1/oscar/notes",
    body: {
      demographicNo: 121,
      note: "Patient seems nervous.",
      observationDate: "2021-10-20T15:53:20.944Z",
      updateDate: "2021-10-20T15:53:20.944Z",
      soapNote: {},
    },
    getURL: formulateURL,
  },
  apiList: [
    {
      method: "get",
      api: "/api/v1/oscar/notes",
      getURL: function (server) {
        return (
          server.endpointURL + this.api + server.suffix + "&demographicNo=121"
        );
      },
    },
    {
      method: "get",
      api: "/api/v1/oscar/notest/{id}",
      setup: function (result) {
        this.api = "/api/v1/oscar/notest/" + result.noteId;
      },
      getURL: formulateURL,
    },
  ],
};

export const AppointmentFlow = {
  post: {
    api: "/api/v1/oscar/appointments",
    body: {
      providerNo: 1,
      appointmentDate: "2021-07-26 10:50",
      startTime: "2021-07-26 10:50",
      demographicNo: 121,
      notes: "Patient is sick",
      reason: "string",
      location: "string",
      resources: "string",
      type: "string",
      status: "string",
      duration: 0,
      urgency: "string",
    },
    getURL: function (server, userInfo) {
      return server.endpointURL + this.api + server.suffix;
    },

    setup: function (server, userInfo) {
      this.body.demographicNo = server.testDemoNo;
      this.body.providerNo = userInfo.provNo;
    },
  },
  apiList: [
    {
      method: "get",
      api: "/api/v1/oscar/appointments&demographicNo={demographicNo}",
      getURL: function (server) {
        return (
          server.endpointURL +
          "/api/v1/oscar/appointments" +
          server.suffix +
          "&demographicNo=" +
          server.testDemoNo
        );
      },
    },
    {
      method: "get",
      api: "/api/v1/oscar/appointments/{demographicNo}/history",
      getURL: function (server) {
        return (
          server.endpointURL +
          "/api/v1/oscar/appointments/" +
          server.testDemoNo +
          "/history" +
          server.suffix
        );
      },
    },
    {
      method: "put",
      api: "",
      body: {
        providerNo: 1,
        appointmentDate: "2021-07-26 10:50",
        startTime: "2021-07-26 10:50",
        demographicNo: 121,
        notes: "Patient is not sick",
        reason: "string",
        location: "string",
        resources: "string",
        type: "string",
        status: "string",
        duration: 0,
        urgency: "string",
      },
      getURL: function (server, provNo) {
        this.body.providerNo = provNo;
        return server.endpointURL + this.api + server.suffix;
      },
      setup: function (result) {
        this.api = "/api/v1/oscar/appointments/" + result.id;
      },
    },
    {
      method: "get",
      api: "/api/v1/oscar/appointments/reasons",
      getURL: formulateURL,
    },
    {
      method: "get",
      api: "/api/v1/oscar/appointments/types",
      getURL: formulateURL,
    },
    {
      method: "get",
      api: "/api/v1/oscar/appointments/statuses",
      getURL: formulateURL,
    },
    {
      method: "delete",
      api: "",
      getURL: formulateURL,
      setup: function (result) {
        this.api = "/api/v1/oscar/appointments/" + result.id;
      },
    },
  ],
};

export const TemplateFlow = {
  post: {
    api: "/api/v1/templates",
    body: {
      templateName: "test string: " + uuidv4(),
      templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
    },
    getURL: formulateURL,
  },
  apiList: [
    {
      method: "get",
      api: "/api/v1/templates",
      getURL: function (server) {
        return (
          server.endpointURL + this.api + server.suffix + "&keyword=string"
        );
      },
    },

    {
      method: "get",
      api: "",
      getURL: formulateURL,
      setup: function (result) {
        this.api = "/api/v1/template/id/" + result.id;
      },
    },
    {
      method: "put",
      api: "",
      body: {
        templateName: "test string: " + uuidv4(),
        templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
      },
      getURL: formulateURL,
      setup: function (result) {
        this.api = "/api/v1/template/" + result.id;
      },
    },
    {
      method: "get",
      api: "",
      getURL: formulateURL,
      setup: function (result) {
        this.api = "/api/v1/template/id/" + result.id;
      },
    },
    {
      method: "delete",
      api: "/api/v1/template/id/1234",
      getURL: formulateURL,
      setup: function (result) {
        this.api = "/api/v1/template/id/" + result.id;
      },
    },
    {
      method: "get",
      api: "/api/v1/template/name/stringggggg",
      getURL: formulateURL,
    },
    {
      method: "post",
      api: "/api/v1/templates",
      body: {
        templateName: "test",
        templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
      },
      getURL: formulateURL,
    },
    {
      method: "delete",
      api: "/api/v1/template/name/test",
      getURL: formulateURL,
    },
  ],
};
