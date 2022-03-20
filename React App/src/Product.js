import axios from 'axios';
import { useEffect, useState } from 'react';

function ProductServer() {
  let [products, setProduct] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    axios
      .get('/products')
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addProduct = (event) => {
    event.preventDefault();
    const productObject = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      category: event.target.category.value,
      status: event.target.status.value,
    };
    axios
      .post('/products', productObject)
      .then((res) => {
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTodo = (indexToDelete) => {
    axios
      .delete('/products/' + indexToDelete)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getProducts();
  };
  const deleteAll = () => {
    axios
      .get('/products/deleteall')
      .then((res) => {
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card-container">
      <h1>Product Form</h1>
      <form onSubmit={addProduct} className="box">
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          className="todo-user-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          className="todo-user-input"
        />
        <textarea
          cols="20"
          rows="5"
          placeholder="Enter Description"
          name="description"
          className="todo-user-input"
        ></textarea>
        <select name="category" className="todo-user-input">
          <option value="toys">Toys</option>
          <option value="clothes">Clothes</option>
          <option value="fooditems">Food Items</option>
        </select>
        <select name="status" className="todo-user-input">
          <option value="available">available</option>
          <option value="notavailable">notavailable</option>
        </select>
        <button>Add</button>
      </form>
      <button
        onClick={() => {
          deleteAll();
        }}
      >
        Delete all
      </button>
      <table id="products">
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>category</th>
          <th>Status</th>
          <th>...</th>
        </tr>
        {products.map((val, index) => (
          <tr>
            <td className="item">{val.name}</td>
            <td>${val.price}</td>
            <td>{val.description}</td>
            <td>{val.category}</td>
            <td>{val.status}</td>
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
}
export default ProductServer;
