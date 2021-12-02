export const apiVersion = [
  {
    apitype: "dev",
    endpointURL: "https://kennedy-dev1.gojitech.systems",
    siteURL:"https://goji-oscar1.gojitech.systems",
    testDemoNo: 121,
  },
  {
    apitype: "staging",
    endpointURL: "https://kennedy-staging1.gojitech.systems",
    suffix:
      "?siteURL=" +
      encodeURIComponent("https://goji-oscar2.gojitech.systems") +
      "&appVersion=staging",
    testDemoNo: 76,
  },
];