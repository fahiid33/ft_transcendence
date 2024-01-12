import Logo from './Logo';
import '../styles/css/Play.css';
import search from '../assets/search_bar.svg';
import msg_icon from '../assets/message_icon.svg';
import profile_icon from '../assets/profile_icon.svg';
import ranking_icon from '../assets/chart_icon.svg';
import play_icon from '../assets/playground_icon.svg';
import settings from '../assets/settings_icon.svg';
import exit from '../assets/exit.svg';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserProvider.tsx';
import axios from 'axios';

async function logout() {
    axios.get('http://localhost:3001/auth/logout', { withCredentials: true })
    .then((res) => {
        console.log(res);
        window.location.reload();
    })
    .catch((err) => {
        console.log(err);
    })

    }



export default function Navbar() {
    const { user } = useContext(UserContext);

  return (
    <>
    <input type="checkbox" id="menu-toggle"/>
      <label htmlFor="menu-toggle" className="menu-icon">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </label>
    <section className="Navbar">
      <Logo name={"plogo"}></Logo>
        <div className="search_container">
        <input type="text" placeholder="Search" />
            <div className="search-icon">
                <img src={search} alt="Search Icon"/>
            </div>
        </div>
        <div className="btn_container">
            <Link to="/play"><button className="btn">Play</button></Link>

            
            <div className="icon">
                <img src={play_icon} alt="Play Icon"/>
            </div>
        </div>
        <div className="btn_container">
            <Link to="/profile"><button className="btn">Profile</button></Link>

            <div className="icon">
                <img src={profile_icon} alt="Profile Icon"/>
            </div>
        </div>
        <div className="btn_container">
            <Link to="/chat"><button className="btn">Messages</button></Link>

            <div className="icon">
                <img src={msg_icon} alt="Messages Icon"/>
            </div>
        </div>
        <div className="btn_container">
            <Link to="/leaderboard"><button className="btn">Ranking</button></Link>

            <div className="icon">
                <img src={ranking_icon} alt="Search Icon"/>
            </div>
        </div>
        <div className="line">
        </div>
        <div className="btn_container">
            <Link to="/settings"><button className="btn">Settings</button></Link>
            <div className="icon">
                <img src={settings} alt="Settings Icon"/>
            </div>
        </div>
        <a href="http://localhost:3000/profile/logout">
            <div className="logout">
                <div className="user">
                    <div className="cercle_profile" style={{ backgroundImage: `url(${user && user.avatar})` }}></div>
                    <span className="name">{user && user.username}</span>
                </div>
                <div>
                    <img width="40" height="40" src={exit} alt="Search Icon"/>
                </div>
            </div>
        </a>
    </section>
    </>
  )
}