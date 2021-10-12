import UserFlowListItem from "./userflowlistitem";

export default function UserFlowList(props) {
  const { apis } = props;
  console.log(apis);
  return (
    <div>
      {apis.map((api, i) => {
        // return <MenuItem key={test.id} test={test} server={"(dev) "} />;
        console.log(api, i);
        return <UserFlowListItem key={i} api={api} />;
      })}
    </div>
  );
}
