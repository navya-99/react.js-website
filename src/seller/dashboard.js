import { useState, useEffect } from "react";

const Mydashboard = () =>{ 

    let [allproduct, updateProduct] = useState( [] );
    const getProduct = () => {
        let url = "http://localhost:1234/productlist?sellerid=" + localStorage.getItem("sellerid");
        fetch(url)
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            })
    } 

    let [orderlist, updateOrder] = useState([]);
    const getOrder = () => {
        fetch("http://localhost:1234/orderlist")
            .then(response => response.json())
            .then(orderArray => {
                updateOrder(orderArray.reverse()); //recent order will come on the top after adding reverse
            })
    }

    useEffect(() => {
        getProduct();
        getOrder();
    }, [1]); 

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="text-center"> Dashboard </h1>
                    <p className="text-center"> 
                        Hi, {localStorage.getItem("fullname")} - How Are You Today ?
                    </p>
                </div>
            </div>

            <div className="row mt-4 text-center">
                <div className="col-lg-2"></div>
                <div className="col-lg-4">
                    <i className="fa fa-database fa-5x text-info"></i>
                    <h3> Items in Stock - {allproduct.length} </h3>
                </div>
                <div className="col-lg-4">
                    <i className="fa fa-phone fa-5x text-success"></i>
                    <h3> Order Received - {orderlist.length} </h3>
                </div>
                <div className="col-lg-2"></div>
            </div>

        </div>
    )
}

export default Mydashboard;