import "./style.css";
import { Genericinput } from "../../components/sendMenssage/genericinput";
import { useEffect, useState, useRef } from "react";
import { connectStomp } from "../../components/ConnectStomp/stompjs.js";
import { Button } from "../../components/button/button.js";
import { useNavigate } from "react-router-dom";
import { LateralBar } from "../../components/lateralbar/lateral.js";
import { URL } from '../../assets/url';
import { FaBars } from "react-icons/fa";
import axios from 'axios';

export const MobileChat = () => {
    const [mensagem, setMensagem] = useState([]);
    const [listMensage, setListMensage] = useState([]);
    const [openTab,setOpenTab] = useState(false)
    const bottomRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        connectStomp((message) => {
            const parsed = JSON.parse(message);
            setMensagem((prev) => [...prev, parsed]);
        });
    }, []);

    useEffect(() => {
        axios.get(`${URL}/mg`)
            .then(response => {
                setListMensage(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar dados:", error);
            });
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensagem]);

   

    return (
        <div className="min-h-full w-full bg-zinc-800 text-white flex flex-col overflow-hidden">
            {/* Botão de Sair */}

            {openTab && (<LateralBar className= {'bg-zinc-700 place-items-end p-5 h-full w-52 flex-col-reverse justify-between  overflow-hidden w-8 fixed rounded-r-2xl shadow-xl  flex align-bottom justify-end  '}>
                  <button onClick={() => setOpenTab(!openTab)}>
                <FaBars size={24} />
                </button>
            </LateralBar>)}
            <div className="p-4 bg-zinc-700 shadow-md">
              <button onClick={() => setOpenTab(!openTab)}>
                <FaBars size={24} />
                </button>
                
            </div>

            {/* Corpo do chat */}
            <div className="flex-1 flex flex-col overflow-hidden px-4 py-2">
          
                <div className="flex-1 overflow-y-auto space-y-1">
                    {listMensage.map((mg, i) => {
                        const isUser = mg.sender === localStorage.getItem("username");
                        return (
                            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                                <div>
                                    {!isUser && <p className= {`ml-3 font-bold` }>{mg.sender}</p>}
                                    <p className={`bg-gradient-to-r from-violet-600 to-indigo-600 w-fit px-4 py-2 rounded-lg mt-1 text-white ${isUser ? "mr-3 rounded-tr-none rounded-br-xl " : "ml-3 rounded-tl-none rounded-bl-xl"}`}>
                                        {mg.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {mensagem.map((m, i) => {
                        const isUser = m.username === localStorage.getItem("username");
                        return (
                            <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                                <div>
                                    <p className="ml-3 font-bold">{m.username}</p>
                                    <p className={`bg-gradient-to-r from-violet-600 to-indigo-600 w-fit px-4 py-2 rounded-lg mt-1 text-white ${isUser ? "mr-3 rounded-tr-none rounded-br-xl " : "ml-3 rounded-tl-none rounded-bl-xl"}`}>
                                        {m.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>

                {/* Campo de input */}
                <div className="h-14 mt-2 rounded-xl bg-zinc-700 shadow-lg flex items-center px-2">
                    <Genericinput className="w-full bg-transparent text-white outline-none" />
                </div>
            </div>
        </div>
    );
};
