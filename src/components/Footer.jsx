import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>Go Business</h3>
      </div>

      <div>
        <Link to="/about">About</Link>
        {" | "}
        <Link to="/privacy">Privacy</Link>
      </div>

      <p>© 2024 Go Business</p>
    </footer>
  );
}

export default Footer;