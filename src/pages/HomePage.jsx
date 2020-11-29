import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Base from "./Base";
import { CURRENT_OPERATIONS } from "../queries";
import { COMPLETE_OPERATION } from "../mutations";

const HomePage = () => {

  const { loading, data, refetch } = useQuery(CURRENT_OPERATIONS);

  const [completeOperation, completeOperationMutation] = useMutation(COMPLETE_OPERATION, {
    refetchQueries: [{query: CURRENT_OPERATIONS}]
  });

  const complete = id => {
    completeOperation({
      variables: {id}
    })
  }

  if (loading) {
    return (
      <Base className="home-page">
        Loading
      </Base>
    );
  }

  return (
    <Base className="home-page">
      <div className="slots">
        {data.slots.map(slot => (
          <div className="slot">
            <h2 className="slot-title">{slot.name}</h2>
            {slot.operation && <div className="operation">
              <h3>{slot.operation.name}</h3>
              <div className="started">{slot.operation.started}</div>
              <button onClick={() => complete(slot.operation.id)}>Complete</button>
            </div>}
          </div>
        ))}
      </div>
    </Base>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;