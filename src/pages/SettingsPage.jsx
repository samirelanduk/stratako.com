import React, { useEffect, useState } from "react";
import AuthSettingsForm from "../components/AuthSettingsForm";
import SlotsForm from "../components/SlotsForm";
import ProjectsSettingsForm from "../components/ProjectsSettingsForm";
import Base from "./Base";
import { Link } from "react-router-dom";

const SettingsPage = props => {

  useEffect(() => {
    document.title = "stratako - Settings";
  });

  const { view } = props;
  const [settings, setSettings] = useState("account");

  return (
    <Base className="settings-page">
      <div className="settings-container">
        <div className="options">
          <Link
            className={!view ? "selected option" : "option"}
            to="/settings/"
          >Account</Link>
          <Link
            className={view === "slots" ? "selected option" : "option"}
            to="/settings/slots/"
          >Slots</Link>
          <Link
            className={view === "projects" ? "selected option" : "option"}
            to="/settings/projects/"
          >Projects</Link>
        </div>
        <div className="content">
          {!view && <AuthSettingsForm />}
          {view === "slots" && <SlotsForm />}
          {view === "projects" && <ProjectsSettingsForm />}
        </div>
      </div>
    </Base>
  );
};

SettingsPage.propTypes = {
  
};

export default SettingsPage;