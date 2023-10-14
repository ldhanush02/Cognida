import { Route,Routes } from 'react-router-dom';
import './App.css';
import Myfooter from './Components/Myfooter';
import Myheader from './Components/Myheader';
import Home from './Components/Home';
import ProductDisplay from './Components/ProductDisplay';
import FilterDisplay from './Components/FilterDisplay';
import SearchDisplay from './Components/SearchDisplay';
import Login from './Components/Login';
import Register from './Components/Register';
import History from './Components/History';
import Cart from './Components/Cart';
import Prefered from './Components/Prefered';
function App() {
  return (
    <div className="Dhanush">
       {/*NavBar */}
    <Myheader/>
    {/*Routes to handle with different URL */}
    <Routes>
    <Route path="/products/:productId" element={<ProductDisplay />} />
    <Route path="/Filter/:FilterName" element={<FilterDisplay />} />
    <Route path="/search/:searchValue" element={<SearchDisplay />} />
    <Route path="/Register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/history" element={<History />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/prefered" element={<Prefered />} />
    <Route path="/" element={<Home/>} />
  </Routes>
     {/*Footer of the website */}
     <Myfooter/>
    </div>
  );
}

export default App;
