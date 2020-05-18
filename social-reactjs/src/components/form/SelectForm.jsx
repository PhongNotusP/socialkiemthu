import React from 'react';
import PropTypes from 'prop-types';

const InputForm = ({
    name,
    value,
    error,
    onChange,
    label,
    options,
    icon
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))
    return (
        <div className="cp-field">
            <h5>{label}</h5>
            <div className="cpp-fiel">
                <select name={name} onChange={onChange} value={value}>
                    {selectOptions}
                </select>
                <i className={icon}></i>
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    )
};

InputForm.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}
export default InputForm;