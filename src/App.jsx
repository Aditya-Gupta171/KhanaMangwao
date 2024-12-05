import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import signup from "./screens/signup.jsx";
import { CartProvider } from "./components/ContextReducer.js";


function App() {
  return (
    <CartProvider>
       <Router>
      <div>
        <Routes>
          <Route path="/" Component={Home}/> 
          <Route path="/login" Component={Login}/>
           <Route path="createuser" Component={signup}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
   
  );
}

export default App;
