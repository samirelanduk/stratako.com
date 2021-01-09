import React, { useEffect } from "react";
import { SLOTS } from "../queries";
import Base from "./Base";
import { useQuery } from "@apollo/client";

const HomePage = () => {

  useEffect(() => {
    document.title = "stratako";
  });

  const { loading, data } = useQuery(SLOTS);

  if (loading) return <Base loading={true} />

  const slots = data.user.slots;

  return (
    <Base className="home-page">
      <div className="slots">
        {slots.map(slot => (
          <div className="slot" key={slot.id}>
            <h2>{slot.name}</h2>
            <div className="no-data">
              Currently no operations.
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;