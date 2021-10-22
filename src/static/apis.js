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
   /api/v1/oscar/notest/noteId                          (GET ONE)

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
   /api/v1/template/id/{id}                             (DELETE)
*  /api/v1/template/name/{templatename }                (GET)
   /api/v1/template/name/{templatename }                (DELETE)
   /api/v1/template/{id}                                (PUT)

*  /api/v1/oscar/forms/allEncounterForms                (GET)
*  /api/v1/oscar/forms/selectedEncounterForms           (GET)
*  /api/v1/oscar/forms/formGroups                       (GET)
*  /api/v1/oscar/forms/favouriteFormGroup               (GET)
*  /api/v1/oscar/forms/groupNames                       (GET)

   /api/v1/oscar/consults/requests                      (POST)
   /api/v1/oscar/consults/requests                      (GET)
*  /api/v1/oscar/consults/requests/{id}                 (GET)
   /api/v1/oscar/consults/requests/{id}                 (PUT)
*  /api/v1/oscar/consults/professionalSpecialist/{id}   (GET)
*  /api/v1/oscar/consults/referAttachments              (GET)
*  /api/v1/oscar/consults/requestAttachments            (GET)
*  /api/v1/oscar/consults/getReferralPathwaysByService  (GET)
*  /api/v1/oscar/consults/eSendRequest                  (GET)

*  /api/v1/oscar/ticklers                               (GET)
   /api/v1/oscar/ticklers                               (POST)
*  /api/v1/oscar/ticklers/mine                          (GET)
*  /api/v1/oscar/ticklers/{id}/complete                 (PATCH)
   /api/v1/oscar/ticklers/{id}/update                   (PUT)
*  /api/v1/oscar/ticklers/{id}/update                   (DELETE)

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
  // {
  //   method: "delete",
  //   api: "/api/v1/transcriptions/" + uuidv4(),
  //   getURL: formulateURL,
  // },
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
    api: "/api/v1/oscar/notest/190",
    getURL: formulateURL,
  },
  // APPOINTMENTS
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
  {
    method: "get",
    api: "/api/v1/oscar/appointments/statuses",
    getURL: formulateURL,
  },
  // TEMPLATES
  {
    method: "post",
    api: "/api/v1/templates",
    body: {
      templateName: "test string" + uuidv4(),
      templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
    },
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/templates",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/template/id/2686ccb5-c8e8-4626-9bb1-7c458a232dbf",
    getURL: formulateURL,
  },
  {
    method: "delete",
    api: "/api/v1/template/id/1234",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/template/name/string",
    getURL: formulateURL,
  },
  {
    method: "delete",
    api: "/api/v1/template/name/test",
    getURL: formulateURL,
  },
  {
    method: "put",
    api: "/api/v1/template/id/2686ccb5-c8e8-4626-9bb1-7c458a232dbf",
    body: {
      templateName: "string",
      templateURL: "https://api.jsonbin.io/b/60d5f2fe8ea8ec25bd157bae/1",
    },
    getURL: formulateURL,
  },
  // FORMS
  {
    method: "get",
    api: "/api/v1/oscar/forms/allEncounterForms",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/forms/selectedEncounterForms",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/forms/formGroups",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/forms/favouriteFormGroup",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/forms/groupNames",
    getURL: formulateURL,
  },
  // CONSULTS
  {
    method: "post",
    api: "/api/v1/oscar/consults/requests",
    body: {
      id: 0,
      referralDate: "2021-10-22T17:07:09.225Z",
      serviceId: 0,
      professionalSpecialist: {},
      appointmentDate: "2021-10-22T17:07:09.225Z",
      appointmentTime: "2021-10-22T17:07:09.225Z",
      reasonForReferral: "string",
      clinicalInfo: "string",
      currentMeds: "string",
      allergies: "string",
      providerNo: 0,
      demographicId: 121,
      status: "1",
      statusText: "string",
      sendTo: "string",
      concurrentProblems: "string",
      urgency: "2",
      patientWillBook: true,
      siteName: "string",
      followUpDate: "2021-10-22T17:07:09.225Z",
      signatureImg: "string",
      letterheadName: "string",
      letterheadAddress: "string",
      letterheadPhone: "string",
      letterheadFax: "string",
      attachments: [{}],
      letterheadList: [
        {
          id: "string",
          name: "string",
          address: "string",
          phone: "string",
        },
      ],
      faxList: [
        {
          faxUser: "string",
          faxNumber: "string",
        },
      ],
      serviceList: [
        {
          serviceId: 0,
          serviceDesc: "string",
          active: "string",
          specialists: [
            {
              id: 0,
              firstName: "string",
              lastName: "string",
              name: "string",
              professionalLetters: "string",
              streetAddress: "string",
              phoneNumber: "string",
              faxNumber: "string",
              webSite: "string",
              emailAddress: "string",
              specialtyType: "string",
              geteDataUrl: "string",
              geteDataOscarKey: "string",
              geteDataServiceKey: "string",
              geteDataServiceName: "string",
              annotation: "string",
              referralNo: "string",
              institutionId: 0,
              departmentId: 0,
              eformId: 0,
            },
          ],
        },
      ],
      sendToList: ["string"],
    },
    getURL: function (server, userInfo) {
      this.body.providerNo = userInfo.provNo;
      return server.endpointURL + this.api + server.suffix;
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/requests",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/requests/3",
    getURL: formulateURL,
  },
  {
    method: "put",
    api: "/api/v1/oscar/consults/requests/3",
    body: {
      id: 0,
      referralDate: "2021-10-22T17:22:49.447Z",
      serviceId: 0,
      professionalSpecialist: {},
      appointmentDate: "2021-10-22T17:22:49.447Z",
      appointmentTime: "2021-10-22T17:22:49.447Z",
      reasonForReferral: "string",
      clinicalInfo: "string",
      currentMeds: "string",
      allergies: "string",
      providerNo: 0,
      demographicId: 121,
      status: "1",
      statusText: "string",
      sendTo: "string",
      concurrentProblems: "string",
      urgency: "2",
      patientWillBook: true,
      siteName: "string",
      followUpDate: "2021-10-22T17:22:49.447Z",
      signatureImg: "string",
      letterheadName: "string",
      letterheadAddress: "string",
      letterheadPhone: "string",
      letterheadFax: "string",
      attachments: [{}],
      letterheadList: [
        {
          id: "string",
          name: "string",
          address: "string",
          phone: "string",
        },
      ],
      faxList: [
        {
          faxUser: "string",
          faxNumber: "string",
        },
      ],
      serviceList: [
        {
          serviceId: 0,
          serviceDesc: "string",
          active: "string",
          specialists: [
            {
              id: 0,
              firstName: "string",
              lastName: "string",
              name: "string",
              professionalLetters: "string",
              streetAddress: "string",
              phoneNumber: "string",
              faxNumber: "string",
              webSite: "string",
              emailAddress: "string",
              specialtyType: "string",
              geteDataUrl: "string",
              geteDataOscarKey: "string",
              geteDataServiceKey: "string",
              geteDataServiceName: "string",
              annotation: "string",
              referralNo: "string",
              institutionId: 0,
              departmentId: 0,
              eformId: 0,
            },
          ],
        },
      ],
      sendToList: ["string"],
    },
    getURL: function (server, userInfo) {
      this.body.providerNo = userInfo.provNo;
      return server.endpointURL + this.api + server.suffix;
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/professionalSpecialist/3",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/referAttachments",
    getURL: function (server) {
      return (
        server.endpointURL + this.api + server.suffix + "&demographicNo=121"
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/requestAttachments",
    getURL: function (server) {
      return (
        server.endpointURL + this.api + server.suffix + "&demographicNo=121"
      );
    },
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/getReferralPathwaysByService",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/consults/eSendRequest",
    getURL: formulateURL,
  },

  // TICKLERS
  {
    method: "get",
    api: "/api/v1/oscar/ticklers/textSuggestions",
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/ticklers",
    getURL: formulateURL,
  },
  {
    method: "post",
    api: "/api/v1/oscar/ticklers",
    body: {
      id: 0,
      demographicNo: 0,
      programId: 0,
      message: "string",
      status: "A",
      createDate: "2021-10-22T17:41:03.791Z",
      updateDate: "2021-10-22T17:41:03.791Z",
      serviceDate: "2021-10-22T17:41:03.791Z",
      creator: "string",
      priority: "High",
      taskAssignedTo: "string",
      categoryId: 0,
      ticklerCategory: {
        id: 0,
        category: "string",
        description: "string",
        active: true,
        persistent: true,
      },
      comments: [
        {
          id: 0,
          ticklerNo: 0,
          message: "string",
          providerNo: "string",
          updateDate: "2021-10-22T17:41:03.792Z",
          provider: {},
          updateDateToday: true,
          persistent: true,
        },
      ],
      updates: [
        {
          id: 0,
          ticklerNo: 0,
          status: "string",
          assignedTo: "string",
          serviceDate: "2021-10-22T17:41:03.792Z",
          priority: "string",
          providerNo: "string",
          updateDate: "2021-10-22T17:41:03.792Z",
          provider: {},
          statusAsChar: "string",
          persistent: true,
        },
      ],
      demographic: {
        id: "string",
        name: "string",
        chartNumber: "string",
        gender: "Male",
        dob: "2021-10-22T17:41:03.792Z",
        docter: "string",
        rosterStatus: "string",
        phone: "string",
        status: "string",
      },
      provider: {},
      assignee: {},
      program: {
        hashCode: 0,
        id: 0,
        userDefined: true,
        numOfMembers: 0,
        numOfIntakes: 0,
        queueSize: 0,
        maxAllowed: 0,
        type: "string",
        description: "string",
        functionalCentreId: "string",
        address: "string",
        phone: "string",
        fax: "string",
        url: "string",
        email: "string",
        emergencyNumber: "string",
        location: "string",
        name: "string",
        holdingTank: true,
        allowBatchAdmission: true,
        allowBatchDischarge: true,
        hic: true,
        programStatus: "string",
        intakeProgram: 0,
        bedProgramLinkId: 0,
        manOrWoman: "string",
        genderDesc: "string",
        transgender: true,
        firstNation: true,
        bedProgramAffiliated: true,
        alcohol: true,
        abstinenceSupport: "string",
        physicalHealth: true,
        mentalHealth: true,
        housing: true,
        exclusiveView: "string",
        ageMin: 0,
        ageMax: 0,
        maximumServiceRestrictionDays: 0,
        defaultServiceRestrictionDays: 0,
        shelterId: 0,
        facilityId: 0,
        facilityDesc: "string",
        orgCd: "string",
        capacity_funding: 0,
        capacity_space: 0,
        capacity_actual: 0,
        totalUsedRoom: 0,
        lastUpdateUser: "string",
        lastUpdateDate: "2021-10-22T17:41:03.792Z",
        shelter: {
          prefix: "string",
          code: "string",
          description: "string",
          shortDesc: "string",
          note: "string",
          active: true,
          selectable: true,
          parentCode: "string",
          codeTree: "string",
          codecsv: "string",
          lastUpdateUser: "string",
          lastUpdateDate: "2021-10-22T17:41:03.792Z",
          buf1: "string",
          buf2: "string",
          buf3: "string",
          buf4: "string",
          buf5: "string",
          buf6: "string",
          buf7: "string",
          buf8: "string",
          buf9: "string",
          orderByIndex: 0,
          associates: [null],
          descriptionJs: "string",
          codeId: "string",
        },
        siteSpecificField: "string",
        enableEncounterTime: true,
        enableEncounterTransportationTime: true,
        emailNotificationAddressesCsv: "string",
        lastReferralNotification: "2021-10-22T17:41:03.792Z",
        enableOCAN: true,
        noOfVacancy: 0,
        vacancyName: "string",
        dateCreated: "string",
        matches: 0,
        vacancyId: 0,
        vacancyTemplateName: "string",
        active: true,
        external: true,
        full: true,
        service: true,
        bed: true,
        community: true,
        nameJs: "string",
      },
      demographic_webName: "string",
      taskAssignedToName: "string",
      commentsSortedByDate: [
        {
          id: 0,
          ticklerNo: 0,
          message: "string",
          providerNo: "string",
          updateDate: "2021-10-22T17:41:03.792Z",
          provider: {},
          updateDateToday: true,
          persistent: true,
        },
      ],
      serviceDateWeb: "string",
      serviceTime: "string",
      statusWeb: "string",
      priorityWeb: "string",
      priorityAsString: "string",
      statusAsChar: "string",
      persistent: true,
    },
    getURL: formulateURL,
  },
  {
    method: "get",
    api: "/api/v1/oscar/ticklers/mine",
    getURL: formulateURL,
  },
  {
    method: "patch",
    api: "/api/v1/oscar/ticklers/2/complete",
    getURL: formulateURL,
  },
  {
    method: "put",
    api: "/api/v1/oscar/ticklers/2/update",
    body: {
      id: 0,
      demographicNo: 0,
      programId: 0,
      message: "string",
      status: "A",
      createDate: "2021-10-22T17:59:21.368Z",
      updateDate: "2021-10-22T17:59:21.368Z",
      serviceDate: "2021-10-22T17:59:21.368Z",
      creator: "string",
      priority: "High",
      taskAssignedTo: "string",
      categoryId: 0,
      ticklerCategory: {
        id: 0,
        category: "string",
        description: "string",
        active: true,
        persistent: true,
      },
      comments: [
        {
          id: 0,
          ticklerNo: 0,
          message: "string",
          providerNo: "string",
          updateDate: "2021-10-22T17:59:21.368Z",
          provider: {},
          updateDateToday: true,
          persistent: true,
        },
      ],
      updates: [
        {
          id: 0,
          ticklerNo: 0,
          status: "string",
          assignedTo: "string",
          serviceDate: "2021-10-22T17:59:21.368Z",
          priority: "string",
          providerNo: "string",
          updateDate: "2021-10-22T17:59:21.368Z",
          provider: {},
          statusAsChar: "string",
          persistent: true,
        },
      ],
      demographic: {
        id: "string",
        name: "string",
        chartNumber: "string",
        gender: "Male",
        dob: "2021-10-22T17:59:21.368Z",
        docter: "string",
        rosterStatus: "string",
        phone: "string",
        status: "string",
      },
      provider: {},
      assignee: {},
      program: {
        hashCode: 0,
        id: 0,
        userDefined: true,
        numOfMembers: 0,
        numOfIntakes: 0,
        queueSize: 0,
        maxAllowed: 0,
        type: "string",
        description: "string",
        functionalCentreId: "string",
        address: "string",
        phone: "string",
        fax: "string",
        url: "string",
        email: "string",
        emergencyNumber: "string",
        location: "string",
        name: "string",
        holdingTank: true,
        allowBatchAdmission: true,
        allowBatchDischarge: true,
        hic: true,
        programStatus: "string",
        intakeProgram: 0,
        bedProgramLinkId: 0,
        manOrWoman: "string",
        genderDesc: "string",
        transgender: true,
        firstNation: true,
        bedProgramAffiliated: true,
        alcohol: true,
        abstinenceSupport: "string",
        physicalHealth: true,
        mentalHealth: true,
        housing: true,
        exclusiveView: "string",
        ageMin: 0,
        ageMax: 0,
        maximumServiceRestrictionDays: 0,
        defaultServiceRestrictionDays: 0,
        shelterId: 0,
        facilityId: 0,
        facilityDesc: "string",
        orgCd: "string",
        capacity_funding: 0,
        capacity_space: 0,
        capacity_actual: 0,
        totalUsedRoom: 0,
        lastUpdateUser: "string",
        lastUpdateDate: "2021-10-22T17:59:21.368Z",
        shelter: {
          prefix: "string",
          code: "string",
          description: "string",
          shortDesc: "string",
          note: "string",
          active: true,
          selectable: true,
          parentCode: "string",
          codeTree: "string",
          codecsv: "string",
          lastUpdateUser: "string",
          lastUpdateDate: "2021-10-22T17:59:21.368Z",
          buf1: "string",
          buf2: "string",
          buf3: "string",
          buf4: "string",
          buf5: "string",
          buf6: "string",
          buf7: "string",
          buf8: "string",
          buf9: "string",
          orderByIndex: 0,
          associates: [null],
          descriptionJs: "string",
          codeId: "string",
        },
        siteSpecificField: "string",
        enableEncounterTime: true,
        enableEncounterTransportationTime: true,
        emailNotificationAddressesCsv: "string",
        lastReferralNotification: "2021-10-22T17:59:21.368Z",
        enableOCAN: true,
        noOfVacancy: 0,
        vacancyName: "string",
        dateCreated: "string",
        matches: 0,
        vacancyId: 0,
        vacancyTemplateName: "string",
        active: true,
        external: true,
        full: true,
        service: true,
        bed: true,
        community: true,
        nameJs: "string",
      },
      demographic_webName: "string",
      taskAssignedToName: "string",
      commentsSortedByDate: [
        {
          id: 0,
          ticklerNo: 0,
          message: "string",
          providerNo: "string",
          updateDate: "2021-10-22T17:59:21.369Z",
          provider: {},
          updateDateToday: true,
          persistent: true,
        },
      ],
      serviceDateWeb: "string",
      serviceTime: "string",
      statusWeb: "string",
      priorityWeb: "string",
      priorityAsString: "string",
      statusAsChar: "string",
      persistent: true,
    },
    getURL: formulateURL,
  },
  {
    method: "delete",
    api: "/api/v1/oscar/ticklers/1234",
    getURL: formulateURL,
  },
];
