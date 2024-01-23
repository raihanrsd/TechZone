import React, { Fragment, useState, useEffect } from "react";

import "../css/product.css";

export default function ProductCard(props) {
    return(
        <div class="card" style={{width: '18rem', padding : 10, borderRadius: 10}}>
            <img class="card-img-top " src={props.item.img}  alt="Card image"/>
            <div class="card-body">
                <h6 class="card-title" style={{fontWeight : 700, fontSize : 18}}>{props.item.name}</h6>

                <ul className="specs">
                <li>Processor: <b>{props.item.processor}</b></li>
                <li>Ram: <b>{props.item.ram}</b></li>
                <li>Storage: <b>{props.item.storage}</b></li>
                <li>Display: <b>{props.item.display}</b></li>
                </ul>

                <hr/>
                <h5 class="text-danger mt-3 text-center" style={{fontWeight : 700, fontSize : 26}}>${props.item.price}</h5>
                <hr/>

                <button className="btn btn-lg btn-warning w-100 fs-6" style={{height: '50px', border: '1px solid black'}}><i class="fa-solid fa-cart-shopping"></i> Purchase </button>
            </div>
        </div>
    )
}