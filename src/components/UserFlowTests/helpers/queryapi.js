import axiosQueue from "../../../helpers/axios";

export default async function queryAPI(api, server, userInfo, setResults) {
  console.log(server, userInfo);
  await axiosQueue({
    method: api.method,
    url: api.getURL(server, userInfo.provNo),
    data: api.body,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      console.log(`Success calling ${api.api}`);
      return res;
    })
    .catch((err) => {
      console.log(`Failed calling ${api.api}`);
      return err.response;
    })
    .then((res) => {
      setResults((oldResults) => [
        ...oldResults,
        {
          result: res,
          api: api.api,
          method: api.method,
          server: server.apitype,
          body: api.body,
        },
      ]);
    });
}
