import './style.css'



export const InputName = ({setTexto = "",className,placeholder,onKeydown}) => {
    return (
        <input required type="text"
        id="name"
        name="name" 
        placeholder={placeholder ? placeholder :"Digite seu nome" }
        className={className ? className :"inputName"} 
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={onKeydown}
        />
        
    )

}