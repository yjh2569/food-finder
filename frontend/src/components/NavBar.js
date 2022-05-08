import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { MenuItems } from "./MenuItems";
import Button from './Button';

function Navbar () {

    const [clicked, setClicked] = useState(false);
    //false = bars, true = times
    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
            <nav className="Navbar">
                <Link to="/"><h1 className="navbar-logo">Food Finder<i className="fab fa-react"></i></h1></Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index)=>{
                        return (
                                <li key={index}>
                                    <a className={item.cName} href={item.url}>
                                        {item.title}
                                    </a>
                                </li>
                        )
                    })}
                </ul>
                <Button>Sign Up</Button>
            </nav>
        )
}
export default Navbar