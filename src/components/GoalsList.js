import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Goal from "./Goal";
import "../style/GoalsList.scss";

const GoalsList = (props) => {

  return (
    <Droppable droppableId={props.listId}>
      {(provided) => (
          <div
            className="goals-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.goals.map((goal, index) => {
              return (
                <Goal key={goal.id} goal={goal} index={index} />
              )
            })}
            {provided.placeholder}
          </div>
        
        )}
      
    </Droppable>
    
  )
}

GoalsList.propTypes = {

}

export default GoalsList;