import './App.css';
import logo from "./images/Logo.svg";
import barsIcon from "./images/bars-solid.svg";
import spotifyIcon from "./images/spotify-icon.svg";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import TimePeriodTopChart from './pages/Lastfm/TimePeriodChart';
import Tracks from './pages/Lastfm/Tracks';
import "./App.css"
import Home from './pages/Lastfm/Home';

const CONVERTIFY_API_BASE_URL = process.env.REACT_APP_CONVERTIFY_API_BASE_URL

export default function App() {
    let routes = [
        { name: "Home", ref: "/", elem: () => <Home /> },
        { name: "Tracks", ref: "/sp", elem: () => <Tracks /> },
        { name: "Time Period Top Charts", ref: "/lfm", elem: () => <TimePeriodTopChart /> },
    ]

    return (
        <Router>
            <nav onMouseLeave={() => document.querySelector(".menu").classList.remove("active")}>
                <div className="nav-titleBar">
                    <a className='nav-logo-link' href="/">
                        <img className="nav-logo-img" src={logo} alt="vinyl disc" />
                        <div className="nav-logo-text">ConvertifyFM</div>
                    </a>
                    <div className="toggle" onClick={(event) => {
                        let menu = document.querySelector(".menu")
                        menu.classList.contains("active") ? menu.classList.remove("active") : menu.classList.add("active")
                    }
                    }>
                        <img src={barsIcon} alt="" srcset="" /></div>
                </div>
                <div className="menu-links">
                    <ul className="menu">

                        {routes.map(function (route) {
                            return (<li className='nav-item'><Link to={route.ref}>{route.name}</Link></li>)
                        })}

                        <li className='nav-item'><a id='btn-spotify' href={`${CONVERTIFY_API_BASE_URL}/login`}><img src={spotifyIcon} alt="" /> Login </a></li>
                    </ul>
                </div>
            </nav>
            <main>
                <Routes>
                    
                    {routes.map(function (route) {
                        return (<Route exact path={route.ref} element={route.elem()}></Route>)
                    })}

                </Routes>
            </main>
        </Router>
    );
}


