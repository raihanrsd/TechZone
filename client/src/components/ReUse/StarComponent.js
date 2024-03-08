// StarRating.js
import React from 'react';
import styled from 'styled-components';

const Star = styled.span`
  color: ${(props) => (props.filled ? '#ffd700' : '#ccc')};
  font-size: 20px;
`;

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<Star key={i} filled>★</Star>);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" filled style={{ width: '50%', overflow: 'hidden' }}>★</Star>);
    }

    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`}>★</Star>);
    }

    return stars;
  };

  return (
    <div>
      {renderStars()}
    </div>
  );
};

export default StarRating;
