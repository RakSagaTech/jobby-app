import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="jobs-body-container">
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
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <Profile />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
