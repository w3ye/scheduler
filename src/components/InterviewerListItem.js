import React from "react";
import "components/InterviewerListItem.scss";
import PropTypes from "prop-types";
import classnames from "classnames";

InterviewerListItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  setInterviewer: PropTypes.func,
};

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
