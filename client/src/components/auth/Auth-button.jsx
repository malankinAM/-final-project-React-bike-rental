const AuthButton = ({onClick,type,text}) => {
    return (
        <button
            type={type}
            className="auth__submit"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default AuthButton;