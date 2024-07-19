import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AppliedJob = () => {

    const [istruncated, setIstruncated] = useState(true);
    let [yourAppliedJobs, setYourAppliedJobs] = useState([]);
    const [login, setLogin] = useState(true);

    console.log("Applied Jobs > ", yourAppliedJobs);

    const getAppliedJob = () => {
        const adminId = localStorage.getItem("adminid");
        // console.log(adminId);
        if(!adminId){
            setLogin(false);
            return;
        }else{
            let url = `http://localhost:4444/job/apply/applied-jobs/${adminId}`

            fetch(url)
            .then(response => response.json())
            .then(AppliedJobsArray => {
                // console.log(AppliedJobsArray);
                setYourAppliedJobs(AppliedJobsArray.reverse())
            })
        }      
    }

    console.log('Applied Jobs > ', yourAppliedJobs);

    useEffect(() => {
        getAppliedJob()
    }, []);

    if(!login){
        return <Navigate to="/" />
    }

    // Showing job description
    const ShowDescription = (text, maxLength) => {

        const toggleEvent = () => {
            if(istruncated){
                setIstruncated(false);
            }
            else{
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
                    {istruncated ? 'Read more' : 'Read less'}
                </button>
            </div>
        )
    }



    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <h3 className="text-center text-dark mb-4">Jobs Applied By You</h3>
                    <div>
                        {
                            yourAppliedJobs.map((jobs, index) => {
                                return(
                                    <div key={jobs._id} className="job-bg shadow p-4 mb-4">
                                        <h4>{jobs.jobId.title}</h4>
                                        <h6><i className="fas fa-building text-primary"></i> {jobs.jobId.company}</h6>
                                        <h6><i className="fas fa-sack-dollar"></i> Salary: {jobs.jobId.salary} Lpa <i className="text-muted">INR</i></h6>
                                        <h6><i className="fas fa-map-marker-alt text-secondary"></i> Location: {jobs.jobId.location}</h6>
                                        <div className="row">
                                            <p className="col-6"><i className="fa-solid fa-clock text-danger"></i> Posted On: {jobs.jobId.postedOn}</p>
                                            <p className="col-6"><i className="fa-solid fa-clock text-success"></i> Applied On: {jobs.appliedAt}</p>
                                        </div>
                                        <div>
                                            <h6>Description:</h6>
                                            {
                                                ShowDescription(jobs.jobId.description, 100)
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}

export default AppliedJob;