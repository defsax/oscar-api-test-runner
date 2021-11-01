import { React } from "react";

export default function StatusBox(props) {
  const { status } = props;
  if (status) {
    return (
      <div>
        {status < 300 ? (
          <h2 className="passes info-box">{status} </h2>
        ) : (
          <h2 className="fails info-box">{status} </h2>
        )}
      </div>
    );
  } else {
    <div>
      <h2 className="fails info-box">N/A</h2>
    </div>;
  }
  return null;
}
