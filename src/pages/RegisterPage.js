import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {
  FaEye,
  FaEyeSlash,
  FaKey,
  FaMobile,
  FaPhone, FaTruckLoading,
  FaUser,
  FaUserAltSlash,
  FaUserAstronaut,
  FaUserGraduate
} from "react-icons/fa";
import * as authConstants from "../constants/authConstants";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerReducer = useSelector((state) => state.registerReducer);

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const showConfirmPasswordHandler = () => {
    const temp = !showConfirmPassword;
    setShowConfirmPassword(temp);
    if (temp) {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      phoneNumber: phoneNumber,
    };
    register(dispatch, user).then((data) => {
      if (data.type === authConstants.USER_REGISTER_SUCCESS) {
        navigate("/login");
      }
    });
  };

  return (
  <div className='custom-bg-signup'>
    <div className='custom-form-container-signup'>
      <FormContainer>
        <h1 className='poppins-bold text-center'>Sign up</h1>
        <Form onSubmit={submitHandler}>
          <div className='custom-display'>
            <Form.Group className="my-3 custom-input-field" controlId="fname">
              <Form.Label>First Name</Form.Label>
              <InputGroup className='input-field'>
                <FaUserGraduate className='user-icon'/>
                <Form.Control
                    type="name"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3 custom-input-field" controlId="lname">
              <Form.Label>Last Name</Form.Label>
              <InputGroup className='input-field'>
                <FaUserGraduate className='user-icon'/>
                <Form.Control
                    type="name"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                ></Form.Control>
              </InputGroup>
            </Form.Group>
          </div>

          <div className='custom-display'>
            <Form.Group className="my-3 custom-input-field" controlId="username">
              <Form.Label>User Name</Form.Label>
              <InputGroup className='input-field'>
                <FaUser className='user-icon'/>
                <Form.Control
                    type="text"
                    placeholder="Enter User Name"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                ></Form.Control>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3 custom-input-field" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup className='input-field'>
                <FaMobile className='user-icon'/>
                <Form.Control
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                ></Form.Control>
              </InputGroup>
            </Form.Group>
          </div>

          <div className='custom-display'>
            <Form.Group className="my-3 custom-input-field" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup className='input-field'>
                <FaKey className='user-icon'/>
                <Form.Control
                    type={`${passwordType}`}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                ></Form.Control>
                <Button className='border'
                        onClick={showPasswordHandler}
                        variant=""
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3 custom-input-field" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup className='input-field'>
                <FaKey className='user-icon'/>
                <Form.Control
                    type={`${confirmPasswordType}`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                ></Form.Control>
                <Button
                    className='border'
                    onClick={showConfirmPasswordHandler}
                    variant=""
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>
          </div>

          <Button variant="" className="w-100 custom-button" type="submit">
            <div className="text-zoom">Register</div>
          </Button>
        </Form>

        {registerReducer.loading ? (
            <Loader />
        ) : (
            <Row className="py-3 text-center">
              <Col>
                Have an Account? <Link to="/" style={{color:"rgb(68 177 49)"}}>Login</Link>
              </Col>
            </Row>
        )}

      </FormContainer>
    </div>
  </div>
  );
};

export default RegisterPage;
