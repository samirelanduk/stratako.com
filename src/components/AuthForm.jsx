import React from 'react';
import PropTypes from 'prop-types';

const AuthForm = props => {

  const { className, onSubmit } = props;

  return (
    <form className={`auth-form ${className}`} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
};

AuthForm.propTypes = {
  
};

export default AuthForm;