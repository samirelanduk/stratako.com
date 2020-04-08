import React from "react";
import Goal from "./Goal";
import "../style/GoalsList.scss";

const GoalsList = (props) => {

  return (
    <div className="goals-list" >
      {props.goals.map(goal => <Goal key={goal.id} goal={goal} />)}
    </div>
  )
}

GoalsList.propTypes = {

}

export default GoalsList;