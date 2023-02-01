const FormField = ({name, onChange, inputType, label, isRequired}) => {
    return (
        <div className="contact-input-container">
            <label className="contact-label">{label}</label>
            <input className="contact-input"
                   name={name}
                   onChange={onChange}
                   type={inputType}
                   placeholder={label}
                   required={isRequired}
            />
        </div>
    )
}

export default FormField