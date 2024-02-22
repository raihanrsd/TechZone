import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ReviewComponent = ({ product_id, onReviewSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Perform any additional validation if needed
    // Call the onReviewSubmit prop to send the review data to the parent component
    onReviewSubmit({ product_id, rating, comment });

    // Optionally, you can reset the state after submission
    setRating(5);
    setComment('');
  };

  return (
    <div className="review-container">
      <h2 className="review-heading">Add a Review</h2>

      <div className="rating-label">
        <label htmlFor="rating">Rating: {rating}</label>
        <Slider
          value={rating}
          onChange={handleRatingChange}
          min={0}
          max={5}
          step={0.01} // You can use a smaller step for fractional values
          trackStyle={{ 
            backgroundColor: '#48277d', 
            height: 10 
        }}
        handleStyle={{
          borderColor: '#48277d',
          height: 28,
          width: 28,
          marginLeft: -14,
          marginTop: -9,
          backgroundColor: 'black',
        }}
        railStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.1)', 
            height: 10 
        }}
        />
        
      </div>

      <div className="comment-section">
        <label className="comment-label">
          Comment:
          <textarea
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            cols="50"
            className="comment-textarea"
          />
        </label>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  );
};

export default ReviewComponent;
