import React, { useEffect, useState } from "react";
import AuthSettingsForm from "../components/AuthSettingsForm";
import SlotsForm from "../components/SlotsForm";
import ProjectsSettingsForm from "../components/ProjectsSettingsForm";
import Base from "./Base";

const SettingsPage = () => {

  useEffect(() => {
    document.title = "stratako - Settings";
  });

  const [settings, setSettings] = useState("account");

  return (
    <Base className="settings-page">
      <div className="settings-container">
        <div className="options">
          <div
            className={settings === "account" ? "selected option" : "option"}
            onClick={() => setSettings("account")}
          >Account</div>
          <div
            className={settings === "slots" ? "selected option" : "option"}
            onClick={() => setSettings("slots")}
          >Slots</div>
          <div
            className={settings === "projects" ? "selected option" : "option"}
            onClick={() => setSettings("projects")}
          >Projects</div>
        </div>
        <div className="content">
          {settings === "account" && <AuthSettingsForm />}
          {settings === "slots" && <SlotsForm />}
          {settings === "projects" && <ProjectsSettingsForm />}
        </div>
      </div>
    </Base>
  );
};

SettingsPage.propTypes = {
  
};

export default SettingsPage;