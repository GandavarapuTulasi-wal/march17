import logo from './logo.svg';
import './App.css';
import Product from './Product';
import { Routes, BrowserRouter, Route, Link } from 'react-router-dom';
import Forum from './Forum';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <div>
            <h1 className="heading">Ecommerce app</h1>
          </div>
          <div className="nav">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/forum" className="link">
              Forum
            </Link>
            <Link to="/products" className="link">
              Product
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/forum" element={<Forum />}></Route>
          <Route path="/products" element={<Product />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
