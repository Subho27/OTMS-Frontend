import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./AdminAddQuiz.css";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar";
import FormContainer from "../../../components/FormContainer";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import { addQuiz } from "../../../actions/quizzesActions";
import { fetchCategories } from "../../../actions/categoriesActions";
import {notify} from "../../../components/Notify";

const AdminAddQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxMarks, setMaxMarks] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickPublishedHandler = () => {
    setIsActive(!isActive);
  };

  const onSelectCategoryHandler = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedCategoryId !== null && selectedCategoryId !== "n/a") {
      const quiz = {
        title: title,
        description: description,
        isActive: isActive,
        category: {
          catId: selectedCategoryId,
          title: categories.filter((cat) => cat.catId == selectedCategoryId)[0][
            "title"
          ],
          description: categories.filter(
            (cat) => cat.catId == selectedCategoryId
          )[0]["description"],
        },
      };
      addQuiz(dispatch, quiz, token).then(async (data) => {
        if (data.type === quizzesConstants.ADD_QUIZ_SUCCESS)
          notify("Quiz Added!", `${quiz.title} succesfully added`, "success");
        else {
          notify("Quiz Not Added!", `${quiz.title} not added`, "error");
        }
        navigate("/adminQuizzes");
      });
    } else {
      notify("Data Invalid", "Select valid subject!", "warning");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories(dispatch, token).then((data) => {
        setCategories(data.payload);
      });
    }
  }, []);

  return (
    <div className="adminAddQuizPage__container">
      <div className="adminAddQuizPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminAddQuizPage__content">
        <FormContainer>
          <h2 className='profile-heading text-center'>Add Quiz</h2>
          <Form onSubmit={submitHandler} className='custom-form'>
            <Form.Group className="my-3" controlId="title">
              <Form.Label className='poppins-light'>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Quiz Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-3" controlId="description">
              <Form.Label className='poppins-light'>Description</Form.Label>
              <Form.Control
                style={{ textAlign: "top" }}
                as="textarea"
                rows="3"
                type="text"
                placeholder="Enter Quiz Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group className="my-3" controlId="maxMarks">
              <Form.Label>Maximum Marks</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Maximum Marks"
                value={maxMarks}
                onChange={(e) => {
                  setMaxMarks(e.target.value);
                }}
              ></Form.Control>
            </Form.Group> */}

            {/* <Form.Group className="my-3" controlId="numberOfQuestions">
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Number of Questions"
                value={numberOfQuestions}
                onChange={(e) => {
                  setNumberOfQuestions(e.target.value);
                }}
              ></Form.Control>
            </Form.Group> */}

            {/*<Form.Check*/}
            {/*  className="my-3"*/}
            {/*  type="switch"*/}
            {/*  id="publish-switch"*/}
            {/*  label="Publish Quiz"*/}
            {/*  onChange={onClickPublishedHandler}*/}
            {/*  checked={isActive}*/}
            {/*/>*/}

            <div className="my-3">
              <label htmlFor="category-select" className='poppins-light' style={{ paddingBottom:"8px" }}>Choose a Subject:</label>
              <Form.Select
                aria-label="Choose Subject"
                id="category-select"
                onChange={onSelectCategoryHandler}
              >
                <option value="n/a">Choose Subject</option>
                {categories ? (
                  categories.map((cat, index) => (
                    <option key={index} value={cat.catId}>
                      {cat.title}
                    </option>
                  ))
                ) : (
                  <option value="">Choose one from below</option>
                )}
                {/* <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option> */}
              </Form.Select>
            </div>
            <Button
                className="my-3 adminAddQuizPage__content--button"
                type="submit"
                variant=""
            >
              Add
            </Button>
          </Form>
        </FormContainer>
      </div>
    </div>
  );
};

export default AdminAddQuiz;
