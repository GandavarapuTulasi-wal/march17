import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const Registration = () => {
  const [forums, setForums] = useState([]);
  let formik = useFormik({
    initialValues: {
      title: '',
      date: '',
      forumbody: '',
      author: '',
    },

    onSubmit(values) {
      const forumObject = {
        title: values.title,
        date: values.date,
        forumbody: values.forumbody,
        author: values.author,
      };
      axios
        .post('/forum', forumObject)
        .then((res) => {
          console.log(res.data.status);
          getForums();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      const errors = {};
      if (
        formik.values.title.length <= 10 ||
        formik.values.title.length >= 100
      ) {
        errors.title = '* min 10 characters and max 100 characters';
      }
      if (
        formik.values.forumbody.length <= 50 ||
        formik.values.forumbody.length >= 500
      ) {
        errors.forumbody = '* min 50 characters and max 500 characters';
      }
      if (
        formik.values.author.length <= 5 ||
        formik.values.author.length >= 50
      ) {
        errors.author = '* min 5 characters and max 50 characters';
      }
      if (!formik.values.author.match(/^[0-9a-zA-Z]+$/)) {
        errors.author = '* only alpha numberis';
      }
      return errors;
    },
  });
  const getForums = () => {
    axios
      .get('/forum')
      .then((res) => {
        setForums(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getForums();
  }, []);
  const deleteTodo = (indexToDelete) => {
    axios
      .delete('/forum/' + indexToDelete)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getForums();
  };
  const clearAll = () => {
    axios
      .get('/forum/clearall')
      .then((res) => {
        getForums();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div class="card-container">
      <h1>Forum Form</h1>
      <div class="box">
        <form onSubmit={formik.handleSubmit} noValidate className="Border">
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="todo-user-input"
            placeholder="Enter Title"
          />
          <br />
          <div className="text-danger">
            {formik.errors.title ? formik.errors.title : null}
          </div>
          <input
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            className="todo-user-input"
          />
          <textarea
            rows="7"
            cols="20"
            name="forumbody"
            value={formik.values.forumbody}
            onChange={formik.handleChange}
            className="todo-user-input"
            placeholder="Enter forum body"
          ></textarea>
          <div className="text-danger">
            {formik.errors.forumbody ? formik.errors.forumbody : null}
          </div>
          <input
            type="text"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            className="todo-user-input"
            placeholder="Enter Author"
          />
          <br />
          <div className="text-danger">
            {formik.errors.author ? formik.errors.author : null}
          </div>
          <div className="text">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <button
        onClick={() => {
          clearAll();
        }}
      >
        Clear all
      </button>
      <table id="products">
        <tr>
          <th>S.No</th>
          <th>Title</th>
          <th>Date of Creation</th>
          <th>Forum Body</th>
          <th>Author</th>
          <th>...</th>
        </tr>
        {forums.map((val, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{val.title}</td>
            <td>{val.date}</td>
            <td>{val.forumbody}</td>
            <td>{val.author}</td>
            <td>
              <button
                className="delete"
                onClick={() => {
                  deleteTodo(index);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default Registration;
