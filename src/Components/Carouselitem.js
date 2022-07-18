import axios from "axios";
import { useEffect, useState } from "react";
import CardOne from "./CardOne";

function Carouselitem() {

    return (
      // Carousel in Home page
      <div className="">
      <div id="carouselExampleControls" className="carousel slide carouselitem" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/GW/Unrec/Heros/under_1999_Tallhero_1500x600._CB634376407_.jpg" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wearables/Unrec/July/GW/Revised/Unrec_DesktopTallHero_3000x1200._CB633179863_.jpg" className="d-block w-100" alt="..."/>
        </div>
      </div>
      <button className="carousel-control-prev bg-secondary border border-2 carouselbar" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden m-2 ">Previous</span>
      </button>
      <button className="carousel-control-next bg-secondary border border-2 carouselbar1" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon bg-secondary" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

      </div>
    );
  }
  
  export default Carouselitem;
  