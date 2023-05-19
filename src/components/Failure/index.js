import './index.css'

const Failure = () => (
  <div className="failure-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      alt="failure view"
    />
    <h1>Oops! Something Went Wrong</h1>
    <p>
      We are having some trouble to complete your request. Please try again.
    </p>

    <button type="button">Retry</button>
  </div>
)

export default Failure
