import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { loginUser, registerUser } from "../../api/auth";

const RegisterUser = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ fullName, password, email });
      toast.success("Welcome! Your account has been created.");
      const res = await loginUser({ email, password });
      login(res.data.accessToken);
      navigate("/", { replace: true });
    } catch (err: any) {
      err.response.data.email
        ? setEmailError(err.response.data.email)
        : setError(
            err.response.data.detail || "Failed to create user. Try Again later"
          );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="form-title">Create your account</h2>
        <div className="form-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="name"
            value={fullName}
            id="fullName"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="full Name"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            required
          />

          {emailError && <p className="field-error">{emailError}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn:disabled btn-register"
          disabled={!fullName || !email || !password}
        >
          {loading ? "Creating..." : "Submit"}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-register"
          onClick={() => {
            setFullName("");
            setEmail("");
            setPassword("");
          }}
        >
          Clear form
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterUser;
