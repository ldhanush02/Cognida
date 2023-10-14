import axios from "axios";
import { useState,useEffect } from "react";
import Productinfo from "./Productinfo";
import { useParams } from "react-router-dom"
import CardOne from "./CardOne";
import { CirclesWithBar } from "react-loader-spinner";
function FilterDisplay() {
    // To retrieve ID Number in URL
    const {FilterName}=useParams();
    // Product Data
    const [dataProduct1,setDataProduct]=useState([]);
    // Retrieving Product Data with ID number with get method 
    useEffect(()=>{
    axios.get('https://fakestoreapi.com/products/'+'category/'+FilterName)
    .then((response)=>{
            setDataProduct(response.data);
            console.log(response.data)
           
    })
    .catch((err)=>{
        alert("Error occured while fetching data")
    })},[FilterName])
    return (
      // Home page
      <div className="body1">
      {
        (dataProduct1.length==0)?(<>
          <div className='homeloader2'>
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
      <div className="filterhome">
 
          <div className="d-flex card-group Home2">
          {
          dataProduct1.map((item,index)=>
                <CardOne item={item} index={index}/>
          )
          }
          </div>
      </div>

          </>)
      }
  

      </div>
    );
  }
  
  export default FilterDisplay;
  