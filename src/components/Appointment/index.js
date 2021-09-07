import React from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "../Appointment/Status";
import Confirm from "../Appointment/Confirm";

export default function Index(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(transition(SHOW));
  }

  function deleteAppointment() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        console.log(err);
      });
  }

  function onDelete() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this appointment"
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
    </article>
  );
}
