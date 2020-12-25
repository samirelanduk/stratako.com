import React, { useEffect } from "react";
import AuthSettingsForm from "../components/AuthSettingsForm";
import Base from "./Base";

const SettingsPage = () => {

  useEffect(() => {
    document.title = "stratako - Settings";
  });

  return (
    <Base className="settings-page">
      <AuthSettingsForm />
    </Base>
  );
};

SettingsPage.propTypes = {
  
};

export default SettingsPage;