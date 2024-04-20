import React, { useEffect, useState } from "react";
import "./AdminQuizzesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import Message from "../../../components/Message";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/Loader";
import { deleteQuiz, fetchQuizzes } from "../../../actions/quizzesActions";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import {confirmation, notify} from "../../../components/Notify";

const AdminQuizzesPage = () => {
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const catId = urlParams.get("catId");
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);

  const addNewQuizHandler = () => {
    navigate("/adminAddQuiz");
  };
  const deleteQuizHandler = (quiz) => {
    confirmation(
      "Are you sure?",
      "Once deleted, you will not be able to recover this quiz!",
      "warning",
      () => {
        deleteQuiz(dispatch, quiz.quizId, token).then((data) => {
          if (data.type === quizzesConstants.DELETE_QUIZ_SUCCESS) {
            notify("Quiz Deleted!", `${quiz.title} succesfully deleted`, "success");
          } else {
            notify("Quiz Not Deleted!", `${quiz.title} not deleted`, "error");
          }
        });
      },
      () => {
        notify("Pheww!!!",`${quiz.title} is safe`, "success")
      },
      toastId.current
    )
  };
  const updateQuizHandler = (quizTitle, quizId) => {
    navigate(`/adminUpdateQuiz/${quizId}`);
  };

  const questionsHandler = (quizTitle, quizId) => {
    navigate(`/adminQuestions/?quizId=${quizId}&quizTitle=${quizTitle}`);
  };

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
    <div className="adminQuizzesPage__container">
      <div className="adminQuizzesPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminQuizzesPage__content">
        <h2 className='profile-heading text-center'>Quizzes</h2>
        <div className="whole-list">
        {quizzes ? (
          quizzes.length === 0 ? (
            <Message>No quizzes are present. Try adding some quizzes.</Message>
          ) : (
            quizzes.map((quiz, index) => {
              if ((catId && quiz.category.catId == catId) || (catId == null))
                return (
                  <ListGroup
                    className="adminQuizzesPage__content--quizzesList"
                    key={index}
                  >
                    <ListGroup.Item className="align-items-start custom-shadow" action style={{ borderWidth: "0px" }}>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold poppins-light">{quiz.title === "" ? "No name Found" : quiz.title}</div>
                        <p style={{ color: "grey" }} className='poppins-light'>{quiz.category.title}</p>
                        {<p className="my-3 poppins-light">{quiz.description === "" ? "No Description Found" : quiz.description}</p>}
                        <div className="adminQuizzesPage__content--ButtonsList">
                          <Button variant="" className='button-list-button'
                            onClick={() =>
                              questionsHandler(quiz.title, quiz.quizId)
                            }
                          >{`Questions`}</Button>
                          <div
                            style={{
                              border: "1px solid grey",
                              width: "100px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              height: "35px",
                              margin: "0px 4px",
                            }}
                          >{`Marks : ${quiz.numOfQuestions * 5}`}</div>
                          <div
                            style={{
                              border: "1px solid grey",
                              width: "100px",
                              padding: "1px",
                              textAlign: "center",
                              borderRadius: "5px",
                              height: "35px",
                              margin: "0px 4px",
                            }}
                          >{`${quiz.numOfQuestions} Questions`}</div>
                        </div>
                        <div className="adminQuizzesPage__content--ButtonsList">
                          <Button variant="" className='button-list-button'
                            onClick={() =>
                              updateQuizHandler(quiz.title, quiz.quizId)
                            }
                          >{`Update`}</Button>
                          <Button variant="" className='button-list-button'
                            onClick={() => deleteQuizHandler(quiz)}
                          >{`Delete`}</Button>
                        </div>
                      </div>
                      {/* <Badge bg="primary" pill></Badge> */}
                    </ListGroup.Item>
                  </ListGroup>
                );
            })
          )
        ) : (
          <Loader />
        )}
        </div>
        <Button
          variant=""
          className="adminQuizzesPage__content--button"
          onClick={addNewQuizHandler}
        >
          Add Quiz
        </Button>
      </div>
    </div>
  );
};

export default AdminQuizzesPage;
