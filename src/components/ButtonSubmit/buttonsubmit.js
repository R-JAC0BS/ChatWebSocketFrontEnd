
export const ButtonSubmit =({type,className,action,icon, text}) => {
    return (
        <button
        type={type}
        className={className}
        onClick={action}
        >
            {icon ? icon : text}
            
        </button>
    )
}
