import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="nav__container">
            <Link to="/prothom-alo/">
                <img src={logo} alt="logo" className="nav__container-logo" />
            </Link>
        </div>
    );
}
