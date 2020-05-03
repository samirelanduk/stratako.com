import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { DragDropContext } from "react-beautiful-dnd";
import { ALL_GOALS_BY_CATEGORY } from "../queries";
import { MOVE_GOAL_BETWEEN_CATEGORIES } from "../mutations";
import { resultWorthActingOn } from "../reordering";
import Base from "../components/Base";
import GoalCategoriesList from "../components/GoalCategoriesList";
import "../style/GoalsPage.scss";

const GoalsPage = (props) => {

  const {data} = useQuery(ALL_GOALS_BY_CATEGORY);
  const [moveGoal, moveResult] = useMutation(MOVE_GOAL_BETWEEN_CATEGORIES);

  let categories = [];
  if (moveResult.data) {
    categories = moveResult.data.moveGoal.goalCategories.edges;
  } else if (data) {
    categories = data.user.goalCategories.edges;
  }
  categories = categories.map(edge => edge.node);

  const onDragEnd = result => {
    if (!resultWorthActingOn(result)) return;
    const { destination, source, draggableId } = result;

    // Make new response
    let newGoalCategories = JSON.parse(JSON.stringify(categories));

    for (let sourceCategory of newGoalCategories) {
      if (sourceCategory.id === source.droppableId) {
        
        for (let destinationCategory of newGoalCategories) {
          if (destinationCategory.id === destination.droppableId) {
            const goal = sourceCategory.goals.edges.filter(edge => edge.node.id === draggableId)[0];
            sourceCategory.goals.edges = sourceCategory.goals.edges.filter(edge => edge.node.id !== draggableId);
            destinationCategory.goals.edges.splice(destination.index, 0, goal);
            break;
          }
        }
        break;
      }
    }
    newGoalCategories = newGoalCategories.map(category => {
      return {__typename: "GoalCategoryEdge", node: category}
    });

    moveGoal({
      variables: {goal: draggableId, index: destination.index, category: destination.droppableId},
      optimisticResponse: {moveGoal: {
        __typename: "MoveGoal", goalCategories: {
          __typename: "GoalcategoryConnection", edges: newGoalCategories
        }
      }},
      update: (proxy) => {
        const newData = proxy.readQuery({ query: ALL_GOALS_BY_CATEGORY});
        newData.user.goalCategories.edges = newGoalCategories;
        proxy.writeQuery({ query: ALL_GOALS_BY_CATEGORY, data: newData});
      }
    });
  }

  return (
    <Base className="goals-page" logout={props.logout} >
      <DragDropContext onDragEnd={onDragEnd}>
        <GoalCategoriesList categories={categories} />
      </DragDropContext>
    </Base>
  )
}

GoalsPage.propTypes = {

}

export default GoalsPage;