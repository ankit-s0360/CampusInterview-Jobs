import {HashRouter, Routes, Route, Link, Navigate} from 'react-router-dom';

import Mylogin from "./login";
import Register from "./register";
import Job from './job';
import AppliedJob from './appliedJob';
import PostJob from './jobPost';
import { ProfileDetails, ProfileForm, UpdateProfile } from './userProfile';
import NotFound from './NotFound';

const Account = () =>{
    
        const afterLogin = () =>{
            if(localStorage.getItem("adminid") == null){
                return(
                      <>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/login"> <i className="fa fa-lock"></i> Job Seeker Login </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/register"> <i className="fa fa-user-plus"></i> Create Profile </Link>
                        </li>  
                      </>  
                )
            }else{
                return(
                    <> 
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle nav-link active" to="#" role="button" data-bs-toggle="dropdown">Profile</Link>
                            <ul className="dropdown-menu">
                              <li><Link className="dropdown-item" to="/profile"> <i className="fa fa-eye"></i> View Profile </Link></li>
                              <li><Link className="dropdown-item " to="/create-profile"> <i className="fa fa-plus"></i> Create Profile </Link></li>
                              {/* <li><Link className="dropdown-item " to="/update-profile"> <i className="fa fa-pencil"></i> Update Profile </Link></li> */}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/myjob"> <i className="fa fa-suitcase"></i> Applied Job </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-warning" onClick={ logout }> 
                                Hi,  { localStorage.getItem("adminname") } <i className="fa fa-power-off"></i> Logout 
                            </Link>
                        </li>
                    </>
                )
            }    
        }    
    return(
        <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark sticky-top mybg p-3">
                <div className="container">
                    <a className="navbar-brand"> <i className="fa fa-suitcase fa-lg"></i> Campusinterview Jobs</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/"> <i className="fa fa-home"></i> Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/post-job"> <i className="fa fa-plus"></i> Post Job </Link>
                        </li>
                        { afterLogin() }
                    </ul>
                    </div>
                </div>
            </nav> 
            <Routes>
                <Route exact path="/" element={<Job/>}/>
                <Route exact path="/login" element={<Mylogin/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="/post-job" element={<PostJob/>}/>
                <Route exact path="/myjob" element={<AppliedJob/>}/>
                <Route exact path="/create-profile" element={<ProfileForm/>}/>
                <Route exact path="/profile" element={<ProfileDetails/>}/>
                {/* <Route exact path="/update-profile" element={<UpdateProfile/>}/> */}

                <Route exact path='*' element={<NotFound />}/>

            </Routes>
        </HashRouter>
    )
}

export default Account;


const logout = () =>{
    localStorage.clear();
    window.location.reload();
  }