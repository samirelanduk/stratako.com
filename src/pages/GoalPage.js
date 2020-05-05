import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GOAL, ALL_GOALS_BY_CATEGORY } from "../queries";
import { UPDATE_GOAL, DELETE_GOAL } from "../mutations";
import Base from "../components/Base";
import ModelDropdown from "../components/ModelDropdown";
import "../style/GoalPage.scss";

const GoalPage = (props) => {
  

  const goalId = useRouteMatch("/goals/:id").params.id;
  const [showDropdown, setShowDropdown] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changedName, setChangedName] = useState(null);
  const [changedDescription, setChangedDescription] = useState(null);

  const [updateGoal, updateGoalMutation] = useMutation(UPDATE_GOAL, {
    onCompleted: () => setEditing(false)
  });

  const history = useHistory();
  const [deleteGoal] = useMutation(DELETE_GOAL, {
    onCompleted: () => history.push("/goals/"),
    variables: {id: goalId},
    refetchQueries: () => [{query: ALL_GOALS_BY_CATEGORY}]
  });

  const {data, loading, error} = useQuery(GOAL, {variables: {id: goalId}});
  if (error && error.message.includes("does not exist")) {
    return (
      <Base className="goal-page" logout={props.logout} >
        <h1>Goal Does Not Exist</h1>
      </Base>
    )
  }
  const goal = loading ? null : data.user.goal;

  const startEditing = () => {
    setEditing(true);
    setShowDropdown(false);
  }

  const formSubmit = e => {
    e.preventDefault();
    updateGoal({
      variables: {id: goalId, name: changedName, description: changedDescription},
      refetchQueries: () => [{query: GOAL, variables: {id: goalId}}],
      onCompleted: () => setEditing(false)
    })
  }



  if (goal) document.title = "stratako - " + goal.name;

  if (editing) {
    return (
      <Base className="goal-page" logout={props.logout} >
        <form onSubmit={formSubmit} className={updateGoalMutation.loading && "loading"}>
          <input
            className="name"
            value={changedName !== null ? changedName : (goal && goal.name)}
            onChange={e => setChangedName(e.target.value)}
            disabled={updateGoalMutation.loading}
          />
          <input
            className="description"
            value={changedDescription !== null ? changedDescription : (goal && goal.description)}
            onChange={e => setChangedDescription(e.target.value)}
            disabled={updateGoalMutation.loading}
          />
          <input type="submit" />
        </form>
      </Base>
    )
  }
  
  return (
    <Base className="goal-page" logout={props.logout} >
      <h1 className="name">{goal && goal.name}</h1>
      <p className="description">{goal && goal.description}</p>

      <ModelDropdown
        showDropdown={showDropdown} setShowDropdown={setShowDropdown}
        delete={deleteGoal} edit={startEditing}
      />
    </Base>
  )
}

GoalPage.propTypes = {

}

export default GoalPage;