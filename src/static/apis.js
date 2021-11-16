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
*  /api/v1/oscar/patients/{demographicNo}/forms/completedEncounterForms
*  /api/v1/oscar/patients/{demographicNo}/formOptions
*  /api/v1/oscar/patients/{demographicNo}/labResults
*  /api/v1/transcriptions       (GET ALL)
*  /api/v1/transcriptions/{id}  (GET ONE)
   /api/v1/transcriptions/{id}  (DELETE ONE)
*  /api/v1/record
*  /api/v1/test/inputtext
*  /api/v1/oscar/notes                                  (POST)
*  /api/v1/oscar/notes                                  (GET BY PATIENT OR KEYWORD)
*  /api/v1/oscar/notest/noteId                          (GET ONE)
*  /api/v1/oscar/appointments                           (POST)
*  /api/v1/oscar/appointments                           (GET ALL)
*  /api/v1/oscar/appointments/{demographicNo}/history   (GET PATIENT APPOINTMENT HISTORY)
*  /api/v1/oscar/appointments/{id}                      (DELETE)
   /api/v1/oscar/appointments/{id}                      (PUT)
*  /api/v1/oscar/appointments/reasons                   (GET)
*  /api/v1/oscar/appointments/types                     (GET)
*  /api/v1/oscar/appointments/statuses                  (GET)
*  /api/v1/templates                                    (POST)
*  /api/v1/templates                                    (GET)
*  /api/v1/template/id/{id}                             (GET)
*  /api/v1/template/id/{id}                             (DELETE)
*  /api/v1/template/name/{templatename }                (GET)
*  /api/v1/template/name/{templatename }                (DELETE)
*  /api/v1/template/{id}                                (PUT)
   /api/v1/oscar/forms/allEncounterForms                (GET)
   /api/v1/oscar/forms/selectedEncounterForms           (GET)
   /api/v1/oscar/forms/formGroups                       (GET)
   /api/v1/oscar/forms/favouriteFormGroup               (GET)
   /api/v1/oscar/forms/groupNames                       (GET)
*  /api/v1/oscar/consults/requests                      (POST)
   /api/v1/oscar/consults/requests                      (GET)
*  /api/v1/oscar/consults/requests/{id}                 (GET)
*  /api/v1/oscar/consults/requests/{id}                 (PUT)
*  /api/v1/oscar/consults/professionalSpecialist/{id}   (GET)
*  /api/v1/oscar/consults/referAttachments              (GET)
*  /api/v1/oscar/consults/requestAttachments            (GET)
*  /api/v1/oscar/consults/getReferralPathwaysByService  (GET)
*  /api/v1/oscar/consults/eSendRequest                  (GET)
*  /api/v1/oscar/ticklers                               (GET)
*  /api/v1/oscar/ticklers                               (POST)
*  /api/v1/oscar/ticklers/mine                          (GET)
*  /api/v1/oscar/ticklers/{id}/complete                 (PATCH)
*  /api/v1/oscar/ticklers/{id}/update                   (PUT)
*  /api/v1/oscar/ticklers/{id}/update                   (DELETE)

*/

// import axios from "axios";
import axiosQueue from "../helpers/axios";
import { v4 as uuidv4 } from "uuid";
import { base64Content } from "./base64content";
import { uniqueNamesGenerator, names, animals } from "unique-names-generator";

const formulateURL = function (server) {
  return server.endpointURL + this.api + server.suffix;
};
const formulatePatientURL = function (server) {
  return (
    server.endpointURL +
    "/api/v1/oscar/patients/" +
    server.testDemoNo +
    this.suffix +
    server.suffix
  );
};

const generateFirstName = () => {
  const configName = {
    dictionaries: [names],
  };
  return uniqueNamesGenerator(configName);
};
const generateLastName = () => {
  const configAnimal = {
    dictionaries: [animals],
  };
  const characterLastName = uniqueNamesGenerator(configAnimal);
  return characterLastName.charAt(0).toUpperCase() + characterLastName.slice(1);
};

export const apis = [
  // OTHER
  { method: "get", api: "/api/v1/status", result: {}, getURL: formulateURL },
  { method: "get", api: "/api/v1/sites", result: {}, getURL: formulateURL },

  // PROVIDERS
  {
    method: "get",
    api: "/api/v1/oscar/providers/timeslots",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/providers/me",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/getSpeechkey",
    result: {},
    getURL: formulateURL,
  },
  // DRUGS
  {
    method: "get",
    api: "/api/v1/oscar/drugs/search",
    result: {},
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
    setup: function (server, userInfo) {
      this.body[0].demographicNo = server.testDemoNo;
    },
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/prescriptions",
    result: {},
    getURL: function (server, userInfo) {
      return (
        server.endpointURL +
        this.api +
        server.suffix +
        "&demographicNo=121&providerNo=" +
        userInfo.provNo
      );
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
      dateJoined: new Date().toISOString(),
      patientStatusDate: new Date().toISOString(),
      address: {
        province: "ON",
        postal: "M6H 2L9",
        city: "Toronto",
        address: "92 Auburn Ave",
      },
    },
    setup: function () {
      this.body.email = "test.patient." + uuidv4() + "@gmail.com";
      this.body.firstName = generateFirstName();
      this.body.lastName = generateLastName();
    },
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients",
    result: {},
    getURL: function (server) {
      return (
        server.endpointURL + this.api + server.suffix + "&keyword=STARDUST"
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/all",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}",
    suffix: "",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/fullSummary/ALLERGIES",
    suffix: "/fullSummary/ALLERGIES",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/fullSummary/FAMILYHISTORY",
    suffix: "/fullSummary/FAMILYHISTORY",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/fullSummary/RISK_FACTORS",
    suffix: "/fullSummary/RISK_FACTORS",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/measurements",
    suffix: "/measurements",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/documents",
    suffix: "/documents",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/forms",
    suffix: "/forms",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/forms/completedEncounterForms",
    suffix: "/forms/completedEncounterForms",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/formOptions",
    suffix: "/formOptions",
    result: {},
    getURL: formulatePatientURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/patients/{id}/labResults",
    suffix: "/labResults",
    result: {},
    getURL: formulatePatientURL,
  },
  // TRANSCRIPTIONS
  {
    method: "get",
    api: "/api/v1/transcriptions",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/transcriptions/{id}",

    result: {},
    getURL: function (server, userInfo) {
      let id = "dab882aa-352c-42a3-93e3-b6736fb5629a";
      if (server.apitype === "dev") id = "b89f3610-d992-4930-9b32-55df242a33d7";
      return (
        server.endpointURL + "/api/v1/transcriptions/" + id + server.suffix
      );
    },
  },
  {
    method: "delete",
    api: "/api/v1/transcriptions/{id}",
    id: "{id}",
    setup: async function (server, userInfo) {
      // Create a dummy transcription to delete...

      // First create transcription
      try {
        await axiosQueue({
          method: "post",
          url: server.endpointURL + "/api/v1/record" + server.suffix,
          data: {
            base64Content: base64Content,
            userID: userInfo.id,
          },
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
          },
        });

        console.log("Success creating dummy record for deletion");
      } catch (error) {
        console.log("Error creating dummy record for deletion:", error);
      }

      // Then fetch all transcriptions
      try {
        const transcriptions = await axiosQueue({
          method: "get",
          url: server.endpointURL + "/api/v1/transcriptions" + server.suffix,
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
          },
        });

        console.log("Fetched all transcriptions to get latest one to delete");

        // *** NOTE: this doesn't work on staging, since staging doesn't return reverse chronological
        // Get latest transcription and get/set id
        if (
          transcriptions.data.result.data[0].original ===
          "Create a prescription for Tamiflu 100 milligrams."
        ) {
          this.id = transcriptions.data.result.data[0].id;
        }
      } catch (error) {
        console.log("Error fetching all transcriptions:", error);
      }
    },
    result: {},
    getURL: function (server) {
      return (
        server.endpointURL + "/api/v1/transcriptions/" + this.id + server.suffix
      );
    },
  },
  {
    method: "post",
    api: "/api/v1/record",
    body: {
      base64Content: base64Content,
      userID: "d523c4b5-3568-4ac5-88e6-6aa254e91371",
    },
    setup: function (server, userInfo) {
      this.body.userID = userInfo.id;
    },
    result: {},
    getURL: function (server) {
      return server.endpointURL + this.api + server.suffix;
    },
  },
  {
    method: "post",
    api: "/api/v1/test/inputtext",
    body: {
      phrase: "Create a prescription for claritin 100mg capsules.",
    },
    result: {},
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
    setup: function (server, userInfo) {
      this.body.demographicNo = server.testDemoNo;
    },
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/notes",
    result: {},
    getURL: function (server) {
      return (
        server.endpointURL +
        this.api +
        server.suffix +
        "&demographicNo=" +
        server.testDemoNo
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/notest/{id}",
    id: "{id}",
    setup: async function (server, userInfo) {
      // Get all notes for demographic, then get id from first note in result
      try {
        const result = await axiosQueue({
          method: "get",
          url:
            server.endpointURL +
            "/api/v1/oscar/notes" +
            server.suffix +
            "&demographicNo=" +
            server.testDemoNo,
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
          },
        });

        console.log("Successfully fetched notes");
        this.id = result.data.result[0].noteId;
      } catch (error) {
        console.log("Error fetching notes:", error);
      }
    },
    result: {},
    getURL: function (server) {
      return (
        server.endpointURL + "/api/v1/oscar/notest/" + this.id + server.suffix
      );
    },
  },
  // APPOINTMENTS
  {
    method: "post",
    api: "/api/v1/oscar/appointments",
    body: {
      providerNo: 0,
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
    setup: function (server, userInfo) {
      this.body.providerNo = parseInt(userInfo.provNo);
      this.body.demographicNo = server.testDemoNo;
    },
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/appointments",
    result: {},
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
    result: {},
    getURL: formulateURL,
  },
  {
    method: "delete",
    api: "/api/v1/oscar/appointments/1234",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "put",
    api: "/api/v1/oscar/appointments/202",
    body: {
      providerNo: 0,
      appointmentDate: "2021-07-26 10:50",
      startTime: "2021-07-26 10:50",
      demographicNo: 121,
      notes: "Patient is not sick",
      reason: "Counselling",
      location: "Cardiology",
      resources: "string",
      type: "string",
      status: "string",
      duration: 0,
      urgency: "Non-Urgent",

      id: 130,
      // providerNo: "11",
      // appointmentDate: "2021-10-15",
      // startTime: "15:00",
      endTime: "15:30",
      name: "USER, TEST",
      // demographicNo: 30,
      programId: 0,
      // notes: "xcv",
      // reason: "Counselling",
      // location: "Cardiology",
      // resources: "string",
      // type: "string",
      style: null,
      billing: null,
      // status: "string",
      importedStatus: null,
      creator: "11",
      lastUpdateUser: "11",
      remarks: "",
      // urgency: "Non-Urgent",
      creatorSecurityId: null,
      bookingSource: null,
      reasonCode: 14,
      demographic: null,
      provider: null,
    },
    setup: function (server, userInfo) {
      this.body.providerNo = parseInt(userInfo.provNo);
      this.body.demographicNo = server.testDemoNo;
    },
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/appointments/reasons",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/appointments/types",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/appointments/statuses",
    result: {},
    getURL: formulateURL,
  },
  // TEMPLATES
  {
    method: "post",
    api: "/api/v1/templates",
    body: {
      templateName: "test string: " + uuidv4(),
      templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
    },
    setup: function () {
      this.body.templateName = "test string: " + uuidv4();
    },
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/templates",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/template/id/{id}",
    id: "{id}",
    result: {},
    setup: async function (server, userInfo) {
      // Fetch all templates then grab first id...
      try {
        const result = await axiosQueue({
          method: "get",
          url: server.endpointURL + "/api/v1/templates" + server.suffix,
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
          },
        });
        console.log("Success fetching templates to get one by id");
        this.id = result.data.result.data[0].id;
      } catch (error) {
        console.log("Error fetching templates to get one by id:", error);
        this.id = uuidv4();
      }
    },
    getURL: function (server) {
      return (
        server.endpointURL + "/api/v1/template/id/" + this.id + server.suffix
      );
    },
  },
  {
    method: "delete",
    api: "/api/v1/template/id/{id}",
    id: "{id}",
    setup: async function (server, userInfo) {
      // Create a dummy template to delete...
      try {
        const result = await axiosQueue({
          method: "post",
          url: server.endpointURL + "/api/v1/templates" + server.suffix,
          data: {
            templateName: "test string: " + uuidv4(),
            templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
          },
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
          },
        });

        console.log("Success creating dummy template to delete one by id");
        this.id = result.data.result.id;
      } catch (error) {
        console.log(
          "Error creating dummy template to delete one by id:",
          error
        );
        this.id = uuidv4();
      }
    },
    result: {},
    getURL: function (server) {
      return (
        server.endpointURL + "/api/v1/template/id/" + this.id + server.suffix
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/template/name/{templatename}",
    templateName: "{templatename}",
    result: {},
    setup: async function (server, userInfo) {
      // Get a an already created template to update by name...
      try {
        const result = await axiosQueue({
          method: "get",
          url: server.endpointURL + "/api/v1/templates" + server.suffix,
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
          },
        });
        console.log("Success fetching templates to get one by templatename");
        this.templateName = result.data.result.data[2].templateName;
      } catch (error) {
        console.log(
          "Error fetching templates to get one by templatename:",
          error
        );
      }
    },
    getURL: function (server) {
      return (
        server.endpointURL +
        "/api/v1/template/name/" +
        this.templateName +
        server.suffix
      );
    },
  },
  {
    method: "delete",
    api: "/api/v1/template/name/{templatename}",
    result: {},
    templateName: "{templatename}",
    setup: async function (server, userInfo) {
      // Create a dummy template to delete by name...
      try {
        const result = await axiosQueue({
          method: "post",
          url: server.endpointURL + "/api/v1/templates" + server.suffix,
          data: {
            templateName: "test string: " + uuidv4(),
            templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
          },
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
          },
        });

        console.log(
          "Success creating dummy template to delete by templatename"
        );
        this.templateName = result.data.result.templateName;
      } catch (error) {
        console.log(
          "Error creating dummy template to delete by templatename:",
          error
        );
        this.templateName = uuidv4();
      }
    },
    getURL: function (server) {
      return (
        server.endpointURL +
        "/api/v1/template/name/" +
        this.templateName +
        server.suffix
      );
    },
  },
  {
    method: "put",
    api: "/api/v1/template/{id}",
    id: "{id}",
    body: {
      templateName: "test string: " + uuidv4(),
      templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
    },
    setup: async function (server, userInfo) {
      this.body.templateName = "test string: " + uuidv4();
      // Get a an already created template to update by id...
      try {
        const result = await axiosQueue({
          method: "get",
          url: server.endpointURL + "/api/v1/templates" + server.suffix,
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
          },
        });
        console.log("Success fetching templates to update one by id");
        this.id = result.data.result.data[4].id;
      } catch (error) {
        console.log("Error fetching templates to update one by id:", error);
        this.id = uuidv4();
      }
    },
    result: {},
    getURL: function (server) {
      return server.endpointURL + "/api/v1/template/" + this.id + server.suffix;
    },
  },
  // FORMS
  {
    method: "get",
    api: "/api/v1/oscar/forms/allEncounterForms",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/forms/selectedEncounterForms",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/forms/formGroups",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/forms/favouriteFormGroup",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/forms/groupNames",
    result: {},
    getURL: formulateURL,
  },
  // CONSULTS
  {
    method: "post",
    api: "/api/v1/oscar/consults/requests",
    body: {
      referralDate: "2021-10-08T17:06:45.778Z",
      serviceId: 57,
      demographicId: 0,
      urgency: "2",
      status: "Pending_Specialist_Callback",
      providerNo: 0,
    },
    setup: function (server, userInfo) {
      this.body.providerNo = parseInt(userInfo.provNo);
      this.body.demographicId = server.testDemoNo;
    },
    result: {},
    getURL: function (server) {
      return server.endpointURL + this.api + server.suffix;
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/requests",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/requests/3",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "put",
    api: "/api/v1/oscar/consults/requests/3",
    body: {
      referralDate: "2021-10-08T17:06:45.778Z",
      serviceId: 57,
      demographicId: 0,
      urgency: "2",
      status: "Completed",
      providerNo: 0,
    },
    setup: function (server, userInfo) {
      this.body.providerNo = userInfo.provNo;
      this.body.demographicId = server.testDemoNo;
    },
    result: {},
    getURL: function (server) {
      return server.endpointURL + this.api + server.suffix;
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/professionalSpecialist/3",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/referAttachments",
    result: {},
    getURL: function (server) {
      return (
        server.endpointURL + this.api + server.suffix + "&demographicNo=121"
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/requestAttachments",
    result: {},
    getURL: function (server) {
      return (
        server.endpointURL + this.api + server.suffix + "&demographicNo=121"
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/getReferralPathwaysByService",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/eSendRequest",
    result: {},
    getURL: formulateURL,
  },

  // TICKLERS
  {
    method: "get",
    api: "/api/v1/oscar/ticklers/textSuggestions",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/ticklers",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "post",
    api: "/api/v1/oscar/ticklers",
    body: {
      demographicNo: 121,
      taskAssignedTo: "11",
      status: "A",
      priority: "Normal",
      message: "Test to add new Tickler",
    },
    setup: function (server, userInfo) {
      this.body.demographicNo = server.testDemoNo;
    },
    result: {},
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/ticklers/mine",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "patch",
    api: "/api/v1/oscar/ticklers/2/complete",
    result: {},
    getURL: formulateURL,
  },
  {
    method: "put",
    api: "/api/v1/oscar/ticklers/2/update",
    body: {
      id: 3,
      taskAssignedTo: "12",
      status: "A",
      priority: "Normal",
      message: "Test to update tickler",
      serviceDate: "2021-10-12",
    },
    result: {},
    getURL: formulateURL,
  },
  {
    method: "delete",
    api: "/api/v1/oscar/ticklers/1234",
    result: {},
    getURL: formulateURL,
  },
];
