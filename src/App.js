import './App.css';
import { Link, Outlet } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <div className="nav-bar">
                <nav>
                    <Link to="/privacy" >Privacy</Link> | {" "}
                    <Link to="/termsofuse" >Terms of Use</Link> | {" "}
                    <Link to="/configure" >Configure</Link> | {" "}
                    <Link to="/riskregister" >Risk Charts</Link>
                </nav>
            </div>

            <Outlet />
        </div>
    );
}

export default App;
