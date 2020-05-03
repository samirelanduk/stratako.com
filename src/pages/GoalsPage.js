import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { DragDropContext } from "react-beautiful-dnd";
import { ALL_GOALS_BY_CATEGORY } from "../queries";
import Base from "../components/Base";
import GoalCategoriesList from "../components/GoalCategoriesList";
import "../style/GoalsPage.scss";

const GoalsPage = (props) => {

  const {data, loading} = useQuery(ALL_GOALS_BY_CATEGORY);
  const categories = loading ? [] : data.user.goalCategories.edges.map(edge => edge.node);

  const onDragEnd = () => {
    return;
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