
import { useState, useEffect } from "react";
import swal from "sweetalert";

const Mycart = () => {
    let [allproduct, updateProduct] = useState([]);
    const getProduct = () => {
        fetch("http://localhost:1234/cartlist")
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray);
            })
    }

    useEffect(() => {
        getProduct();
    }, [1]);

    const changeQty = async (product, action) => {
        if (action === "A")
            product["qty"] = product.qty + 1;
        if (action === "B")
            product["qty"] = product.qty - 1;

        if (product.qty <= 0) {
            delItem(product.id, product.name); // delete from cart api if qty is 0
        } else {
            let url = "http://localhost:1234/cartlist/" + product.id
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: "PUT",
                body: JSON.stringify(product)
            };
            await fetch(url, postData)
                .then(response => response.json())
                .then(serverres => {
                    swal(product.name, " Quantity Updated in Cart !", "success");
                    getProduct();// reload the list with updated value
                })
                .catch(error => {
                    swal("Error", " While Updating Quantity", "error");
                })
        }
    }

    const delItem = async (id, name) => {
        let url = "http://localhost:1234/cartlist/" + id;
        let postData = { method: "DELETE" };
        await fetch(url, postData)
            .then(response => response.json())
            .then(emptyres => {
                swal(name, " Deleted from Cart !", "success");
                getProduct();// reload the list after delete
            }).catch(error => {
                swal("Error", " While Deleting From Cart", "error");
            })
    }
    let total = 0;

    let [fullname, pickName] = useState("");
    let [mobile, pickMobile] = useState("");
    let [email, pickEmail] = useState("");
    let [address, pickAddress] = useState("");

    //for validation

    let [nameError, updateNameError] = useState("");
    let [mobileError, updateMobileError] = useState("");
    let [emailError, updateEmailError] = useState("");
    let [addressError, updateAddressError] = useState("");

    const save = () => {
        let formstatus = true;
        if (fullname == "") {
            formstatus = false;
            updateNameError("Invalid Name!");
        }
        else {
            updateNameError("");
        }

        let mpattern = /^[0]?[6789]\d{9}$/; // expression start - /^, expression end - $/
        if ( !mpattern.test(mobile) ) {
            formstatus = false;
            updateMobileError("Invalid Mobile No!");
        }
        else {
            updateMobileError("");
        }

        let epattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( !epattern.test(email) ) {
            formstatus = false;
            updateEmailError("Invalid e-Mail Id!");
        }
        else {
            updateEmailError("");
        }

        if (address == "") {
            formstatus = false;
            updateAddressError("Invalid Address!");
        }
        else {
            updateAddressError("");
        }

        if(allproduct.length == 0){
            formstatus =  false;
        }

        if (formstatus === true) {
            let orderdata = {
                customername: fullname,
                mobile: mobile,
                email: email,
                address: address,
                itemlist: allproduct
            };
            let url = "http://localhost:1234/orderlist";
            let postdata = {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify(orderdata)
            }
            fetch(url, postdata)
                .then(response => response.json())
                .then(serverRes => {
                    swal("Order Id : " + serverRes.id, " Received Successfully !...", "success");
                })
        }
        else {
            swal("Input Error", "Please Enter Customer Details", "warning");
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4 pt-5">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white"> Enter Customer Details </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label> Customer Name </label>
                                <input type="text" className="form-control"
                                    onChange={obj => pickName(obj.target.value)} />
                                <small className="text-danger">{nameError}</small>
                            </div>

                            <div className="mb-3">
                                <label> Mobile No </label>
                                <input type="number" className="form-control"
                                    onChange={obj => pickMobile(obj.target.value)} />
                                <small className="text-danger">{mobileError}</small>
                            </div>

                            <div className="mb-3">
                                <label> e-Mail Id </label>
                                <input type="email" className="form-control"
                                    onChange={obj => pickEmail(obj.target.value)} />
                                <small className="text-danger">{emailError}</small>
                            </div>

                            <div className="mb-3">
                                <label> Delivery Address </label>
                                <textarea className="form-control"
                                    onChange={obj => pickAddress(obj.target.value)}></textarea>
                                <small className="text-danger">{addressError}</small>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-danger" onClick={save}> Place Order </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <h3 className="text-center">
                        Items in Cart : {allproduct.length}
                    </h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Photo</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.map((product, index) => {
                                    total = total + (product.price * product.qty);
                                    return (
                                        <tr key={index}>
                                            <td> {product.name} </td>
                                            <td> {product.price} </td>

                                            <td className="input-group">
                                                <button className="btn btn-info btn-sm"
                                                    onClick={changeQty.bind(this, product, "A")}>
                                                    <i className="fa fa-plus"></i>
                                                </button>

                                                <input type="text"
                                                    value={product.qty}
                                                    readOnly
                                                    size="5" />

                                                <button className="btn btn-warning btn-sm"
                                                    onClick={changeQty.bind(this, product, "B")}>
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                            </td>

                                            <td> {product.qty * product.price} </td>
                                            <td> <img src={product.photo} height="40" width="50" /> </td>
                                            <td className="text-center">
                                                <i className="fa fa-trash fa-2x text-danger"
                                                    onClick={delItem.bind(this, product.id, product.name)}></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan="4" className="text-end">
                                    Rs. {total}
                                </td>
                                <td colSpan="2"> Total Amount </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Mycart;