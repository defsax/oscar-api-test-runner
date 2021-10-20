import axiosQueue from "../../../helpers/axios";

export default async function queryAPI(api, server, token, provNo, setResults) {
  axiosQueue({
    method: "GET",
    url: api.getURL(server, provNo),
    data: api.body,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      console.log(`Success calling ${api.api}`);
      // console.log(res.data);

      return res;
    })
    .catch((err) => {
      console.log(`Failed calling ${api.api}`);
      // if (err.response) {
      //   console.log(err.response);
      // } else if (err.request) {
      //   console.log(err.request);
      // } else {
      //   console.log("Error", err.message);
      // }
      // console.log(err.config);

      // throw new Error("Error");

      return err.response;
    })
    .then((res) => {
      setResults((oldResults) => [
        ...oldResults,
        { result: res, api: api.api },
      ]);
    });
}
