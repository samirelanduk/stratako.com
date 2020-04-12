import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_GOALS_BY_CATEGORY } from "../queries";
import Base from "../components/Base";
import GoalCategoriesList from "../components/GoalCategoriesList";
import "../style/GoalsPage.scss";

const GoalsPage = (props) => {

  const {data, loading} = useQuery(ALL_GOALS_BY_CATEGORY);
  const categories = loading ? [] : data.user.goalCategories.edges.map(edge => edge.node);

  

  return (
    <Base className="goals-page" logout={props.logout} >
      <GoalCategoriesList categories={categories} />
    </Base>
  )
}

GoalsPage.propTypes = {

}

export default GoalsPage;