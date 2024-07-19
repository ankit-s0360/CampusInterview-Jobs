import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import { jobRoles, locations } from "./location_role";


const Job = () =>{

    const [istruncated, setIstruncated] = useState(true);
    let [joblist, setJoblist] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    let[keyword, updateKeyword] = useState("");
    const[selectedJob, setSelectedJob] = useState(null);
    const[applyBtn, setApplyBtn] = useState(false);
    // const [locTruncated, setLocTruncated] = useState(true);


    // fetching all available jobs
    const getJobs = () => {
        fetch("http://localhost:4444/jobs")
        .then(response => response.json())
        .then((jobArray) => {
            // console.log(jobArray);
            setJoblist(jobArray.reverse());
        })
    }

    useEffect(() => {
        getJobs();
    }, []);

    const appliedAt = new Date()
            .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).split('/').join('-');

    const [login, setLogin] = useState(true);

    // apply for a job
    const applyJob = (jobId, adminId) => {

        // if not adminid then set login false
        if(!adminId){
            setLogin(false);
            swal("Please Login/Signup","","warning")
            return;
        }

        let url = "http://localhost:4444/job/apply/apply-for-job";
        let applicationData = {jobId, adminId, appliedAt};
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(applicationData)
        };

        fetch(url, postData)
        .then(response => response.json())
        .then((jobApplication) => {
            console.log('Applied Job>', jobApplication);
            if(jobApplication.success == true){
                swal('You have successfully applied for this Job', "", "success");
                setApplyBtn(true);
            }
            else{
                swal('You have already applied for this Job', "", "warning");
                // alert('You have already applied for this Job');
            }
        })
    }

    if(!login){
        return <Navigate to="/login"/>
    }

    // Showing job description
    const ShowDescription = (text, maxLength) => {

        const toggleEvent = () => {
            if(istruncated){
                setIstruncated(false);
            }else{
                setIstruncated(true)
            }
        }

        if(text.length <= maxLength){
            return(
                <p>{text}</p>
            )
        };

        const displayText = istruncated ? `${text.slice(0, maxLength)}` : text ;
        return(
            <div>
                <p>{displayText}</p>
                <button className="mt-2 mb-3 text-primary border-0 bg-transparent" onClick={toggleEvent}>
                    {istruncated ? 'Read more...' : 'Read less'}
                </button>
            </div>
        )
    }
    

    /// pagination
    const PER_PAGE = 6;
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(joblist.length / PER_PAGE);

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3">
                <div className="me-auto mt-2  sticky-div">
                    <div className="p-2 border mb-4">
                    <h4>Search By Job Roles</h4>
                    <ul className="list-group list-group-flush pl-2" style={{maxHeight:'300px', overflowY:'scroll'}}>
                        {
                            jobRoles.map((role, index) => {
                               return(
                                <li key={index}
                                className="list-items"
                                onClick={() => updateKeyword(role.toLowerCase())}
                                >
                                    {role}
                                </li>
                               )
                            })
                        }
                    </ul>
                    </div>
                    
                    <div className="p-2 border">
                    <h4>Search By Locations</h4>
                    <ul className="list-group list-group-flush" style={{maxHeight:'300px', overflowY:'scroll'}}>
                        {
                            locations.map((loc, index) => {
                                return(
                                    <li key={index}
                                        className="list-items"
                                        onClick={() => updateKeyword(loc.toLowerCase())}
                                        >
                                            {
                                                loc
                                            }
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </div>
                    
                </div>
                </div>
                <div className="col-lg-6">
                    <div className="input-group mt-2 mb-4 ">
                    {/* <h3 className="text-center text-dark mb-2">New Posted Jobs</h3> */}
                    <label className="input-group-text mybg"><i className="fa fa-search text-white"></i></label>
                    <input type="text" className="form-control" placeholder="Search..."
                    onChange={obj => updateKeyword(obj.target.value.toLowerCase())}/>
                    </div>
                    <div>
                        {
                            joblist.slice(offset, offset + PER_PAGE).map((job, index) => {
                                
                                const adminId = localStorage.getItem("adminid");
                                if(job.title.toLowerCase().match(keyword) || job.company.toLowerCase().match(keyword) || job.salary.toString().match(keyword) || job.location.toLowerCase().match(keyword)){

                                    return(
                                        <div key={job._id} className="shadow p-4 mb-4 "
                                         onClick={() => handleJobClick(job)}>
                                            <h4 >{job.title}</h4>
                                            <h6><i className="fas fa-building text-primary"></i> {job.company}</h6>
                                            <h6><i className="fas fa-sack-dollar"></i> Salary: {job.salary} Lpa <i className="text-muted">INR</i></h6>
                                            <div className="row">
                                                <h6 className="col-6"><i className="fas fa-map-marker-alt text-secondary"></i> Location: {job.location}</h6>
                                                <h6 className="col-6 text-center">{job.jobType}</h6>
                                            </div>
                                            <p><i className="fa-solid fa-clock text-primary"></i> Posted On: {job.postedOn}</p>
                                            
                                            <div>
                                                <h6>Description:</h6>
                                                {
                                                    ShowDescription(job.description, 100)
                                                }
                                            </div>
                                            <button type="button" id="apply-btn" className="btn btn-primary btn-sm"
                                            onClick={() => applyJob(job._id, adminId)} disabled={applyBtn}>                                       
                                                <i className="fas fa-edit"></i>
                                                {applyBtn && applyBtn ? "Applied" : "Apply Now"}                                              
                                                
                                            </button>
                                        </div>
                                    )
                                }
                                
                            })
                        }
                    </div>
                </div>
                <div className="col-lg-3">
                    {
                        selectedJob && (
                            <div className="shadow-lg px-4 py-3 my-10 sticky-div">
                                <h4>{selectedJob.title}</h4>
                                <h6><i className="fas fa-building text-primary"></i> {selectedJob.company}</h6>
                                <h6><i className="fas fa-sack-dollar"></i> Salary: {selectedJob.salary} Lpa</h6>
                                <h6><i className="fas fa-map-marker-alt text-secondary"></i> Location: {selectedJob.location}</h6>
                                <h6>{selectedJob.jobType}</h6>
                                <p><i className="fa-solid fa-clock text-primary"></i> Posted On: {selectedJob.postedOn}</p>
                                <div>
                                    <h6>Description:</h6>
                                    {
                                        ShowDescription(selectedJob.description, 100)
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="mb-4 mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>
        </div>
    )
}
export default Job;