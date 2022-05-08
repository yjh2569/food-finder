import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import qs from "query-string";

const Login = () => {
  const [data, setData] = useState({
    userid: "",
    password: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const loginBtnClicked = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(data.userid+" "+data.password);
    axios
      .post(
        "/api/user/login",
        qs.stringify({
          userid: data.userid,
          password: data.password,
        }),
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
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
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
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
