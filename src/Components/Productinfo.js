import axios from "axios";
import { useState,useEffect } from "react";
import ReactImageMagnify from 'react-image-magnify';
function Productinfo(props) {

    return (
      // Display of Individul Data Item in page-2 
      <div>
      
      <div className="d-flex prodinfo mb-2">
            <div className="prodinfo1 " >
            {/*<img src={props.item.image} className="prodpic"/>*/}
            <div className="prodpic">       
            <ReactImageMagnify  {...{
              smallImage: {
                  isFluidWidth: true,
                  src: props.item.image
              },
              largeImage: {
                  src: props.item.image,
                  width: 1200,
                  height: 1800
              }
             
          }} />    
          </div>
            </div>
            <div className="prodinfo2">
            <h1 className="title1">{props.item.title}</h1>
            <h1><span className="me-1 text-light bg-success rounded-pill p-2 rating2">  {props.item.rating.rate} <i class="fa-solid fa-star text-warning"></i></span><span className="itemtype">(  {props.item.category} )</span></h1>
            <hr className="ms-5 me-5"></hr>
            <h1 className="itemcost2 ">  $  {props.item.price}</h1>
            <p className="text-danger"> M.R.P. : <span className="prodcost">$1,299.00</span> </p>
            <hr className="ms-5 me-5"></hr>
            <div className="border border-2 ms-5 me-5 descriptionbody shadow">
            <h5 className="p-1 border-bottom iteminfo2">Description:</h5>
            <p className="proddescription text-center iteminfo3">{props.item.description}</p>
            </div>
            </div>
            <div className="prodinfo3">
            <div className="rounded-circle p-5 shadow border buydetails">
            <h1 className="text-success itemprice2">  $  {props.item.price}</h1>
            <p className="text-danger"> M.R.P. : <span className="prodcost">$1,299.00</span> </p>
            <h6><span className="text-info">FREE delivery :</span> July 21 - 22</h6>
            <h4><span className="text-success">Stock Avaliable : </span>{props.item.rating.count}</h4>
            <p className="text-center text-primary"><span><i class="fa-solid fa-location-dot"></i> </span>Select delivery location</p>
            <p className="bw-bold">Sold by <span className="fw-bold ">Cocoblu Retail</span> and Fulfilled by <span className="fw-bold">FakeShop</span></p>
            <button className="btn-grad10 d-block mx-auto shadow butt1"><i class="fa-solid fa-money-check-dollar"></i>Buy Now</button>
            <button className="btn-grad11 d-block mx-auto shadow butt1"> <i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            <h5 className="text-secondary"><i class="fa-solid fa-lock"></i> Secure Transaction</h5>

            </div>
            </div>
      </div>

      </div>
    );
  }
  
  export default Productinfo;
  