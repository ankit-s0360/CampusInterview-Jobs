import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const ProfileForm = () => {
  const adminId =  localStorage.getItem("adminid");
    const [formData, setFormData] = useState({
        adminId,
        personalDetails:{
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            professionalSummery:''
        },
        workExperience:[{jobTitle:'', company:'', startDate:'', endDate:'', description:''}],
        education:[{degree:'', fieldOfStudy:'', institution:'', startDate:'', endDate:''}],
        skills:[''],
        languages:[''],
        linkedIn:'',
        github:'',
        portfolio:'',
        resume:'',
        profilePicture:''
    })

    console.log("Form Data > ", formData);

    // const [savedProfile, setSavedProfile] = useState(null);
    const [skillInput, setSkillInput] = useState('');
    const[languageInput, setLanguageInput] = useState('')

    const handlePersonalDetails = (e) => {
      const {name, value} = e.target;
      setFormData({
        ...formData,
        personalDetails: {
          ...formData.personalDetails,
          [name]: value
        }
      })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevProfile) => ({
          ...prevProfile,
          [name]: value,
        }));
    };

    const handleArrayChange = (e, index, arrayName) => {
        const { name, value } = e.target;
        const newArray = formData[arrayName].slice();
        newArray[index][name] = value;
        setFormData((prevProfile) => ({
          ...prevProfile,
          [arrayName]: newArray,
        }));
    };

    const addArrayItem = (arrayName) => {
        const newArray = formData[arrayName].slice();
        newArray.push(arrayName === 'education' ? {degree:'', fieldOfStudy:'', institution:'', startDate:'', endDate:''} : {jobTitle:'', company:'', startDate:'', endDate:'', description:''});
        setFormData((prevProfile) => ({
          ...prevProfile,
          [arrayName]: newArray,
        }));

    };

    const removeArrayItem = (index, arrayName) => {
        const newArray = formData[arrayName].slice();
        newArray.splice(index, 1);
        setFormData((prevProfile) => ({
          ...prevProfile,
          [arrayName]: newArray,
        }));
    };

    const handleSkillChange = (e) => {
      setSkillInput(e.target.value);
    };

    const addSkill = () => {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput],
      });
      setSkillInput('');
    };
  
    const removeSkill = (index) => {
      const newSkills = formData.skills.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        skills: newSkills,
      });
    };

    const handleLanguageChange = (e) => {
      setLanguageInput(e.target.value);
    };

    const addLanguage = () => {
      setFormData({
        ...formData,
        languages: [...formData.languages, languageInput],
      });
      setLanguageInput('');
    };
  
    const removeLanguage = (index) => {
      const newLanguages = formData.languages.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        languages: newLanguages,
      });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:4444/userprofile/profile', formData);
          // setSavedProfile(response.data);
          // console.log("Profile Data > ", savedProfile);
        } catch (error) {
          console.error('Error saving profile:', error);
        }
    };

    return(
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-2"></div>
              <div className="col-lg-8">
              <h2 className="text-center">Job Seeker Profile</h2>
              <div className=" row">
              <form onSubmit={handleSubmit}>
                <h4>Personal Details</h4>
                <div className="input-group mb-3">
                  <input type="text" className="form-control col-lg-6 me-3" name="firstName" placeholder="First Name" value={formData.personalDetails.firstName}  onChange={handlePersonalDetails} />
                  <input type="text" className="form-control col-lg-6 me-3" name="lastName" placeholder="Last Name" value={formData.personalDetails.lastName} onChange={handlePersonalDetails} />
                </div>
                <div className="input-group mb-3">
                  <input type="email" className="form-control col-lg-6 me-3" name="email" placeholder="Email" value={formData.personalDetails.email} onChange={handlePersonalDetails} />
                  <input type="text" className="form-control col-lg-6 me-3" name="phone" placeholder="Phone Number" value={formData.personalDetails.phone} onChange={handlePersonalDetails} />
                </div>
                  <textarea type="text" className="form-control mb-3" name="professionalSummery" placeholder="Professional Summery" value={formData.personalDetails.professionalSummery} onChange={handlePersonalDetails} />
                
                <h4>Education</h4>
                {formData.education.map((edu, index) => (
                  <div key={index}>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control me-2" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange(e, index, 'education')} />
                      <input type="text" className="form-control me-2" name="fieldOfStudy" placeholder="Field Of Study" value={edu.fieldOfStudy} onChange={(e) => handleArrayChange(e, index, 'education')} />
                      <input type="text" className="form-control me-2" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayChange(e, index, 'education')} />
                    </div>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control me-2" name="startDate" placeholder="Year of Starting" value={edu.startDate} onChange={(e) => handleArrayChange(e, index, 'education')} />
                      <input type="text" className="form-control me-2" name="endDate" placeholder="Year of Completion" value={edu.endDate} onChange={(e) => handleArrayChange(e, index, 'education')} />
                    </div>
                    <button type="button" className="btn btn-danger mb-3" onClick={() => removeArrayItem(index, 'education')}>Remove</button>
                  </div>
                ))}
                <button type="button" className="btn btn-primary mb-3" onClick={() => addArrayItem('education')}>Add Education</button>
        
                <h4>Experience</h4>
                {formData.workExperience.map((exp, index) => (
                  <div key={index}>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control me-2" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange(e, index, 'workExperience')} />
                      <input type="text" className="form-control me-2" name="jobTitle" placeholder="Role" value={exp.jobTitle} onChange={(e) => handleArrayChange(e, index, 'workExperience')} />
                    </div>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control me-2" name="startDate" placeholder="Data of Starting" value={exp.startDate} onChange={(e) => handleArrayChange(e, index, 'workExperience')} />
                      <input type="text" className="form-control me-2" name="endDate" placeholder="Data of Completion" value={exp.endDate} onChange={(e) => handleArrayChange(e, index, 'workExperience')} />
                    </div>
                    <textarea type="text" className="form-control mb-3" name="description" placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange(e, index, 'workExperience')} />
                    <button type="button" className="btn btn-danger mb-3" onClick={() => removeArrayItem(index, 'workExperience')}>Remove</button>
                  </div>
                ))}
                  <button type="button" className="btn btn-primary mb-3" onClick={() => addArrayItem('workExperience')}>Add Experience</button>
  
                  <h4>Skills</h4>
                  <input type="text" className="form-control mb-2" placeholder="Add a skill" value={skillInput} onChange={handleSkillChange} />
                  <button type="button" className="btn btn-primary mb-2" onClick={addSkill}>Add Skill</button>
                  <ul>
                    {formData.skills.map((skill, index) => (

                      <li key={index}>
                      {skill} <button type="button" className=" rounded-circle text-danger mb-3" onClick={() => removeSkill(index)}><i class="fa fa-close"></i></button>
                      </li>
                    ))}
                  </ul>
          
                  <h4>Languages</h4>
                  <input type="text" className="form-control mb-2" placeholder="Add a Language" value={languageInput} onChange={handleLanguageChange} />
                  <button type="button" className="btn btn-primary mb-2" onClick={addLanguage}>Add Language</button>
                  <ul>
                    {formData.languages.map((language, index) => (
                      <li key={index}>
                        {language} <button type="button" className="rounded-circle text-danger mb-3" onClick={() => removeLanguage(index)}><i class="fa fa-close"></i></button>
                      </li>
                    ))}
                  </ul>
  
                  <div className="row input-group mb-3">
                    <input type="text" className=" form-control me-2" name="linkedIn" placeholder="LinkedIn URL" onChange={handleChange} />
                    <input type="text" className=" form-control me-2" name="github" placeholder="GitHub URL" onChange={handleChange} />
                  </div>
                  <div className="row input-group mb-3">
                    <input type="text" className=" form-control me-2" name="portfolio" placeholder="Portfolio URL" onChange={handleChange} />
                    <input type="text" className=" form-control  me-2" name="resume" placeholder="Resume URL" onChange={handleChange} />
                    {/* <input type="text" className=" form-control  me-2" name="profilePicture" placeholder="Profile Picture URL" onChange={handleChange} /> */}
                  </div>
        
          
                <button type="submit" className="btn btn-warning mb-3">Save Profile</button>
              </form>
              </div>
              {/* {
                savedProfile && (
                  <div className="col-lg-6 shadow mb-3">
                  <h3 className="text-center">{`${savedProfile.personalDetails.firstName}'s profile`}</h3>
                    <div className="m-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <h2 className="font-monospace">{savedProfile.personalDetails.firstName} {savedProfile.personalDetails.lastName}</h2>
                            <h6><i class="fa fa-envelope text-secondary" aria-hidden="true"></i> Email: <span className="text-secondary">{savedProfile.personalDetails.email}</span></h6>
                            <h6><i class="fa fa-phone text-secondary" aria-hidden="true"></i> Phone: <span className="text-secondary">{savedProfile.personalDetails.phone}</span></h6>
                            <p className="mb-0 pb-1"> LinkedIn: <a href={savedProfile.linkedIn} >{savedProfile.linkedIn}</a></p>
                            <p> GitHub: <a href={savedProfile.github} >{savedProfile.github}</a></p>
                          </div>
                          <div className="col-lg-6">
                            <p className="text-center"><img src={savedProfile.profilePicture} alt={`${savedProfile.personalDetails.firstName}'s profile`}/></p>
                          </div>
                        </div>
                        <h4><i className='fas fa-book-reader text-secondary'></i> Professional Summary:</h4>
                        <p> {savedProfile.personalDetails.professionalSummery}</p>
            
                        <h4><i className="fa fa-suitcase text-secondary" aria-hidden="true"></i> Work Experience: </h4>
                        {
                            savedProfile.workExperience.map((job, index) => {
                                return(
                                    <div key={index}>
                                        <h6>{job.jobTitle} at {job.company}</h6>
                                        <p className="mb-0 pb-1">Start Date - End Date</p>
                                        <p>{job.startDate} - {job.endDate}</p>
                                        <p>{job.description}</p>
                                    </div>
                                )
                            })
                        }
                        <h4><i class="fa fa-book text-secondary" aria-hidden="true"></i> Education: </h4>
                        {
                            savedProfile.education.map((edu, index) => {
                                return(
                                    <div key={index}>
                                        <h6>{edu.degree} in {edu.fieldOfStudy}</h6>
                                        <p className="mb-0 pb-1">Institution: {edu.institution}</p>
                                        <p className="mb-0 pb-1">From - {edu.startDate}</p>
                                        <p>To - {edu.endDate}</p>
                                    </div>
                                )
                            })
                        }
                        <h4><i className="fa fa-cogs text-secondary" aria-hidden="true"></i> Skills: </h4>
                        <ul>
                        {
                            savedProfile.skills.map((skill, index) => {
                                return(
                                    <li key={index}>{skill}</li>
                                )
                            })
                        }
                        </ul>
                        <h4><i className="fa fa-language text-secondary" aria-hidden="true"></i> Languages: </h4>
                        <ul>
                        {
                            savedProfile.languages.map((language, index) => {
                                return(
                                    <li key={index}>{language}</li>
                                )
                            })
                        }
                        </ul>
                        
                        
                        <p>Portfolio: <a href={savedProfile.portfolio} >{savedProfile.portfolio}</a></p>
                        <p>Resume: <a href={savedProfile.resume} >{savedProfile.resume}</a></p>
                        
                    </div>
                </div>
                )
              } */}
              </div>
          <div className="col-lg-2"></div>
          </div>
        </div>
    )      
}

export const ProfileDetails = () => {

    const id = localStorage.getItem("adminid");
    const [profile, setProfile] = useState({
        personalDetails:{
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            professionalSummery:''
        },
        workExperience:[{jobTitle:'', company:'', startDate:'', endDate:'', description:''}],
        education:[{degree:'', fieldOfStudy:'', institution:'', startDate:'', endDate:''}],
        skills:[''],
        languages:[''],
        linkedIn:'',
        github:'',
        portfolio:'',
        resume:'',
        profilePicture:''
    });

    const fetchProfile = async() => {
        try {
            const res = await axios.get(`http://localhost:4444/userprofile/profiles/${id}`);
            setProfile(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    // console.log(`user profile > `, profile);


    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 shadow mb-3">
                  <h3 className="text-center">{`${profile.personalDetails.firstName}'s profile`}</h3>
                    <div className="m-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <h2 className="font-monospace">{profile.personalDetails.firstName} {profile.personalDetails.lastName}</h2>
                            <h6><i className="fa fa-envelope text-secondary" aria-hidden="true"></i> Email: <span className="text-secondary">{profile.personalDetails.email}</span></h6>
                            <h6><i className="fa fa-phone text-secondary" aria-hidden="true"></i> Phone: <span className="text-secondary">{profile.personalDetails.phone}</span></h6>
                            <p className="mb-0 pb-1"> LinkedIn: <a href={profile.linkedIn} >{profile.linkedIn}</a></p>
                            <p> GitHub: <a href={profile.github} >{profile.github}</a></p>
                          </div>
                          {/* <div className="col-lg-6">
                            <p className="text-center"><img src={profile.profilePicture} alt={`${profile.personalDetails.firstName}'s profile`}/></p>
                          </div> */}
                        </div>
                        <h4><i className='fas fa-book-reader text-secondary'></i> Professional Summary:</h4>
                        <p> {profile.personalDetails.professionalSummery}</p>
            
                        <h4><i className="fa fa-suitcase text-secondary" aria-hidden="true"></i> Work Experience: </h4>
                        {
                            profile.workExperience.map((job, index) => {
                                return(
                                    <div key={index}>
                                        <h6>{job.jobTitle} at {job.company}</h6>
                                        <p className="mb-0 pb-1">Start Date - End Date</p>
                                        <p>{job.startDate} - {job.endDate}</p>
                                        <p>{job.description}</p>
                                    </div>
                                )
                            })
                        }
                        <h4><i className="fa fa-book text-secondary" aria-hidden="true"></i> Education: </h4>
                        {
                            profile.education.map((edu, index) => {
                                return(
                                    <div key={index}>
                                        <h6>{edu.degree} in {edu.fieldOfStudy}</h6>
                                        <p className="mb-0 pb-1">Institution: {edu.institution}</p>
                                        <p className="mb-0 pb-1">From - {edu.startDate}</p>
                                        <p>To - {edu.endDate}</p>
                                    </div>
                                )
                            })
                        }
                        <h4><i className="fa fa-cogs text-secondary" aria-hidden="true"></i> Skills: </h4>
                        <ul>
                        {
                            profile.skills.map((skill, index) => {
                                return(
                                    <li key={index}>{skill}</li>
                                )
                            })
                        }
                        </ul>
                        <h4><i className="fa fa-language text-secondary" aria-hidden="true"></i> Languages: </h4>
                        <ul>
                        {
                            profile.languages.map((language, index) => {
                                return(
                                    <li key={index}>{language}</li>
                                )
                            })
                        }
                        </ul>
                        
                        
                        <p>Portfolio: <a href={profile.portfolio} >{profile.portfolio}</a></p>
                        <p>Resume: <a href={profile.resume} >{profile.resume}</a></p>
                        
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
            
        </div>
    )
}

