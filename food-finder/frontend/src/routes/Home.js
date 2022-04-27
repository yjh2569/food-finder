import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

    return (
        <div className="home">
            <h1 id="home_title">식사 메뉴를 골라드립니다!</h1>
            <Link to="recommend" id="start_button">시작!</Link>
        </div>
    )
}

export default Home;