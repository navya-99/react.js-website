import { Link } from "react-router-dom";

const UseHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark sticky-top p-2">
            <div className="container">
                <a className="navbar-brand text-white">
                    <i className="fa fa-shopping-bag fa-lg text-warning"></i> <b> Keep@Shopping </b>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item me-5">
                            <Link className="nav-link text-white" to="/"><i className="fa fa-home"></i> Home</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link text-white" to="/cart"><i className="fa fa-shopping-cart"></i> My Cart</Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link text-white" to="/login"><i className="fa fa-lock"></i> Seller Login </Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link className="nav-link text-white" to="/register"> <i className="fa fa-user-plus"></i> Seller Create Account </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default UseHeader;