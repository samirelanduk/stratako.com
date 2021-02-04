import React from "react";
import PropTypes from "prop-types";

const AuthForm = props => {

  const { className, onSubmit } = props;

  return (
    <form className={`auth-form ${className}`} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
};

AuthForm.propTypes = {
  className: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AuthForm;