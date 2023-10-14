import 'animate.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useForm } from "react-hook-form";
import { AiFillYoutube,AiFillTwitterCircle } from "react-icons/ai";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../slices/userSlice';
import Loginpic from './Images1/Login.svg';
import Register from './Register';

import { MdOutlineAccountCircle } from "react-icons/md";
import { GrLogin } from "react-icons/gr";
import axios from 'axios';
import CardTwo from './CardTwo';
import swal from 'sweetalert';
import { CirclesWithBar } from 'react-loader-spinner';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Cart() {
  const [address,setAddress]=useState('');
    const [data1,setData]=useState([]);
    const [cost,setCost]=useState(0);
    let navigate=useNavigate();
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
    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
        (state) => state.user
      );
    useEffect(()=>{
      // Get Method to get Data of Products 
      if(isSuccess==true){
    axios.get('/cart-api/getProducts/'+userObj.Name)
    .then((response)=>{
            setData(response.data.payload);
            console.log(response.data.payload)
            console.log(data1)
       
            // console.log(cost)
           
    })
    .catch((err)=>{
        alert("Error occured while fetching data")
    })}
  }
    )
    if(isSuccess==false){
        swal("Please First Login / Signup","To View Cart","error")
        navigate('/login')
    }
    useEffect(()=>{
        var tcost=0;
        for(var item of data1){
            // cost=cost+(item.price)
            tcost=tcost+(item.noOfItems*item.price)
            console.log(item.price)
        }
        setCost(tcost.toFixed(3))

    },[data1])
    const buyAllItems=(e)=>{
      e.preventDefault();
      for(var item of data1){
        item.timeStramp=Date.now()
        item.address=address

      }
      axios.post('/cart-api/addAllItems/'+userObj.Name,data1)
      .then((response)=>{
              setData(response.data.payload);
              console.log(response.data.payload)
              console.log(data1)

              // console.log(cost)
             
      })
      .catch((err)=>{
          alert("Error occured while fetching data")
      })
    
      navigate('/history')
    }

  return (
    <div className='cart body2'>
  
    {
      (data1.length==0)?
      (<>
        <CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>
          <h1>Your cart is Empty</h1>
        </>)
        :
        (<>
          <h5 className='text-center'>Total Items in Cart Costs :<span className='text-success cardprice costprice'> ${cost}</span></h5>
          <div className='carttop'>
          <Button className="bg-success text-light ps-4 pe-4" 
          onClick={
            handleShow
          }>Buy All Items</Button>
          </div>
          {
            data1 && data1.map((data,index)=>
                <CardTwo item={data} key={index}/>
             
            )
        }
          
          </>)
    }
    <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header>
      <Offcanvas.Title>Place Order</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
    <form className="" role="search" onSubmit={buyAllItems} >
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
  );
}

export default Cart;