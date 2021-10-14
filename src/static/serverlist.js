export const apiVersion = [
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
