import React, { useEffect, useState } from "react";
import "./UserQuizManualPage.css";
import SidebarUser from "../../components/SidebarUser";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import { fetchQuizzes } from "../../actions/quizzesActions";

const UserQuizManualPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const quizId = urlParams.get("quizId");

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
  const [quiz, setQuiz] = useState(
    quizzes.filter((q) => q.quizId == quizId)[0]
  );
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const startQuizHandler = (quizTitle, quizId) => {
    navigate(`/questions/?quizId=${quizId}&quizTitle=${quizTitle}`);
  };

  useEffect(() => {
    if (quizzes.length == 0) {
      fetchQuizzes(dispatch, token).then((data) => {
        const temp = data.payload;
        setQuizzes(temp);
        setQuiz(temp.filter((q) => q.quizId == quizId)[0]);
      });
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  return (
    <div className="quizManualPage__container">
      <div className="quizManualPage__sidebar">
        <SidebarUser />
      </div>
      {quiz ? (
        <div className="quizManualPage__content">
          <div className="quizManualPage__content--section">
            <h5 className='poppins-medium'>Read the instruction of this page carefully</h5>
            <p className='poppins-regular' style={{ color: "grey" }}>One more step to go</p>
          </div>

          <div className="quizManualPage__content--section">
            <h3 className='poppins-bold'>{quiz.title}</h3>
            <p className='poppins-semibold'>{quiz.description}</p>
          </div>

          <hr />

          <div>
            <h3 className='poppins-medium'>Important Instructions</h3>
            <ul className='poppins-light'>
              <li>This quiz is only for practice purpose.</li>
              <li>
                You have to submit quiz within <strong className='poppins-semibold'>{quiz.numOfQuestions * 2}</strong>.
              </li>
              <li>You can attempt the quiz any number of time.</li>
              <li>
                There are <strong className='poppins-semibold'>{quiz.numOfQuestions} questions</strong> in
                this quiz.
              </li>
              <li>This quiz is only for practice purpose.</li>
              <li>
                Total Marks for this quiz is <strong className='poppins-semibold'>{quiz.numOfQuestions * 5}.</strong>
              </li>
              <li>All question is of MCQ type.</li>
            </ul>
          </div>

          <hr />

          <div>
            <h3 className='poppins-medium'>Attempting Quiz</h3>
            <ul className='poppins-light'>
              <li>
                Click <strong className='poppins-semibold'>Start Quiz</strong> button to start the quiz.
              </li>
              <li>
                The timer will start the moment, you will click on the Start
                Quiz button.
              </li>
              <li>
                You can not resume this quiz if interrupted due to any reason.
              </li>
              <li>
                Click on <strong className='poppins-semibold'>Submit Quiz</strong> button on completion of
                the quiz.
              </li>
            </ul>
          </div>

          <Button
            className="quizManualPage__content--button"
            onClick={() => startQuizHandler(quiz.title, quiz.quizId)}
            variant=""
          >{`Start Quiz`}</Button>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserQuizManualPage;
