import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
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
      <DragDropContext onDragEnd={() => null}>
        <Slots slots={slots} />
      </DragDropContext>
    </Base>
  );
};

HomePage.propTypes = {
  
};

export default HomePage;