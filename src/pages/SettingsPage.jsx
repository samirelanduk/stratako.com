import React from "react";
import AuthSettingsForm from "../components/AuthSettingsForm";
import Base from "./Base";

const SettingsPage = () => {
  return (
    <Base>
      <AuthSettingsForm />
    </Base>
  );
};

SettingsPage.propTypes = {
  
};

export default SettingsPage;