import React, { useEffect } from "react";
import { FUTURE_OPERATIONS } from "../queries";
import { useQuery } from "@apollo/client";
import Base from "./Base";
import Slots from "../components/Slots";

const OperationsPage = () => {
  useEffect(() => {
    document.title = "stratako - Operations";
  });

  const { loading, data } = useQuery(FUTURE_OPERATIONS);

  if (loading) return <Base loading={true} />

  const slots = data.user.slots;

  return (
    <Base className="operations-page">
      <Slots slots={slots} />
    </Base>
  )
};

OperationsPage.propTypes = {
  
};

export default OperationsPage;