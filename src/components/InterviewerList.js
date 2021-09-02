import React from 'react'
import "components/InterviewerList.scss"
import InterviewerListItem from 'components/InterviewerListItem'

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const parsedInterviewers = interviewers.map((i) => {
    return <InterviewerListItem key={i.id} {...i} selected={i.id === value} setInterviewer={() => onChange(i.id)}/>
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
  )
}
