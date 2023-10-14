import axios from "axios";
import { useState,useEffect } from "react";
import ReactImageMagnify from 'react-image-magnify';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
function Productinfo(props) {
  const [address,setAddress]=useState('');
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );
  const [show, setShow] = useState(false);
  const handleClose = (e) => {
    e.preventDefault()
    console.log("handle")
    setShow(false);
  
  }
  const handleShow = (e) => {
    e.preventDefault()
    setShow(true);
  
  }
  const navigate=useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = (e) => {
    e.preventDefault()
    setQuantity(quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault()
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const buynow=(e)=>{
    e.preventDefault();
      if(isSuccess==true){
        let obj=props.item;
        obj.noOfItems=quantity;
        obj.UserName=userObj.Name; 
        obj.timeStramp=Date.now();
        obj.address=address;
        console.log(obj)
        axios.post('/order-api/addToOrder',obj)
        .then((response)=>{
                console.log(response.data)
                swal('Order Placed',props.item.title,'success')
                navigate('/history')
    
        })
        .catch((err)=>{
            alert("Error occured while fetching data")
        })

      }
     
      else{
        swal('Please First login','To place order','error')
        navigate('/login')
      }
      

  }


  const addToCart=(e)=>{
    e.preventDefault();
    if(isSuccess==true){
    let obj=props.item;
    obj.noOfItems=quantity;
    obj.UserName=userObj.Name; 
    obj.timeStramp=Date.now();
    console.log(obj)
    axios.post('/cart-api/addToCart',obj)
    .then((response)=>{
            console.log(response.data)
            swal('Added to Cart','','success')
            navigate('/cart')

    })
    .catch((err)=>{
        alert("Error occured while fetching data")
    })
  }
  else{
    swal('Please First Login','To add to cart','error')
    navigate('/login')
  }
  }


    return (
      // Display of Individul Data Item in page-2 
      <div>
      
      <div className="d-flex prodinfo mb-2">
            <div className="prodinfo1 " >
            {/*<img src={props.item.image} className="prodpic"/>*/}
            <div className="prodpic">       
            <ReactImageMagnify  {...{
              smallImage: {
                  isFluidWidth: true,
                  src: props.item.image
              },
              largeImage: {
                  src: props.item.image,
                  width: 1200,
                  height: 1800
              }
             
          }} />    
          </div>
            </div>
            <div className="prodinfo2 text-center">
            <h1 className="title1">{props.item.title}</h1>
            <h1><span className="me-1 text-light bg-success rounded-pill p-2 rating2 myinfo">  {props.item.rating.rate} <i class="fa-solid fa-star text-warning"></i></span><span className="itemtype myinfo">(  {props.item.category} )</span></h1>
            <hr className="ms-5 me-5"></hr>
            <h1 className="itemcost2 ">  $  {props.item.price}</h1>
            <p className="text-danger"> M.R.P. : <span className="prodcost">$1,299.00</span> </p>
            <hr className="ms-5 me-5"></hr>
            <div className="border border-2 ms-5 me-5 descriptionbody shadow">
            <h5 className="p-1 border-bottom iteminfo2 myinfo">Description:</h5>
            <p className="proddescription text-center iteminfo3 myinfo">{props.item.description}</p>
            </div>
            </div>
            <div className="prodinfo3 text-center">
            <div className="shadow border buydetails">
            <h1 className="text-success itemprice2 myres">  $  {props.item.price}</h1>
            <p className="text-danger myres"> M.R.P : <span className="prodcost mx-auto">$1,299.00</span> </p>
            <h6 className="myres"><span className="text-info">FREE delivery :</span> Oct 20 - 22</h6>
            <h6 className="text-success myres"> Number of items</h6>
            <div className="quantity-controls mx-auto d-block">
            <button onClick={handleDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
            <p className="bw-bold ">Sold by<span className="mybold ">Cocoblu Retail</span> and Fulfilled by <span className="mybold">FakeShop</span></p>
            <button className="btn-grad10 d-block mx-auto shadow butt1" onClick={handleShow}><i class="fa-solid fa-money-check-dollar"></i>Buy Now</button>
            <button className="btn-grad11 d-block mx-auto shadow butt1" onClick={addToCart}> <i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            <h5 className="text-secondary text-center myreshv"><i class="fa-solid fa-lock"></i> Secure Transaction</h5>

            </div>
            </div>
      </div>
      <div>

    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header>
        <Offcanvas.Title>Place Order</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <form className="" role="search" onSubmit={buynow} >
      <label>Enter Delivery Address</label>
      <input className="form-control  navitem" type='text' required onChange={(e)=> setAddress(e.target.value)} value={address} placeholder="Enter address" aria-label="Search"/>
      <div className="sidebarbutton">
      <button className="btn bg-success text-light"  type="submit">Make payment</button>
      <button className="btn bg-danger text-light" onClick={handleClose} >Cancel</button>
      </div>
    </form>
      </Offcanvas.Body>
    </Offcanvas>

      </div>

      </div>
    );
  }
  
  export default Productinfo;
  