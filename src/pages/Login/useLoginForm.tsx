import { useNavigate } from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { AxiosError } from "axios";
import getAPIErrorMessage from "../../utils/error";
import { loginUser } from "../../api/auth";

const useLoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      login(res.data.accessToken);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      err instanceof AxiosError && err.response?.status === 401
        ? setErr("Invalid Credentials")
        : setErr(getAPIErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    err,
    setErr,
    loading,
    setLoading,
    handleSubmit,
  };
};

export default useLoginForm;
