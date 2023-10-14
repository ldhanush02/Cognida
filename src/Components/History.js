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
import CardOne from './CardOne';
import swal from 'sweetalert';
import CardThree from './CardThree';
import { CirclesWithBar } from 'react-loader-spinner';
function History() {
    const [data1,setData]=useState([]);
    const [cost,setCost]=useState(0);
    let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
      (state) => state.user
    );
    let navigate=useNavigate();
    useEffect(()=>{
      // Get Method to get Data of Products 
    if(isSuccess==true){
    axios.get('/order-api/getOrders/'+userObj.Name)
    .then((response)=>{
            setData(response.data.payload);
            console.log(response.data.payload)

       
            // console.log(cost)
           
    })
    .catch((err)=>{
        alert("Error occured while fetching data")
    })}},[])
    useEffect(()=>{
      var tcost=0;
      for(var item of data1){
          // cost=cost+(item.price)
          tcost=tcost+(item.noOfItems*item.price)
          console.log(item.noOfItems*item.price)
      }
      setCost(tcost.toFixed(3))

  },[data1])
    if(isSuccess==false){
      swal("Please First Login / Signup","To View Orders History","error")
      navigate('/login')
  }
   
  return (
    <div className='history body2'>
    <h5 className='text-center'>{userObj.Name} All Orders Worth<span className='text-success cardprice'> ${cost}</span></h5>
    {
      (data1.length==0)?(<>
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
                <h1>Please Purchase Something</h1>
        </>)
        :
        (<>
          {
            data1?.map((data,index)=>
                <CardThree item={data} key={index}/>
            
            )
        } 
          
          </>)
    }
 

    </div>
  );
}

export default History;