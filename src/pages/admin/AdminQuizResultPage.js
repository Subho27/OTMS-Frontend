import React, { useEffect, useState } from "react";
import SidebarUser from "../../components/SidebarUser";
import "../users/UserQuizResultPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuizResult } from "../../actions/quizResultActions";
import * as quizResultConstants from "../../constants/quizResultConstants";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import './AdminQuizResultPage.css'
import Sidebar from "../../components/Sidebar";

const AdminQuizResultPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizResultReducer = useSelector((state) => state.quizResultReducer);
  const [quizResults, setQuizResults] = useState(null);
  const [students, setStudents] = useState(null);
  const token = JSON.parse(localStorage.getItem("jwtToken"));
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.userId : null;

  useEffect(() => {
    if (quizResults == null)
      fetchQuizResult(dispatch, null, token).then((data) => {
        if (data.type === quizResultConstants.FETCH_QUIZ_RESULT_SUCCESS) {
          setQuizResults(data.payload);
        }
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);


  return (
    <div className="userQuizResultPage__container">
      <div className="userQuizResultPage__sidebar">
        <Sidebar />
      </div>

      <div className="userQuizResultPage__content">
        <div className='text-start profile-heading'>
          <h2 className='text-center'>All Participants Results</h2>
        </div>
        {quizResults && quizResults.length !== 0 ? (
          <Table className="userQuizResultPage__content--table">
            <thead>
              <tr>
                <th className='poppins-bold'>Quiz Id</th>
                <th className='poppins-bold'>Quiz Name</th>
                <th className='poppins-bold'>Subject Name</th>
                <th className='poppins-bold'>Participant Name</th>
                <th className='poppins-bold'>Obtained Marks</th>
                <th className='poppins-bold'>Total Marks</th>
                <th className='poppins-bold'>Date</th>
              </tr>
            </thead>
            {quizResults.map((r, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td className='poppins-light'>{r.quiz.quizId}</td>
                    <td className='poppins-light'>{r.quiz.title}</td>
                    <td className='poppins-light'>{r.quiz.category.title}</td>
                    <td className='poppins-light'>{r.name}</td>
                    <td className='poppins-light'>{r.totalObtainedMarks}</td>
                    <td className='poppins-light'>{r.quiz.numOfQuestions * 5}</td>
                    <td className='poppins-light'>{r.attemptDatetime}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        ) : (
          <Message>
            No results to display.
          </Message>
        )}
      </div>
    </div>
  );
};

export default AdminQuizResultPage;
