import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            BlogPost
          </Link>
        </div>

        <div className="navbar-center">
          {user && (
            <>
              <Link to="/dashboard/" className="navbar-link">
                Dashboard
              </Link>
              <span className="navbar-welcome">
                Welcome back, {user.fullName}
              </span>
            </>
          )}
        </div>

        <div className="navbar-right">
          {user ? (
            <div className="navbar-actions">
              <Link to="/dashboard/create-post" className="btn btn-primary">
                Create Post
              </Link>
              <button
                onClick={logout}
                className="btn btn-secondary"
                aria-label="Log out of your account"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-actions">
              <Link to="/login" className="navbar-link">
                Log in
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
