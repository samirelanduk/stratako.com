import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DragDropContext } from "react-beautiful-dnd";
import { GOAL_CATEGORY } from "../queries";
import { MOVE_GOAL, DELETE_GOAL_CATEGORY } from "../mutations";
import { resultWorthActingOn } from "../reordering";
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
    refetchQueries: () => [{query: GOAL_CATEGORY}]
  });

  const [moveGoal, moveResult] = useMutation(MOVE_GOAL);
  
  const { loading, error, data } = useQuery(GOAL_CATEGORY, {variables: {id: categoryId}});
  
  const [showDropdown, setShowDropdown] = useState(false);

  if (error && error.message.includes("does not exist")) {
    return (
      <Base className="goal-category-page" logout={props.logout} >
        <h1>Category Does Not Exist</h1>
      </Base>
    )
  }
  const category = loading ? null : data.user.goalCategory;
  let goals = [];
  if (moveResult.data) {
    goals = moveResult.data.moveGoal.goals.edges;
  } else if (category) {
    goals = category.goals.edges;
  }
  goals = goals.map(edge => edge.node);

  if (category) document.title = "stratako - " + category.name;

  const onDragEnd = result => {
    if (!resultWorthActingOn(result)) return;
    const { destination, draggableId } = result;
    let reorderedGoals = goals.filter(goal => goal.id !== draggableId);
    reorderedGoals.splice(destination.index, 0, goals.filter(goal => goal.id === draggableId)[0]);
    reorderedGoals = reorderedGoals.map(goal => {
      return {__typename: "GoalEdge", node: goal}
    });

    moveGoal({
      variables: {goal: draggableId, index: destination.index},
      optimisticResponse: {moveGoal: {
        __typename: "MoveGoal", goals: {
          __typename: "GoalConnection", edges: reorderedGoals
        }
      }},
      update: (proxy) => {
        const newData = proxy.readQuery({ query: GOAL_CATEGORY, variables: {id: categoryId} });;
        newData.user.goalCategory.goals.edges = reorderedGoals;
        proxy.writeQuery({ query: GOAL_CATEGORY, data: newData});
      }
    })
  }
  
  return (
    <Base className="goal-category-page" logout={props.logout} >
      <DragDropContext onDragEnd={onDragEnd}>
        <h1>{category && category.name}</h1>
        <p className="description">{category && category.description}</p>
        <GoalsList goals={goals} listId={category ? category.id : "1"} />
        <ModelDropdown
          showDropdown={showDropdown} setShowDropdown={setShowDropdown}
          delete={deleteGoalCategory}
        />
      </DragDropContext>
    </Base>
  )
}

GoalCategoryPage.propTypes = {

}

export default GoalCategoryPage;