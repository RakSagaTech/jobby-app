import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Profile from '../Profile'
import Filters from '../Filters'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    employmentType: [],
    salaryRangesType: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {employmentType, salaryRangesType, searchInput} = this.state
    const employmentTypeQuery = employmentType.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRangesType}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      const formattedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } catch (err) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateSalaryRange = id => {
    this.setState({salaryRangesType: id}, this.getJobDetails)
  }

  updateEmploymentType = id => {
    this.setState(
      prev => ({
        employmentType: prev.employmentType.includes(id)
          ? prev.employmentType.filter(eachId => eachId !== id)
          : [...prev.employmentType, id],
      }),
      this.getJobDetails,
    )
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="oops"> Oops! Something Went Wrong </h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-retry"
        onClick={this.getJobDetails}
      >
        {' '}
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs"> No Jobs Found </h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsDetaislsView = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }
    return (
      <>
        <ul className="jobs-list">
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <>
      <div className="loader-container jobs-loader" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsDetaislsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="profile-and-filter">
            <div className="search-input-logo-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <Profile />
            <hr className="hr-line" />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              updateEmploymentType={this.updateEmploymentType}
              updateSalaryRange={this.updateSalaryRange}
            />
          </div>

          <div className="search-and-jobs">
            <div className="jobs-search-input-logo-container">
              <input
                type="search"
                placeholder="Search"
                className="jobs-search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="jobs-search-icon-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch className="jobs-search-icon" />
              </button>
            </div>
            {this.renderJobsView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
