import axios from "axios";
import { useEffect, useState } from "react";
import CardOne from "./CardOne";
import Carouselitem from "./Carouselitem";
import { CirclesWithBar } from "react-loader-spinner";

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
 
      {
        (data1.length==0)?(<>
          <div className='homeloader'>
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
          <div>
          <Carouselitem/>
           </div>
          <div className="d-flex card-group Home body2">
          {
          data1.map((item,index)=>
                <CardOne item={item} index={index}/>
          )
          }
          </div>
          
          </>)
      }

      </div>
    );
  }
  
  export default Home;
  