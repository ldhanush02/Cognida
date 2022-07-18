import { Route,Routes } from 'react-router-dom';
import './App.css';
import Myfooter from './Components/Myfooter';
import Myheader from './Components/Myheader';
import Home from './Components/Home';
import ProductDisplay from './Components/ProductDisplay';
function App() {
  return (
    <div className="App">
       {/*NavBar */}
    <Myheader/>
    {/*Routes to handle with different URL */}
    <Routes>
    <Route path="/products/:productId" element={<ProductDisplay />} />
    <Route path="/" element={<Home/>} />
  </Routes>
     {/*Footer of the website */}
     <Myfooter/>
    </div>
  );
}

export default App;
