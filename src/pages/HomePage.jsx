import React, { useEffect } from "react";
import { SLOTS } from "../queries";
import Base from "./Base";
import { useQuery } from "@apollo/client";
import Slots from "../components/Slots";

const HomePage = () => {

  useEffect(() => {
    document.title = "stratako";
  });

  const { loading, data } = useQuery(SLOTS);

  if (loading) return <Base loading={true} />

  const slots = data.user.slots;

  return (
    <Base className="home-page">
      <Slots slots={slots} />
    </Base>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;