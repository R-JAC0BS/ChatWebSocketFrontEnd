import "./style.css";
import { Genericinput } from "../../components/sendMenssage/genericinput";
import { useEffect, useState, useRef } from "react";
import { InputName } from "../../components/form/inputName";
import { connectStomp, sendMessage } from "../../components/ConnectStomp/stompjs.js";
import { Button } from "../../components/button/button.js";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { URL } from '../../assets/url';
import axios from 'axios';



export const Chat = () => {
  const [mensagem, setMensagem] = useState([]);
  const [listMensage, setListMensage] = useState([])
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    connectStomp((message) => {
      console.log("Recebido:", message);
      const parsed = JSON.parse(message);
      setMensagem((prev) => [...prev, parsed]);
    });
  }, []);

  useEffect(() => {
    axios.get(`${URL}/mg`)
      .then(response => {
        console.log(response);
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
    <div className="flex h-screen w-screen bg-zinc-800  ">

      <div className="w-80  p-4   rounded-r-3xl shadow-md flex shadow-lg shadow-zinc-900 bg-zinc-700 backdrop-blur-md shadow-lg text-white overflow-y-auto flex-col ">
        <h2 className="text-lg font-semibold mb-4">Conversas</h2>
        <div className="justify-between flex flex-col flex-1">

          <InputName
            className={
              "h-auto rounded-xl w-auto flex-1 p-3  bg-zinc-800 w-72 h-10 text-white  outline-none justify-between gap-1  max-h-14"
            }
            placeholder={"nomes"}
          ></InputName>
          <Button onClick={() => { navigate('/') }} text="Sair" className={"bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg h-14 w-full flex justify-center items-center hover:shadow-lg text-lg"}>

          </Button>
        </div>



        <div className="space-y-2"></div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row space-y-4 overflow-hidden">
        {/* Corpo do chat */}
        <div className="flex-1 p-4 rounded-x shadow-lgl bg-zinc-800   backdrop-blur-md shadow-md text-white overflow-y-auto flex flex-col justify-between gap-2">
          <div className="w-full h-full rounded-xl  shadow-zinc-900 overflow-y-auto">
            {listMensage.map((mg, i) => {
              const isUser = mg.sender === localStorage.getItem("username");
              return (
                <div key={i} className={`mt-3 mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div>
                    {!isUser && <p className="ml-3 font-bold">{mg.sender}</p>}
                    <p className={`bg-gradient-to-r from-violet-600 to-indigo-600 w-fit px-4 py-2 rounded-lg mt-2 text-white ${isUser ? "mr-3 rounded-tr-none rounded-br-xl " : "ml-3 rounded-tl-none rounded-bl-xl"}`}>
                      {mg.content}
                    </p>
                  </div>
                </div>
              );
            })}

            {mensagem.map((m, i) => {
              const isUser = m.username === localStorage.getItem("username");
              return (
                <div key={i} className={`mt-3 mb-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div>
                  
                    <p className={`bg-gradient-to-r from-violet-600 to-indigo-600 w-fit px-4 py-2 rounded-lg mt-1 text-white ${isUser ? "mr-3 rounded-tr-none rounded-br-xl " : "ml-3 rounded-tl-none rounded-bl-xl"}`}>
                      {m.content}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <div className="w-full  h-14 rounded-xl shadow-lg align-middle flex bg-zinc-700  ">
            <Genericinput className="h-auto rounded-xl w-auto flex-1 bg-none bg-transparent outline-none justify-between gap-1 p-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
