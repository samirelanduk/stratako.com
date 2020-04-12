import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GOAL_CATEGORY } from "../queries";
import Base from "../components/Base";
import GoalsList from "../components/GoalsList";
import "../style/GoalCategoryPage.scss";

const GoalCategoryPage = (props) => {
  

  const categoryId = useRouteMatch("/goals/categories/:id").params.id;
  const {data, loading, error} = useQuery(GOAL_CATEGORY, {variables: {id: categoryId}});
  if (error && error.message.includes("does not exist")) {
    return (
      <Base className="goal-category-page" logout={props.logout} >
        <h1>Category Does Not Exist</h1>
      </Base>
    )
  }
  const category = loading ? null : data.user.goalCategory;
  const goals = category ? category.goals.edges.map(edge => edge.node) : [];
  if (category) document.title = "stratako - " + category.name;
  

  return (
    <Base className="goal-category-page" logout={props.logout} >
      <h1>{category && category.name}</h1>
      <p className="description">{category && category.description}</p>
      <GoalsList goals={goals} />
    </Base>
  )
}

GoalCategoryPage.propTypes = {

}

export default GoalCategoryPage;