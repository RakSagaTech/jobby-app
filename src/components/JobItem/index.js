import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItem extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.fetchJobContentDetails()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: data.life_at_company
      ? {
          description: data.life_at_company.description,
          imageUrl: data.life_at_company.image_url,
        }
      : {description: '', imageUrl: ''},
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills
      ? data.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        }))
      : [],
    title: data.title,
  })

  fetchJobContentDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const dbData = await response.json()
      const formattedJobContentDetails = {
        jobDetails: this.getFormattedData(dbData.job_details),
        similarJobs: dbData.similar_jobs.map(eachSimilarJob =>
          this.getFormattedData(eachSimilarJob),
        ),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: formattedJobContentDetails.jobDetails,
        similarJobs: formattedJobContentDetails.similarJobs,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetryBtn = () => {
    this.fetchJobContentDetails()
  }

  renderFailureView = () => (
    <div className="similarjob-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="similarjob-failure-img"
      />
      <h1 className="similarjob-failure-heading">Oops! Something Went Wrong</h1>
      <p className="similarjob-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="similarjob-retry-btn"
        onClick={this.onClickRetryBtn}
      >
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    return (
      <div className="jobitem-container">
        <div className="jobitem-details-container">
          <div className="jobitem-logo-title-rating-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="jobitem-company-logo"
            />
            <div className="jobitem-title-rating-container">
              <h1 className="jobitem-title">{title}</h1>
              <div className="jobitem-rating-container">
                <FaStar className="jobitem-star-icon" />
                <p className="jobitem-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobitem-location-employment-package-container">
            <div className="jobitem-location-employment-container">
              <div className="jobitem-location-container">
                <MdLocationOn className="jobitem-location-icon" />
                <p className="jobitem-location">{location}</p>
              </div>
              <div className="jobitem-employment-type-container">
                <BsBriefcaseFill className="jobitem-briefcasefill-icon" />
                <p className="jobitem-employment-type">{employmentType}</p>
              </div>
            </div>
            <p className="jobitem-package">{packagePerAnnum}</p>
          </div>
          <hr className="jobitem-horizontal-line" />
          <div className="jobitem-description-visit-container">
            <h1 className="jobitem-description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="jobitem-visit-container"
            >
              <p className="visit"> Visit </p>
              <BsBoxArrowUpRight className="visit-icon" />
            </a>
          </div>
          <p className="jobitem-description">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <Skills key={id} skillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobs key={id} smiliarJobDetails={eachSimilarJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <>
      <div className="similarjob-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderJobContent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="job-item-container">{this.renderJobContent()}</div>
      </>
    )
  }
}

export default JobItem
