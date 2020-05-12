import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { USER } from "../queries";
import Base from "../components/Base";

const HomePage = () => {
  /**
   * The starting page.
   */
  
  useEffect(() => {
    document.title = "stratako";
  });

  const { data } = useQuery(USER);

  return (
    <Base className="home-page">
      {data ? (
        <p>{data.user.firstName} {data.user.lastName} ({data.user.email})</p>
      ): <p>Loading</p>}
    </Base>
  )
}

export default HomePage;