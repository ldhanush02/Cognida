
function Myheader() {
    return (
      // Navbar
      <div className="text-end">
      <nav className="navbar shadow navbar-expand-lg navbar-dark bg-dark fixed-top ">
      <div className="container-fluid">
        <img src="https://res.cloudinary.com/ddtaj2w6b/image/upload/v1658152850/Personal/FAKE_xyb37r.png" 
        width="70px" className="ms-5"/>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active navitem me-5" aria-current="page" href="/"><i class="fa-solid fa-house"></i>Home</a>
            </li>
            <li>
            <form className="d-flex" role="search">
            <input className="form-control navitem" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn bg-white text-black" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
            
            </li>
            <li>
            <form className="d-flex" role="search">
            <button className="btn text-light bg-primary ms-5 me-5 ps-5 pe-5 rounded navitem" type="submit"> Login/SignUp</button>
          </form>
            
            </li>
            <li className="nav-item">
              <a className="nav-link navitem me-3 ms-3" href="#"> <i class="fa-solid fa-cart-shopping"></i> Cart </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle navitem" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-filter"></i>Filter
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item navitem" href="#">Electronics</a></li>
                <li><a className="dropdown-item navitem" href="#">TVS & Applicances</a></li>
                <li><a className="dropdown-item navitem" href="#">Men</a></li>
                <li><a className="dropdown-item navitem" href="#">Women</a></li>
                <li><a className="dropdown-item navitem" href="#">Sports & More</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item text-success navitem" href="#">Today's Deals</a></li>
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
  