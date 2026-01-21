import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-card-item">
      <div className="img-title-rating">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="title-rating">
          <h1 className="title">{title}</h1>
          <div className="star-rating">
            <FaStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-employmenttype-package">
        <div className="location-employmenttype-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="employmenttype-container">
            <BsFillBriefcaseFill className="briefcase-icon" />
            <p className="employment-type">{employmentType}</p>
          </div>
        </div>
        <p className="package">{packagePerAnnum}</p>
      </div>
      <hr className="job-card-hr-line" />
      <h1 className="description">Description</h1>
      <p className="job-description">{jobDescription}</p>
    </li>
  )
}

export default JobCard
