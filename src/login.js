import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Mylogin = () =>{
    let[myemai, pickEmail] = useState("");
    let[mypassword, pickPassword] = useState("");


    const LoginCheck = () =>{
        let url = "http://localhost:4444/login";
        let logindata = {email:myemai, password:mypassword};
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(logindata)
        };
        fetch(url, postData)
        .then(respoonse=>respoonse.json())
        .then(userinfo=>{
            if(userinfo.length >0 ){
                localStorage.setItem("adminid", userinfo[0]._id);
                localStorage.setItem("adminname", userinfo[0].fullname);
                window.location.reload();
            }else{
                alert("Sorry, Invalid or Not Exists !");
            }
        })      
    }

    if(localStorage.getItem("adminid")){
        return <Navigate to="/" />
    }
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="p-4 shadow-lg">
                        <h3 className="text-center text-info mb-4"> 
                            <i className="fa fa-lock"></i> Login 
                        </h3>
                        <div className="mb-4">
                            <p>e-Mail Id</p>
                            <input type="text" className="form-control" onChange={obj=>pickEmail(obj.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <p>Password</p>
                            <input type="password" className="form-control" onChange={obj=>pickPassword(obj.target.value)}/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={LoginCheck}> 
                                Login <i className="fa fa-arrow-right"></i> 
                            </button>
                            <p className="mt-4">
                                <Link to="/register"> New ? Register </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Mylogin;
