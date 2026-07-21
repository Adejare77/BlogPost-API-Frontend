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
        <LoginForm
          onSuccess={onSuccess}
          onClose={onClose}
          showCreateLink={false}
          headerAction={true}
        />
      </div>
    </div>
  );
};

export default LoginModal;
