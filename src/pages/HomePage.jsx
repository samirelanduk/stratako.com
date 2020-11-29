import React from "react";
import { useQuery } from "@apollo/client";
import { CURRENT_OPERATIONS } from "../queries";
import Base from "./Base";
import SlotColumns from "../components/SlotColumns";

const HomePage = () => {

  const { loading, data } = useQuery(CURRENT_OPERATIONS);

  if (loading) return <Base className="home-page" loading={true} />

  return (
    <Base className="home-page">
      <SlotColumns slots={data.slots} />
    </Base>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;