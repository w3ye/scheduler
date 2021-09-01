import React from "react";
import "components/Button.scss";
var classnames = require('classnames');


export default function Button(props) {
  const buttonClass = classnames('button', {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  })
  return (
    <button
      disabled={props.disabled}
      className={buttonClass}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
