import {NewUser} from './pages/createUserPage/newuser'
import { Chat } from './pages/chat/chat';
import { Routes, Route } from 'react-router-dom';
import {useIsMobile} from '../src/components/UseIsMobile/useIsMobile.js'
import { MobileChat } from '../src/pages/chat/mobileChat.js';
import './style.css';



function App() {
  const isMobile = useIsMobile();
  return (
    <Routes>
      <Route path="/" element={<NewUser />} />
      <Route path="/chat" element={isMobile ? <MobileChat/>: <Chat></Chat> } />
    </Routes>
  );
}

export default App;
