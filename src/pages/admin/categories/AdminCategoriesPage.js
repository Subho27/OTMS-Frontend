import React, { useEffect, useState } from "react";
import "./AdminCategoriesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Sidebar from "../../../components/Sidebar";
import {
  deleteCategory,
  fetchCategories,
} from "../../../actions/categoriesActions";
import {confirmation, notify} from "../../../components/Notify";

const AdminCategoriesPage = () => {
  const toastId = React.useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("jwtToken"));

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);

  const categoryClickHandler = (catId) => {
    navigate(`/adminQuizzes/?catId=${catId}`);
  };

  const addNewCategoryHandler = () => {
    navigate("/adminAddCategory");
  };

  const updateCategoryHandler = (event, category) => {
    event.stopPropagation();
    navigate(`/adminUpdateCategory/${category.catId}/`);
  };

  const deleteCategoryHandler = (event, category) => {
    event.stopPropagation();
    confirmation(
        "Are you sure?",
        "Once deleted, you will not be able to recover this subject!!",
        "warning",
        () => {
          deleteCategory(dispatch, category.catId, token).then((data) => {
            if (data.type === categoriesConstants.DELETE_CATEGORY_SUCCESS) {
              notify("Subject Deleted!", `${category.title} succesfully deleted`, "success");
            } else {
              notify("Subject Not Deleted!", `${category.title} not deleted`, "error");
            }
          });
        },
        () => {
          notify("Pheww!!!",`${category.title} is safe`, "success")
        },
        toastId.current
    )
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
    <div className="adminCategoriesPage__container">
      <div className="adminCategoriesPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminCategoriesPage__content">
        <h2 className='profile-heading text-center'>Subjects</h2>
        <div className="whole-list">
          {categories ? (
            categories.length === 0 ? (
                <Message>
                  No categories are present. Try adding some categories.
                </Message>
            ) : (
                categories.map((cat, index) => {
                  return (
                      <ListGroup
                          className="adminCategoriesPage__content--categoriesList"
                          key={index}
                      >
                        <ListGroup.Item
                            style={{ borderWidth: "0px"}}
                            className="custom-shadow"
                            onClick={() => categoryClickHandler(cat.catId)}
                        >
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">{cat.title}</div>
                            <div className='subject-describe'>{cat.description}</div>
                          </div>

                          <div
                              style={{
                                display: "flex",
                                height: "90%",
                                margin: "auto 2px",
                              }}
                          >
                            <div
                                onClick={(event) => updateCategoryHandler(event, cat)}
                                style={{
                                  margin: "2px 8px",
                                  textAlign: "center",
                                  color: "rgb(68 177 49)",
                                  fontWeight: "500",
                                  cursor:"pointer"
                                }}
                                className='action-button'
                            >Update</div>

                            <div
                                onClick={(event) => deleteCategoryHandler(event, cat)}
                                style={{
                                  margin: "2px 8px",
                                  textAlign: "center",
                                  color: "red",
                                  fontWeight: "500",
                                  cursor:"pointer"
                                }}
                                className='action-button'
                            >Delete</div>
                          </div>
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
          className="adminCategoriesPage__content--button"
          onClick={addNewCategoryHandler}
        >
          Add Subject
        </Button>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
