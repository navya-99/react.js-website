import { useState } from "react";
import swal from "sweetalert";

const NewProduct = () => {

    let [productname, pickName] = useState("");
    let [productprice, pickPrice] = useState("");
    let [productimage, pickImage] = useState("");
    let [productdetail, pickDetail] = useState("");

    const saveProduct = () =>{
        let newproduct = {
            name : productname,
            price : productprice,
            photo : productimage,
            details : productdetail,
            sellerid : localStorage.getItem("sellerid")
        };
        let url = "http://localhost:1234/productlist";
        let postData={
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(newproduct)
        }
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverres=>{
            swal("New Product Added " + serverres.id, " Successfully !....", "success");
        })
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <h1 className="text-center text-success">Add New Product</h1>
            </div>
            <div className="row mt-3">
                <div className="col-lg-3"></div>

                <div className="col-lg-6 shadow-lg p-4">
                    <div className="mb-3">
                        <label>Name</label>
                        <input type="text" className="form-control" onChange={obj => pickName(obj.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label>Price</label>
                        <input type="number" className="form-control" onChange={obj => pickPrice(obj.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label>Photo</label>
                        <input type="text" className="form-control" onChange={obj => pickImage(obj.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label>Detail</label>
                        <input type="text" className="form-control" onChange={obj => pickDetail(obj.target.value)} />
                    </div>

                    <div className="text-center">
                        <button className="btn btn-primary" onClick={saveProduct}>Save</button>
                    </div>
                </div>

                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}

export default NewProduct;