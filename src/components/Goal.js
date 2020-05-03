import React from "react";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import "../style/Goal.scss";

const Goal = (props) => {

  return (
    <Draggable draggableId={props.goal.id} index={props.index}>
      {(provided) => (
        <div {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Link className="goal" to={`/goals/${props.goal.id}/`} >
            <div className="goal-name">{props.goal.name}</div>
            <div className="goal-description">{props.goal.description}</div>
          </Link>
        </div>
      )}
    </Draggable>
    
  )
}

Goal.propTypes = {

}

export default Goal;