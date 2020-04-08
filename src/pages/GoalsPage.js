import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ALL_GOALS } from "../queries";
import Base from "../components/Base";
import GoalsList from "../components/GoalsList";
import "../style/GoalsPage.scss";

const GoalsPage = (props) => {

  const {data, loading} = useQuery(ALL_GOALS);
  const goals = loading ? [] : data.user.goals.edges.map(edge => edge.node);

  

  return (
    <Base className="goals-page" logout={props.logout} >
      <h1>Goals</h1>
      <GoalsList goals={goals} />
    </Base>
  )
}

GoalsPage.propTypes = {

}

export default GoalsPage;