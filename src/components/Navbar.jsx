import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          Go Business
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>

        <button type="button" onClick={onClickLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;