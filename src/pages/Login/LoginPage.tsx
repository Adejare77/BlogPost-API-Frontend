import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const onSuccess = () => navigate("/", { replace: true });

  return (
    <div className="login-page">
      <LoginForm onSuccess={onSuccess} showCreateLink={true} />
    </div>
  );
};

export default LoginPage;
