import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {smiliarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = smiliarJobDetails
  return (
    <li className="similar-item">
      <div className="similar-logo-title-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div className="similar-title-rating-container">
          <h1 className="similar-title">{title}</h1>
          <div className="similar-rating-container">
            <FaStar className="similar-star-icon" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-heading">Description</h1>
      <p className="similar-description">{jobDescription}</p>
      <div className="similar-location-employment-container">
        <div className="similar-location-container">
          <MdLocationOn className="similar-location-icon" />
          <p className="similar-location">{location}</p>
        </div>
        <div className="similar-employment-type-container">
          <BsBriefcaseFill className="similar-briefcasefill-icon" />
          <p className="similar-employment-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
