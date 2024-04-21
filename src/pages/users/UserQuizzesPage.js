import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SidebarUser from "../../components/SidebarUser";
import "./UserQuizzesPage.css";
import { fetchQuizzes } from "../../actions/quizzesActions";
import {Button, Card, Col, Row} from "react-bootstrap";

const UserQuizzesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const catId = urlParams.get("catId");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);

  useEffect(() => {
    if (quizzes.length === 0) {
      fetchQuizzes(dispatch, token).then((data) => {
        setQuizzes(data.payload);
      });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  return (
    <div className="userQuizzesPage__container">
      <div className="userQuizzesPage__sidebar">
        <SidebarUser />
      </div>

      <div className="userQuizzesPage__content">
        <h2 className='profile-heading text-center'>Quizzes</h2>
        <div className="whole-list">
        {quizzes ? (
          <Row style={{ width:"100%" }}>
            {quizzes.map((q, index) => {
              if (q.numOfQuestions > 0 && ((catId && catId == q.category.catId) || catId == null))
                return (
                  <Col
                    key={index}
                    xl={3}
                    lg={4}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ marginTop:"20px", width:"32%", marginLeft:"15px" }}
                  >
                    <Card
                      text="dark"
                      style={{
                        width: "100%",
                        height: "95%",
                        padding: "5px",
                        margin: "auto",
                        marginTop: "5px",
                        minWidth: "0px",
                        wordWrap: "break-word",
                        boxShadow: "0 0 5px 2px #b0afaf"
                      }}
                      className="mb-2"
                    >
                      <Card.Body>
                        <Card.Title className='poppins-bold'>{q.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted poppins-semibold">
                          {q.category.title}
                        </Card.Subtitle>
                        <Card.Text className='poppins-regular'>{q.description}</Card.Text>
                        <div className="userQuizzesPage__content--ButtonsList">
                          <Button
                              variant=""
                            className="userQuizzesPage__content--Button"
                            onClick={() =>
                              navigate(`/quizManual?quizId=${q.quizId}`)
                            }
                            style={{cursor: "pointer"}}
                          >
                            {`Start`}
                          </Button>

                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`${q.numOfQuestions * 2} Minutes`}</div>
                        </div>

                        <div className="userQuizzesPage__content--ButtonsList">
                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`${q.numOfQuestions} Questions`}</div>

                          <div
                            className="userQuizzesPage__content--Button"
                            onClick={() => console.log("View")}
                            style={{ color: "black", backgroundColor: "white" }}
                          >{`Marks : ${q.numOfQuestions * 5}`}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
            })}
          </Row>
        ) : (
          <p>No Quizzes Available</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default UserQuizzesPage;
