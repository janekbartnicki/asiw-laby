import { NavLink } from "react-router-dom";

export default function NavBar() {
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
        </div>
    )
}