import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="navbar-container">
            <ul>
                <NavLink 
                    to='/'
                    className={({ isActive }) => (isActive ? 'selected' : '')}
                >
                    <li>Home</li>
                </NavLink>
                <NavLink 
                    to='/cars'
                    className={({ isActive }) => (isActive ? 'selected' : '')}
                >
                    <li>Cars</li>
                </NavLink>
                <NavLink 
                    to='/edit/new'
                    className={({ isActive }) => (isActive ? 'selected' : '')}
                >
                    <li>New Car</li>
                </NavLink>
            </ul>

            <div className="navbar-auth">
                {token ? (
                    <div className="user-info">
                        <span className="display-name">{user?.displayName}</span>
                        <p onClick={handleLogout} className="logout-btn">
                            Logout
                        </p>
                    </div>
                ) : (
                    <NavLink 
                        to='/login'
                        className={({ isActive }) => `login-btn ${isActive ? 'selected' : ''}`}
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    )
}