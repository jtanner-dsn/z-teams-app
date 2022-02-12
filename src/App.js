import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <h1>App</h1>
            <nav>
                <Link to="/privacy">Privacy</Link> | {" "}
                <Link to="/termsofuse">Terms Of Use</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default App;
