import React from "react";

function ErrorPanel(props) {
  return (
    <div className="alert alert-danger" role="alert">
    {props.errMessage}
    </div>
  );
}

export default ErrorPanel;