import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;
  const parsedDays = days.map((i) => {
    return (
      <DayListItem
        {...i}
        key={i.id}
        setDay={setDay}
        selected={i.name === day}
        data-testid="day"
      />
    );
  });

  return <ul>{parsedDays}</ul>;
}
