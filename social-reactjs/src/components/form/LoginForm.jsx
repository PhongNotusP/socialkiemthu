import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  disabled,
  label,
  icon,
}) => {
  return (
    <div className="sn-field">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <i className={icon}></i>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};
LoginForm.defaultProps = {
  type: "text",
};
export default LoginForm;
