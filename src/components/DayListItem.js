import React from "react";
import "components/DayListItem.scss";
import { formatSpots } from "helpers/format";
const classnames = require("classnames");

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <li onClick={() => setDay(name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
