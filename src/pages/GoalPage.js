import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GOAL } from "../queries";
import Base from "../components/Base";
import "../style/GoalPage.scss";

const GoalPage = (props) => {

  const goalId = useRouteMatch("/goals/:id").params.id;
  const {data, loading, error} = useQuery(GOAL, {variables: {id: goalId}});
  if (error && error.message.includes("does not exist")) {
    return (
      <Base className="goal-page" logout={props.logout} >
        <h1>Goal Does Not Exist</h1>
      </Base>
    )
  }
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