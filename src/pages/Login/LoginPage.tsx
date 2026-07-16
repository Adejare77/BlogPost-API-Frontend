import { Link } from "react-router-dom";
import useLoginForm from "./LoginForm";

const Login = () => {
  const { email, setEmail, password, setPassword, err, loading, handleSubmit } =
    useLoginForm();

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
