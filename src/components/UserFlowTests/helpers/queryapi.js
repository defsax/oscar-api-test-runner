import axiosQueue from "../../../helpers/axios";

export default async function queryAPI(
  api,
  url,
  displayURL,
  token,
  setResults
) {
  console.log(api);
  axiosQueue({
    method: api.method,
    url: url,
    data: api.body,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      console.log(`Success calling ${url}`);
      // console.log(res.data);

      return res;
    })
    .catch((err) => {
      console.log(`Failed calling ${url}`);
      // if (err.response) {
      //   console.log(err.response);
      // } else if (err.request) {
      //   console.log(err.request);
      // } else {
      //   console.log("Error", err.message);
      // }
      // console.log(err.config);

      return err.response;
    })
    .then((res) => {
      // console.log(res);

      setResults((oldResults) => [
        ...oldResults,
        { result: res, url: displayURL },
      ]);
      // setShowMenu(true);
      // setShowData(true);
      // setLoading(false);
      // return new Promise((resolve) => {
      //   resolve();
      // });
    });
}
