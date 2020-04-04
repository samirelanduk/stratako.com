import React from "react";
import Nav from "./Nav";
import "../style/Base.scss";

export default function Base(props) {
  return (
    <div className="stratako-base">
      <Nav logout={props.logout} />
      <main className={props.className}>
        {props.children}
      </main>
    </div>
  )
}