import React, { useState } from 'react';
import './style.css';
import { Button } from '../../components/button/button';
import { InputName } from '../../components/form/inputName';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../assets/url';
import axios from 'axios';

const sendName = async (name, setStatus, setTypeStatus,navigate) => {
    
    try {
        const response = await axios.post(`${URL}/nickname`, {
            username: name
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response.data);
        setStatus(response.data); 
        setTypeStatus(response.status); 
        localStorage.setItem('username',name)
        console.log('salvoou' + name)
        if (response.status == 201){
            setTimeout(()  => {
              navigate("/chat")
            },1000)
         
        }
    } catch (error) {
        console.error("Erro ao enviar o nome:", error);
        if (error.response) {
            setStatus(error.response.data);
            setTypeStatus(error.response.status); 
        } else {
            setStatus("Erro de conexão com o servidor.");
            setTypeStatus(500); 
        }
    }
};

const typeStatus = (statusType) => {
    
    if (statusType === 500) {
        return "statusError";
    }
    return "statusSuccess"; 
    
};


export const NewUser = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [statusType, setTypeStatus] = useState(0);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-zinc-800 flex justify-center align-middle items-center">
            <div className="block">
                {status && (
                    <div className={typeStatus(statusType)}>
                        <p>{status}</p>
                    </div>
                )}
                <InputName setTexto={setName} onKeydown={(e) => {if (e.key == "Enter"){sendName(name, setStatus, setTypeStatus,navigate)}}}/>
                <Button
                    text="Entrar"
                    name={name}
                    onClick={() => sendName(name, setStatus, setTypeStatus,navigate)}
                    timer="false"
                />
            </div>
        </div>
    );
};
