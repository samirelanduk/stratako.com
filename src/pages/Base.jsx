import React from "react";
import Div100vh from "react-div-100vh";
import Nav from "../components/Nav";
import { MoonLoader } from "react-spinners";
import { useContext } from "react";
import { UserContext } from "../contexts";

const Base = props => {
  /**
   * Provides the basic logged in layout.
   */

  const { className, blank, loading } = props;

  const [user,] = useContext(UserContext);

  let fullClassName = className;
  if (blank) fullClassName += " blank";
  if (loading) fullClassName += " loading";

  return (
    <Div100vh className="base">
      <Nav />
      <main className={fullClassName}>
        {loading ? <MoonLoader size="70px" color="#6353C6" /> : props.children}
      </main>
    </Div100vh>
  )
};

Base.propTypes = {
  
};

export default Base;