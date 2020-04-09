import React from "react";
import { Link } from "react-router-dom";
import "../style/Goal.scss";

const Goal = (props) => {

  return (
    <Link className="goal" to={`/goals/${props.goal.id}/`} >
      <div className="goal-name">{props.goal.name}</div>
      <div className="goal-description">{props.goal.description}</div>
    </Link>
  )
}

Goal.propTypes = {

}

export default Goal;