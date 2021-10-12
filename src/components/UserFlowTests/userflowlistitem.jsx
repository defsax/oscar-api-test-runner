export default function UserFlowListItem(props) {
  const { api } = props;
  return (
    <div className={"flow-item"}>
      <button className={"button-menu"}>
        <div className={"button-contents"}>
          <div className={"flex-left"}>
            <h2>
              {api.url} {api.suffix}
            </h2>
          </div>
        </div>
      </button>
    </div>
  );
}
