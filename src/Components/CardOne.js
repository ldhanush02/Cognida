import React from "react";
import { useNavigate } from "react-router-dom";


function CardOne(props) {
  const navigate=useNavigate();
  // To Navigate to another page(page-2) when card is clicked
  const shiftToProduct=()=>{
      navigate('/products/'+props.item.id)
  }
  return (
    // Card in Home page to show Products
    <div className="card-group ">
    <a onClick={shiftToProduct}>
    <div className="card" style={{width: '20rem',height:'35rem'}}>
  <img src={props.item.image} className="card-img-top cardimg p-4" alt="image not loaded"/>
  <div className="card-body">
    <p className="card-text cardtitle">{props.item.title}  <span className="ms-2 bg-success text-light rounded p-1"> {props.item.rating.rate} <i class="fa-solid fa-star text-warning"></i></span> </p>
    <p className="card-text"><span className="text-success fw-bold me-2 cardprice">$ {props.item.price}</span> <span className="text-danger">M.R.P. : <span className="prodcost">$1,299.00</span></span>
    </p>
    <h6><span className="text-success">FREE delivery </span>July 21 - 22</h6>
  
  </div>
</div>
</a>
    </div>
  );
}

export default CardOne;
