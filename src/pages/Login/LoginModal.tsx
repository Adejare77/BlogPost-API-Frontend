import LoginForm from "./LoginForm";

interface LoginModalProps {
  isModalOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const LoginModal = ({ isModalOpen, onSuccess, onClose }: LoginModalProps) => {
  if (!isModalOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <LoginForm
          onSuccess={onSuccess}
          onClose={onClose}
          showCreateLink={false}
        />
      </div>
    </div>
  );
};

export default LoginModal;
