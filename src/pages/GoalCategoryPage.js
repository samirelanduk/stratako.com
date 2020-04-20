import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GOAL_CATEGORY, ALL_GOALS_BY_CATEGORY } from "../queries";
import { DELETE_GOAL_CATEGORY } from "../mutations";
import Base from "../components/Base";
import ModelDropdown from "../components/ModelDropdown";
import GoalsList from "../components/GoalsList";
import "../style/GoalCategoryPage.scss";

const GoalCategoryPage = (props) => {
  

  const categoryId = useRouteMatch("/goals/categories/:id").params.id;

  const history = useHistory();
  const [deleteGoalCategory] = useMutation(DELETE_GOAL_CATEGORY, {
    onCompleted: () => history.push("/goals/"),
    variables: {id: categoryId},
    refetchQueries: () => [{query: ALL_GOALS_BY_CATEGORY}]
  });

  const {data, loading, error} = useQuery(GOAL_CATEGORY, {variables: {id: categoryId}});
  const [showDropdown, setShowDropdown] = useState(false);
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
      <ModelDropdown
        showDropdown={showDropdown} setShowDropdown={setShowDropdown}
        delete={deleteGoalCategory}
      />
    </Base>
  )
}

GoalCategoryPage.propTypes = {

}

export default GoalCategoryPage;