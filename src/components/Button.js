import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   let buttonClass = classNames("button", {
      "button--confirm" : props.confirm,
      "button--danger" : props.danger,
      "button--disabled" : props.disabled,
      "button--clickable" : props.clickable
   });

    if (props.disabled) {
      buttonClass += " button--disabled";
    }
 
   return (
      <button 
         className={buttonClass}
         onClick={props.onClick}
         disabled={props.disabled}
      >
         {props.children}
      </button>
      );
 }
