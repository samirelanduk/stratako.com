import React, {useEffect } from "react";
import Div100vh from "react-div-100vh";

const PageNotFound = () => {

  useEffect(() => {
    document.title = "stratako - Page Not Found";
  });

  return (
    <Div100vh className="page-not-found">
      <h1>Page Not Found</h1>
    </Div100vh>
  );
};

PageNotFound.propTypes = {
  
};

export default PageNotFound;