import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = () => {
    return props.spots > 1
      ? `${props.spots} spots remaining`
      : props.spots > 0
      ? `${props.spots} spot remaining`
      : "no spots remaining";
  };

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2>{props.name}</h2>
      <h4>{formatSpots()}</h4>
    </li>
  );
}
