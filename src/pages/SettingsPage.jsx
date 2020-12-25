import React from "react";
import AuthSettingsForm from "../components/AuthSettingsForm";
import Base from "./Base";

const SettingsPage = () => {
  return (
    <Base className="settings-page">
      <AuthSettingsForm />
    </Base>
  );
};

SettingsPage.propTypes = {
  
};

export default SettingsPage;