import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="homepage-container">
            <h1>Welcome!</h1>
            <Link to='/cars'>
                <button className="primary-btn">Browse cars</button>
            </Link>
        </div>
    )
}