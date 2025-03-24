import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    // Phone validation (optional)
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Simulate API call
    setSubmitStatus('loading');
    
    // Mock API response after 1.5 seconds
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions, suggestions, or need support? We're here to help!</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Our Location</h3>
            <p>Computer Science Department</p>
            <p>Fergusson College, 411009</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3>Phone</h3>
            <p>Customer Support:<br></br> (555) 123-4567</p>
            <p>Business Inquiries: <br></br> (555) 765-4321</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p>support@www.GrowthMantra.com</p>
            <p>info@www.GrowthMantra.com</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Hours</h3>
            <p>Monday - Friday: 9AM - 6PM</p>
            <p>Weekend: 10AM - 4PM</p>
          </div>
          
          <div className="social-media">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-wrapper">
          <div className="form-header">
            <h2>Send Us a Message</h2>
            <p>We'll get back to you as soon as possible</p>
          </div>
          
          {submitStatus === 'success' ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={formErrors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? 'error' : ''}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={formErrors.phone ? 'error' : ''}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject <span className="required">*</span></label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={formErrors.subject ? 'error' : ''}
                  placeholder="Enter message subject"
                />
                {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={formErrors.message ? 'error' : ''}
                  placeholder="Enter your message"
                  rows="6"
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? (
                  <span>Sending... <i className="fas fa-spinner fa-spin"></i></span>
                ) : (
                  <span>Send Message <i className="fas fa-paper-plane"></i></span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="map-container">
        <h2>Find Us</h2>
        <div className="map-placeholder">
          <div className="map-overlay">
            <p>Google Maps Integration Here</p>
            <small>For implementation, use Google Maps API or embed code</small>
          </div>
        </div>
      </div>
      
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>How do I reset my password?</h3>
            <p>You can reset your password by clicking on "Forgot Password" on the login screen and following the instructions sent to your email.</p>
          </div>
          <div className="faq-item">
            <h3>Can I use the app offline?</h3>
            <p>Yes, most features work offline. Your data will sync automatically when you reconnect to the internet.</p>
          </div>
          <div className="faq-item">
            <h3>How do I cancel my subscription?</h3>
            <p>You can cancel your subscription by going to Account Settings - Subscription - Cancel Subscription.</p>
          </div>
          <div className="faq-item">
            <h3>How can I export my workout data?</h3>
            <p>Go to Profile - Settings - Data Export to download your workout history in CSV or JSON format.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;