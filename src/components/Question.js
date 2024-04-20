import React from "react";
import { InputGroup } from "react-bootstrap";
import "./Question.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../actions/questionsActions";
import swal from "sweetalert";
import * as questionsConstants from "../constants/questionsConstants";
import {confirmation, notify} from "./Notify";

const Question = ({ number, answers, question, isAdmin = false }) => {
  const dispatch = useDispatch();
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  const answer = question.answer;
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const saveAnswer = (quesId, ans) => {
    const newAns = {};
    newAns[quesId] = ans;
    let answers = JSON.parse(localStorage.getItem("answers"));
    if (answers) {
      answers[quesId] = ans;
      localStorage.setItem("answers", JSON.stringify(answers));
    } else {
      localStorage.setItem("answers", JSON.stringify(newAns));
    }
  };
  const updateQuestionHandler = (ques) => {
    navigate(`/adminUpdateQuestion/${ques.quesId}/?quizId=${ques.quiz.quizId}`);
  };

  const deleteQuestionHandler = (ques) => {
    confirmation(
      "Are you sure?",
      "Once deleted, you will not be able to recover this question!",
      "warning",
      () => {
        deleteQuestion(dispatch, ques.quesId, token).then((data) => {
          if (data.type === questionsConstants.DELETE_QUESTION_SUCCESS) {
            notify(
                "Question Deleted!",
                `Question with id ${ques.quesId}, succesfully deleted`,
                "success"
            );
          } else {
            notify(
                "Question Not Deleted!",
                `Question with id ${ques.quesId} not deleted`,
                "error"
            );
          }
        });
      },
      () => {
        notify("Pheww!!!",`Question is safe`, "success")
      },
      toastId.current
    )
  };

  return (
    <div className="question__container">
      <div className="question__content">
        {number + ". " + question.content}
      </div>
      <div className="question__options">
        <InputGroup
          onChange={(e) => {
            saveAnswer(question.quesId, e.target.value);

          }}
        >
          <div className="question__options--2">
            <div className="question__options--optionDiv">
              {!isAdmin && <InputGroup.Radio
                value={"option1"}
                name={number}
                aria-label="option 1"
              />}
              {isAdmin && "Option 1. "}
              <span className="question__options--optionText">
                {question.option1}
              </span>
            </div>
            <div className="question__options--optionDiv">
              {!isAdmin && <InputGroup.Radio
                value={"option2"}
                name={number}
                aria-label="option 2"
              />}
              {isAdmin && "Option 2. "}
              <span className="question__options--optionText">
                {question.option2}
              </span>
            </div>
          </div>

          <div className="question__options--2">
            <div className="question__options--optionDiv">
              {!isAdmin && <InputGroup.Radio
                value={"option3"}
                name={number}
                aria-label="option 3"
              />}
              {isAdmin && "Option 3. "}
              <span className="question__options--optionText">
                {question.option3}
              </span>
            </div>
            <div className="question__options--optionDiv">
              {!isAdmin && <InputGroup.Radio
                value={"option4"}
                name={number}
                aria-label="option 4"
              />}
              {isAdmin && "Option 4. "}
              <span className="question__options--optionText">
                {question.option4}
              </span>
            </div>
          </div>
        </InputGroup>
      </div>
      {isAdmin && (
        <div>
          <p
            style={{ margin: "5px" }}
          >{`Correct Answer: ${question[answer]}`}</p>
          <hr />
          <div className="question__content--editButtons">
            <div
              onClick={() => updateQuestionHandler(question)}
              style={{
                margin: "2px 8px",
                textAlign: "center",
                color: "rgb(68 177 49)",
                fontWeight: "500",
                cursor: "pointer",
              }}
              className='action-button'
            >{`Update`}</div>

            <div
              onClick={() => deleteQuestionHandler(question)}
              style={{
                margin: "2px 8px",
                textAlign: "center",
                color: "red",
                fontWeight: "500",
                cursor: "pointer",
              }}
              className='action-button'
            >{`Delete`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
