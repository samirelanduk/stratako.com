import React from "react";
import Goal from "./Goal";
import "../style/GoalCategory.scss";

const GoalCategory = (props) => {

  const goals = props.category.goals.edges.map(edge => edge.node);

  return (
    <div className="goal-category">
      <div className="category-name">{props.category.name}</div>
      {goals.map(goal => <Goal goal={goal} key={goal.id} />)}
    </div>
  )
}

GoalCategory.propTypes = {

}

export default GoalCategory;