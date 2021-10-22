import { v4 as uuidv4 } from "uuid";
import { base64Content } from "./testrecord";

const formulateURL = function (server) {
  return server.endpointURL + this.api + server.suffix;
};

/*
Goji API URLs

*  /api/v1/sites
   /api/v1/login
   /api/v1/oscar/login
*  /api/v1/check/{id}
*  /api/v1/oscar/providers/me
*  /api/v1/oscar/providers/timeslots
*  /api/v1/getSpeechkey
*  /api/v1/oscar/prescriptions (POST)
*  /api/v1/oscar/prescriptions (GET ALL)
*  /api/v1/oscar/drugs/search 
*  /api/v1/oscar/patients (POST)
*  /api/v1/oscar/patients (SEARCH BY KEYWORD)
*  /api/v1/oscar/patients/all
*  /api/v1/oscar/patients/{demographicNo}
*  /api/v1/oscar/patients/{demographicNo}/fullSummary/ALLERGIES
*  /api/v1/oscar/patients/{demographicNo}/fullSummary/FAMILYHISTORY
*  /api/v1/oscar/patients/{demographicNo}/fullSummary/RISK_FACTORS
*  /api/v1/oscar/patients/{demographicNo}/documents
*  /api/v1/oscar/patients/{demographicNo}/forms
   /api/v1/oscar/patients/{demographicNo}/forms/completedEncounterForms
*  /api/v1/oscar/patients/{demographicNo}/formOptions
*  /api/v1/oscar/patients/{demographicNo}/labResults
*  /api/v1/transcriptions       (GET ALL)
*  /api/v1/transcriptions/{id}  (GET ONE)
   /api/v1/transcriptions/{id}  (DELETE ONE)
   /api/v1/record
*  /api/v1/test/inputtext
*  /api/v1/oscar/notes                                  (POST)
*  /api/v1/oscar/notes                                  (GET BY PATIENT OR KEYWORD)
*  /api/v1/oscar/notest/noteId                          (GET ONE)
   /api/v1/oscar/appointments                           (POST)
   /api/v1/oscar/appointments                           (GET ALL)
   /api/v1/oscar/appointments/{demographicNo}/history   (GET PATIENT APPOINTMENT HISTORY)
   /api/v1/oscar/appointments/{id}                      (DELETE)
   /api/v1/oscar/appointments/{id}                      (PUT)
   /api/v1/oscar/appointments/reasons                   (GET)
   /api/v1/oscar/appointments/types                     (GET)
   /api/v1/oscar/appointments/statuses                  (GET)
   /api/v1/templates
   /api/v1/templates
   /api/v1/template/id/{id}
   /api/v1/template/id/{id}
   /api/v1/template/name/{templatename }
   /api/v1/template/name/{templatename }
   /api/v1/template/{id}
   /api/v1/oscar/forms/allEncounterForms
   /api/v1/oscar/forms/selectedEncounterForms
   /api/v1/oscar/forms/formGroups
   /api/v1/oscar/forms/favouriteFormGroup
   /api/v1/oscar/forms/groupNames
   /api/v1/oscar/consults/requests
   /api/v1/oscar/consults/requests
   /api/v1/oscar/consults/requests/{id}
   /api/v1/oscar/consults/requests/{id}
   /api/v1/oscar/consults/professionalSpecialist/{id}
   /api/v1/oscar/consults/referAttachments
   /api/v1/oscar/consults/requestAttachments
   /api/v1/oscar/consults/getReferralPathwaysByService
   /api/v1/oscar/consults/eSendRequest
   /api/v1/oscar/ticklers
   /api/v1/oscar/ticklers
   /api/v1/oscar/ticklers/mine
   /api/v1/oscar/ticklers/{id}/complete
   /api/v1/oscar/ticklers/{id}/update
   /api/v1/oscar/ticklers/{id}/update

*/

export const apis = [
  // OTHER

  { method: "get", api: "/api/v1/status", getURL: formulateURL },
  { method: "get", api: "/api/v1/sites", getURL: formulateURL },
  {
    method: "get",
    api: "/api/v1/check/",
    getURL: function (server, userInfo) {
      return server.endpointURL + this.api + userInfo.id + server.suffix;
    },
  },

  // PROVIDERS
  {
    method: "get",
    api: "/api/v1/oscar/providers/timeslots",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/providers/me",
    getURL: formulateURL,
  },

  { method: "get", api: "/api/v1/getSpeechkey", getURL: formulateURL },

  // DRUGS
  {
    method: "get",
    api: "/api/v1/oscar/drugs/search",
    getURL: function (server) {
      return (
        server.endpointURL + this.api + server.suffix + "&keyword=AMOXICILLIN"
      );
    },
  },

  // PRESCRIPTIONS
  {
    method: "post",
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
  },
  {
    method: "get",
    api: "/api/v1/oscar/prescriptions",
    getURL: function (server, userInfo) {
      if (server.endpointURL.search("dev") !== -1)
        return (
          server.endpointURL +
          this.api +
          server.suffix +
          "&demographicNo=121&providerNo=" +
          userInfo.provNo
        );
      else return server.endpointURL + this.api + server.suffix;
    },
  },

  // PATIENTS
  {
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
    method: "get",
    api: "/api/v1/oscar/patients",
    getURL: function (server) {
      return (
        server.endpointURL + this.api + server.suffix + "&keyword=STARDUST"
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/all",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/121",
    getURL: formulateURL,
  },

  {
    method: "get",
    api: "/api/v1/oscar/patients/121/fullSummary/ALLERGIES",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/121/fullSummary/FAMILYHISTORY",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/121/fullSummary/RISK_FACTORS",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/121/measurements",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/121/documents",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/121/forms",
    getURL: formulateURL,
  },
  // {
  //   method: "get",
  //   api: "/api/v1/oscar/patients/121/completedEncounterForms",
  //   getURL: formulateURL,
  // },
  {
    method: "get",
    api: "/api/v1/oscar/patients/121/formOptions",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/121/labResults",
    getURL: formulateURL,
  },

  // TRANSCRIPTIONS
  {
    method: "get",
    api: "/api/v1/transcriptions",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/transcriptions/b89f3610-d992-4930-9b32-55df242a33d7",
    getURL: formulateURL,
  },

  {
    method: "post",
    api: "/api/v1/record",
    body: {
      base64Content: "base64Content",
      userID: "d523c4b5-3568-4ac5-88e6-6aa254e91371",
    },
    getURL: function (server, userInfo) {
      this.body.userID = userInfo.id;
      return server.endpointURL + this.api + server.suffix;
    },
  },
  {
    method: "post",
    api: "/api/v1/test/inputtext",
    body: {
      phrase: "Create a prescription for claritin 100mg capsules.",
    },
    getURL: formulateURL,
  },

  // NOTES
  {
    method: "post",
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
    api: "/api/v1/oscar/notest/noteId/191",
    getURL: formulateURL,
  },

  // PATIENTS

  // /api/v1/oscar/appointments                           (POST)
  // /api/v1/oscar/appointments                           (GET ALL)
  // /api/v1/oscar/appointments/{demographicNo}/history   (GET PATIENT APPOINTMENT HISTORY)
  // /api/v1/oscar/appointments/{id}                      (DELETE)
  // /api/v1/oscar/appointments/{id}                      (PUT)
  // /api/v1/oscar/appointments/reasons                   (GET)
  // /api/v1/oscar/appointments/types                     (GET)
  // /api/v1/oscar/appointments/statuses                  (GET)

  {
    method: "post",
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
      this.body.providerNo = userInfo.provNo;
      return server.endpointURL + this.api + server.suffix;
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/appointments",
    getURL: function (server) {
      return (
        server.endpointURL +
        this.api +
        server.suffix +
        "&demographicNo=121&appointmentDate=2021-07-26"
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/appointments/121/history",
    getURL: formulateURL,
  },
  {
    method: "delete",
    api: "/api/v1/oscar/appointments/1234",
    getURL: formulateURL,
  },
  {
    method: "put",
    api: "/api/v1/oscar/appointments/202",
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
    getURL: function (server, userInfo) {
      this.body.providerNo = userInfo.provNo;
      return server.endpointURL + this.api + server.suffix;
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
          "&demographicNo=121&providerNo=" +
          providerNo
        );
      },
    },
  ],
};
