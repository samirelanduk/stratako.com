import React from "react";
import GoalsList from "./GoalsList";
import "../style/GoalCategory.scss";

const GoalCategory = (props) => {

  const goals = props.category.goals.edges.map(edge => edge.node);

  return (
    <div className="goal-category">
      <div className="category-name">{props.category.name.toUpperCase()}</div>
      <GoalsList goals={goals} />
    </div>
  )
}

GoalCategory.propTypes = {

}

export default GoalCategory;