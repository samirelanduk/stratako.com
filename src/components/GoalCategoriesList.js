import React from "react";
import GoalCategory from "./GoalCategory";
import "../style/GoalCategoriesList.scss";

const GoalCategoriesList = (props) => {

  return (
    <div className="goal-categories-list" >
      {props.categories.map(category => {
        return (
          <GoalCategory key={category.id} category={category} />
        )
      })}
    </div>
  )
}

GoalCategoriesList.propTypes = {

}

export default GoalCategoriesList;