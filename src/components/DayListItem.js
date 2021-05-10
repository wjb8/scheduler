import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : !props.spots,
 });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2> 
      <h3 className={dayClass}>{props.spots} spots remaining</h3>
    </li>
  );
}