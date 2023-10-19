import { useState, useEffect } from "react";
import swal from "sweetalert";

const Myregsiter=()=>{

    let [sellername,pickSeller]=useState("");
    let [mobile,pickMobile]=useState("");
    let [email,pickEmail]=useState("");
    let [password,pickPassword]=useState("");
    let [address,pickAddress]=useState("");
    let [pincode,pickPincode]=useState("");

    const save=()=>{
        let orderdata={
            seller:sellername, 
            mobile:mobile, 
            email:email, 
            password:password,
            address:address,
            pincode:pincode
        };
        let url="http://localhost:1234/account";
        let postData={
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(orderdata)
        }
        fetch(url, postData)
        .then(response=>response.json())
        .then(serverRes=>{
            swal("Account Created : " + serverRes.id, " Successfully !....", "success");
        })
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3"></div>
                
                <div className="col-lg-6">
                    <h4 className="text-center">Create New Account</h4>
                    <div className="p-3 shadow-lg rounded">
                    <div className="card border-0">
                       
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Seller Name</label>
                                <input type="text" className="form-control" 
                                onChange={obj=>pickSeller(obj.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label>Mobile No</label>
                                <input type="number" className="form-control"
                                 onChange={obj=>pickMobile(obj.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label>Email Id</label>
                                <input type="email" className="form-control"
                                 onChange={obj=>pickEmail(obj.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input type="password" className="form-control"
                                 onChange={obj=>pickPassword(obj.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label>Address</label>
                                <textarea className="form-control"
                                 onChange={obj=>pickAddress(obj.target.value)}>
                                 </textarea>
                            </div>

                            <div className="mb-3">
                                <label>Pincode</label>
                                <input type="number" className="form-control"
                                 onChange={obj=>pickPincode(obj.target.value)}/>
                            </div>
                            
                            <div className="text-center">
                                <button className="btn btn-danger" onClick={save}>Save</button>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>

                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}
export default Myregsiter;