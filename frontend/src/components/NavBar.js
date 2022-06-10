import React, { useEffect } from "react";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, userLogout } from "../reducers/userReducer";
import { Navbar, Container, Button } from "react-bootstrap";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  let isLogin = useSelector((state) => state.user.isLogin);
  let userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const resultAction = await dispatch(userLogout());
      unwrapResult(resultAction);
    } catch (err) {
      alert("로그아웃에 실패했습니다.");
      console.error("Failed to login : " + err);
    }
  };

  useEffect(() => {
    dispatch(getInfo());
  }, [isLogin]);

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Food Finder</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {!isLogin && (
            <Button
              variant="primary"
              onClick={() => navigate("/login")}
              className="mx-3"
            >
              로그인
            </Button>
          )}
          {isLogin && (
            <Navbar.Text>
              {userInfo.name} 님 환영합니다.
              <Button variant="danger" className="mx-3" onClick={logout}>
                로그아웃
              </Button>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <nav className="Navbar">
    //   <Link to="/">
    //     <h1 className="navbar-logo">
    //       Food Finder<i className="fab fa-react"></i>
    //     </h1>
    //   </Link>
    //   <div className="menu-icon" onClick={handleClick}>
    //     <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
    //   </div>
    //   <ul className={clicked ? "nav-menu active" : "nav-menu"}>
    //     {MenuItems.map((item, index) => {
    //       return (
    //         <li key={index}>
    //           <a className={item.cName} href={item.url}>
    //             {item.title}
    //           </a>
    //         </li>
    //       );
    //     })}
    //   </ul>
    //   {!isLogin && <Button>로그인</Button>}
    //   {isLogin && (
    //     <div className="nav-item">
    //       <ul className="nav-items">
    //         <li>{userInfo.name} 님 환영합니다.</li>
    //         <li>
    //           <button className="btn btn-primary">로그아웃</button>
    //         </li>
    //       </ul>
    //     </div>
    //   )}
    // </nav>
  );
};
export default NavBar;
