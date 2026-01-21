import './index.css'

const Filters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    updateEmploymentType,
    updateSalaryRange,
  } = props

  const onChangeSalaryRange = salaryRangeId => {
    updateSalaryRange(salaryRangeId)
  }

  const onChangeEmployment = employmentTypeId => {
    updateEmploymentType(employmentTypeId)
  }
  return (
    <div>
      <h1 className="filter-heading"> Type of Employment </h1>
      <ul className="filter-lists">
        {employmentTypesList.map(eachEmployment => {
          const {employmentTypeId, label} = eachEmployment
          return (
            <li key={employmentTypeId} className="filter-item">
              <input
                type="checkbox"
                id={employmentTypeId}
                className="filter-input"
                onClick={() => onChangeEmployment(employmentTypeId)}
              />
              <label htmlFor={employmentTypeId} className="filter-label">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
      <hr className="filter-hr-line" />
      <h1 className="filter-heading"> Salary Range </h1>
      <ul className="filter-lists">
        {salaryRangesList.map(eachSalaryRange => {
          const {salaryRangeId, label} = eachSalaryRange
          return (
            <li key={salaryRangeId} className="filter-item">
              <input
                type="radio"
                id={salaryRangeId}
                className="filter-input"
                onClick={() => onChangeSalaryRange(salaryRangeId)}
                name="salaryRange"
              />
              <label htmlFor={salaryRangeId} className="filter-label">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Filters
