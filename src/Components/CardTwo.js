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
import { RiDeleteBin3Fill } from "react-icons/ri";
import swal from 'sweetalert';
import Offcanvas from 'react-bootstrap/Offcanvas';
function CardTwo(props) {
    // console.log(props)
    // console.log("hai")
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
    const itemDelete=(e)=>{
      e.preventDefault();
      axios.delete('/cart-api/deleteCart/'+props.item.timeStramp+"/"+userObj.Name)
      .then((response)=>{
        swal("Deleted from Cart","","success")
      })
      .catch((err)=>{
        swal('Something went wrong in deleting product','check please','error')
      })
    }
    const placeOrder=(e)=>{
      e.preventDefault();
      if(isSuccess==true){

        axios.delete('/cart-api/deleteCart/'+props.item.timeStramp+"/"+userObj.Name)
        .then((response)=>{
          swal("Deleted from Cart","","success")
        })
        .catch((err)=>{
          swal('Something went wrong in deleting product','check please','error')
        })

        let obj=props.item;
        obj.timeStramp=Date.now()
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
  return (
    
    <div className="cardtwo border border-2 shadow-lg w-50 h-50 mb-3 mt-3 pt-2 pb-2 ">
    <div className="row no-gutters">
      <div className="col-md-4">
        <img src={props.item.image} className="d-block mx-auto card-img w-50" alt="alternate"/>
      </div>
      <div className="col-md-8">
        <div className="card-body carttextbody">
         
          <h4 className="card-text cardtitle carttextbody1">{props.item.title}  </h4>
          <h5 className='carttextbody1'> Rating : <span className="text-light bg-success rounded ps-1 pe-1 " style={{ display: 'inline-block' }}>{props.item.rating.rate} <i class="fa-solid fa-star text-warning"></i></span></h5>
          <h5 className="card-title  carttextbody1">No of Items : <span className="text-success carttextbody1" >{props.item.noOfItems}</span></h5>
          <p className="card-text carttextbody1"><h5 className='d-inline carttextbody1'>Cost:</h5><span className="text-success fw-bold me-2 cardprice carttextbody1" style={{ display: 'inline-block' }}>${props.item.price}</span></p>
          <div className='buttonflex'>
          <Button className="bg-success text-light  mybtn1" 
          onClick={
            handleShow
          }>Buy Item</Button>
          <Button className="bg-danger text-light mybtn2" 
          onClick={
            itemDelete
          }><span className='niceicon'><RiDeleteBin3Fill/></span></Button>
          </div>
       
        </div>
      </div>
    </div>
    <Offcanvas show={show} onHide={handleClose}>
    <Offcanvas.Header>
      <Offcanvas.Title>Place Order</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
    <form className="" role="search" onSubmit={placeOrder} >
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

export default CardTwo;