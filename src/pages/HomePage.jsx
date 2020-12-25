import React, { useEffect } from "react";
import Base from "./Base";

const HomePage = () => {

  useEffect(() => {
    document.title = "stratako";
  });

  return (
    <Base>
      
    </Base>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;