import React from 'react'
import "components/InterviewerList.scss"
import InterviewerListItem from 'components/InterviewerListItem'

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;
  const parsedInterviewers = interviewers.map((i) => {
    const {id, ...rest} = i;
    return <InterviewerListItem key={id} {...rest} selected={id === value} setInterviewer={() => onChange(i.id)}/>
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
