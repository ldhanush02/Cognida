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

function Login() {
  let [logInData,newlogInData]=useState([]);
  let navigate=useNavigate();
  let { userObj, isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );
  let dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors} } = useForm();
  const onSubmit = data =>{ 
      newlogInData([...logInData,data]);
      console.log(data)
      dispatch(userLogin(data));

    };
    useEffect(() => {
      if (isSuccess) {
        navigate("/");
      }
    }, [isSuccess, isError]);
       navigate=useNavigate();
      const TranferToRegister =()=>{
        navigate('/Register')
      }

  return (
    <div className='login body1'>
    <div className="App">
     <img  className="w-50 d-block mx-auto rounded" src="https://res.cloudinary.com/ddtaj2w6b/image/upload/v1654702034/Personal/LD_uqxuwk.png"/>
    <h1 className='display-4 title mt-3 mb-5 text-center'>DHANUSH LOKAM</h1>
    </div>
    <div className='form container'>
    <Tabs defaultActiveKey="Log In" id="uncontrolled-tab-example" className="mb-3 tab">
  <Tab eventKey="Log In" title="Log In">
    <img src={Loginpic} className="w-25 mx-auto d-block"/>
    <Form onSubmit={handleSubmit(onSubmit)} className='shadow-lg text-center border rounded border-2 border-dark  w-50 p-3 m-1 mt-3 mx-auto form1 bg-white'> 
      
  <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
    <Form.Control type="text" placeholder="Username" {...register("Name",{required: true})}  />
    {errors.Name?.type==='required' && <p className='text-danger text-start '>*This field is required</p>}
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Control type="password" placeholder="Password" {...register("Password",{required: true})} />
    {errors.Password?.type==='required' && <p className='text-danger text-start '>*This field is required</p>}
  </Form.Group>
  <Button variant="primary" size="lg" className='w-100' type='submit'>
   Log In<GrLogin/> 
  </Button>
    <hr></hr>
    <Button variant="success" size="lg" className='w-100' onClick={TranferToRegister}
   > Create New Account<MdOutlineAccountCircle/>
  </Button>
  <div className='socialiconsparent'>
   <div><span className="socialicons text-primary "> <FaFacebook/></span></div>
   <div><span className="socialicons text-warning "><BsInstagram/></span></div>
   <div><span className="socialicons text-primary "><AiFillTwitterCircle/></span></div>
   <div><span className="socialicons text-danger "><AiFillYoutube/></span></div>
  </div>
</Form>
<p className='mt-2 pt-2 text-center'><span className='fw-bold'>Create a Page</span> for a celebrity, brand or business.</p>

  </Tab>
  <Tab eventKey="Register" title="Register">
    <Register/>
  </Tab>

</Tabs>
    
    </div>
    </div>
  );
}

export default Login;