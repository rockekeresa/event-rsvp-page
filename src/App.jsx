import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    attending: 'Yes',
    message: '',
  })

  const [guestList, setGuestList] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email.')
      return
    }

    setGuestList((prev) => [...prev, formData])

    setFormData({
      name: '',
      email: '',
      guests: 1,
      attending: 'Yes',
      message: '',
    })

    alert('RSVP submitted successfully!')
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">GDM Annual Gala Night 2026</h1>
          <p className="lead mb-2">Join us for an unforgettable evening of celebration.</p>
          <p className="mb-0">
            📅 April 20, 2026 &nbsp; | &nbsp; 🕒 6:00 PM &nbsp; | &nbsp; 📍 Washington, DC
          </p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-lg-7">
            {/* Event Details */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <h2 className="mb-3">Event Details</h2>
                <p>
                  Celebrate with us at the <strong>Annual Gala Night 2026</strong>! Enjoy an
                  evening filled with live music, dinner, networking, and special guest speakers.
                </p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">
                    <strong>Date:</strong> April 20, 2026
                  </li>
                  <li className="list-group-item px-0">
                    <strong>Time:</strong> 6:00 PM – 10:00 PM
                  </li>
                  <li className="list-group-item px-0">
                    <strong>Venue:</strong> Grand Ballroom, Washington Convention Center
                  </li>
                  <li className="list-group-item px-0">
                    <strong>Dress Code:</strong> Formal / Black Tie
                  </li>
                </ul>
              </div>
            </div>

            {/* Map */}
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="mb-3">Location</h2>
                <div className="ratio ratio-16x9 rounded overflow-hidden">
                  <iframe
                    title="Event Location Map"
                    src="https://www.google.com/maps?q=Washington+Convention+Center&output=embed"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-lg-5">
            {/* RSVP Form */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-4">
                <h2 className="mb-4">RSVP Now</h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Number of Guests</label>
                    <input
                      type="number"
                      className="form-control"
                      name="guests"
                      min="1"
                      value={formData.guests}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Will you attend?</label>
                    <select
                      className="form-select"
                      name="attending"
                      value={formData.attending}
                      onChange={handleChange}
                    >
                      <option>Yes</option>
                      <option>No</option>
                      <option>Maybe</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Message (Optional)</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any notes or dietary preferences?"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Submit RSVP
                  </button>
                </form>
              </div>
            </div>

            {/* Guest List */}
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="mb-3">Registered Guests</h2>

                {guestList.length === 0 ? (
                  <p className="text-muted mb-0">No RSVPs yet.</p>
                ) : (
                  <ul className="list-group">
                    {guestList.map((guest, index) => (
                      <li key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{guest.name}</h6>
                            <small className="text-muted">{guest.email}</small>
                            <div className="small mt-1">
                              Guests: {guest.guests} | Status: {guest.attending}
                            </div>
                            {guest.message && (
                              <div className="small text-secondary mt-1">
                                “{guest.message}”
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2026 Event RSVP Page. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
