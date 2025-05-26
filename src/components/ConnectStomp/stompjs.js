import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectStomp = (onMessage) => {
  const socket = new SockJS('https://chatwebsocket-k98a.onrender.com/gs-guide-websocket'); // ajuste a URL se necessário

  stompClient = new Client({
    webSocketFactory: () => socket,
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('Conectado ao WebSocket');
      stompClient.subscribe('/topic/greetings', (mensagem) => {
        onMessage(mensagem.body);
      });
    },
  });

  stompClient.activate();
};

export const sendMessage = (conteudo,username ) => {
  if (stompClient && stompClient.connected) {
    console.log(username + ' ' + conteudo)
    stompClient.publish({
      destination: '/app/hello',
      body: JSON.stringify({ 
        'username' : username,
        'content' : conteudo
        
    
    }),
    });
  } else {
    console.warn('STOMP não conectado.');
  }
};
