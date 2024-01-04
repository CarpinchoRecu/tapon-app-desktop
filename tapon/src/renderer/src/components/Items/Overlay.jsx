import './Overlay.css'

const Overlay = ({ show }) => {
  if (!show) {
    return null
  }

  return <div className="overlay"></div>
}

export default Overlay
