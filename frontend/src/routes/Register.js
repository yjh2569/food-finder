import React, { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { request } from "../api";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    userid: "",
    password: "",
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [validated, setValidated] = useState(false);
  const [idPossible, setIdPossible] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      alert("회원 정보를 모두 입력해주세요!");
      e.stopPropagation();

      return;
    }
    if (!idPossible) {
      alert("아이디 중복 체크를 하지 않으셨습니다.");
      return;
    }
    let user = { ...data };
    try {
      const result = await request("post", "/api/user/join", user);
      console.log(result);
      if (result === "회원 가입 성공") {
        alert("회원 가입에 성공했습니다!");
        navigate("/login");
      } else {
        alert("회원 가입에 실패했습니다!");
      }
    } catch (err) {
      alert("오류로 인해 회원가입에 실패했습니다.");
      console.error("Failed to login : " + err);
    }
  };

  const idCheckBtnClicked = async (e) => {
    e.preventDefault();
    let userid = data.userid;
    if (userid.length < 6 || userid.length > 16) {
      console.log("아이디는 6자 이상 16자 이하만 가능합니다.");
      setIdPossible(false);
      return;
    }
    try {
      const result = await request("get", "/api/user/idCheck?userid=" + userid);
      if (result) {
        alert("해당 아이디는 사용 가능합니다.");
        setIdPossible(true);
      } else {
        alert("해당 아이디는 이미 사용 중입니다.");
        setIdPossible(false);
      }
    } catch (err) {
      alert("오류가 발생했습니다.");
      console.log(err);
      setIdPossible(false);
    }
  };

  return (
    <div className="home">
      <h1 id="register_title">회원가입</h1>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="register-form"
      >
        <Container>
          <Form.Group className="position-relative">
            <Form.Label>아이디</Form.Label>
            <Row>
              <Col md="9">
                <Form.Control
                  type="text"
                  name="userid"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="아이디를 입력하세요."
                  required
                  minLength={"6"}
                  maxLength={"16"}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  아이디는 6자 이상 16자 이하입니다.
                </Form.Control.Feedback>
              </Col>
              <Col md="3">
                <Button onClick={idCheckBtnClicked} variant="primary">
                  중복 검사
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Container>
        <div className="m-3">
          <Form.Group controlId="password" className="position-relative">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control"
              placeholder="비밀번호를 입력하세요."
              required
              minLength={"8"}
              maxLength={"16"}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              비밀번호는 8자 이상 16자 이하입니다.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="m-3">
          <Form.Group controlId="name" className="position-relative">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
              placeholder="이름을 입력하세요."
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              이름을 입력해 주세요.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="m-3">
          <Form.Group className="position-relative">
            <Form.Label>전화번호</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              onChange={handleChange}
              className="form-control"
              placeholder="전화번호를 입력하세요."
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              전화번호를 입력해주세요.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="m-3">
          <Form.Group className="position-relative">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="이메일을 입력하세요."
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              이메일을 입력해주세요.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="d-grid register-button">
          <button type="submit" className="btn btn-primary">
            회원 가입
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
