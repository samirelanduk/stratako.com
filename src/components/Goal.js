import React from "react";
import "../style/Goal.scss";

const Goal = (props) => {

  return (
    <div className="goal" >
      <div className="goal-name">{props.goal.name}</div>
      <div className="goal-description">{props.goal.description}</div>
    </div>
  )
}

Goal.propTypes = {

}

export default Goal;