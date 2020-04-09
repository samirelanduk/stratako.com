import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GOAL } from "../queries";
import Base from "../components/Base";
import "../style/GoalPage.scss";

const GoalPage = (props) => {

  const goalId = useRouteMatch("/goals/:id").params.id;
  const {data, loading} = useQuery(GOAL, {variables: {id: goalId}});
  const goal = loading ? null : data.user.goal;

  

  return (
    <Base className="goal-page" logout={props.logout} >
      <h1>{goal && goal.name}</h1>
    </Base>
  )
}

GoalPage.propTypes = {

}

export default GoalPage;