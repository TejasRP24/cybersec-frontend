import "../../styles/Notification.css";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`notification-overlay ${type}`}>
      <div className="notification-content">
        <span>{message}</span>
        <button className="close-notif" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Notification;
