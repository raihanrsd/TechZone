import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchBar from "./searchBar";
import Sidebar from "./sidebar";
import Product from "./product";
import PageFooter from "../ReUse/PageFooter";

import "./filter-css/filterPage.css";

export default function FilterPage({ isAuthenticated, Category, setCartCounter }) {
  console.log("FilterPage hello");

  const [products, setProducts] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("ASC");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/shop`,
          {
            method: "GET",
            headers: { token: localStorage.token },
          }
        );

        const parseRes = await response.json();

        console.log(parseRes);
        console.log("we are here in filter page");

        setProducts(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    };

    getProducts(); // Call the function to fetch products when the component mounts
  }, []);

  return (
    <Fragment>
      <SearchBar
            num={products.length}
            products={products}
            setProducts={setProducts}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            Category={Category}
      />
      <div className="side-product">
        <Sidebar
            products={products}
            setProducts={setProducts}
            searchInput={searchInput}
            sortBy={sortBy}
            sortOrder={sortOrder}
        />
        <Product isAuthenticated={isAuthenticated} props={products} setCartCounter={setCartCounter} />
      </div>
      <PageFooter />
    </Fragment>
  );
}
