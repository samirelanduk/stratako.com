import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GOAL } from "../queries";
import Base from "../components/Base";
import ModelDropdown from "../components/ModelDropdown";
import "../style/GoalPage.scss";

const GoalPage = (props) => {
  

  const goalId = useRouteMatch("/goals/:id").params.id;
  const [showDropdown, setShowDropdown] = useState(false);

  const {data, loading, error} = useQuery(GOAL, {variables: {id: goalId}});
  if (error && error.message.includes("does not exist")) {
    return (
      <Base className="goal-page" logout={props.logout} >
        <h1>Goal Does Not Exist</h1>
      </Base>
    )
  }
  const goal = loading ? null : data.user.goal;
  if (goal) document.title = "stratako - " + goal.name;
  
  return (
    <Base className="goal-page" logout={props.logout} >
      <h1>{goal && goal.name}</h1>
      <p className="description">{goal && goal.description}</p>


      <ModelDropdown
        showDropdown={showDropdown} setShowDropdown={setShowDropdown}
      />
    </Base>
  )
}

GoalPage.propTypes = {

}

export default GoalPage;