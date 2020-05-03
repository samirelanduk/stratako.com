import React from "react";
import { Link } from "react-router-dom";
import GoalsList from "./GoalsList";
import "../style/GoalCategory.scss";

const GoalCategory = (props) => {

  const goals = props.category.goals.edges.map(edge => edge.node);

  return (
    <div className="goal-category">
      <Link to={`/goals/categories/${props.category.id}/`}className="category-name">
        {props.category.name.toUpperCase()}
      </Link>
      <GoalsList goals={goals} listId={props.category ? props.category.id : "1"} />
    </div>
  )
}

GoalCategory.propTypes = {

}

export default GoalCategory;