import axios from "axios";
import { useState,useEffect } from "react";
import Productinfo from "./Productinfo";
import { useParams } from "react-router-dom"
import { CirclesWithBar } from "react-loader-spinner";
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
      <div>
      {
        (dataProduct1.length==0)?(<>
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
          <div className="container-fluid productinfo">
          {
            dataProduct1.map((item,index)=>
                  <Productinfo item={item} index={index}/>
            )
            }
          </div>
          
          </>)
      }
      </div>
 
    );
  }
  
  export default ProductDisplay;
  