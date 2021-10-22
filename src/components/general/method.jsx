export default function Method(props) {
  const { method } = props;
  let style = { color: "black" };
  switch (method) {
    case "get":
      style.color = "rgba(57, 108, 255, 1)";
      break;
    case "post":
      style.color = "green";
      break;
    case "put":
      style.color = "rgba(232, 119, 0, 1)";
      break;
    case "delete":
      style.color = "red";
      break;
    case "patch":
      style.color = "purple";
      break;
    default:
      style.color = "black";
      break;
  }
  return (
    <b>
      <span style={style}>{method}</span>
    </b>
  );
}
