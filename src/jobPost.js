import { useEffect, useState } from "react";
import axios from 'axios'
import { locations } from "./location_role";

const PostJob = () => {

    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [salary, setSalary] = useState(''); 
    const [description, setDescription] = useState('');
    const[jobType, setJobtype] = useState('Full Time');

    // location
    const [location, setLocation] = useState('');

    const handleJobType = (e) => {
      e.preventDefault();
      setJobtype(e.target.value);
      console.log(jobType);
    }

    const postedOn = new Date()
            .toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).split('/').join('-');
   
    // Handle selected location 
    const handleLocation = (e) => {
      e.preventDefault();
      setLocation(e.target.value);
      console.log(location);
    };

    
    // Handle job post submit
    const handleSubmit = (e) => {
        e.preventDefault();

        let jobPostData = {company, title, salary, location, jobType, description, postedOn};
        let url = "http://localhost:4444/jobs/jobpost"

        axios.post(url, jobPostData)
        .then(response => {
          // handle success
          console.log('Response data:', response.data);
          // alert("New Job Posted Successfully")
          alert(response.data.message)
        })
        .catch(error => {
          // handle error
          console.error('Error:', error);
          // alert(error)
        });

        setCompany("");
        setTitle("");
        setSalary("");
        setLocation("");
        setJobtype("");
        setDescription("");
    }

    return (
        <div className="container mt-4">
          <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 mt-3 shadow">
          <div className="row bg-info text-white rounded-top">
              <h4 className="text-center pt-2 pb-1"><i className="fa fa-plus"></i>Post a Job</h4>
            </div>
          <form onSubmit={handleSubmit}>           
                <div className='form-group mt-3'>
                  <label className="form-label">Company:</label>
                  <input
                  type="text"
                  className="form-control"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company Name"
                  required
                />
                </div>
                <div className='form-group mt-3'>
                  <label className="form-label">Job Title:</label>
                  <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Job Title"
                  required
                />
                </div>
                <div className="form-group mt-3">
                <label className="form-label">Salary:</label>
                  <input
                  type="text"
                  className="form-control"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Salary"
                  required
                />
                </div>
                <div className="form-group mt-3">

                <div>
                    <label className="form-label">Location: </label>
                    <select 
                      value={location}
                      className="form-select"
                      onChange={handleLocation}
                    >
                    <option value="">Select a city</option>
                    {locations.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                    </select>
              
                </div>
                </div >
                {/* <div className="form-group mt-3">
                  Job Type: <br />
                  <label className="me-3 mx-3">
                    <input 
                      className="me-1"
                      name="jobtype"
                      type="radio"
                      value="Internship"
                      checked = {jobtype === "Internship"}
                      onChange={handleJobType}
                    />
                    Internship
                  </label>
                  <label className="me-3">
                    <input 
                      className="me-1"
                      name="jobtype"
                      type="radio"
                      value="Full Time"
                      checked = {jobtype === "Full Time"}
                      onChange={handleJobType}
                    />
                    Full Time
                  </label>
                  <label className="me-3">
                    <input 
                      className="me-1"
                      name="jobtype"
                      type="radio"
                      value="Part Time"
                      checked = {jobtype === "Part Time"}
                      onChange={handleJobType}
                    />
                    Part Time
                  </label>
                </div> */}

                <div className="form-group mt-3">
                    <label className="form-label">Job Type: </label>
                    <select 
                      value={jobType}
                      className="form-select"
                      onChange={handleJobType}
                    >
                    <option value='Full Time'>Full Time</option>
                    <option value='Internship'>Internship</option>
                    <option value='Part Time'>Part Time</option>
                    </select>
              
                </div>
                <div className="form-group mt-3">
                <label className="form-label">Description:</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Job Description"
                  required
                />
                </div>
        
                <div className="text-center mt-3 mb-3 ">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
          </form>
          </div>
          <div className="col-lg-4"></div>
          </div>
        </div>
      );
}

export default PostJob;