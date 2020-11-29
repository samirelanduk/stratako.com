import React from "react";
import { useQuery } from "@apollo/client";
import Base from "./Base";
import SlotColumns from "../components/SlotColumns";
import { FUTURE_OPERATIONS, PAST_OPERATIONS } from "../queries";

const OperationsPage = () => {
  
  const {data: futureData, loading: futureLoading} = useQuery(FUTURE_OPERATIONS);

  const slots = futureData ? futureData.slots : null;

  const { loading, data } = useQuery(PAST_OPERATIONS, {
    skip: futureLoading
  });

  if (futureLoading) return <Base className="operations-page" loading={true} />

  return (
    <Base className="operations-page">
      <div className="column">
        <h2>Future Operations</h2>
        <SlotColumns slots={slots} />
      </div>
      {loading ? <div>Loading</div> : (
        <div className="column">
          <h2>Completed Operations</h2>
          <SlotColumns slots={data.slots} />
        </div>
      )}
    </Base>
  );
};

OperationsPage.propTypes = {
  
};

export default OperationsPage;