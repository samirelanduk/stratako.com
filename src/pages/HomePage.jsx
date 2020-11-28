import React from "react";
import { useQuery } from "@apollo/client";
import Base from "./Base";
import { CURRENT_OPERATIONS } from "../queries";

const HomePage = () => {

  const { loading, data } = useQuery(CURRENT_OPERATIONS);

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