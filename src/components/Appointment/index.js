import React from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";

export default function index(props) {
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
    </article>
  );
}
