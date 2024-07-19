import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () =>{
    let[myemai, pickEmail] = useState("");
    let[mypassword, pickPassword] = useState("");
    let[fullname, pickName] = useState("");

    const save = () =>{
        let url = "http://localhost:4444/login/saveuser";
        let logindata = {email:myemai, password:mypassword, name:fullname};
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(logindata)
        };
        fetch(url, postData)
        .then(respoonse=>respoonse.json())
        .then(userinfo=>{
                alert(userinfo.message);
        })
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="p-4 shadow-lg">
                        <h3 className="text-center text-info mb-4"> 
                            <i className="fa fa-user-plus"></i> Create Account 
                        </h3>
                        <div className="mb-4">
                            <p>Full Name</p>
                            <input type="text" className="form-control" onChange={obj=>pickName(obj.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <p>e-Mail Id</p>
                            <input type="text" className="form-control" onChange={obj=>pickEmail(obj.target.value)}/>
                        </div>
                        <div className="mb-4">
                            <p>Password</p>
                            <input type="password" className="form-control" onChange={obj=>pickPassword(obj.target.value)}/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger" onClick={save}> 
                                Submit <i className="fa fa-arrow-right"></i> 
                            </button>
                            <p className="mt-4">
                                <Link to="/login"> Registered ? Login </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Register;
