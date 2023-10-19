import { useState } from "react";
import swal from "sweetalert";

const Mylogin = () =>{
    let[username, pickUserName] = useState("");
    let[password, pickPassword] = useState("");
    
    const Login = () =>{
        let url = "http://localhost:1234/account?email="+username+"&password="+password; //query string
        fetch(url)
        .then(response=>response.json())
        .then(userinfo=>{
            if(userinfo.length == 0){
                swal("Error", "Invalid or Not Exists", "warning");
            }
            else{
                localStorage.setItem("sellerid", userinfo[0].id);
                localStorage.setItem("fullname", userinfo[0].seller);
                window.location.href="http://localhost:3000/#/";
                window.location.reload();//reload the page after login is successful
            }
        })
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="border p-4 rounded">
                        <h3 className="text-center"> Seller login </h3>
                        <div className="mb-4">
                            <label> e-Mail Id </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            onChange={obj=>pickUserName(obj.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label> Password </label>
                            <input 
                            type="password" 
                            className="form-control"
                            onChange={obj=>pickPassword(obj.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={Login}> Login </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Mylogin;