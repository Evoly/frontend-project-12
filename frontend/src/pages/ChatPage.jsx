import { useState  } from "react";
import { UiContext } from "../context";

import Chat from "../components/Chat";

const UiProvider = ({ children }) => {
  const [focusedInputRef, setFocusedInputRef] = useState('');

  const saveInputRef = (el) => setFocusedInputRef(el);
  const setFocus = () => {
    if (focusedInputRef) {
      focusedInputRef.focus();
    }
  }

  return (
    <UiContext.Provider value={{ saveInputRef, setFocus}}>
      {children}
    </ UiContext.Provider>
  )
}

const ChatPage = () => {
  return (
    <UiProvider>
      <Chat />
    </UiProvider>      
  );
};

export default ChatPage;
