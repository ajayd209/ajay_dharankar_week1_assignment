import React, { useState } from "react";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!rating) newErrors.rating = "Rating is required";
    if (!comments) newErrors.comments = "Comments are required";

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="feedback-form-container">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            {errors.rating && <p className="error">{errors.rating}</p>}
          </div>

          <div className="form-group">
            <label>Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
            {errors.comments && <p className="error">{errors.comments}</p>}
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      ) : (
        <div className="submitted-data">
          <h2>Feedback Submitted</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Rating:</strong> {rating}
          </p>
          <p>
            <strong>Comments:</strong> {comments}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
