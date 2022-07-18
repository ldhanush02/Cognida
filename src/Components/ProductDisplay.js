import axios from "axios";
import { useState,useEffect } from "react";
import Productinfo from "./Productinfo";
import { useParams } from "react-router-dom"
function ProductDisplay() {
    // To retrieve ID Number in URL
    const {productId}=useParams();
    // Product Data
    const [dataProduct1,setDataProduct]=useState([]);
    // Retrieving Product Data with ID number with get method 
    useEffect(()=>{
    axios.get('https://fakestoreapi.com/products/'+productId)
    .then((response)=>{
            setDataProduct([response.data]);
            console.log(response.data)
           
    })
    .catch((err)=>{
        alert("Error occured while fetching data")
    })},[])
    return (
      // Card Composition
      <div className="container-fluid productinfo">
      {
        dataProduct1.map((item,index)=>
              <Productinfo item={item} index={index}/>
        )
        }
      </div>
    );
  }
  
  export default ProductDisplay;
  