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
function Prefered() {
    const [data1,setData]=useState([]);

    useEffect(()=>{
        axios.get('/order-api/mostPrefered')
        .then((response)=>{
                setData(response.data.payload);
                console.log(response.data.payload)
    
           
                // console.log(cost)
               
        })
        .catch((err)=>{
            alert("Error occured while fetching data")
        })
    },[])


   
  return (
    <div className='Prefered body2'>
    <h5> Most Prefered Items</h5>
    {
      (data1.length==0)?(<>
        <div className="homeloader3">
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
      <h6 className="text-success">Loading ...</h6>  
      </div>
        </>)
        :
        (<>
            <div className='mycollections'>
            <div className='d-flex card-group Home'>
          {
            data1?.map((data,index)=>
                <CardOne item={data} key={index}/>
            
            )
        } 
        </div>

          </div>
          </>)
    }
 

    </div>
  );
}

export default Prefered;