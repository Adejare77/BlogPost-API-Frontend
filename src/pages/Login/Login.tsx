import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../api/auth";
import getAPIErrorMessage from "../../utils/error";
import { AxiosError } from "axios";

const Login = () => {
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

  return (
    <div className="login-page">
      {err && <p className="error">{err}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">Log in</h2>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-login btn-disabled"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account yet? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
