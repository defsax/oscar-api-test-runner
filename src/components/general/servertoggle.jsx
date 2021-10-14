import { apiVersion } from "../../static/serverlist";

export default function ServerToggle({ setServer = () => {}, ...props }) {
  const { setToggle, toggle } = props;
  return (
    <div className={"flex-left"}>
      <button
        className={"button server-button dev-button"}
        onClick={() => {
          setServer(apiVersion[0]);
          setToggle(!toggle);
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
        }}
        disabled={!toggle}
      >
        staging
      </button>
    </div>
  );
}
