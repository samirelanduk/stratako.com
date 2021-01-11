import React from "react";
import Div100vh from "react-div-100vh";
import Nav from "../components/Nav";
import { MoonLoader } from "react-spinners";
import Sidebar from "../components/Sidebar";

const Base = props => {
  /**
   * Provides the basic logged in layout.
   */

  const { className, blank, loading } = props;

  let fullClassName = className;
  if (blank) fullClassName += " blank";
  if (loading) fullClassName += " loading";

  return (
    <Div100vh className="base">
      <Sidebar />
      <Nav />
      <main className={fullClassName}>
        {loading ? <MoonLoader size="70px" color="#40739e" /> : props.children}
      </main>
    </Div100vh>
  )
};

Base.propTypes = {
  
};

export default Base;