import { useState } from "react";
import { ButtonSubmit } from "../ButtonSubmit/buttonsubmit"
import { IoIosSend } from "react-icons/io";
import { sendMessage } from "../ConnectStomp/stompjs";



const icon = <IoIosSend size={40}/>

export const Genericinput = ({className}) => {
    const [texto,setTexto] = useState('')
    const username = localStorage.getItem('username')
    const handleSendMessage = () => {
      if (texto.trim()!= ""){
        sendMessage(texto,username)
        setTexto("")
      }
    }



    return (
       <>
       
        <input required type="text"
         id="name" 
         name="name" 
         value={texto}
         placeholder="Envie uma mensagem"
         onChange={(e) => setTexto(e.target.value)}
          className={className}
          onKeyDown={(e) => {if (e.key === "Enter" ){handleSendMessage()}}}
          autoComplete="off"

          />
          
        <ButtonSubmit className="bg-transparent  w-16 rounded-xl mr-2 flex 1 justify-center items-center mt-1 mb-1 " type = "submit" icon = {icon} action={handleSendMessage}></ButtonSubmit>
    
       </>
    )

}