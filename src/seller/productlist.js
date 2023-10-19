import { useState, useEffect } from "react";
import swal from "sweetalert";

const ProductList = () => {

    let [allproduct, updateProduct] = useState( [] );
    const getProduct = () => {
        let url = "http://localhost:1234/productlist?sellerid=" + localStorage.getItem("sellerid");
        fetch(url)
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            })
    }

    useEffect(() => {
        getProduct();
    }, [1]);

    const delitem = (id, name) => {
        let url = "http://localhost:1234/productlist/" + id;
        let postData = { method : "DELETE" };
        fetch(url, postData)
        .then(response => response.json())
        .then(emptyres=>{
            swal(name,"Item Deleted Successfully!","success");
            getProduct();
        })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="text-center text-primary mb-4">
                        <i className="fa fa-table"></i> Manage Product : {allproduct.length}</h1>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Details</th>
                                <th>Price</th>
                                <th>Photo</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.map((item, index2) => {
                                    return (
                                        <tr key={index2}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.details}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <img src={item.photo} height="30" width="50" />
                                            </td>
                                            <td>
                                                <i onClick={delitem.bind(this, item.id, item.name)} className="fa fa-trash text-danger fa-lg"></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList;