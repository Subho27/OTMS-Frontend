import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {FaEye, FaEyeSlash, FaKey, FaTruckLoading, FaUser, FaUserSecret} from "react-icons/fa";
import { login } from "../actions/authActions";
import Loader from "../components/Loader";
import '../components/FormContainer.css'
import * as authConstants from "../constants/authConstants";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(dispatch, username, password).then((data) => {
      if (data.type === authConstants.USER_LOGIN_SUCCESS) {
        data.payload.roles.map((r) => {
          if (r["roleName"] === "ADMIN") {
            return navigate("/adminProfile");
          } else {
            return navigate("/profile");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (token && user) {
      user.roles.map((r) => {
        if (r["roleName"] === "ADMIN") return navigate("/adminProfile");
        else return navigate("/profile");
      });
    }
  }, []);
  return (
    <div className='custom-bg'>
      <div className='custom-form-container-login'>
        <FormContainer>
          <h1 className='poppins-bold text-center'>Sign in</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-3" controlId="username">
              <Form.Label className='poppins-light'>Username</Form.Label>
              <InputGroup className='input-field'>
                <FaUser className='user-icon'/>
                <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                ></Form.Control>
              </InputGroup>
            </Form.Group>

            <Form.Group className="my-3" controlId="password">
              <Form.Label className='poppins-light'>Password</Form.Label>
              <InputGroup className='input-field'>
                <FaKey className='user-icon'/>
                <Form.Control
                    type={`${passwordType}`}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                />
                <Button
                    onClick={showPasswordHandler}
                    variant="">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>
            <Button
                variant=""
                className="w-100 custom-button"
                type="submit"
            ><div className="text-zoom">Login</div>
            </Button>
          </Form>

          {loginReducer.loading ? (
              <Loader />
              // <FaTruckLoading/>
          ) : (
              <Row className="py-3 text-center">
                <Col>
                  New Student?{" "}
                  <Link to="/register" style={{ color: "rgb(68 177 49)" }}>
                    Register
                  </Link>
                </Col>
              </Row>
          )}
        </FormContainer>
      </div>
    </div>
  );
};

export default LoginPage;
