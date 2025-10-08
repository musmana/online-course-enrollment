import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    gender: '',
    courses: [{ id: 1, name: '', duration: '', fees: '' }]
  });
  const [emailExists, setEmailExists] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Simulate async email validation
  useEffect(() => {
    if (formData.email) {
      const checkEmail = setTimeout(() => {
        // Simulate API call - in real app, this would be an actual API endpoint
        const existingEmails = ['test@example.com', 'user@domain.com'];
        setEmailExists(existingEmails.includes(formData.email));
      }, 1000);
      return () => clearTimeout(checkEmail);
    }
  }, [formData.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.map((course, i) =>
        i === index ? { ...course, [field]: value } : course
      )
    }));
  };

  const addCourse = () => {
    setFormData(prev => ({
      ...prev,
      courses: [
        ...prev.courses,
        { id: Date.now(), name: '', duration: '', fees: '' }
      ]
    }));
  };

  const removeCourse = (index) => {
    if (formData.courses.length > 1) {
      setFormData(prev => ({
        ...prev,
        courses: prev.courses.filter((_, i) => i !== index)
      }));
    }
  };

  const validateStep1 = () => {
    return formData.name && formData.email && formData.country && formData.gender && !emailExists;
  };

  const validateStep2 = () => {
    return formData.courses.every(course => 
      course.name && course.duration && course.fees
    );
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      country: '',
      gender: '',
      courses: [{ id: 1, name: '', duration: '', fees: '' }]
    });
    setStep(1);
    setSubmitted(false);
  };

  const courseOptions = [
    { value: '', label: 'Select Course' },
    { value: 'react', label: 'React Mastery', duration: '8 weeks', fees: '$299' },
    { value: 'javascript', label: 'JavaScript Fundamentals', duration: '6 weeks', fees: '$199' },
    { value: 'python', label: 'Python for Beginners', duration: '10 weeks', fees: '$249' },
    { value: 'webdev', label: 'Full Stack Web Development', duration: '12 weeks', fees: '$399' },
    { value: 'datascience', label: 'Data Science Essentials', duration: '14 weeks', fees: '$349' }
  ];

  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'in', label: 'India' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' }
  ];

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Online Course Enrollment</h1>
          <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              <span>1</span>
              <p>Student Details</p>
            </div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <span>2</span>
              <p>Course Selection</p>
            </div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <span>3</span>
              <p>Review & Submit</p>
            </div>
          </div>
        </header>

        {!submitted ? (
          <div className="form-container">
            {step === 1 && (
              <div className="form-step">
                <h2>Student Details</h2>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={emailExists ? 'error' : ''}
                  />
                  {emailExists && (
                    <span className="error-message">This email is already registered</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    {countryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Gender *</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                      />
                      Female
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === 'other'}
                        onChange={handleInputChange}
                      />
                      Other
                    </label>
                  </div>
                </div>

                <button 
                  className="btn-primary" 
                  onClick={nextStep}
                  disabled={!validateStep1()}
                >
                  Next: Course Selection
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h2>Course Selection</h2>
                {formData.courses.map((course, index) => (
                  <div key={course.id} className="course-section">
                    <div className="course-header">
                      <h3>Course {index + 1}</h3>
                      {formData.courses.length > 1 && (
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={() => removeCourse(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Course Name *</label>
                      <select
                        value={course.name}
                        onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                      >
                        {courseOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {course.name && (
                      <>
                        <div className="form-group">
                          <label>Duration</label>
                          <input
                            type="text"
                            value={courseOptions.find(opt => opt.value === course.name)?.duration || ''}
                            readOnly
                          />
                        </div>
                        <div className="form-group">
                          <label>Fees</label>
                          <input
                            type="text"
                            value={courseOptions.find(opt => opt.value === course.name)?.fees || ''}
                            readOnly
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={addCourse}
                >
                  + Add Another Course
                </button>

                <div className="button-group">
                  <button className="btn-outline" onClick={prevStep}>
                    Back
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={nextStep}
                    disabled={!validateStep2()}
                  >
                    Next: Review & Submit
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h2>Review Your Information</h2>
                <div className="review-section">
                  <h3>Student Details</h3>
                  <div className="review-item">
                    <strong>Name:</strong> {formData.name}
                  </div>
                  <div className="review-item">
                    <strong>Email:</strong> {formData.email}
                  </div>
                  <div className="review-item">
                    <strong>Country:</strong> {countryOptions.find(c => c.value === formData.country)?.label}
                  </div>
                  <div className="review-item">
                    <strong>Gender:</strong> {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}
                  </div>
                </div>

                <div className="review-section">
                  <h3>Selected Courses</h3>
                  {formData.courses.map((course, index) => (
                    <div key={index} className="course-review">
                      <h4>Course {index + 1}</h4>
                      <div className="review-item">
                        <strong>Course:</strong> {courseOptions.find(c => c.value === course.name)?.label}
                      </div>
                      <div className="review-item">
                        <strong>Duration:</strong> {courseOptions.find(c => c.value === course.name)?.duration}
                      </div>
                      <div className="review-item">
                        <strong>Fees:</strong> {courseOptions.find(c => c.value === course.name)?.fees}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="button-group">
                  <button className="btn-outline" onClick={prevStep}>
                    Back
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm Enrollment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Enrollment Successful!</h2>
            <p>Thank you for enrolling in our courses. You will receive a confirmation email shortly.</p>
            <button className="btn-primary" onClick={resetForm}>
              Enroll Another Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;