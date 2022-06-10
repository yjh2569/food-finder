import React, { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => {
    return state.user.status;
  });

  const [data, setData] = useState({
    userid: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    if (loginStatus === "successed") {
      alert("로그인에 성공했습니다.");
      navigate("/");
    } else if (loginStatus === "failed") {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  }, [loginStatus]);

  const loginBtnClicked = async (e) => {
    e.preventDefault();
    let user = {
      userid: data.userid,
      password: data.password,
    };
    try {
      const resultAction = await dispatch(userLogin(user));
      unwrapResult(resultAction);
    } catch (err) {
      alert("로그인에 실패했습니다.");
      console.error("Failed to login : " + err);
      navigate("/login");
    }
  };

  return (
    <div className="home">
      <h1 id="home_title">로그인</h1>
      <form className="login-form">
        <div className="m-3">
          <label>아이디</label>
          <input
            type="text"
            name="userid"
            onChange={handleChange}
            className="form-control"
            placeholder="아이디를 입력하세요."
          />
        </div>
        <div className="m-3">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control"
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        <div className="m-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              아이디 저장
            </label>
          </div>
        </div>
        <div className="d-grid login-button">
          <button onClick={loginBtnClicked} className="btn btn-primary">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
