import React from 'react';
import PropTypes from 'prop-types';

const InputForm = ({
    name,
    value,
    error,
    onChange,
    label
}) => {
    return (
        <div className="cp-field">
            <div className="cp-field">
                <h5>{label}</h5>
                <textarea
                    name={name}
                    onChange={onChange}
                    value={value}
                />
            </div>
            <div className="cpp-fiel">
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>

    )
};

InputForm.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}
export default InputForm;