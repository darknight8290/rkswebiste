
import { useState } from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    numberOfGuards: "",
    location: "",
    duration: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your enquiry form design is working.");
  };

  return (
    <main className="contact-page">

      

      {/* FORM SECTION */}
      <section className="contact-form-section">

        <div className="contact-form-intro">
          <span>REQUEST A QUOTE</span>
          <h2>
            Tell us what
            <br />
            you <em>need.</em>
          </h2>
          <p>
            Share a few details below so we can understand
            your requirements.
          </p>
        </div>

        <form className="quote-form" onSubmit={handleSubmit}>

          <div className="form-heading">
            <span>01 — PERSONAL DETAILS</span>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>FULL NAME *</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>EMAIL ADDRESS *</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>PHONE NUMBER *</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>LOCATION *</label>
              <input
                type="text"
                name="location"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-heading form-heading-space">
            <span>02 — SECURITY REQUIREMENTS</span>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>SERVICE REQUIRED *</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                <option value="Security Guard Services">
                  Security Guard Services
                </option>
                <option value="Corporate Security">
                  Corporate Security
                </option>
                <option value="Event Security">
                  Event Security
                </option>
                <option value="Surveillance Services">
                  Surveillance Services
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>NUMBER OF GUARDS *</label>
              <input
                type="number"
                name="numberOfGuards"
                min="1"
                placeholder="e.g. 10"
                value={formData.numberOfGuards}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>DURATION *</label>
              <input
                type="text"
                name="duration"
                placeholder="e.g. 2 days, 1 month"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group form-message">
            <label>ADDITIONAL MESSAGE</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell us more about your security requirements..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="form-submit-area">
            <p>
              * Required fields. Please provide accurate information.
            </p>

            <button type="submit" className="quote-submit">
              SUBMIT ENQUIRY
              <ArrowUpRight size={19} />
            </button>
          </div>

        </form>
      </section>

    </main>
  );
}

export default Contact;
