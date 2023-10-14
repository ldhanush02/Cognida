import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { clearLoginStatus } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Myheader() {
  
  const [searchValue,setSearchValue]=useState('');
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );
  let dispath = useDispatch();
  const navigate=useNavigate();
  const handleSubmit =(e)=>{
    e.preventDefault();
    navigate('/search/'+searchValue);
  }
  const loginfun=()=>{
    navigate('/login')
  }
  const logoutfun=()=>{
    localStorage.clear();
    dispath(clearLoginStatus());
    navigate("/");
  }
    return (
      // Navbar
      <div className="">
      <nav className="navbar shadow navbar-expand-xl navbar-dark bg-dark fixed-top ">
      <div className="container-fluid">
        <img  src="https://res.cloudinary.com/ddtaj2w6b/image/upload/v1658152850/Personal/FAKE_xyb37r.png" 
        width="70px" className="myimage  neon-text-noshwithbx"/>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active navitem me-5" aria-current="page" to="/"><i class="fa-solid fa-house"></i>Home</Link>
            </li>
            <li>
            <form className="formbar" role="search" onSubmit={handleSubmit}>
            <input className="form-control  navitem" type="search"  onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} placeholder="Search" aria-label="Search"/>
            <button className="btn bg-white text-black" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
            
            </li>
            <li className="nav-item mt-1">
            {
              (isSuccess==true)?(<>
            <button className="btn text-light bg-primary loginoutbutton  rounded navitem" onClick={logoutfun} type="submit"> Logout</button>
                
                </>)
                :
                (<>
             <button className="btn text-light bg-primary loginoutbutton rounded navitem" onClick={loginfun} type="submit"> Login/SignUp</button>
                  </>)
            }
            
            </li>
            <li className="nav-item">
              <Link className="nav-link navitem me-3" to="/cart"> <i class="fa-solid fa-cart-shopping"></i> Cart </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link navitem me-3" to="/history"> <i class="fa-solid fa-clock-rotate-left"></i>Orders </Link>
          </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle navitem" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-filter"></i>Filter
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item navitem" to="/Filter/electronics">Electronics</Link></li>
                <li><Link className="dropdown-item navitem" to="/Filter/men's clothing">Men</Link></li>
                <li><Link className="dropdown-item navitem" to="/Filter/women's clothing">Women</Link></li>
                <li><Link className="dropdown-item navitem" to="/Filter/jewelery">Jewelery</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item text-success navitem" to="/prefered">Most Prefered</Link></li>
              </ul>
            </li>
   
          </ul>
        </div>
      </div>
    </nav>
    {/* Bottom Navbar*/}
    <div>
 
    </div>
 
      </div>
    );
  }
  
  export default Myheader;
  