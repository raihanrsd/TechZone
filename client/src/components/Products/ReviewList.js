// ReviewList.js
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import StarRating from '../ReUse/StarComponent';
import styled from 'styled-components';

const ReadMoreButton = styled.button`
  background-color: #48277d;
  color: #fff;
  padding: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  position: absolute;
  bottom: 10px;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background-color: #682e7e;
  }
`;


const ReviewList = ({ product_id,  reviews, setReviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [expandedReviews, setExpandedReviews] = useState([]);

  const loadMoreReviews = async () => {
    try {
      const response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/review/${product_id}`);
      const data = await response.json();
      setReviews(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching more reviews:', error.message);
    }
  };

  const loadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
    loadMoreReviews(); // Fetch more reviews when "Load more" button is clicked
  };

  const toggleExpand = (reviewId) => {
    setExpandedReviews((prevExpandedReviews) => {
      if (prevExpandedReviews.includes(reviewId)) {
        return prevExpandedReviews.filter((id) => id !== reviewId);
      } else {
        return [...prevExpandedReviews, reviewId];
      }
    });
  };

  return (
    <div className='review-list'>
      {reviews.slice(0, visibleReviews).map((review) => (
        <div className="review-box" key={review.review_id}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            
          }}>
            <span className="username">{review.username}</span>
            <span className="date-text">{moment(review.time_added).format('MMMM DD, YYYY')}</span>
          </div>
          <StarRating rating={review.rating} />
          <div style={{
            marginBottom: '55px'
          }}>
          {expandedReviews.includes(review.review_id) ? (
              <p>{review.review}</p>
            ) : (
              <p>{review.review.slice(0, 150)}...</p>
            )}
          </div>
          {review.review.length > 50 && (
            <div>
              <ReadMoreButton onClick={() => toggleExpand(review.review_id)}>
                {expandedReviews.includes(review.review_id) ? 'Read less' : 'Read more'}
              </ReadMoreButton>
            </div>
          )}
        </div>
      ))}
      {visibleReviews < (reviews?.length || 0) &&  (
        <button className="load-more-button" onClick={loadMore}>Load more</button>
      )}
    </div>
  );
};

export default ReviewList;
