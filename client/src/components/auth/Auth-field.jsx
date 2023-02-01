import React from 'react';

const AuthField = ({name, label, type, onChange, isRequired}) => {
    return (
        <div className="auth__field">
            <label className="auth__label">{label}</label>
            <input
                name={name}
                onChange={onChange}
                type={type}
                className="auth__input"
                required={isRequired}
            />
        </div>
    )
}

export default AuthField