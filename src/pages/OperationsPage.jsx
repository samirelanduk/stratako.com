import React, { useEffect } from "react";
import Base from "./Base";

const OperationsPage = () => {
  useEffect(() => {
    document.title = "stratako - Operations";
  });

  return (
    <Base className="operations-page">

    </Base>
  )
};

OperationsPage.propTypes = {
  
};

export default OperationsPage;