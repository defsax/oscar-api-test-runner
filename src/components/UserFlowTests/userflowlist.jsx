export default function UserFlowList(props) {
  const { apis } = props;
  console.log(apis);
  return (
    <div>
      {/* <p>hi</p> */}
      {apis.map((api, i) => {
        // return <MenuItem key={test.id} test={test} server={"(dev) "} />;
        console.log(api, i);
        return (
          <p id={i}>
            {api.url} {api.suffix}
          </p>
        );
      })}
    </div>
  );
}
