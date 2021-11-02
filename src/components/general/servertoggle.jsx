import { apiVersion } from "../../static/serverlist";

export default function ServerToggle({
  setServer = () => {},
  customFunc = () => {},
  ...props
}) {
  const { setToggle, toggle } = props;
  return (
    <div className={"flex-left"}>
      <button
        className={"button server-button dev-button"}
        onClick={() => {
          setServer(apiVersion[0]);
          setToggle(!toggle);
          customFunc();
        }}
        disabled={toggle}
      >
        dev
      </button>

      <button
        className={"button server-button staging-button"}
        onClick={() => {
          setServer(apiVersion[1]);
          setToggle(!toggle);
          customFunc();
        }}
        disabled={!toggle}
      >
        staging
      </button>
    </div>
  );
}
