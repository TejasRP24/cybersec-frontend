import { createContext, useState, useContext } from "react";
import Notification from "../components/Common/Notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    // Auto close after 4s
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 4000);
  };

  const closeNotification = () => setNotification({ message: "", type: "" });

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={closeNotification} 
      />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
