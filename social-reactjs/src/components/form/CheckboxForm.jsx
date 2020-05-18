import React from 'react';
import PropTypes from 'prop-types';

const CheckboxForm = ({
    name,
    value,
    onChange,
    label
}) => {
    return (
        <div className="cp-field">
            <h5>{label}</h5>
            <div className="cpp-fiel">
                <input type="checkbox" name={name} value={value} onChange={onChange}/>
            </div>
        </div>

    )
};

CheckboxForm.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}
export default CheckboxForm;