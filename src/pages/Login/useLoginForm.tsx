import { useState, type FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { AxiosError } from "axios";
import getAPIErrorMessage from "../../utils/error";
import { loginUser } from "../../api/auth";

const useLoginForm = ({
  onSuccess,
  onClose,
}: {
  onSuccess?: () => void;
  onClose?: () => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    try {
      const res = await loginUser({ email, password });
      login(res.data.accessToken);
      onClose?.();
      onSuccess?.();
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
    loading,
    handleSubmit,
  };
};

export default useLoginForm;
