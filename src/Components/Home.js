import axios from "axios";
import { useEffect, useState } from "react";
import CardOne from "./CardOne";
import Carouselitem from "./Carouselitem";

function Home() {
  // Data of Products
    const [data1,setData]=useState([]);
    useEffect(()=>{
      // Get Method to get Data of Products 
    axios.get('https://fakestoreapi.com/products')
    .then((response)=>{
            setData(response.data);
            console.log(response.data)
           
    })
    .catch((err)=>{
        alert("Error occured while fetching data")
    })},[])
    return (
      // Home page
      <div>
      <div>
      <Carouselitem/>
      </div>
      <div className="d-flex card-group Home body1">
      {
      data1.map((item,index)=>
            <CardOne item={item} index={index}/>
      )
      }
      </div>
      </div>
    );
  }
  
  export default Home;
  